import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SignInStore {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  errors: { email?: string; password?: string };
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  toggleShowPassword: () => void;
  setRememberMe: (rememberMe: boolean) => void;
  setErrors: (errors: SignInStore["errors"]) => void;
  reset: () => void;
}

export const useSignInStore = create<SignInStore>()(
  immer((set) => ({
    email: "",
    password: "",
    rememberMe: false,
    showPassword: false,
    errors: {},
    setEmail: (email) => {
      set((state) => {
        state.email = email;
        state.errors.email = undefined;
      });
    },
    setPassword: (password) => {
      set((state) => {
        state.password = password;
        state.errors.password = undefined;
      });
    },
    toggleShowPassword: () => {
      set((state) => {
        state.showPassword = !state.showPassword;
      });
    },
    setRememberMe: (rememberMe) => {
      set((state) => {
        state.rememberMe = rememberMe;
      });
    },
    setErrors: (errors) => {
      set((state) => {
        state.errors = errors;
      });
    },
    reset: () => {
      set(() => ({
        email: "",
        password: "",
        rememberMe: false,
        showPassword: false,
        errors: {},
      }));
    },
  })),
);
