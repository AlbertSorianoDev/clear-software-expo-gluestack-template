import { useEffect, useState } from "react";

import { useQuestionContext } from "../hooks/use-question-context";
import { findSelectInitialLabel } from "../utils/find-select-initial-label";

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
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const DropdownQuestion = ({ id }: { id: number }) => {
  const { submission, options, isLoading } = useQuestionContext(id);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (submission?.optionResponse?.fieldOptionIds.length) {
      setValue(submission.optionResponse.fieldOptionIds[0].toString());
    }
  }, [submission?.optionResponse]);

  const initialLabel = findSelectInitialLabel(
    submission?.optionResponse?.fieldOptionIds?.[0],
    options,
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md" className="md:max-w-[50%]">
      <Select
        selectedValue={value}
        onValueChange={setValue}
        {...(initialLabel ? { initialLabel } : {})}
      >
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
            {options
              ?.sort((a, b) => a.order - b.order)
              .map((option, index) => (
                <SelectItem key={index} value={option.id.toString()} label={option.label} />
              ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  );
};
