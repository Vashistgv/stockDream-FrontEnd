"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService, User, RegisterData, LoginData } from "@/lib/auth";
import { th } from "zod/v4/locales";
import { success } from "zod";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
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
        user: action.payload,
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
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (loginData: LoginData) => Promise<LoginResponse>;
  register: (registerData: RegisterData) => Promise<LoginResponse>;
  logout: () => Promise<LoginResponse>;
  clearError: () => void;
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
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
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
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    localStorage.clear();
    try {
      await authService.logout();
    } catch {
      // ignore API failure
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
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
