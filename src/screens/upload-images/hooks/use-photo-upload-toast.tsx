// hooks/use-photo-upload-toast.ts
import { CloudUpload } from "lucide-react-native";
import { ReactNode, useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";

import { HStack } from "@/screens/components/ui/hstack";
import { CloseIcon, Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { Toast, ToastDescription, useToast } from "@/screens/components/ui/toast";

export function PhotoUploadToastManager({ isUploading }: { isUploading?: boolean }) {
  const toast = useToast();
  const toastIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (isUploading === undefined) return;

    if (isUploading) {
      const id = toast.show({
        duration: null,
        placement: "bottom right",
        render: ({ id }) => (
          <HorizontalToast id={id} closeFn={toast.close}>
            <>
              <ActivityIndicator className="h-6 w-6" color={colors.gray[300]} />

              <ToastDescription className="flex-1 font-semibold" size="md">
                Uploading Photo
              </ToastDescription>
            </>
          </HorizontalToast>
        ),
      });
      toastIdRef.current = id;
    } else {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
        toastIdRef.current = null;
      }

      toast.show({
        duration: 3000,
        placement: "bottom right",
        render: ({ id }) => (
          <HorizontalToast id={id} closeFn={toast.close}>
            <>
              <Icon as={CloudUpload} className="text-success-400" />
              <ToastDescription className="flex-1 font-semibold" size="md">
                Photo Uploaded
              </ToastDescription>
            </>
          </HorizontalToast>
        ),
      });
    }
  }, [isUploading]);
  return null;
}

const HorizontalToast = ({
  id,
  children,
  closeFn,
}: {
  id: string;
  children: ReactNode;
  closeFn: (id: string) => void;
}) => {
  return (
    <Toast
      nativeID={"toast-" + id}
      action="success"
      variant="outline"
      className="mb-4 mr-4 py-3 pl-4 pr-2 md:w-[384px]"
    >
      <HStack className="items-center gap-2">
        {children}
        <Pressable onPress={() => closeFn(id)}>
          <Icon as={CloseIcon} className="stroke-background-500" size="xs" />
        </Pressable>
      </HStack>
    </Toast>
  );
};
