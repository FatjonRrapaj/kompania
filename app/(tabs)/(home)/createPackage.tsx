import { Link, useNavigation } from "expo-router";
import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PageHeader from "@/components/PageHeader";

interface CreatePackageProps {}

const CreatePackage = (props: CreatePackageProps) => {
  const { goBack } = useNavigation();

  return (
    <View style={globalStyles.screenContainer}>
      <PageHeader title="newPackage" />
    </View>
  );
};

export default CreatePackage;

const styles = StyleSheet.create({
  container: {},
});
