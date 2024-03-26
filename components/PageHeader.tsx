import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import Pressable from "./Pressable";
import { Body1Bold } from "./StyledText";
import IconConfig from "@/assets/svg/IconConfig";
import en from "@/translations/en";

interface PageHeaderProps {
  title: keyof typeof en.navigation;
}

const PageHeader = (props: PageHeaderProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.navigation) => t(`navigation:${key}`);
  return (
    <View style={styles.container}>
      {router.canGoBack() ? (
        <Pressable style={styles.button} onPress={() => router.back()}>
          <IconConfig.ArrowLeft />
        </Pressable>
      ) : (
        <View />
      )}
      <Body1Bold>{translate(props.title)}</Body1Bold>
      <View />
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 2,
  },
});
