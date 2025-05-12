import AntDesign from "@expo/vector-icons/AntDesign";
import clsx from "clsx";
import { Link, router } from "expo-router";
import { Keyboard, View } from "react-native";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
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
    setShowPassword,
    setShowConfirmPassword,
    setAcceptTerms,
    setPasswordTouched,
    setErrors,
    reset,
  } = useSignUpStore();

  const toast = useToast();

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
          <VStack className="gap-y-1">
            <Input>
              <InputField
                className="text-sm"
                placeholder="Email"
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
                <Icon as={AlertCircleIcon} className="text-red-500" />
                <Text className="text-sm text-error-500">{errors.email}</Text>
              </HStack>
            )}
          </VStack>

          <VStack className="gap-y-1">
            <Input>
              <InputField
                className="text-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordTouched) {
                    handlePasswordChange(text);
                  }
                }}
                onBlur={() => {
                  if (!passwordTouched) {
                    setPasswordTouched(true);
                    handlePasswordChange(password);
                  }
                }}
                returnKeyType="done"
              />
              <InputSlot
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                className="pr-3"
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>

            {[
              { text: "Must be at least 8 characters in length", errorKey: "length" },
              { text: "One uppercase character", errorKey: "uppercase" },
              { text: "One lowercase character", errorKey: "lowercase" },
              { text: "One number", errorKey: "number" },
              { text: "One special character", errorKey: "special" },
            ].map(({ text, errorKey }) => {
              const isError = errors.password?.find((error) => error.includes(errorKey));
              return (
                <HStack key={text} className="items-center gap-x-2">
                  <Icon
                    as={isError ? AlertCircleIcon : CheckCircleIcon}
                    className={clsx("text-base", isError ? "text-red-500" : "text-gray-500")}
                  />
                  <Text className={clsx("text-sm", isError ? "text-red-500" : "text-gray-500")}>
                    {text}
                  </Text>
                </HStack>
              );
            })}
          </VStack>

          <VStack className="gap-y-1">
            <Input>
              <InputField
                placeholder="Confirm Password"
                className="text-sm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                returnKeyType="done"
              />
              <InputSlot
                onPress={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="pr-3"
              >
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            {errors.confirmPassword && (
              <HStack className="gap-x-2">
                <Icon as={AlertCircleIcon} className="text-red-500" />
                <Text className="text-sm text-error-500">{errors.confirmPassword}</Text>
              </HStack>
            )}
          </VStack>

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
