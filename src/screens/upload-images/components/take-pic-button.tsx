import { Platform } from "react-native";

import { useUploadImage } from "../hooks/use-upload-images";
import { pickImageFromCamera } from "../utils/pick-image";

import { Button, ButtonText } from "@/screens/components/ui/button";

type Props = {
  onComplete?: () => void;
  onPress: () => void;
};

export const TakePictureButton = ({ onComplete, onPress }: Props) => {
  const { uploadImage } = useUploadImage();

  const handlePress = async () => {
    const assets = await pickImageFromCamera();
    if (!assets) return;

    const formattedAssets = assets.map((asset) => ({
      fileName: asset.fileName,
      mimeType: asset.mimeType,
      base64: asset.base64,
    }));
    await uploadImage(formattedAssets);
    onComplete?.();
  };

  return (
    <Button size="sm" onPress={Platform.OS != "web" ? handlePress : onPress}>
      <ButtonText>Take picture</ButtonText>
    </Button>
  );
};
