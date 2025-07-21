import { CameraView } from "expo-camera";
import { Camera } from "lucide-react-native";
import { forwardRef } from "react";
import { View } from "react-native";

import { Box } from "@/screens/components/ui/box";
import { Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";

type WebCameraViewProps = {
  onTakePicture: () => void;
};

export const WebCameraView = forwardRef<CameraView, WebCameraViewProps>(
  ({ onTakePicture }, ref) => {
    return (
      <CameraView ref={ref}>
        <View className="absolute bottom-8 left-0 flex w-full items-center justify-center">
          <Pressable onPress={onTakePicture}>
            <Box className="rounded-full border-2 border-white p-4 hover:bg-white/20 active:bg-white/30">
              <Icon as={Camera} className="text-white" size="xl" />
            </Box>
          </Pressable>
        </View>
      </CameraView>
    );
  },
);
