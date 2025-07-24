import { ChevronDownIcon } from "lucide-react-native";
import { useState } from "react";

import { Box } from "@/screens/components/ui/box";
import { HStack } from "@/screens/components/ui/hstack";
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
import { Switch } from "@/screens/components/ui/switch";
import { Text } from "@/screens/components/ui/text";

export const EditFileUploadQuestion = () => {
  const [showFileTypes, setShowFileTypes] = useState(false);
  const [maxNumberOfFiles, setMaxNumberOfFiles] = useState(0);
  // const [maxFileSize, setMaxFileSize] = useState(0);

  return (
    <Box className="w-full flex-col gap-2 md:max-w-[50%]">
      <HStack space="md" className="items-center justify-between">
        <Text className="flex-1">Allow only specific file types</Text>
        <Switch value={showFileTypes} onToggle={setShowFileTypes} />
      </HStack>
      <HStack space="md" className="items-center justify-between">
        <Text className="flex-1">Maximum number of files</Text>
        <Select
          selectedValue={maxNumberOfFiles.toString()}
          onValueChange={(e) => setMaxNumberOfFiles(parseInt(e))}
        >
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
              {Array.from({ length: 3 }).map((_, i) => (
                <SelectItem label={`${(i + 1) * 5}`} value={`${i}`} key={i} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
      {/* <HStack space="md" className="items-center justify-between">
        <Text className="flex-1">Maximum file size</Text>
        <Select
          selectedValue={maxFileSize.toString()}
          onValueChange={(e) => setMaxFileSize(parseInt(e))}
        >
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
              {Array.from({ length: 3 }).map((_, i) => (
                <SelectItem label={`${(i + 1) * 5}`} value={`${i}`} key={i} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select> */}
      {/* </HStack> */}
    </Box>
  );
};
