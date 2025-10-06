"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService, User, RegisterData, LoginData, WALLET } from "@/lib/auth";

interface AuthState {
  user: User | null;
  wallet: WALLET | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; wallet: WALLET } }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_WALLET"; payload: WALLET };

const initialState: AuthState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  wallet:
    typeof window !== "undefined" && localStorage.getItem("wallet")
      ? JSON.parse(localStorage.getItem("wallet")!)
      : null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

type LoginResponse = {
  success: boolean;
  data: any;
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        wallet: action.payload.wallet,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "UPDATE_WALLET":
      return { ...state, wallet: action.payload };

    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (loginData: LoginData) => Promise<LoginResponse>;
  register: (registerData: RegisterData) => Promise<LoginResponse>;
  logout: () => Promise<LoginResponse>;
  clearError: () => void;
  updateWallet: (wallet: WALLET) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 🔍 Auto check session/token on mount
  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await authService.getProfile(); // works with cookie or token
        if (response.success && response.data) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.data.user,
              wallet: response.data.wallet,
            },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        dispatch({ type: "LOGOUT" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (loginData: LoginData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authService.login(loginData);
      console.log("response", response);
      if (response.success && response.data.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: response.data.user,
            wallet: response.data.wallet,
          },
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
        localStorage.setItem("authenticated", "true");
        return { success: true, data: response.data.user };
      } else {
        dispatch({
          type: "LOGIN_ERROR",
          payload: response.error || "Login failed",
        });
        return { success: false, data: response.error };
      }
    } catch (error: any) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message || "Login failed",
      });
      return { success: false, data: error.message };
    }
  };

  const register = async (registerData: RegisterData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authService.register(registerData);
      if (response.success && response.data.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: response.data.user,
            wallet: response.data.wallet,
          },
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
        localStorage.setItem("authenticated", "true");
        return { success: true, data: response.data.user };
      } else {
        dispatch({
          type: "LOGIN_ERROR",
          payload: response.error || "Registration failed",
        });
        return { success: false, data: response.error };
      }
    } catch (error: any) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message || "Registration failed",
      });
      return { success: false, data: error.message };
    }
  };

  const logout = async (): Promise<LoginResponse> => {
    dispatch({ type: "SET_LOADING", payload: true });
    localStorage.clear();
    try {
      await authService.logout();
      dispatch({ type: "LOGOUT" });
      return { success: true, data: null };
    } catch (error: any) {
      dispatch({ type: "LOGOUT" });
      return { success: false, data: error?.message || "Logout failed" };
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateWallet = (wallet: WALLET) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    dispatch({ type: "UPDATE_WALLET", payload: wallet });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        updateWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
