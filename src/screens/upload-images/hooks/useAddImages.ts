import { ImagePickerAsset } from "expo-image-picker";
import mime from "mime";
import { useState } from "react";

export function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const uploadImage = async (imageAssets: ImagePickerAsset[]) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const images: { filename: string; mime_type: string; base_64: string }[] = [];
      imageAssets.map((imgAsset) => {
        const filename = imgAsset.fileName;
        const mime_type = imgAsset.mimeType;
        const base64 = imgAsset.base64;
        images.push({
          filename: filename ?? "asddasdsa." + mime.getExtension(mime_type ?? "jpg"),
          mime_type: mime_type ?? "",
          base_64: base64 ?? "",
        });
      });

      const res = await fetch("https://gomigo.org/api:c5o3WOXc/upload_image_test", {
        method: "POST",
        body: JSON.stringify({ images: images }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error al subir: ${res.status}`);
      }

      await res.json();
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error, success };
}
