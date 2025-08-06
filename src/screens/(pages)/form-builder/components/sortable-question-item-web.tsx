import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { EditQuestionWrapper } from "../edit/components/edit-form/edit-questions/edit-question-wrapper";
import { RenderEditQuestion } from "../edit/components/edit-form/edit-questions/render-question";
import { FormSectionWrapper } from "../edit/components/form-section-wrapper";
import { RenderPreviewQuestion } from "../edit/components/form-view/render-question-preview";

import { FileTypeEnum } from "@/data/forms/types/enums";
import { FormField } from "@/data/forms/types/form-field";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export function SortableQuestionItem({ question }: { question: FormField }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: question.id.toString(),
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, touchAction: "none" }} className="mb-4">
      <div
        {...attributes}
        {...listeners}
        className="flex w-full items-center justify-center border border-b-0 border-typography-100 bg-white"
      >
        <Text className="text-center">⋮⋮</Text>
      </div>

      <FormSectionWrapper id={question.id}>
        {(isSelected) =>
          isSelected ? (
            <EditQuestionWrapper
              id={question.id}
              title={question.title}
              description={question.description ?? ""}
              isRequired={question.isRequired}
              order={question.order}
              type={question.inputType}
            >
              <RenderEditQuestion
                type={question.inputType}
                options={question.options ? question.options : []}
                slider={question.slider ? question.slider : { min: 0, max: 100, step: 1 }}
                file={question.file ? question.file : { fileType: FileTypeEnum.any, filesLimit: 1 }}
              />
            </EditQuestionWrapper>
          ) : (
            <VStack space="sm" className="p-5">
              <Heading size="md">
                {question.title}
                {question.isRequired && <Text className="text-red-500">{" *"}</Text>}
              </Heading>
              <Text size="md">{question.description}</Text>
              <RenderPreviewQuestion
                type={question.inputType}
                options={question.options ? question.options : []}
                slider={question.slider ? question.slider : { min: 0, max: 100, step: 1 }}
                file={question.file ? question.file : { fileType: FileTypeEnum.any, filesLimit: 1 }}
              />
            </VStack>
          )
        }
      </FormSectionWrapper>
    </div>
  );
}
