import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";

import { AuthEmailInput } from "@/components/auth/auth-email-input";
import { AuthSimplePasswordInput } from "@/components/auth/auth-simple-password-input";
import { ForgotPasswordModal } from "@/components/auth/forgot-password-modal";
import { LoginCodeModal } from "@/components/auth/login-code-modal";
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
import { SignInSchema } from "@/schemas/auth/signin-schema";
import { useSignInStore } from "@/store/auth/signin-store";

const USERS = [
  {
    email: "gabriel@gmail.com",
    password: "Gabriel@123",
  },
  {
    email: "tom@gmail.com",
    password: "Tom@123",
  },
  {
    email: "thomas@gmail.com",
    password: "Thomas@1234",
  },
];

export default function SignIn() {
  const {
    email,
    password,
    rememberMe,
    errors,
    showPassword,
    setEmail,
    setPassword,
    toggleShowPassword,
    setRememberMe,
    setErrors,
    reset,
    showLoginCodeModal,
    showForgotPasswordModal,
  } = useSignInStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Toast
  const toast = useToast();

  const successToast = () =>
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="success">
            <ToastTitle>Logged in successfully!</ToastTitle>
          </Toast>
        );
      },
    });

  const userNotFoundToast = () =>
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="error">
            <ToastTitle>Wrong email or password.</ToastTitle>
          </Toast>
        );
      },
    });

  const credentialsLogin = async () => {
    const result = SignInSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    const user = USERS.find((user) => user.email === email && user.password === password);

    if (!user) {
      userNotFoundToast();
      return;
    }

    successToast();
    reset();
  };

  return (
    <>
      <LoginCodeModal successToast={successToast} />
      <ForgotPasswordModal />
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
              <Icon as={ArrowLeftIcon} className="text-background-800 md:hidden" size="xl" />
            </Pressable>
            <VStack className="flex justify-center gap-[10px] text-center">
              <Heading className="text-center" size="3xl">
                Log in
              </Heading>
              <Text className="text-center">Log in to start using gluestack</Text>
            </VStack>
          </VStack>

          <VStack className="w-full gap-y-4">
            <AuthEmailInput email={email} setEmail={setEmail} error={errors.email} />

            <AuthSimplePasswordInput
              placeholder="Password"
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              error={errors.password}
            />

            <HStack className="w-full justify-between">
              <Checkbox
                size="sm"
                value="Remember me"
                isChecked={rememberMe}
                onChange={(set) => {
                  setRememberMe(set);
                }}
                aria-label="Remember me"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Remember me</CheckboxLabel>
              </Checkbox>

              <Pressable onPress={showForgotPasswordModal}>
                <LinkText className="font-base text-sm text-typography-600 group-hover/link:text-primary-600">
                  Forgot Password?
                </LinkText>
              </Pressable>
            </HStack>
          </VStack>

          <VStack className="my-7 w-full" space="lg">
            <Button className="w-full" onPress={() => credentialsLogin()}>
              <ButtonText className="font-medium">Log in</ButtonText>
            </Button>

            <HStack className="my-1 w-full items-center space-x-4">
              <View className="flex-1 border-t border-gray-300" />
              <Text className="text-sm text-gray-500">Other login options</Text>
              <View className="flex-1 border-t border-gray-300" />
            </HStack>

            <Button variant="outline" className="w-full gap-1" onPress={() => showLoginCodeModal()}>
              <ButtonText className="font-medium">Get login code</ButtonText>
              <ButtonIcon as={ShieldCheck} className="stroke-[3] text-primary-500" />
            </Button>
            <Button variant="outline" className="w-full gap-1" onPress={() => {}}>
              <ButtonText className="font-medium">Continue with Google</ButtonText>
              <ButtonIcon
                as={() => <AntDesign name="google" size={16} className="text-primary-500" />}
              />
            </Button>
          </VStack>

          <HStack className="self-center" space="sm">
            <Text size="md">Don't have an account?</Text>
            <Link href="/auth/signup">
              <LinkText
                className="font-base text-typography-950 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
                size="md"
              >
                Sign up
              </LinkText>
            </Link>
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
}
