import { Keyboard } from "react-native";

import { InputErrorMessage } from "@/components/custom/input-error-message";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

interface AuthSimplePasswordInputProps {
  placeholder?: string;
  password: string;
  setPassword: (text: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  error?: string;
}

export function AuthSimplePasswordInput({
  placeholder,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  error,
}: AuthSimplePasswordInputProps) {
  return (
    <VStack className="gap-y-1">
      <Input>
        <InputField
          placeholder={placeholder}
          className="text-sm"
          type={showPassword ? "text" : "password"}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          returnKeyType="done"
        />
        <InputSlot onPress={toggleShowPassword} className="pr-3">
          <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
        </InputSlot>
      </Input>
      <InputErrorMessage error={error} />
    </VStack>
  );
}
