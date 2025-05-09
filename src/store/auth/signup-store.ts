import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SignUpStore = {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  rememberMe: boolean;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setShowPassword: (showPassword: boolean) => void;
  setShowConfirmPassword: (showConfirmPassword: boolean) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setErrors: (errors: SignUpStore["errors"]) => void;
  reset: () => void;
};

export const useSignUpStore = create<SignUpStore>()(
  immer((set) => ({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    showPassword: false,
    showConfirmPassword: false,
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
    setConfirmPassword: (confirmPassword) => {
      set((state) => {
        state.confirmPassword = confirmPassword;
        state.errors.confirmPassword = undefined;
      });
    },
    setShowPassword: (showPassword) => {
      set((state) => {
        state.showPassword = showPassword;
      });
    },
    setShowConfirmPassword: (showConfirmPassword) => {
      set((state) => {
        state.showConfirmPassword = showConfirmPassword;
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
    reset: () =>
      set(() => ({
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
        showPassword: false,
        showConfirmPassword: false,
        errors: {},
      })),
  })),
);
