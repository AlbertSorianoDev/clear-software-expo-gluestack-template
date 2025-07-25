import { View } from "react-native";

import { RenderQuestion } from "@/screens/(pages)/form-builder/(form)/components/render-question";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

const form = {
  title: "Form 1",
  description:
    "Ut sunt sit deserunt culpa ipsum nisi sit tempor proident mollit proident cupidatat. Fugiat amet qui labore mollit Lorem. Magna ipsum cillum ipsum ad culpa velit anim dolore quis culpa irure deserunt nostrud. Velit commodo proident aliquip amet nisi cillum exercitation laboris esse nulla. Pariatur cillum culpa incididunt eiusmod.",
};

const questions: { title: string; description: string; type: FormInputTypeEnum }[] = [
  {
    title: "What's your name?",
    description: "Please enter your full name as it appears on official documents.",
    type: FormInputTypeEnum.shortText,
  },
  {
    title: "Tell us about yourself",
    description: "You can include your background, interests, or anything you'd like to share.",
    type: FormInputTypeEnum.longText,
  },
  {
    title: "What is your favorite season?",
    description: "Select one option that best represents your favorite time of the year.",
    type: FormInputTypeEnum.singleChoice,
  },
  {
    title: "Which programming languages do you use?",
    description: "You can select more than one if applicable.",
    type: FormInputTypeEnum.multipleChoice,
  },
  {
    title: "How satisfied are you with our service?",
    description: "1 being not satisfied at all, 5 being extremely satisfied.",
    type: FormInputTypeEnum.linearScale,
  },
  {
    title: "Select your country",
    description: "Choose the country where you currently reside.",
    type: FormInputTypeEnum.dropdown,
  },

  {
    title: "Upload your document",
    description:
      "Upload a relevant file such as your ID, certificate, or any other required document.",
    type: FormInputTypeEnum.fileUpload,
  },
  {
    title: "Select your birhtday's date",
    description: "Select your birhtday's date",
    type: FormInputTypeEnum.date,
  },
  {
    title: "Select a time",
    description: "Pick a specific time that fits your availability or schedule.",
    type: FormInputTypeEnum.time,
  },
];

export default function FormAnswerPage() {
  return (
    <>
      <View className="flex-1">
        <ScrollView>
          <Box className="flex-1 items-center justify-center bg-background-100">
            <VStack className="w-full max-w-screen-md py-4" space="xl">
              <FormPrincipalInfo title={form.title} description={form.description} />

              <VStack className="w-full max-w-screen-md" space="md">
                {questions.map((question, index) => (
                  <FormSectionWrapper key={index}>
                    {(_) => (
                      <VStack space="sm" className="p-5">
                        <Heading size="md">{question.title}</Heading>
                        <Text size="md">{question.description}</Text>
                        {RenderQuestion({ type: question.type })}
                        {/* {RenderEditQuestion(question.type)} */}
                      </VStack>
                    )}
                  </FormSectionWrapper>
                ))}
              </VStack>
            </VStack>
          </Box>
        </ScrollView>
      </View>
    </>
  );
}
