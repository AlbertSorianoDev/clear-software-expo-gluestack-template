import { CameraView } from "expo-camera";
import { X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Platform } from "react-native";

import { useUploadImage } from "../hooks/use-upload-images";
import { useUploadImagesPageStore } from "../store/upload-images-page-store";
import { PhotoPreview } from "./photo-preview";
import { WebCameraView } from "./web-camera-view";

import { Icon } from "@/screens/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/screens/components/ui/modal";
import { Pressable } from "@/screens/components/ui/pressable";

export const WebCameraViewModal = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<CameraView>(null);
  const { uploadImage, loading } = useUploadImage();
  const [photo, setPhoto] = useState<string | null>(null);

  const showCameraModal = useUploadImagesPageStore((state) => state.showCameraModal);
  const setShowCameraModal = useUploadImagesPageStore((state) => state.setShowCameraModal);

  const handlePress = async () => {
    const picture = await ref.current?.takePictureAsync({ base64: true });
    setPhoto(picture?.base64 || null);
  };

  const handleUpload = async () => {
    if (!photo) return;

    const mimeType = photo.split(";")[0].split(":")[1] || "image/jpeg";
    const base64 = photo.split(",")[1];
    const filename = `web-photo-${Date.now()}.jpg`;

    await uploadImage([{ fileName: filename, mimeType, base64 }]);
    console.log("first upload done");
    onComplete?.();
    setPhoto(null);
    setShowCameraModal(false);
  };

  return Platform.OS === "web" ? (
    <Modal
      isOpen={showCameraModal}
      onClose={() => setShowCameraModal(false)}
      size="full"
      className="md:p-20"
    >
      <ModalBackdrop />
      <ModalContent className="h-full">
        <ModalHeader className="flex items-center justify-end">
          <ModalCloseButton>
            <Pressable onPress={() => setShowCameraModal(false)}>
              <Icon as={X} className="text-black" size="xl" />
            </Pressable>
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody className="flex-1" contentContainerClassName="flex-1">
          {photo ? (
            <PhotoPreview
              photo={photo}
              onRetake={() => setPhoto(null)}
              onUpload={handleUpload}
              isUploadLoading={loading}
            />
          ) : (
            <WebCameraView ref={ref} onTakePicture={handlePress} />
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  ) : null;
};
