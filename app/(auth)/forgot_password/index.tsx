import globalStyles from "@/components/globalStyles";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ForgotPasswordProps {}

const ForgotPassword = (props: ForgotPasswordProps) => {
  return (
    <View style={globalStyles.screenContainer}>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {},
});
