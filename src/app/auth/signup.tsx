import AntDesign from "@expo/vector-icons/AntDesign";
import clsx from "clsx";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

import { AuthEmailInput } from "@/components/auth/auth-email-input";
import { AuthPasswordChecklistInput } from "@/components/auth/auth-password-check-list-input";
import { AuthSimplePasswordInput } from "@/components/auth/auth-simple-password-input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, CheckIcon, Icon } from "@/components/ui/icon";
import { LinkText } from "@/components/ui/link";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { SignUpSchema } from "@/schemas/auth/signup-schema";
import { useSignUpStore } from "@/store/auth/signup-store";

export default function SignUp() {
  const {
    email,
    password,
    confirmPassword,
    acceptTerms,
    showPassword,
    showConfirmPassword,
    passwordTouched,
    errors,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    setAcceptTerms,
    passwordWasTouched,
    setErrors,
    reset,
  } = useSignUpStore();

  const toast = useToast();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handlePasswordChange = (text: string) => {
    const PasswordSchema = SignUpSchema.innerType().pick({ password: true });

    const result = PasswordSchema.safeParse({ password: text });

    setErrors({
      ...errors,
      password: result.success ? undefined : result.error.flatten().fieldErrors.password,
    });
  };

  const handleSubmit = () => {
    const result = SignUpSchema.safeParse({ email, password, confirmPassword, acceptTerms });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password,
        confirmPassword: fieldErrors.confirmPassword?.[0],
        acceptTerms: fieldErrors.acceptTerms?.[0],
      });
      return;
    }

    toast.show({
      placement: "bottom right",
      render: ({ id }) => (
        <Toast nativeID={id} action="success">
          <ToastTitle>Account created</ToastTitle>
        </Toast>
      ),
    });

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
              router.back();
            }}
          >
            <Icon as={ArrowLeftIcon} className="stroke-background-800 md:hidden" size="xl" />
          </Pressable>
          <VStack>
            <Heading className="md:text-center" size="3xl">
              Sign up
            </Heading>
            <Text>Sign up and start using gluestack</Text>
          </VStack>
        </VStack>
        <VStack className="gap-y-4">
          <AuthEmailInput email={email} setEmail={setEmail} error={errors.email} />

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

          <Checkbox
            size="sm"
            value="acceptTerms"
            isChecked={acceptTerms}
            onChange={() => {
              setAcceptTerms(!acceptTerms);
            }}
          >
            <CheckboxIndicator className={clsx(errors.acceptTerms && "border-red-500")}>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className={clsx(errors.acceptTerms && "text-red-500")}>
              I accept the Terms of Use & Privacy Policy
            </CheckboxLabel>
          </Checkbox>
        </VStack>

        <VStack className="my-7 w-full" space="lg">
          <Button className="w-full" onPress={handleSubmit}>
            <ButtonText className="font-medium">Sign up</ButtonText>
          </Button>

          <HStack className="my-1 w-full items-center space-x-4">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="text-sm text-gray-500">Other signup options</Text>
            <View className="flex-1 border-t border-gray-300" />
          </HStack>

          <Button variant="outline" className="w-full gap-1" onPress={() => {}}>
            <ButtonText className="font-medium">Continue with Google</ButtonText>
            <ButtonIcon
              as={() => (
                <AntDesign name="google" size={16} className="text-black dark:text-white" />
              )}
            />
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text size="md">Already have an account?</Text>
          <Link href="/auth/signin">
            <LinkText className="font-medium text-primary-700" size="md">
              Login
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
