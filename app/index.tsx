import { router } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IndexPageProps {}

const IndexPage = (props: IndexPageProps) => {
  React.useEffect(() => {
    setTimeout(() => {
      if (false) {
        router.replace("/(tabs)/(home)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
      <Text style={{ color: "white" }}>Checking for auth</Text>
    </SafeAreaView>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
  },
});
