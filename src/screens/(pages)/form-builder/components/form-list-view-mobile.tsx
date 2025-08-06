import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Sortable, SortableRenderItemProps } from "react-native-reanimated-dnd";

import { EditQuestionWrapper } from "../edit/components/edit-form/edit-questions/edit-question-wrapper";
import { RenderEditQuestion } from "../edit/components/edit-form/edit-questions/render-question";
import { FormSectionWrapper } from "../edit/components/form-section-wrapper";
import { useEditFormBuilderPageStore } from "../edit/store/edit-form-builder-page-store";
import { SortableQuestionItemMobile } from "./sortable-question-item.mobile";

import { useGetFormsId } from "@/data/forms/hooks/use-get-forms-id";
import { FileTypeEnum } from "@/data/forms/types/enums";
import { FormField } from "@/data/forms/types/form-field";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const FormListViewMobile = () => {
  const { id: urlFormId } = useLocalSearchParams<{ id?: string }>();

  const { data: form } = useGetFormsId(urlFormId ? Number(urlFormId) : 0);

  const renderItem = useCallback(
    (props: SortableRenderItemProps<FormField>) => <SortableQuestionItemMobile {...props} />,
    [],
  );

  const mobileSortableMode = useEditFormBuilderPageStore((state) => state.mobileSortableMode);

  if (mobileSortableMode) {
    return (
      <GestureHandlerRootView className="flex-1">
        <View className="flex-1">
          <View className="mb-2 flex-1 bg-black">
            <Sortable
              data={form?.fields ?? []}
              renderItem={renderItem}
              itemHeight={80}
              style={{ flex: 1, backgroundColor: "rgb(242, 241, 241)" }}
              itemKeyExtractor={(item, _) => item.id}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    );
  } else {
    return (
      <VStack space="lg">
        {form?.fields?.map((question) => (
          <FormSectionWrapper id={question.id} key={question.id}>
            {(isSelected) =>
              isSelected ? (
                <EditQuestionWrapper
                  id={question.id}
                  title={question.title}
                  description={question.description ?? ""}
                  type={question.inputType}
                  isRequired={question.isRequired}
                  order={question.order}
                >
                  <RenderEditQuestion
                    type={question.inputType}
                    options={question.options ? question.options : []}
                    slider={question.slider ? question.slider : { min: 0, max: 100, step: 1 }}
                    file={
                      question.file ? question.file : { fileType: FileTypeEnum.any, filesLimit: 1 }
                    }
                  />
                </EditQuestionWrapper>
              ) : (
                <VStack space="sm" className="p-5">
                  <Heading size="md">{question.title}</Heading>
                  <Text size="md">{question.description}</Text>
                  <RenderEditQuestion
                    type={question.inputType}
                    options={question.options ? question.options : []}
                    slider={question.slider ? question.slider : { min: 0, max: 100, step: 1 }}
                    file={
                      question.file ? question.file : { fileType: FileTypeEnum.any, filesLimit: 1 }
                    }
                  />
                </VStack>
              )
            }
          </FormSectionWrapper>
        ))}
      </VStack>
    );
  }
};
