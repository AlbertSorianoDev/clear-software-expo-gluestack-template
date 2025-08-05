import { ChevronDownIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";

import { useEditFormBuilderPageStore } from "../../../store/edit-form-builder-page-store";

import { FileTypeEnum } from "@/data/forms/types/enums";
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

export const EditFileUploadQuestion = ({
  fileType,
  filesLimit,
}: {
  fileType: FileTypeEnum;
  filesLimit: number;
}) => {
  const [showFileTypes, setShowFileTypes] = useState(fileType !== FileTypeEnum.any);

  const { file } = useEditFormBuilderPageStore((s) => s.field);
  const { setFile } = useEditFormBuilderPageStore((s) => s.setField);

  const didInitRef = useRef(false);

  useEffect(() => {
    if (!didInitRef.current) {
      setFile.setFileType(fileType);
      setFile.setFilesLimit(filesLimit);
      didInitRef.current = true;
    }
  }, [fileType, filesLimit, setFile]);

  return (
    <Box className="w-full flex-col gap-2 md:max-w-[50%]">
      <HStack space="md" className="items-center justify-between">
        <Text className="flex-1">Allow only specific file types</Text>
        <Switch
          value={showFileTypes}
          onToggle={() => {
            const newValue = !showFileTypes;
            setShowFileTypes(newValue);
            if (!newValue) {
              setFile.setFileType(FileTypeEnum.any);
            } else {
              setFile.setFileType(FileTypeEnum.image);
            }
          }}
        />
      </HStack>
      {showFileTypes && (
        <Select
          selectedValue={file?.fileType.toString()}
          onValueChange={(e) => setFile.setFileType(e as unknown as FileTypeEnum)}
        >
          <SelectTrigger variant="outline" size="sm" className="w-32">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {Object.values(FileTypeEnum).map((type) => (
                <SelectItem label={type} value={type.toString()} key={type} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      )}

      <HStack space="md" className="items-center justify-between">
        <Text className="flex-1">Maximum number of files</Text>
        <Select
          selectedValue={file?.filesLimit.toString()}
          onValueChange={(e) => setFile.setFilesLimit(parseInt(e))}
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
              {Array.from({ length: 10 }).map((_, i) => (
                <SelectItem label={`${i + 1}`} value={`${i + 1}`} key={i + 1} />
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
