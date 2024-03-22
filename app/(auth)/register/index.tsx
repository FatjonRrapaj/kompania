import { Link, router } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet, Pressable, Button } from "react-native";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>

      <Pressable onPress={() => router.replace("/(tabs)/(home)")}>
        <Text>REGISTER!</Text>
      </Pressable>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
