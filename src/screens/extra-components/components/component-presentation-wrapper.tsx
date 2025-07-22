import { ReactNode } from "react";

import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { VStack } from "@/screens/components/ui/vstack";

export const ComponentPresentationWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <VStack space="md" className="shadow-xs rounded-md bg-white p-4">
      <Heading>{title}</Heading>
      <Box className="px-2">{children}</Box>
    </VStack>
  );
};
