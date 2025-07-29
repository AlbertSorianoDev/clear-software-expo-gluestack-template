import { View } from "react-native";

import { InputTypeEnum } from "@/data/forms/types/form-field";
import { RenderQuestion } from "@/screens/(pages)/form-builder/(form)/components/render-question";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { useEditFormBuilderPageStore } from "@/screens/(pages)/form-builder/edit/store/edit-form-builder-page-store";
import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

const form = {
  title: "Form 1",
  description:
    "Ut sunt sit deserunt culpa ipsum nisi sit tempor proident mollit proident cupidatat. Fugiat amet qui labore mollit Lorem. Magna ipsum cillum ipsum ad culpa velit anim dolore quis culpa irure deserunt nostrud. Velit commodo proident aliquip amet nisi cillum exercitation laboris esse nulla. Pariatur cillum culpa incididunt eiusmod.",
};

const questions: { title: string; description: string; type: InputTypeEnum }[] = [
  {
    title: "What's your name?",
    description: "Please enter your full name as it appears on official documents.",
    type: InputTypeEnum.shortText,
  },
  {
    title: "Tell us about yourself",
    description: "You can include your background, interests, or anything you'd like to share.",
    type: InputTypeEnum.longText,
  },
  {
    title: "What is your favorite season?",
    description: "Select one option that best represents your favorite time of the year.",
    type: InputTypeEnum.singleChoice,
  },
  {
    title: "Which programming languages do you use?",
    description: "You can select more than one if applicable.",
    type: InputTypeEnum.multipleChoice,
  },
  {
    title: "How satisfied are you with our service?",
    description: "1 being not satisfied at all, 5 being extremely satisfied.",
    type: InputTypeEnum.linearScale,
  },
  {
    title: "Select your country",
    description: "Choose the country where you currently reside.",
    type: InputTypeEnum.dropdown,
  },

  {
    title: "Upload your document",
    description:
      "Upload a relevant file such as your ID, certificate, or any other required document.",
    type: InputTypeEnum.fileUpload,
  },
  {
    title: "Select your birhtday's date",
    description: "Select your birhtday's date",
    type: InputTypeEnum.date,
  },
  {
    title: "Select a time",
    description: "Pick a specific time that fits your availability or schedule.",
    type: InputTypeEnum.time,
  },
];

export default function FormAnswerPage() {
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);
  setSelectedItemId(null);

  return (
    <View className="flex-1">
      <ScrollView>
        <Box className="flex-1 items-center justify-center bg-background-100">
          <VStack className="w-full max-w-screen-md py-4" space="xl">
            <FormPrincipalInfo title={form.title} description={form.description} />

            <VStack className="w-full max-w-screen-md" space="md">
              {questions.map((question, index) => (
                <FormSectionWrapper key={index} id={index}>
                  {() => (
                    <VStack space="sm" className="p-5">
                      <Heading size="md">{question.title}</Heading>
                      <Text size="md">{question.description}</Text>
                      <RenderQuestion type={question.type} />
                    </VStack>
                  )}
                </FormSectionWrapper>
              ))}
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </View>
  );
}
