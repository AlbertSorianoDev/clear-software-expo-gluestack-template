import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Clock } from "lucide-react-native";
import { useState } from "react";
import { Platform } from "react-native";

import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const TimeQuestion = () => {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeNative = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const onChangeWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hour, minute] = event.target.value.split(":").map(Number);
    const updatedTime = new Date(time);
    updatedTime.setHours(hour);
    updatedTime.setMinutes(minute);
    updatedTime.setSeconds(0);
    setTime(updatedTime);
  };

  const formattedTimeValue = `${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes(),
  ).padStart(2, "0")}`;

  if (Platform.OS === "web") {
    return (
      <div>
        <input
          type="time"
          id="appointment"
          name="appointment"
          className="px-2 text-typography-950"
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
          value={format(time.toISOString(), "HH:mm a", "en")}
        />
        <Pressable onPress={() => setShowTimePicker(true)} className="pr-4">
          <InputIcon as={Clock} />
        </Pressable>
      </Input>

      {showTimePicker && (
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
