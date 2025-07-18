import { useUploadImage } from "../hooks/useAddImages";
import { pickImageFromCamera } from "../utils/pick-image";

import { Button, ButtonText } from "@/screens/components/ui/button";

type Props = {
  onComplete?: () => void;
};

export const TakePictureButton = ({ onComplete }: Props) => {
  const { uploadImage } = useUploadImage();

  const handlePress = async () => {
    const assets = await pickImageFromCamera();
    if (assets) {
      await uploadImage(assets);
      onComplete?.();
    }
  };

  return (
    <Button size="sm" onPress={handlePress}>
      <ButtonText>Take picture</ButtonText>
    </Button>
  );
};
