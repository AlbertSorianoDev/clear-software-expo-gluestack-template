import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import clsx from "clsx";
import { Clock } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const TimeQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [time, setTime] = useState<Date | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.numericResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.numericResponse?.number) {
      const dateFromNumber = new Date(fieldSubmission.numericResponse.number);
      if (!isNaN(dateFromNumber.getTime())) {
        setTime(dateFromNumber);
      } else {
        setTime(undefined);
      }
    } else if (!fieldSubmission?.numericResponse?.number) {
      setTime(undefined);
    }
  }, [fieldSubmission?.numericResponse]);

  const onChangeNative = async (_event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      if (!fieldSubmission?.numericResponse) {
        await postFormFieldResponse({
          formSubmissionId: submissionId ?? 0,
          body: { formFieldId: id, numericAnswer: selectedTime?.getTime() },
        });
      } else {
        await updateFormFieldResponse({
          fieldResponseId: fieldSubmission.id ?? 0,
          body: { numericAnswer: selectedTime?.getTime() },
        });
      }
    }
  };

  const onChangeWeb = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    if (!selectedTime) {
      setTime(undefined);
      return;
    }
    const [hour, minute] = selectedTime.split(":").map(Number);
    const updatedTime = time ? new Date(time) : new Date();
    updatedTime.setHours(hour);
    updatedTime.setMinutes(minute);
    updatedTime.setSeconds(0);
    updatedTime.setMilliseconds(0);
    setTime(updatedTime);
    if (!fieldSubmission?.numericResponse) {
      await postFormFieldResponse({
        formSubmissionId: submissionId ?? 0,
        body: { formFieldId: id, numericAnswer: updatedTime?.getTime() },
      });
    } else {
      await updateFormFieldResponse({
        fieldResponseId: fieldSubmission.id ?? 0,
        body: { numericAnswer: updatedTime?.getTime() },
      });
    }
  };

  const formattedTimeValue = time ? format(time.toISOString(), "HH:mm", "en") : "";

  if (isLoading) return <></>;

  if (Platform.OS === "web") {
    return (
      <div>
        <input
          key={optionKey}
          type="time"
          className={clsx(
            "px-2",
            { "text-typography-950": formattedTimeValue != "" },
            { "text-typography-600": formattedTimeValue == "" },
          )}
          value={formattedTimeValue}
          onChange={onChangeWeb}
          readOnly={formSubmission?.isSubmitted}
        />
      </div>
    );
  }

  return (
    <>
      <Input className="w-fit" key={optionKey}>
        <InputField
          placeholder="Hour:Minute"
          className="w-fit"
          readOnly
          value={time ? format(time.toISOString(), "hh:mm a", "en") : ""}
        />
        <Pressable onPress={() => setShowTimePicker(true)} className="pr-4">
          <InputIcon as={Clock} />
        </Pressable>
      </Input>

      {showTimePicker && time && !formSubmission?.isSubmitted && (
        <DateTimePicker
          testID="timeTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          onChange={onChangeNative}
        />
      )}
    </>
  );
};
