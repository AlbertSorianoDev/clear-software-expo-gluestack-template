import { getDocumentAsync } from "expo-document-picker";
import { useEffect, useState } from "react";
import { Linking } from "react-native";

import { useQuestionContext } from "../hooks/use-question-context";

import { AttachmentResponse } from "@/data/forms/types/form-submission";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { HStack } from "@/screens/components/ui/hstack";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const UploadFileQuestion = ({ id }: { id: number }) => {
  const { submission, isLoading } = useQuestionContext(id);

  const [files, setFiles] = useState<AttachmentResponse[]>([]);

  useEffect(() => {
    if (submission?.fileResponse?.images?.length) {
      setFiles(submission.fileResponse.images);
    }
  }, [submission?.fileResponse]);

  const handlePress = async () => {
    const result = await getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
      type: "*/*",
    });
    console.log(result);

    // if (!result.canceled) {
    //   const selectedFiles: AttachmentResponse[] = result.assets.map((file) => ({
    //     access: "private", // o "public", según tu lógica
    //     path: file.uri,
    //     name: file.name,
    //     type: "file",
    //     size: file.size,
    //     mime: file.mimeType ?? "",
    //     meta: {
    //       width: "0",
    //       height: "0",
    //     },
    //     url: file.uri,
    //   }));

    //   setFiles(selectedFiles);
    //   console.log("Selected files:", selectedFiles);
    // }
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md">
      <HStack className="items-center">
        {files?.map((file, index) => (
          <Pressable
            key={index}
            className="rounded-xl bg-typography-50 px-4 py-2"
            onPress={async () => {
              const supported = await Linking.canOpenURL(file.url);
              if (supported) {
                await Linking.openURL(file.url);
              } else {
                console.warn("No se puede abrir la URL:", file.url);
              }
            }}
          >
            <Text className="text-xs text-gray-600">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Text>
          </Pressable>
        ))}
      </HStack>

      <Button size="sm" className="w-fit self-end" onPress={handlePress}>
        <ButtonText>Add file</ButtonText>
      </Button>
    </VStack>
  );
};
