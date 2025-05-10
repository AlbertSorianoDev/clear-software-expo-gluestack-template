import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Keyboard } from "react-native";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
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
    errors,
    showPassword,
    rememberMe,
    setEmail,
    setPassword,
    toggleShowPassword,
    setRememberMe,
    setErrors,
    reset,
  } = useSignInStore();

  const toast = useToast();

  // Expo Icons
  const GoogleIcon = () => <AntDesign name="google" size={16} />;

  const handleSubmit = () => {
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

      return;
    }

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
            <Icon as={ArrowLeftIcon} className="text-background-800 md:hidden" size="xl" />
          </Pressable>
          <VStack>
            <Heading className="md:text-center" size="3xl">
              Log in
            </Heading>
            <Text>Login to start using gluestack</Text>
          </VStack>
        </VStack>

        <VStack className="w-full gap-y-4">
          <VStack className="gap-y-1">
            <Input>
              <InputField
                placeholder="Enter email"
                type="text"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                returnKeyType="done"
              />
            </Input>
            {errors.email && (
              <HStack className="gap-x-2">
                <Icon as={AlertCircleIcon} className="text-error-500" />
                <Text className="text-sm text-error-500">{errors.email}</Text>
              </HStack>
            )}
          </VStack>

          <VStack className="gap-y-1">
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                returnKeyType="done"
              />
              <InputSlot onPress={() => toggleShowPassword()} className="pr-3">
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            {errors.password && (
              <HStack className="gap-x-2">
                <Icon as={AlertCircleIcon} className="text-error-500" />
                <Text className="text-sm text-error-500">{errors.password}</Text>
              </HStack>
            )}
          </VStack>

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

            <Link href="/auth/forgot-password">
              <LinkText className="text-sm font-medium text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>

        <VStack className="my-7 w-full" space="lg">
          <Button className="w-full" onPress={() => handleSubmit()}>
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>

          <Button variant="outline" className="w-full gap-1" onPress={() => {}}>
            <ButtonText className="font-medium">Continue with Google</ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/auth/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
