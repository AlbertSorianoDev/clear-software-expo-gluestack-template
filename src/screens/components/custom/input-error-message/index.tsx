import { Box } from "@/screens/components/ui/box";
import { HStack } from "@/screens/components/ui/hstack";
import { AlertCircleIcon, Icon } from "@/screens/components/ui/icon";
import { Text } from "@/screens/components/ui/text";

interface InputErrorMessageProps {
  className?: string;
  error?: string;
}

export function InputErrorMessage({ error, className }: InputErrorMessageProps) {
  return (
    <Box className={className}>
      {typeof error === "string" && error.trim() !== "" && (
        <HStack className="items-center gap-x-2">
          <Icon size="2xs" as={AlertCircleIcon} className="text-red-500" />
          <Text size="xs" className="text-red-500">
            {String(error)}
          </Text>
        </HStack>
      )}
    </Box>
  );
}
