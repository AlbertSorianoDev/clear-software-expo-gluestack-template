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
