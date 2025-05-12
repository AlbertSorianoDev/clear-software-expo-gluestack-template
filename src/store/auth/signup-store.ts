import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SignUpStore = {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  acceptTerms: boolean;
  passwordTouched: boolean;
  errors: {
    email?: string;
    password?: string[];
    confirmPassword?: string;
    acceptTerms?: string;
  };

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setShowPassword: (showPassword: boolean) => void;
  setShowConfirmPassword: (showConfirmPassword: boolean) => void;
  setAcceptTerms: (acceptTerms: boolean) => void;
  setPasswordTouched: (touched: boolean) => void;
  setErrors: (errors: SignUpStore["errors"]) => void;
  reset: () => void;
};

export const useSignUpStore = create<SignUpStore>()(
  immer((set) => ({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
    passwordTouched: false,
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
    setAcceptTerms: (acceptTerms) => {
      set((state) => {
        state.acceptTerms = acceptTerms;
        state.errors.acceptTerms = undefined;
      });
    },
    setPasswordTouched: (touched) => {
      set((state) => {
        state.passwordTouched = touched;
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
