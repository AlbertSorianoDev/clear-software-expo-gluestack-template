import { useWindowDimensions } from "react-native";

export const useIsMobile = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return isMobile;
};
