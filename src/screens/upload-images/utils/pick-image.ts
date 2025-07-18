import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "videos"],
    allowsMultipleSelection: true,
    base64: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  }
};

export const pickImageFromCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") return;
  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ["images"],
    base64: true,
    quality: 1,
  };
  const result = await ImagePicker.launchCameraAsync(options);

  if (!result.canceled) {
    return result.assets;
  }
};
