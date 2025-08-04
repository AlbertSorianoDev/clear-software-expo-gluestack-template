import { router } from "expo-router";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { useSubmitForm } from "@/data/forms/hooks/use-submit-form";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Center } from "@/screens/components/ui/center";
import { HStack } from "@/screens/components/ui/hstack";
import { Spinner } from "@/screens/components/ui/spinner";

export const SubmitSection = () => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission, isLoading: isFormSubmissionLoading } = useGetFormSubmission(
    submissionId ?? 0,
  );
  const { mutateAsync: submitForm } = useSubmitForm();
  if (isFormSubmissionLoading)
    return (
      <Box className="flex-1 items-center justify-center">
        <Center>
          <Spinner size={"large"} />
        </Center>
      </Box>
    );

  return (
    !formSubmission?.isSubmitted && (
      <HStack className="items-center justify-end px-2">
        <Button
          onPress={async () => {
            await submitForm({ formSubmissionId: submissionId ?? 0 });
            router.navigate("/form-builder");
          }}
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </HStack>
    )
  );
};
