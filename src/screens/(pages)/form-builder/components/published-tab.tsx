import { FormCard } from "../form-card";

import { VStack } from "@/screens/components/ui/vstack";

export const PublishedTab = ({ published = false }: { published?: boolean }) => {
  return (
    <VStack className="h-full w-full max-w-screen-md bg-white" space="lg">
      {Array.from({ length: 20 }).map((_, index) => (
        <FormCard
          key={index + 1}
          id={(index + 1).toString()}
          title="Commodo excepteur"
          description="Cillum officia veniam magna ad exercitation enim officia deserunt nisi quis id dolore deserunt."
          isPublished={published}
        />
      ))}
    </VStack>
  );
};
