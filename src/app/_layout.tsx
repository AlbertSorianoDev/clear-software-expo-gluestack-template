import "@/global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { GluestackUIProvider } from "@/screens/components/ui/gluestack-ui-provider";

void SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  const loaded = true;

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutNav />
    </QueryClientProvider>
  );
}

function LayoutNav() {
  // const colorScheme = useColorScheme();

  return (
    //  (colorScheme ?? "light") as "light" | "dark"}
    <GluestackUIProvider mode={"light"}>
      {/* colorScheme === "dark" ? DarkTheme : DefaultTheme */}
      <ThemeProvider value={DefaultTheme}>
        {/* colorScheme === "dark" ? "light" : "dark" */}
        <StatusBar style={"dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
