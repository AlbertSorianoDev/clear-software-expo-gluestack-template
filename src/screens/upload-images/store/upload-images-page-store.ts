import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UploadPageStore = {
  showCameraModal: boolean;
  setShowCameraModal: (visible: boolean) => void;
  isNewPhotoUploading?: boolean;
  setIsNewPhotoUploading: (uploading: boolean) => void;

  reset: () => void;
};

const initialState = {
  showCameraModal: false,
  isNewPhotoUploading: undefined,
};

export const useUploadImagesPageStore = create<UploadPageStore>()(
  immer((set) => ({
    ...initialState,
    setShowCameraModal: (visisble) => {
      set((state) => {
        state.showCameraModal = visisble;
      });
    },

    setIsNewPhotoUploading: (uploading) => {
      set((state) => {
        state.isNewPhotoUploading = uploading;
      });
    },

    // Reset state
    reset: () => set(() => initialState),
  })),
);
