import { useEffect, useState } from "react";

import { UploadImageTestResponse } from "../types/upload-image-test-response";

export function useGetImages() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://gomigo.org/api:c5o3WOXc/upload_image_test");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = (await res.json()) as UploadImageTestResponse;

        setImages(data.images.map((img) => img.url));
      } catch (err) {
        console.error(err);
        setError((err as Error).message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    void fetchImages();
  }, []);

  return { images, loading, error };
}
