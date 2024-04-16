import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import PackagesList from "@/components/ui/packages/PackagesList";
import globalStyles from "@/components/globalStyles";

export default function TabTwoScreen() {
  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      {/* <Link asChild href={"/(tabs)/packages/123"}>
        <Pressable>
          <Text>Go to 123</Text>
        </Pressable>
      </Link> */}
      <PackagesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
