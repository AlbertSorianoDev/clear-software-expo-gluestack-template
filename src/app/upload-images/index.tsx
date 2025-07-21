import { useState } from "react";
import { View } from "react-native";

import { Box } from "@/screens/components/ui/box";
import { HStack } from "@/screens/components/ui/hstack";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { VStack } from "@/screens/components/ui/vstack";
import { ImagesGrid } from "@/screens/upload-images/components/images-grid";
import { TakePictureButton } from "@/screens/upload-images/components/take-pic-button";
import { UploadButton } from "@/screens/upload-images/components/upload-button";
import { WebCameraViewModal } from "@/screens/upload-images/components/web-camera-view-modal";
import { useUploadImagesPageStore } from "@/screens/upload-images/store/upload-images-page-store";

export default function UploadImagesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const setShowCameraModal = useUploadImagesPageStore((state) => state.setShowCameraModal);

  const onUploadComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <WebCameraViewModal onComplete={onUploadComplete} />
      <View className="flex-1">
        <View className="flex-1 bg-white text-typography-950">
          <VStack className="flex-1">
            <HStack className="items-center justify-end gap-2 p-5">
              <TakePictureButton
                onComplete={onUploadComplete}
                onPress={() => setShowCameraModal(true)}
              />
              <UploadButton onComplete={onUploadComplete} />
            </HStack>

            <Box className="flex-1 overflow-hidden">
              <ScrollView className="flex-1">
                <ImagesGrid key={refreshKey} />
              </ScrollView>
            </Box>
          </VStack>
        </View>
      </View>
    </>
  );
}
