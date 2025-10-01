import API from "@/utils/API";

export type ROLE = "user" | "admin";

export interface User {
  _id: number;
  email: string;
  role: ROLE;
  totalReturn: number;
  username: string;
}

export interface WALLET {
  balance: Number;
  totalInvested: Number;
  totalWon: Number;
  user: String;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  terms: boolean;
  role: "user" | "admin";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const authService = {
  async login(data: LoginData) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client": "web", // force cookie-based for browser
      },
      credentials: "include", // important for cookies
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || "Registration failed");
    }

    return await res.json();
  },

  async register(data: RegisterData) {
    try {
      data["role"] = "user";
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client": "web",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || "Registration failed");
      }

      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
  async logout() {
    await API.get("/logout")
      .then((response) => {
        console.log("Logout successful");
        localStorage.clear();
        return response;
      })
      .catch((error) => console.error("Logout failed", error));
  },

  async getProfile() {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
  },

  isAuthenticated() {
    // frontend doesn't know cookie directly → just call profile
    return true;
  },
};
