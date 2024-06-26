import { useLocalSearchParams, useNavigation } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PackageProps {}

const Package = (props: PackageProps) => {
  const { goBack } = useNavigation();

  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hi: {id}</Text>

      <Pressable onPress={() => goBack()}>
        <Text>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Package;

const styles = StyleSheet.create({
  container: {},
});
