import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UploadPageStore = {
  showCameraModal: boolean;
  setShowCameraModal: (visible: boolean) => void;

  // Reset state
  reset: () => void;
};

const initialState = {
  showCameraModal: false,
};

export const useUploadImagesPageStore = create<UploadPageStore>()(
  immer((set) => ({
    ...initialState,
    setShowCameraModal: (visisble) => {
      set((state) => {
        state.showCameraModal = visisble;
      });
    },

    // Reset state
    reset: () => set(() => initialState),
  })),
);
