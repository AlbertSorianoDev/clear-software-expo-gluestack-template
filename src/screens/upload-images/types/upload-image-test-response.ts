import { FileResponse } from "./file-response";

export interface UploadImageTestResponse {
  id: number;
  created_at: number;
  images: FileResponse[];
}
