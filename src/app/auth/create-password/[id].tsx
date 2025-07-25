import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { validate } from "uuid";

import { AuthPasswordChecklistInput } from "@/screens/auth/components/auth-password-check-list-input";
import { AuthSimplePasswordInput } from "@/screens/auth/components/auth-simple-password-input";
import { CreatePasswordSchema } from "@/screens/auth/schemas/create-password-schema";
import { useCreatePasswordStore } from "@/screens/auth/store/create-password-store";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { ArrowLeftIcon, Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/screens/components/ui/toast";
import { VStack } from "@/screens/components/ui/vstack";

export default function CreatePassword() {
  const { id } = useGlobalSearchParams();

  useFocusEffect(
    useCallback(() => {
      if (!id || !validate(id)) {
        router.replace("/auth/signin");
      }
    }, [id]),
  );

  const {
    password,
    confirmPassword,
    errors,
    showPassword,
    showConfirmPassword,
    passwordTouched,
    passwordWasTouched,
    setPassword,
    setConfirmPassword,
    setErrors,
    toggleShowPassword,
    toggleShowConfirmPassword,
    reset,
  } = useCreatePasswordStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const toast = useToast();

  const passwordChangedToast = () =>
    toast.show({
      placement: "bottom right",
      render: ({ id }) => (
        <Toast nativeID={id} action="success">
          <ToastTitle>Password changed</ToastTitle>
        </Toast>
      ),
    });

  const handlePasswordChange = (text: string) => {
    const PasswordSchema = CreatePasswordSchema.innerType().pick({ password: true });

    const result = PasswordSchema.safeParse({ password: text });

    setErrors({
      ...errors,
      password: result.success ? undefined : result.error.flatten().fieldErrors.password,
    });
  };

  const handleSubmit = async () => {
    const result = CreatePasswordSchema.safeParse({ password, confirmPassword });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        password: fieldErrors.password,
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    passwordChangedToast();
    reset();
  };

  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
    >
      <VStack className="mx-auto w-full max-w-[440px]" space="md">
        <VStack className="md:items-center" space="md">
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.navigate("/");
              }
            }}
          >
            <Icon as={ArrowLeftIcon} className="stroke-background-800 md:hidden" size="xl" />
          </Pressable>
          <VStack className="gap-[10px]">
            <Heading className="md:text-center" size="3xl">
              Create new password
            </Heading>
            <Text className="md:text-center">
              Your new password must be different from previously used passwords.
            </Text>
          </VStack>
        </VStack>

        <VStack className="w-full">
          <VStack space="xl" className="w-full">
            <AuthPasswordChecklistInput
              placeholder="Password"
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              passwordTouched={passwordTouched}
              passwordWasTouched={passwordWasTouched}
              handlePasswordChange={handlePasswordChange}
              errors={errors.password}
              checklist={[
                { text: "Must be at least 8 characters in length", errorKey: "length" },
                { text: "One uppercase character", errorKey: "uppercase" },
                { text: "One lowercase character", errorKey: "lowercase" },
                { text: "One number", errorKey: "number" },
                { text: "One special character", errorKey: "special" },
              ]}
            />

            <AuthSimplePasswordInput
              placeholder="Confirm Password"
              password={confirmPassword}
              setPassword={setConfirmPassword}
              showPassword={showConfirmPassword}
              toggleShowPassword={toggleShowConfirmPassword}
              error={errors.confirmPassword}
            />
          </VStack>

          <VStack className="mt-7 w-full">
            <Button className="w-full" onPress={handleSubmit}>
              <ButtonText className="font-medium">Update password</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
