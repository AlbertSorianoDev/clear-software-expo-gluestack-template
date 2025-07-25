import { getDocumentAsync } from "expo-document-picker";

import { Button, ButtonText } from "@/screens/components/ui/button";
import { VStack } from "@/screens/components/ui/vstack";

export const UploadFileQuestion = () => {
  const handlePress = async () => {
    await getDocumentAsync({ base64: true, multiple: true, copyToCacheDirectory: true });
  };
  return (
    <VStack space="md" className="items-end">
      <Button size="sm" className="w-fit" onPress={handlePress}>
        <ButtonText>Add file</ButtonText>
      </Button>
    </VStack>
  );
};
