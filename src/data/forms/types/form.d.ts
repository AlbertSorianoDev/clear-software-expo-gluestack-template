import { FormField } from "./form-field";

export interface Form {
  id: number;
  createdAt: number;
  title: string;
  description: string;
  isActive: boolean;
  isPublished: boolean;
  fields?: FormField[];
}

export interface FormUpdate {
  title: string;
  description: string;
}
