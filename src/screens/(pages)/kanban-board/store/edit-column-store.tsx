import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState = {
  id: 0,
  name: "",
};

interface EditColumnStore {
  id: number;
  name: string;
  setName: (name: string) => void;
}

export const useEditColumnStore = create<EditColumnStore>()(
  immer((set) => ({
    ...initialState,
    setName: (name) =>
      set((state) => {
        state.name = name;
      }),
  })),
);
