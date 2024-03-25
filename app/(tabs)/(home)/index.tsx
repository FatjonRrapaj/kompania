import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import globalStyles from "@/components/globalStyles";
import IconConfig from "@/assets/svg/IconConfig";

export default function TabOneScreen() {
  const TimeIndicatorIcon = IconConfig.Moon;

  return (
    <View style={globalStyles.screenContainer}>
      <TimeIndicatorIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
