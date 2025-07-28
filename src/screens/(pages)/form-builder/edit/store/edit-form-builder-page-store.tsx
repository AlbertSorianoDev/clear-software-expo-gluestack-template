import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface EditFormBuilderPageStore {
  showInputTypeActionSheet: boolean;
  setShowInputTypeActionSheet: (value: boolean) => void;
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;
}

const initialData = {
  selectedItemId: null,
  showInputTypeActionSheet: false,
};

export const useEditFormBuilderPageStore = create<EditFormBuilderPageStore>()(
  immer((set) => ({
    ...initialData,
    setSelectedItemId: (id) => {
      set((state) => {
        state.selectedItemId = id;
      });
    },
    setShowInputTypeActionSheet: (value) =>
      set((state) => {
        state.showInputTypeActionSheet = value;
      }),
  })),
);
