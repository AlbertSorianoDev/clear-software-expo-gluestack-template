import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import clsx from "clsx";
import { Clock } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { useQuestionContext } from "../hooks/use-question-context";

import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const TimeQuestion = ({ id }: { id: number }) => {
  const { submission, isLoading } = useQuestionContext(id);

  // time puede ser undefined si no hay respuesta
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (!isLoading && submission?.numericResponse?.number) {
      const dateFromNumber = new Date(submission.numericResponse.number);
      if (!isNaN(dateFromNumber.getTime())) {
        setTime(dateFromNumber);
      } else {
        setTime(undefined);
      }
    } else if (!submission?.numericResponse?.number) {
      setTime(undefined);
    }
  }, [isLoading, submission]);

  const onChangeNative = (_event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const onChangeWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const formattedTimeValue = time ? format(time.toISOString(), "HH:mm", "en") : "";

  if (isLoading) return <></>;

  if (Platform.OS === "web") {
    return (
      <div>
        <input
          type="time"
          className={clsx(
            "px-2",
            { "text-typography-950": formattedTimeValue != "" },
            { "text-typography-600": formattedTimeValue == "" },
          )}
          value={formattedTimeValue}
          onChange={onChangeWeb}
        />
      </div>
    );
  }

  return (
    <>
      <Input className="w-fit">
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

      {showTimePicker && time && (
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
