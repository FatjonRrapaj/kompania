import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import { Body1, Body1Bold } from "../../StyledText";
import en from "@/translations/en";

const GreetingComponent = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  const [greetingIconKey, setGreetingIconKey] =
    useState<keyof typeof IconConfig>("Sun");
  const [greetingMessage, setGreetingMessage] = useState<string>("");

  useFocusEffect(() => {
    const currentHour = new Date().getHours();

    let greetingIconKey: keyof typeof IconConfig, greeting: string;
    // Determine the appropriate greeting based on the time
    if (currentHour >= 5 && currentHour < 12) {
      greetingIconKey = "Sunrise";
      greeting = translate("goodMorning");
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingIconKey = "Sun";
      greeting = translate("goodDay");
    } else {
      greetingIconKey = "Moon";
      greeting = translate("goodEvening");
    }
    setGreetingIconKey(greetingIconKey);
    setGreetingMessage(greeting);
  });

  const GreetingIcon = IconConfig[greetingIconKey];
  //TODO: link user name here
  const userName = "Fatjon";

  return (
    <View style={styles.container}>
      <GreetingIcon />
      <Body1>{greetingMessage}</Body1>
      <Body1Bold>{userName}</Body1Bold>
    </View>
  );
};

export default GreetingComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
});
