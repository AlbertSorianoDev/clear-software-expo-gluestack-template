import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { HStack } from "@/screens/components/ui/hstack";
import { Input, InputField } from "@/screens/components/ui/input";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/screens/components/ui/slider";
import { Text } from "@/screens/components/ui/text";

export const SliderQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();
  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, isLoading, slider } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [sliderValue, setSliderValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    // if (fieldSubmission?.numericResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.numericResponse) {
      setSliderValue(fieldSubmission.numericResponse.number);
    }
  }, [fieldSubmission?.numericResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  const handleChangeInput = (text: string) => {
    const numeric = parseInt(text);
    if (!isNaN(numeric)) setSliderValue(numeric);
  };

  const handleEndEditing = async () => {
    const min = slider?.min ?? 0;
    const max = slider?.max ?? 1;

    if (!sliderValue) return;

    if (formSubmission?.isSubmitted) return;

    if (isNaN(sliderValue) || sliderValue < min || sliderValue > max) {
      setSliderValue(fieldSubmission?.numericResponse?.number);
      return;
    }

    if (!fieldSubmission?.numericResponse) {
      await postFormFieldResponse({
        formSubmissionId: submissionId ?? 0,
        body: { formFieldId: id, numericAnswer: sliderValue },
      });
    } else if (fieldSubmission.numericResponse.number !== sliderValue) {
      await updateFormFieldResponse({
        fieldResponseId: fieldSubmission.id ?? 0,
        body: { numericAnswer: sliderValue },
      });
    }
  };

  return (
    <HStack className="items-center gap-5 md:w-2/3">
      <HStack className="flex-1 items-center gap-4">
        <Text>{slider?.min}</Text>
        <Slider
          // key={optionKey}
          className="flex-1"
          onChange={setSliderValue}
          onChangeEnd={handleEndEditing}
          isReadOnly={formSubmission?.isSubmitted}
          minValue={slider?.min}
          maxValue={slider?.max}
          value={sliderValue}
          step={slider?.step}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>{slider?.max}</Text>
      </HStack>
      <Input size="sm">
        <InputField
          value={sliderValue?.toString()}
          keyboardType="numeric"
          className="max-w-[50px] text-center"
          onChangeText={handleChangeInput}
          onEndEditing={handleEndEditing}
        />
      </Input>
    </HStack>
  );
};
