import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

interface InputErrorMessageProps {
  className?: string;
  error?: string;
}

export function InputErrorMessage({ error, className }: InputErrorMessageProps) {
  return (
    <Box className={className}>
      {typeof error === "string" && error.trim() !== "" && (
        <HStack className="gap-x-2">
          <Icon as={AlertCircleIcon} className="text-red-500" />
          <Text className="text-sm text-red-500">{String(error)}</Text>
        </HStack>
      )}
    </Box>
  );
}
