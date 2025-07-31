import { useMemo } from "react";

import { FormCard } from "../form-card";

import { useGetForms } from "@/data/forms/hooks/use-get-forms";
import { Box } from "@/screens/components/ui/box";
import { Spinner } from "@/screens/components/ui/spinner";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const PublishedTab = ({ published = false }: { published?: boolean }) => {
  const { data: forms, isLoading } = useGetForms();

  const formsFiltered = useMemo(
    () => forms?.filter((form) => form.isPublished == published),
    [forms, published],
  );

  if (isLoading) {
    return (
      <Box className="h-full justify-center bg-white">
        <Spinner size="large" color="rgb(var(--color-primary-600))" />
      </Box>
    );
  }

  return (
    <VStack className="h-full w-full max-w-screen-md bg-white p-4" space="lg">
      {(formsFiltered?.length ?? 0 > 0) ? (
        formsFiltered?.map((form, index) => (
          <FormCard
            key={index}
            id={form.id}
            title={form.title}
            description={form.description}
            isPublished={form.isPublished}
          />
        ))
      ) : (
        <Box className="h-full w-full items-center justify-center">
          <Text className="text-lg text-typography-700">
            No {published ? "published" : "unpublished"} forms.
          </Text>
        </Box>
      )}
    </VStack>
  );
};
