import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import Pressable from "./Pressable";
import { Body1Bold } from "./StyledText";
import IconConfig from "@/assets/svg/IconConfig";
import en from "@/translations/en";

interface PageHeaderProps {
  title: keyof typeof en.navigation;
  extraTitle?: string;
  onBackPressed?: () => void;
}

const PageHeader = (props: PageHeaderProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.navigation) => t(`navigation:${key}`);
  return (
    <View style={styles.container}>
      {props.onBackPressed || router.canGoBack() ? (
        <Pressable
          style={styles.button}
          onPress={() => {
            if (props?.onBackPressed) {
              props?.onBackPressed();
            } else {
              router.back();
            }
          }}
        >
          <IconConfig.ArrowLeft />
        </Pressable>
      ) : (
        <View />
      )}
      <Body1Bold style={styles.title}>
        {translate(props.title) + props.extraTitle ?? ""}
      </Body1Bold>
      <View style={styles.button} />
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
    marginBottom: 24,
  },
  title: { flex: 1, textAlign: "center" },
  button: {
    width: 40,
  },
});
