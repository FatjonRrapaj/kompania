import { Link } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <Link href={"/(auth)/register"} asChild>
        <Pressable>
          <Text>Go TO Register</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
});
