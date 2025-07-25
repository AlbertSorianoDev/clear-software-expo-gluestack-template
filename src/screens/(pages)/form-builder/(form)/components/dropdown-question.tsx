import { useState } from "react";

import { ChevronDownIcon } from "@/screens/components/ui/icon";
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
import { VStack } from "@/screens/components/ui/vstack";

const options: { id: number; label: string }[] = [
  { id: 1, label: "asdaffds" },
  { id: 2, label: "uykuljy" },
  { id: 3, label: "eigrhgrfn" },
];

export const DropdownQuestion = () => {
  const [value, setValue] = useState("");
  return (
    <VStack space="md" className="md:max-w-[50%]">
      <Select selectedValue={value} onValueChange={setValue}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.id.toString()} label={option.label} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  );
};
