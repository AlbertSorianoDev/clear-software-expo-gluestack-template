import clsx from "clsx";
import { Keyboard } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, CheckCircleIcon, EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface ChecklistItem {
  text: string;
  errorKey: string;
}

interface AuthPasswordChecklistInputProps {
  placeholder?: string;
  password: string;
  setPassword: (text: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  passwordTouched: boolean;
  passwordWasTouched: () => void;
  checklist: ChecklistItem[];
  errors: string[] | undefined;
  handlePasswordChange: (text: string) => void;
}

export function AuthPasswordChecklistInput({
  placeholder,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  passwordTouched,
  passwordWasTouched,
  checklist,
  errors,
  handlePasswordChange,
}: AuthPasswordChecklistInputProps) {
  return (
    <VStack className="gap-y-1">
      <Input>
        <InputField
          className="text-sm"
          placeholder={placeholder}
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
              passwordWasTouched();
              handlePasswordChange(password);
            }
          }}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <InputSlot onPress={toggleShowPassword} className="pr-3">
          <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
        </InputSlot>
      </Input>

      {checklist.map(({ text, errorKey }) => {
        const isError = errors?.some((e) => e.includes(errorKey));
        return (
          <HStack key={errorKey} className="items-center gap-x-2">
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
  );
}
