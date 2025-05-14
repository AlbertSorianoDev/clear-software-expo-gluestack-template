import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SignInStore {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  otp: string[];
  otpStep: number;
  isLoginCodeModalVisible: boolean;
  errors: { email?: string; password?: string; otp?: string };

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  toggleShowPassword: () => void;
  setRememberMe: (rememberMe: boolean) => void;
  setErrors: (errors: SignInStore["errors"]) => void;
  setOtpStep: (step: number) => void;

  showLoginCodeModal: () => void;
  hideLoginCodeModal: () => void;
  setOtp: (otp: string[]) => void;
  validateOtp: (length: number) => boolean;

  reset: () => void;
}

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
  showPassword: false,
  errors: {},
  isLoginCodeModalVisible: false,
  otp: [],
  otpStep: 0,
};

export const useSignInStore = create<SignInStore>()(
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

    showLoginCodeModal: () => {
      set((state) => {
        state.isLoginCodeModalVisible = true;
      });
    },
    hideLoginCodeModal: () => {
      set((state) => {
        state.isLoginCodeModalVisible = false;
        state.otp = [];
        state.otpStep = 0;
        state.errors.otp = undefined;
      });
    },
    setOtp: (otp) => {
      set((state) => {
        state.otp = otp;
        state.errors.otp = undefined;
      });
    },
    setOtpStep: (step) => {
      set((state) => {
        state.otpStep = step;
      });
    },

    validateOtp: (length: number) => {
      let isValid = false;
      set((state) => {
        isValid = state.otp.every((digit) => digit !== "") && state.otp.length === length;
        state.errors.otp = isValid ? undefined : "Please enter a valid OTP.";
      });
      return isValid;
    },

    reset: () => {
      set(() => initialState);
    },
  })),
);
