import { FieldOption } from "./field-option";

export enum InputTypeEnum {
  shortText = "Short Text",
  longText = "Long Text",
  singleChoice = "Single Choice",
  multipleChoice = "Multiple Choice",
  fileUpload = "File Upload",
  slider = "Slider",
  date = "Date",
  time = "Time",
  datetime = "Datetime",
  linearScale = "Linear Scale",
  dropdown = "Dropdown",
}

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
}
