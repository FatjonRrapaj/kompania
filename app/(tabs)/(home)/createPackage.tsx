import { Link, useNavigation } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreatePackageProps {}

const CreatePackage = (props: CreatePackageProps) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>CreatePackage</Text>
      <Pressable onPress={goBack}>
        <Text>Go home</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePackage;

const styles = StyleSheet.create({
  container: {},
});
