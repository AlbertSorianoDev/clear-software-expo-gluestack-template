import { FileTypeEnum, InputTypeEnum } from "./enums";
import { FieldSlider } from "./field-slider";

export interface FormField {
  id: number;
  createdAt: number;
  inputType: InputTypeEnum;
  title: string;
  description?: string;
  isRequired: boolean;
  order: number;
  formId: number;
  options?: FieldOption[];
  slider?: FieldSlider;
  slider?: SliderField;
  file?: FileField;
}

export interface SliderField {
  min: number;
  max: number;
  step: number;
}

export interface FileField {
  fileType: FileTypeEnum;
  filesLimit: number;
}

export interface FormFieldCreate {
  inputType: InputTypeEnum;
  afterFieldOrder?: number;
}

export interface FormFieldUpdate {
  title: string;
  description?: string;
  isRequired: boolean;
  min?: number;
  max?: number;
  step?: number;
  fileType?: FileTypeEnum;
  filesLimit?: number;
}
