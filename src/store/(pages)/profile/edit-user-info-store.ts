import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface EditUserInfoStore {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  errors: {
    firstName?: string;
    lastName?: string;
    gender?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };

  isModalVisible: boolean;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setGender: (gender: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setCity: (city: string) => void;
  setState: (newState: string) => void;
  setCountry: (country: string) => void;
  setZipCode: (zipCode: string) => void;

  setErrors: (errors: EditUserInfoStore["errors"]) => void;

  showModal: () => void;
  hideModal: () => void;

  reset: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",

  errors: {},

  isModalVisible: false,
};

export const useEditUserInfoStore = create<EditUserInfoStore>()(
  immer((set) => ({
    ...initialState,

    setFirstName: (firstName: string) =>
      set((state) => {
        state.firstName = firstName;
        state.errors.firstName = undefined;
      }),
    setLastName: (lastName: string) =>
      set((state) => {
        state.lastName = lastName;
        state.errors.lastName = undefined;
      }),
    setGender: (gender: string) =>
      set((state) => {
        state.gender = gender;
        state.errors.gender = undefined;
      }),
    setPhoneNumber: (phoneNumber: string) =>
      set((state) => {
        state.phoneNumber = phoneNumber;
        state.errors.phoneNumber = undefined;
      }),
    setCity: (city: string) =>
      set((state) => {
        state.city = city;
        state.errors.city = undefined;
      }),
    setState: (newState: string) =>
      set((state) => {
        state.state = newState;
        state.errors.state = undefined;
      }),
    setCountry: (country: string) =>
      set((state) => {
        state.country = country;
        state.errors.country = undefined;
      }),
    setZipCode: (zipCode: string) =>
      set((state) => {
        state.zipCode = zipCode;
        state.errors.zipCode = undefined;
      }),

    setErrors: (errors: EditUserInfoStore["errors"]) =>
      set((state) => {
        state.errors = errors;
      }),

    showModal: () =>
      set((state) => {
        state.isModalVisible = true;
      }),

    hideModal: () => set(() => initialState),

    reset: () => set(() => initialState),
  })),
);
