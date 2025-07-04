import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CreatePasswordStore = {
  password: string;
  confirmPassword: string;

  errors: {
    password?: string[];
    confirmPassword?: string;
  };

  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordTouched: boolean;

  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setErrors: (errors: CreatePasswordStore["errors"]) => void;

  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  passwordWasTouched: () => void;

  reset: () => void;
};

const initialState = {
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  passwordTouched: false,
  errors: {},
};

export const useCreatePasswordStore = create<CreatePasswordStore>()(
  immer((set) => ({
    ...initialState,

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

    reset: () => set(() => initialState),
  })),
);
