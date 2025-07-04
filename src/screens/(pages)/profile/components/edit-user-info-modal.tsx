import image from "@assets/profile/image.png";
import image2 from "@assets/profile/image2.png";
import { ChevronDownIcon, ImagePlus, SquarePen } from "lucide-react-native";
import { useRef } from "react";

import { EditUserInfoSchema } from "../schemas/edit-user-info-schema";

import { useEditUserInfoStore } from "@/screens/(pages)/profile/store/edit-user-info-store";
import { InputErrorMessage } from "@/screens/components/custom/input-error-message";
import { Avatar, AvatarBadge, AvatarImage } from "@/screens/components/ui/avatar";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Center } from "@/screens/components/ui/center";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { CloseCircleIcon, Icon } from "@/screens/components/ui/icon";
import { Image } from "@/screens/components/ui/image";
import { Input, InputField } from "@/screens/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/screens/components/ui/modal";
import { Pressable } from "@/screens/components/ui/pressable";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/screens/components/ui/select";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export function EditUserInfoModal() {
  const ref = useRef(null);

  const {
    firstName,
    lastName,
    gender,
    phoneNumber,
    city,
    state,
    country,
    zipCode,
    errors,
    isModalVisible,
    setFirstName,
    setLastName,
    setGender,
    setPhoneNumber,
    setCity,
    setState,
    setCountry,
    setZipCode,
    setErrors,
    hideModal,
  } = useEditUserInfoStore();

  const onSubmit = () => {
    const result = EditUserInfoSchema.safeParse({
      firstName,
      lastName,
      gender,
      phoneNumber,
      city,
      state,
      country,
      zipCode,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        gender: fieldErrors.gender?.[0],
        phoneNumber: fieldErrors.phoneNumber?.[0],
        city: fieldErrors.city?.[0],
        state: fieldErrors.state?.[0],
        country: fieldErrors.country?.[0],
        zipCode: fieldErrors.zipCode?.[0],
      });
      return;
    }

    hideModal();
  };

  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => {
        hideModal();
      }}
      finalFocusRef={ref}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent className="h-fit max-h-[85%] max-w-[95%] md:w-fit">
        <ScrollView
          className="h-full w-full"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Box className={"h-[215px] w-full"}>
            <Image
              source={image2}
              className="h-full w-full rounded-tl-2xl rounded-tr-2xl"
              alt="Banner Image"
            />
            <Pressable className="absolute bottom-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-background-500">
              <Icon as={ImagePlus} className="w-2/3 text-white" />
            </Pressable>
          </Box>

          <ModalHeader className="absolute w-full">
            <Heading size="2xl" className="pl-4 pt-4 text-typography-800">
              Edit Profile
            </Heading>

            <ModalCloseButton className="mr-4">
              <Icon
                as={CloseCircleIcon}
                size="xl"
                className="stroke-background-400 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700"
              />
            </ModalCloseButton>
          </ModalHeader>

          <Center className="absolute top-16 w-full">
            <Avatar size="2xl">
              <AvatarImage source={image} />
              <AvatarBadge className="items-center justify-center bg-background-500">
                <Icon as={SquarePen} className="w-2/3 text-white" />
              </AvatarBadge>
            </Avatar>
          </Center>

          <ModalBody className="mt-6 px-6">
            <Box className="grid w-full gap-x-4 gap-y-6 md:grid-cols-2">
              <VStack className="gap-y-1">
                <Text>First Name</Text>
                <Input>
                  <InputField
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChangeText={setFirstName}
                    returnKeyType="done"
                  />
                </Input>
                <InputErrorMessage error={errors.firstName} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>Last Name</Text>
                <Input>
                  <InputField
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChangeText={setLastName}
                    returnKeyType="done"
                  />
                </Input>
                <InputErrorMessage error={errors.lastName} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>Gender</Text>
                <Select onValueChange={setGender} selectedValue={gender}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select" className="py-2" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Male" value="male" />
                      <SelectItem label="Female" value="female" />
                      <SelectItem label="Others" value="others" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <InputErrorMessage error={errors.gender} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>Phone Number</Text>
                <HStack className="gap-1">
                  <Select className="w-fit min-w-[30%] max-w-[35%]">
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="+1" className="py-2" />
                      <SelectIcon className="mr-1" as={ChevronDownIcon} />
                    </SelectTrigger>

                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="+593" value="93" />
                        <SelectItem label="+1" value="155" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <Input className="flex-1">
                    <InputField
                      placeholder="89867292632"
                      type="text"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="number-pad"
                      returnKeyType="done"
                    />
                  </Input>
                </HStack>
                <InputErrorMessage error={errors.phoneNumber} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>City</Text>
                <Select onValueChange={setCity} selectedValue={city}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select" className="py-2" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Cuenca" value="cuenca" />
                      <SelectItem label="Quito" value="quito" />
                      <SelectItem label="Other" value="other" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <InputErrorMessage error={errors.city} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>State</Text>
                <Select onValueChange={setState} selectedValue={state}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select" className="py-2" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Azuay" value="azuay" />
                      <SelectItem label="Pichincha" value="pichincha" />
                      <SelectItem label="Other" value="other" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <InputErrorMessage error={errors.state} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>Country</Text>
                <Select onValueChange={setCountry} selectedValue={country}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select" className="py-2" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Ecuador" value="ecuador" />
                      <SelectItem label="Other" value="other" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <InputErrorMessage error={errors.country} />
              </VStack>

              <VStack className="gap-y-1">
                <Text>Zip Code</Text>
                <Input>
                  <InputField
                    placeholder="Enter 6 - digit zip code"
                    type="text"
                    value={zipCode}
                    onChangeText={setZipCode}
                    returnKeyType="done"
                  />
                </Input>
                <InputErrorMessage error={errors.zipCode} />
              </VStack>

              <Button onPress={onSubmit} className="mt-2 p-2 md:col-span-2">
                <ButtonText>Save Changes</ButtonText>
              </Button>
            </Box>
          </ModalBody>
        </ScrollView>
      </ModalContent>
    </Modal>
  );
}
