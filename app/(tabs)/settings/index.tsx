import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { Body2 } from "@/components/StyledText";
import { callLogout } from "@/api/auth";
import useAuthStore from "@/store/auth";
import { GiantButton } from "@/components/StyledButton";
import { pushMockPackages } from "@/api/package";
import useCompanyStore from "@/store/company";
import showToast from "@/utils/toast";

export default function TabTwoScreen() {
  const loadingLogout = useAuthStore((state) => state.loadingLogout);

  const company = useCompanyStore((store) => store.company);

  function handlePushPackagesButtonPress(): void {
    if (company?.uid) {
      pushMockPackages(company.uid);
    } else {
      showToast({
        type: "error",
        text1: "Cannot push packages",
        text2: "No UID",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 3</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <GiantButton
        title="Push Mock PACKAGES"
        icon="TotalPackages"
        onPress={() => handlePushPackagesButtonPress()}
      ></GiantButton>

      <Pressable onPress={useAuthStore.getState().logout}>
        {loadingLogout ? <ActivityIndicator /> : <Body2>Log out</Body2>}
      </Pressable>
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
