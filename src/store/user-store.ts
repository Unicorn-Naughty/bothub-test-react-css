import { create } from "zustand";
import { TFormLoginValues } from "../components/shared/auth-page/schemas";

interface IUserStore {
  loading: boolean;
  user: {
    email: string;
    password: string;
    token: string;
  };
  fetchUserData: (data: TFormLoginValues) => void;
  initializeUser: () => void;
}

export const userStoreZustand = create<IUserStore>((set) => ({
  loading: false,
  user: {
    email: "",
    password: "",
    token: "",
  },
  fetchUserData: (data: TFormLoginValues) => {
    const userData = {
      ...data,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNjBhOTAxLWJiMzYtNDIzZS05NGQ1LWVmMzM5YTcxMDQwNSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3NDAwNjA3NDEsImV4cCI6MjA1NTYzNjc0MX0.JYrAECA8EpzptOqtKIyq7gJWf83hburC9S25yF5Xt3k",
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ user: userData });
  },
  initializeUser: () => {

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const initialUser = JSON.parse(storedUserData);
        set({ user: initialUser });
      } catch (error) {
        console.error("Failed to parse userData from localStorage", error);
      }
    }

  },
}));


