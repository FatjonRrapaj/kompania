import { View, StyleSheet } from "react-native";

import Pressable from "@/components/Pressable";
import { H6Bold } from "@/components/StyledText";
import { dark, gray, primary } from "@/constants/Colors";

interface CurrencySelectorProps {
  currency: CurrencyShortValue;
  onCurrencyChange: (currency: CurrencyShortValue) => void;
}

const CurrencySelector = ({
  currency,
  onCurrencyChange,
}: CurrencySelectorProps) => {
  const allColor = currency === "ALL" ? primary[500] : dark[500];
  const eurColor = currency === "EUR" ? primary[500] : dark[500];

  return (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={() => onCurrencyChange("ALL")}>
        <H6Bold style={{ color: allColor }}>ALL</H6Bold>
      </Pressable>
      <Pressable style={styles.box} onPress={() => onCurrencyChange("EUR")}>
        <H6Bold style={{ color: eurColor }}>EUR</H6Bold>
      </Pressable>
    </View>
  );
};

export default CurrencySelector;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  box: {
    height: 90,
    width: 90,
    borderColor: gray[500],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 16,
  },
});
