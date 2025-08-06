import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { FileTypeEnum, InputTypeEnum } from "@/data/forms/types/enums";
import { FieldOption } from "@/data/forms/types/field-option";

interface EditFormBuilderPageStore {
  mobileSortableMode: boolean;
  setMobileSortableMode: (value: boolean) => void;

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
    isRequired: boolean;
    inputType?: InputTypeEnum;
    order: number;
    options?: FieldOption[];
    slider?: {
      min: number;
      max: number;
      step: number;
    };
    file?: {
      fileType: FileTypeEnum;
      filesLimit: number;
    };
  };
  setField: {
    setId: (id?: number) => void;
    setTitle: (title: string) => void;
    setDescription: (desc: string) => void;
    setIsRequired: (isRequired: boolean) => void;
    setInputType: (inputType?: InputTypeEnum) => void;
    setOrder: (order: number) => void;
    setOptions: (options?: FieldOption[]) => void;
    setSlider: {
      setMin: (min: number) => void;
      setMax: (max: number) => void;
      setStep: (step: number) => void;
    };
    setFile: {
      setFileType: (fileType: FileTypeEnum) => void;
      setFilesLimit: (filesLimit: number) => void;
    };
    reset: () => void;
  };

  option: {
    id?: number;
    label: string;
    order: number;
  };
  setOption: {
    setId: (id?: number) => void;
    setLabel: (label: string) => void;
    setOrder: (order: number) => void;
    reset: () => void;
  };
}

const initialData = {
  mobileSortableMode: false,
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
    order: 0,
    isRequired: false,
  },
  option: {
    label: "",
    order: 0,
  },
};

export const useEditFormBuilderPageStore = create<EditFormBuilderPageStore>()(
  immer((set) => ({
    ...initialData,

    setMobileSortableMode: (value) => {
      set((state) => {
        state.mobileSortableMode = value;
      });
    },

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
      setIsRequired: (isRequired) =>
        set((state) => {
          state.field.isRequired = isRequired;
        }),
      setInputType: (inputType) =>
        set((state) => {
          state.field.inputType = inputType;
        }),
      setOrder: (order) =>
        set((state) => {
          state.field.order = order;
        }),
      setOptions: (options) =>
        set((state) => {
          state.field.options = options;
        }),
      setSlider: {
        setMin: (min) =>
          set((state) => {
            if (!state.field.slider) {
              state.field.slider = { min: min, max: 100, step: 1 };
            }
            state.field.slider.min = min;
          }),
        setMax: (max) =>
          set((state) => {
            if (!state.field.slider) {
              state.field.slider = { min: 0, max: max, step: 1 };
            }
            state.field.slider.max = max;
          }),
        setStep: (step) =>
          set((state) => {
            if (!state.field.slider) {
              state.field.slider = { min: 0, max: 100, step: step };
            }
            state.field.slider.step = step;
          }),
      },
      setFile: {
        setFileType: (fileType) =>
          set((state) => {
            if (!state.field.file) {
              state.field.file = { fileType: fileType, filesLimit: 1 };
            }
            state.field.file.fileType = fileType;
          }),
        setFilesLimit: (filesLimit) =>
          set((state) => {
            if (!state.field.file) {
              state.field.file = { fileType: FileTypeEnum.any, filesLimit: filesLimit };
            }
            state.field.file.filesLimit = filesLimit;
          }),
      },
      reset: () =>
        set((state) => {
          state.field = {
            ...initialData.field,
          };
        }),
    },

    setOption: {
      setId: (id) =>
        set((state) => {
          state.option.id = id;
        }),
      setLabel: (label) =>
        set((state) => {
          state.option.label = label;
        }),
      setOrder: (order) =>
        set((state) => {
          state.option.order = order;
        }),
      reset: () =>
        set((state) => {
          state.option = {
            ...initialData.option,
          };
        }),
    },
  })),
);
