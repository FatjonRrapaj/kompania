import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import IconConfig from "@/assets/svg/IconConfig";
import { gray } from "@/constants/Colors";
import i18next from "i18next";

interface DebouncedTextInputProps {
  onDebouncedTextChange: (text: string) => void;
  debounceTimeout?: number;
}

const DebouncedTextInput: React.FC<DebouncedTextInputProps> = ({
  onDebouncedTextChange,
  debounceTimeout = 300,
}) => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
      onDebouncedTextChange(text);
    }, debounceTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, debounceTimeout]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconConfig.Search />
      </View>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={i18next.t("package:search")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: gray[500],
    borderWidth: 1,
    width: "100%",
    justifyContent: "flex-start",
    position: "relative",
    alignSelf: "stretch",
    borderRadius: 10,
  },
  input: {
    height: 56,
    paddingLeft: 60,
    alignSelf: "stretch",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 0,
  },
});

export default DebouncedTextInput;
