import { Link } from "expo-router";
import * as React from "react";
import { StyleSheet, Pressable } from "react-native";
import { View } from "@/components/Themed";
import { Body2, H5, H5Bold } from "@/components/StyledText";

import { useForm } from "react-hook-form";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  return (
    <View style={styles.container}>
      <H5Bold>Logohuni</H5Bold>
      <Body2>Vendosni informacionin e nevojshëm poshtë</Body2>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
});
