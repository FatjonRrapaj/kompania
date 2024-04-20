import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    flex: 1,
  },
  horizontalContainerSpaced: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
