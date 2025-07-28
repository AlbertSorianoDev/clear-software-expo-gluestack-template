import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const FormPrincipalInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <VStack
      space="sm"
      className="rounded border border-t-8 border-b-typography-100 border-t-primary-600 bg-white p-5 text-typography-950"
    >
      <Heading size="xl">{title}</Heading>
      <Text>{description}</Text>
    </VStack>
  );
};
