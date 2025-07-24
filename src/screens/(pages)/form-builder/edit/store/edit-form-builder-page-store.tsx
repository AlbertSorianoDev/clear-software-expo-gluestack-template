import { RefObject } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface EditFormBuilderPageStore {
  showInputTypeActionSheet: boolean;
  setShowInputTypeActionSheet: (value: boolean) => void;
  selectedItemRef: RefObject<unknown> | null;
  setSelectedItemRef: (ref: RefObject<unknown>) => void;
}

const initialData = {
  selectedItemRef: null,
  showInputTypeActionSheet: false,
};

export const useEditFormBuilderPageStore = create<EditFormBuilderPageStore>()(
  immer((set) => ({
    ...initialData,
    setSelectedItemRef: (ref) => set(() => ({ selectedItemRef: ref })),
    setShowInputTypeActionSheet: (value) =>
      set((state) => {
        state.showInputTypeActionSheet = value;
      }),
  })),
);
