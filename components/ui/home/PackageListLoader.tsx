import { useReducer } from "react";
import { StyleSheet, Pressable, View, useColorScheme } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function HelloWorld() {
  const [dark, toggle] = useReducer((s) => !s, true);
  const colorScheme = useColorScheme();

  return (
    <>
      <Skeleton
        colorMode={colorScheme ?? "light"}
        radius="round"
        height={45}
        width={45}
      />
      <Spacer />
      <Skeleton colorMode={colorScheme ?? "light"} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorScheme ?? "light"} width={"100%"} />
      <Spacer height={8} />
      <Skeleton colorMode={colorScheme ?? "light"} width={"100%"} />
    </>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});
