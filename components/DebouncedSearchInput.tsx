import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import IconConfig from "@/assets/svg/IconConfig";

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
        placeholder="Search..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
  },
  input: {
    height: 56,
    fontSize: 16,
    color: "gray",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
  },
});

export default DebouncedTextInput;
