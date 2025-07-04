import "@/global.css";

import OpenSansFont from "@assets/fonts/OpenSans-Regular.ttf";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { GluestackUIProvider } from "@/screens/components/ui/gluestack-ui-provider";

void SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OpenSans: OpenSansFont,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <LayoutNav />;
}

function LayoutNav() {
  const colorScheme = useColorScheme();

  return (
    //  (colorScheme ?? "light") as "light" | "dark"}
    <GluestackUIProvider mode={"light"}>
      {/* colorScheme === "dark" ? DarkTheme : DefaultTheme */}
      <ThemeProvider value={DefaultTheme}>
        {/* colorScheme === "dark" ? "light" : "dark" */}
        <StatusBar style={"light"} />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
