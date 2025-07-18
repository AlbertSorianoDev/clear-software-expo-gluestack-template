export interface FileResponse {
  access: string;
  path: string;
  name: string;
  type: string;
  size: number;
  mime: string;
  meta: {
    width: number;
    height: number;
  };
  url: string;
}
