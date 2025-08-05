export interface FieldResponse {
  id: number;
  createdAt: number;
  formSubmissionId: number;
  formFieldId: number;
  textResponse?: TextResponse;
  numericResponse?: NumericResponse;
  optionResponse?: OptionResponse;
  dateResponse?: DateResponse;
  fileResponse?: FileResponse;
}

interface BaseFieldResponse {
  id: number;
  createdAt: number;
  fieldResponseId: number;
}

export interface TextResponse extends BaseFieldResponse {
  text: string;
}

export interface NumericResponse extends BaseFieldResponse {
  number: number;
}

export interface DateResponse extends BaseFieldResponse {
  date: Date;
}

export interface OptionResponse extends BaseFieldResponse {
  fieldOptionIds: number[];
}

export interface FileResponse extends BaseFieldResponse {
  files: AttachmentResponse[];
  images: AttachmentResponse[];
}

export interface AttachmentResponse {
  access: string;
  path: string;
  name: string;
  type: string;
  size: number;
  mime: string;
  meta: {
    width: string;
    height: string;
  };
  url: string;
}

export interface FieldResponseCreate {
  formFieldId: number;
  textAnswer?: string | undefined;
  dateAnswer?: Date | undefined;
  numericAnswer?: number | undefined;
  optionsIds?: number[] | undefined;
}

export interface FieldResponseUpdate {
  textAnswer?: string | undefined;
  dateAnswer?: Date | undefined;
  numericAnswer?: number | undefined;
  optionsIds?: number[] | undefined;
}
