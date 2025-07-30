import { useCallback, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Sortable, SortableItem, SortableRenderItemProps } from "react-native-reanimated-dnd";

import { EditQuestionWrapper } from "../edit/components/edit-form/edit-questions/edit-question-wrapper";
import { RenderEditQuestion } from "../edit/components/edit-form/edit-questions/render-question";
import { FormSectionWrapper } from "../edit/components/form-section-wrapper";
import { RenderPreviewQuestion } from "../edit/components/form-view/render-question-preview";
import { useEditFormBuilderPageStore } from "../edit/store/edit-form-builder-page-store";

import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export interface QuestionModel {
  id: number;
  title: string;
  description: string;
  type: FormInputTypeEnum;
}

const questions: QuestionModel[] = [
  {
    id: 1,
    title: "What's your name?",
    description: "Please enter your full name as it appears on official documents.",
    type: FormInputTypeEnum.shortText,
  },
  {
    id: 2,
    title: "Tell us about yourself",
    description: "You can include your background, interests, or anything you'd like to share.",
    type: FormInputTypeEnum.longText,
  },
  {
    id: 3,
    title: "What is your favorite season?",
    description: "Select one option that best represents your favorite time of the year.",
    type: FormInputTypeEnum.singleChoice,
  },
  {
    id: 4,
    title: "Which programming languages do you use?",
    description: "You can select more than one if applicable.",
    type: FormInputTypeEnum.multipleChoice,
  },
  {
    id: 5,
    title: "How satisfied are you with our service?",
    description: "1 being not satisfied at all, 5 being extremely satisfied.",
    type: FormInputTypeEnum.linearScale,
  },
  {
    id: 6,
    title: "Select your country",
    description: "Choose the country where you currently reside.",
    type: FormInputTypeEnum.dropdown,
  },

  {
    id: 7,
    title: "Upload your document",
    description:
      "Upload a relevant file such as your ID, certificate, or any other required document.",
    type: FormInputTypeEnum.fileUpload,
  },
  {
    id: 8,
    title: "Select your birhtday's date",
    description: "Select your birhtday's date",
    type: FormInputTypeEnum.date,
  },
  {
    id: 9,
    title: "Select a time",
    description: "Pick a specific time that fits your availability or schedule.",
    type: FormInputTypeEnum.time,
  },
];
export const FormListViewMobile = () => {
  const [items] = useState(questions);
  const setSelectedItemId = useEditFormBuilderPageStore((state) => state.setSelectedItemId);

  const renderItem = useCallback((props: SortableRenderItemProps<QuestionModel>) => {
    const { item, id, positions, lowerBound, autoScrollDirection, itemsCount, itemHeight } = props;

    return (
      <SortableItem
        key={id}
        id={id}
        data={item}
        positions={positions}
        lowerBound={lowerBound}
        autoScrollDirection={autoScrollDirection}
        itemsCount={itemsCount}
        itemHeight={itemHeight}
        // containerHeight={200}
        // style={{
        //   marginBottom: 12,
        // }}
        onMove={(currentId, from, to) => {
          setSelectedItemId(null);
          console.log(`Item ${currentId} moved from ${from} to ${to}`);
        }}
        onDragStart={(currentId, position) => {
          setSelectedItemId(null);
          console.log(`Item ${currentId} started dragging from position ${position}`);
        }}
        onDrop={(currentId, position) => {
          console.log(`Item ${currentId} dropped at position ${position}`);
        }}
      >
        <View className="w-full items-center bg-white">
          <SortableItem.Handle>
            <View className="flex h-10 w-full items-center justify-center border-typography-100 bg-white">
              <Text className="text-center" size="xl">
                ⋮⋮
              </Text>
            </View>
          </SortableItem.Handle>

          <FormSectionWrapper id={item.id}>
            {(isSelected) =>
              isSelected ? (
                <EditQuestionWrapper
                  title={item.title}
                  description={item.description}
                  type={item.type}
                >
                  <RenderEditQuestion type={item.type} />
                </EditQuestionWrapper>
              ) : (
                <VStack space="sm" className="p-5">
                  <Heading size="md">{item.title}</Heading>
                  <Text size="md">{item.description}</Text>
                  <RenderPreviewQuestion type={item.type} />
                </VStack>
              )
            }
          </FormSectionWrapper>
        </View>
      </SortableItem>
    );
  }, []);

  return (
    <VStack className="flex-1 bg-white">
      <Box className="flex-1 bg-white">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Box className="flex-1 bg-white">
            <Sortable
              data={items}
              renderItem={renderItem}
              itemHeight={212}
              style={{
                flex: 1,
              }}
            />
          </Box>
        </GestureHandlerRootView>
      </Box>
    </VStack>
  );
};
