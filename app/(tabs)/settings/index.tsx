import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { Body2, H2Bold, H4Bold } from "@/components/StyledText";
import { callLogout } from "@/api/auth";
import useAuthStore from "@/store/auth";
import { GiantButton } from "@/components/StyledButton";
import useCompanyStore from "@/store/company";
import showToast from "@/utils/toast";

export default function TabTwoScreen() {
  const loadingLogout = useAuthStore((state) => state.loadingLogout);

  const company = useCompanyStore((store) => store.company);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 3</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Pressable
        style={{ marginTop: 32 }}
        onPress={useAuthStore.getState().logout}
      >
        {loadingLogout ? <ActivityIndicator /> : <H4Bold>Log out</H4Bold>}
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
