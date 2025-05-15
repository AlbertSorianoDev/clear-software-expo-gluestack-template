import { AuthEmailInput } from "@/components/auth/auth-email-input";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { LinkText } from "@/components/ui/link";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { SignInSchema } from "@/schemas/auth/signin-schema";
import { useSignInStore } from "@/store/auth/signin-store";

export function ForgotPasswordModal() {
  const {
    isForgotPasswordModalVisible,
    email,
    setEmail,
    errors,
    setErrors,
    hideForgotPasswordModal,
  } = useSignInStore();

  const isMobile = useIsMobile();
  const toast = useToast();

  const successToast = () =>
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="success">
            <ToastTitle>Link sent to email.</ToastTitle>
          </Toast>
        );
      },
    });

  const sendLink = async () => {
    const result = SignInSchema.pick({ email: true }).safeParse({ email });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ email: fieldErrors.email?.[0] });
      return;
    }

    hideForgotPasswordModal();
    successToast();
  };

  return (
    <Modal
      isOpen={isForgotPasswordModalVisible}
      onClose={hideForgotPasswordModal}
      size={isMobile ? "lg" : "md"}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="flex-1 text-center">
            Forgot Password?
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md" className="text-gray-400" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="m-6">
          <VStack className="gap-y-2">
            <Text className="text-sm text-gray-500">
              Enter your email address to receive a verification code.
            </Text>
            <AuthEmailInput email={email} setEmail={setEmail} error={errors.email} />
          </VStack>
        </ModalBody>

        <ModalFooter className="flex-col justify-center">
          <Button onPress={sendLink}>
            <ButtonText>Send link</ButtonText>
          </Button>

          <Pressable onPress={hideForgotPasswordModal}>
            <LinkText className="text-sm font-medium text-primary-700">Back</LinkText>
          </Pressable>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
