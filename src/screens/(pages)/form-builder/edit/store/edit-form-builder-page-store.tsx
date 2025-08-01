import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { InputTypeEnum } from "@/data/forms/types/enums";

interface EditFormBuilderPageStore {
  showInputTypeActionSheet: boolean;
  setShowInputTypeActionSheet: (value: boolean) => void;

  selectedNewField: InputTypeEnum | null;
  setSelectedNewField: (value: InputTypeEnum | null) => void;

  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;

  onChangeSelectedItemId: () => void;
  setOnChangeSelectedItemId: (callback: () => void) => void;

  form: {
    title: string;
    description: string;
  };
  setForm: {
    setTitle: (title: string) => void;
    setDescription: (desc: string) => void;
  };

  field: {
    id?: number;
    title: string;
    description: string;
    inputType?: InputTypeEnum;
    order?: number;
  };
  setField: {
    setId: (id?: number) => void;
    setTitle: (title: string) => void;
    setDescription: (desc: string) => void;
    setInputType: (inputType?: InputTypeEnum) => void;
    setOrder: (order?: number) => void;
  };
}

const initialData = {
  showInputTypeActionSheet: false,
  selectedNewField: null,
  selectedItemId: null,
  onChangeSelectedItemId: () => {},
  form: {
    title: "",
    description: "",
  },
  field: {
    title: "",
    description: "",
  },
};

export const useEditFormBuilderPageStore = create<EditFormBuilderPageStore>()(
  immer((set) => ({
    ...initialData,

    setSelectedItemId: (id) => {
      set((state) => {
        if (state.selectedItemId !== id && state.selectedItemId !== null) {
          state.onChangeSelectedItemId();
        }
        state.selectedItemId = id;
      });
    },

    setSelectedNewField: (value) => {
      set((state) => {
        state.selectedNewField = value;
      });
    },

    setShowInputTypeActionSheet: (value) => {
      set((state) => {
        state.showInputTypeActionSheet = value;
      });
    },

    setOnChangeSelectedItemId: (callback) => {
      set((state) => {
        state.onChangeSelectedItemId = callback;
      });
    },

    setForm: {
      setTitle: (title) =>
        set((state) => {
          state.form.title = title;
        }),
      setDescription: (desc) =>
        set((state) => {
          state.form.description = desc;
        }),
    },

    setField: {
      setId: (id) =>
        set((state) => {
          state.field.id = id;
        }),
      setTitle: (title) =>
        set((state) => {
          state.field.title = title;
        }),
      setDescription: (desc) =>
        set((state) => {
          state.field.description = desc;
        }),
      setInputType: (inputType) =>
        set((state) => {
          state.field.inputType = inputType;
        }),
      setOrder: (order) =>
        set((state) => {
          state.field.order = order;
        }),
    },
  })),
);
