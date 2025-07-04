import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SignUpStore = {
  // Form state
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  rememberMe: boolean;

  errors: {
    email?: string;
    password?: string[];
    confirmPassword?: string;
    acceptTerms?: string;
  };

  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordTouched: boolean;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setAcceptTerms: (acceptTerms: boolean) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setErrors: (errors: SignUpStore["errors"]) => void;

  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  passwordWasTouched: () => void;

  // Reset state
  reset: () => void;
};

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  rememberMe: false,

  errors: {},

  showPassword: false,
  showConfirmPassword: false,
  passwordTouched: false,
};

export const useSignUpStore = create<SignUpStore>()(
  immer((set) => ({
    ...initialState,

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
    setAcceptTerms: (acceptTerms) => {
      set((state) => {
        state.acceptTerms = acceptTerms;
        state.errors.acceptTerms = undefined;
      });
    },
    setRememberMe: (rememberMe) => {
      set((state) => {
        state.rememberMe = rememberMe;
        // state.errors.r = undefined;
      });
    },
    setErrors: (errors) => {
      set((state) => {
        state.errors = errors;
      });
    },

    toggleShowPassword: () => {
      set((state) => {
        state.showPassword = !state.showPassword;
      });
    },
    toggleShowConfirmPassword: () => {
      set((state) => {
        state.showConfirmPassword = !state.showConfirmPassword;
      });
    },

    passwordWasTouched: () => {
      set((state) => {
        state.passwordTouched = true;
      });
    },

    // Reset state
    reset: () => set(() => initialState),
  })),
);
