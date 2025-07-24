import { ChevronDownIcon } from "lucide-react-native";
import { useState } from "react";

import { HStack } from "@/screens/components/ui/hstack";
import { Input, InputField } from "@/screens/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/screens/components/ui/select";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const EditLinearScaleQuestion = () => {
  const [startScaleValue, setStartScaleValue] = useState("0");
  const [endScaleValue, setEndScaleValue] = useState("0");
  return (
    <VStack space="md">
      <HStack space="md" className="items-center">
        <Select selectedValue={startScaleValue} onValueChange={setStartScaleValue}>
          <SelectTrigger variant="outline" size="sm" className="w-16">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {Array.from({ length: 2 }).map((_, i) => (
                <SelectItem label={`${i}`} value={`${i}`} key={i} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        <Text>to</Text>
        <Select selectedValue={endScaleValue} onValueChange={setEndScaleValue}>
          <SelectTrigger variant="outline" size="sm" className="w-16">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {Array.from({ length: 9 }).map((_, i) => (
                <SelectItem label={`${i + 2}`} value={`${i}`} key={i} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>

      <HStack className="items-center" space="md">
        <Text>{parseInt(startScaleValue) + 1}</Text>
        <Input variant="underlined">
          <InputField />
        </Input>
      </HStack>

      <HStack className="items-center" space="md">
        <Text>{parseInt(endScaleValue) + 2}</Text>
        <Input variant="underlined">
          <InputField />
        </Input>
      </HStack>
    </VStack>
  );
};
