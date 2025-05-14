import clsx from "clsx";
import { useEffect, useState } from "react";

import { VStack } from "../ui/vstack";

import { AuthEmailInput } from "@/components/auth/auth-email-input";
import { OTPInput } from "@/components/custom/otp-input";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, CloseIcon, Icon } from "@/components/ui/icon";
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
import { useIsMobile } from "@/hooks/use-is-mobile";
import { SignInSchema } from "@/schemas/auth/signin-schema";
import { useSignInStore } from "@/store/auth/signin-store";

export function LoginCodeModal({ successToast }: { successToast: () => void }) {
  const otpLength = 6;
  const initialTime = 60;

  const {
    isLoginCodeModalVisible,
    email,
    setEmail,
    otp,
    setOtp,
    otpStep,
    setOtpStep,
    errors,
    setErrors,
    validateOtp,
    hideLoginCodeModal,
    reset,
  } = useSignInStore();

  const isMobile = useIsMobile();
  const toast = useToast();

  const [secondsLeft, setSecondsLeft] = useState(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [secondsLeft]);

  const wrongOtpToast = () =>
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="error">
            <ToastTitle>Wrong OTP code.</ToastTitle>
          </Toast>
        );
      },
    });

  const requestOtpCode = async () => {
    const result = SignInSchema.pick({ email: true }).safeParse({ email });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ email: fieldErrors.email?.[0] });
      return;
    }

    setOtpStep(1);
    setSecondsLeft(initialTime);
  };

  const otpCodeLogin = async () => {
    const isValid = validateOtp(otpLength);

    if (!isValid) return;

    if (otp.join("") !== "123456") {
      wrongOtpToast();
      return;
    }

    successToast();
    reset();
    hideLoginCodeModal();
  };

  const handleResend = () => {
    setSecondsLeft(initialTime);
  };

  return (
    <Modal
      isOpen={isLoginCodeModalVisible}
      onClose={hideLoginCodeModal}
      size={isMobile ? "lg" : "md"}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="flex-1 text-center">
            Get login code
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md" className="text-gray-400" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="m-6">
          {otpStep === 0 ? (
            <AuthEmailInput email={email} setEmail={setEmail} error={errors.email} />
          ) : (
            <VStack className="gap-y-1">
              <OTPInput value={otp} setValue={setOtp} length={otpLength} />
              {errors.otp && (
                <HStack className="justify-center gap-x-2">
                  <Icon as={AlertCircleIcon} className="text-red-500" />
                  <Text className="text-sm text-red-500">{errors.otp}</Text>
                </HStack>
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter className="flex-col justify-center">
          {otpStep === 0 ? (
            <Button onPress={requestOtpCode}>
              <ButtonText>Send code</ButtonText>
            </Button>
          ) : (
            <>
              <Pressable
                disabled={secondsLeft > 0}
                onPress={handleResend}
                className="mb-1 items-center"
              >
                <LinkText
                  className={clsx(
                    "text-sm font-medium",
                    secondsLeft > 0 ? "text-gray-400 no-underline" : "text-primary-700",
                  )}
                >
                  {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend code"}
                </LinkText>
              </Pressable>
              <Button onPress={otpCodeLogin}>
                <ButtonText>Log in</ButtonText>
              </Button>
            </>
          )}

          <Pressable
            onPress={
              otpStep === 0
                ? hideLoginCodeModal
                : () => {
                    setOtpStep(0);
                    setOtp([]);
                  }
            }
          >
            <LinkText className="text-sm font-medium text-primary-700">Back</LinkText>
          </Pressable>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
