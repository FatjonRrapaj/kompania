import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
export { ErrorBoundary } from "expo-router";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/components/useColorScheme";
import "@/translations/translations";
import Storage from "@/constants/Storage";
import Toast from "react-native-toast-message";
import AuthStateChangeListener from "@/listeners/AuthStateChagesListener";
import useAuthStore from "@/store/auth";
import PackagesChangesListener from "@/listeners/PackagesChangesListener";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Regular.otf"),
    SatoshiBold: require("../assets/fonts/Satoshi-Bold.otf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    Jost: require("../assets/fonts/Jost-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { i18n } = useTranslation();
  const initializing = useAuthStore((store) => store.initializing);

  useEffect(() => {
    async function setSavedLanguage() {
      const savedLanguage = await AsyncStorage.getItem(Storage.language);
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
    setSavedLanguage();
  }, [i18n]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && initializing) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initializing]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <Toast />
      <AuthStateChangeListener />
      <PackagesChangesListener />
    </ThemeProvider>
  );
}
