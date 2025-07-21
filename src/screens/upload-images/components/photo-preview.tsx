import { Check, Trash } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

import { Box } from "@/screens/components/ui/box";
import { Icon } from "@/screens/components/ui/icon";
import { Image } from "@/screens/components/ui/image";
import { Pressable } from "@/screens/components/ui/pressable";

export const PhotoPreview = ({
  photo,
  onRetake,
  onUpload,
  isUploadLoading = false,
}: {
  photo: string;
  onRetake: () => void;
  onUpload: () => void;
  isUploadLoading?: boolean;
}) => {
  return (
    <Box className="flex-1 items-center justify-center">
      <View className="h-full w-full scale-x-[-1]">
        <Image source={{ uri: photo }} className="h-full w-full" />
      </View>
      <View className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <ActivityIndicator animating={isUploadLoading} />
      </View>
      <View className="absolute bottom-8 left-0 flex w-full flex-row items-center justify-center gap-4">
        <Pressable onPress={onRetake}>
          <Box className="rounded-full border-2 border-white p-4 hover:bg-error-400 active:bg-red-500">
            <Icon as={Trash} className="text-white" size="xl" />
          </Box>
        </Pressable>
        <Pressable onPress={onUpload}>
          <Box className="rounded-full border-2 border-white p-4 hover:bg-success-400 active:bg-success-500">
            <Icon as={Check} className="text-white" size="xl" />
          </Box>
        </Pressable>
      </View>
    </Box>
  );
};
