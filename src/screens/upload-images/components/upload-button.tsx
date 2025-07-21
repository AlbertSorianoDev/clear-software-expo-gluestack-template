import { useUploadImage } from "../hooks/use-upload-images";
import { pickImage } from "../utils/pick-image";

import { Button, ButtonText } from "@/screens/components/ui/button";

type Props = {
  onComplete?: () => void;
};

export const UploadButton = ({ onComplete }: Props) => {
  const { uploadImage } = useUploadImage();

  const handlePress = async () => {
    const assets = await pickImage();
    if (assets) {
      await uploadImage(assets);
      onComplete?.();
    }
  };

  return (
    <Button size="sm" onPress={handlePress}>
      <ButtonText>Upload images</ButtonText>
    </Button>
  );
};
