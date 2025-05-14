// src/components/EmailInputField.tsx

import { Keyboard } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface AuthEmailInputProps {
  email: string;
  setEmail: (text: string) => void;
  error?: string;
}

export function AuthEmailInput({ email, setEmail, error }: AuthEmailInputProps) {
  return (
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
          onChangeText={setEmail}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="done"
        />
      </Input>
      {error && (
        <HStack className="gap-x-2">
          <Icon as={AlertCircleIcon} className="text-red-500" />
          <Text className="text-sm text-red-500">{error}</Text>
        </HStack>
      )}
    </VStack>
  );
}
