import { useRef } from "react";
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from "react-native";

import { HStack } from "@/screens/components/ui/hstack";

interface OTPInputProps {
  value: string[];
  setValue: (val: string[]) => void;
  length?: number;
  onComplete?: (code: string) => void;
}

export function OTPInput({ value, setValue, length = 6, onComplete }: OTPInputProps) {
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const newValue = [...value];
    newValue[index] = text;
    setValue(newValue);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const joined = newValue.join("");
    if (joined.length === length && !joined.includes("")) {
      onComplete?.(joined);
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const half = Math.ceil(length / 2);
  const firstGroup = Array.from({ length: half }, (_, i) => i);
  const secondGroup = Array.from({ length: length - half }, (_, i) => i + half);

  return (
    <HStack className="flex-wrap justify-center gap-2">
      {[firstGroup, secondGroup].map((group, groupIndex) => (
        <HStack key={groupIndex} className="justify-center gap-x-1 md:gap-x-2">
          {group.map((index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              value={value[index] || ""}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="done"
              className="h-14 w-10 rounded-sm border-b-[2px] border-l-[1px] border-r-[1px] border-t-[1px] border-gray-300 text-center text-lg text-gray-900 focus:border-black focus:outline-none md:w-12 md:border-b-[1px]"
            />
          ))}
        </HStack>
      ))}
    </HStack>
  );
}
