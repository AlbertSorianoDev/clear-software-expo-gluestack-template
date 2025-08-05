import { InputTypeEnum } from "./enums";
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
}

export interface FormFieldCreate {
  inputType: InputTypeEnum;
  afterFieldOrder: number;
}
