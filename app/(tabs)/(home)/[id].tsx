import { router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Package = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hi: {id}</Text>

      <Pressable onPress={() => router.replace("/(tabs)/(home)")}>
        <Text>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Package;

const styles = StyleSheet.create({
  container: {},
});
