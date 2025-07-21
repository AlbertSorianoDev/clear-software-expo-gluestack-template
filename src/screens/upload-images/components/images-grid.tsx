import { useGetImages } from "../hooks/use-get-images";

import { Box } from "@/screens/components/ui/box";
import { Image } from "@/screens/components/ui/image";

export const ImagesGrid = () => {
  const { images } = useGetImages();
  return (
    <Box className="grid grid-cols-1 gap-4 p-5 md:grid-cols-5">
      {images.map((img, index) => (
        <Image
          key={index}
          alt={""}
          source={{ uri: img }}
          resizeMode="contain"
          className="h-[200px] w-full"
        />
      ))}
    </Box>
  );
};
