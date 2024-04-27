import DebouncedTextInput from "@/components/DebouncedSearchInput";
import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PackagesList from "@/components/ui/packages/PackagesList";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState(null);

  return (
    <View style={globalStyles.screenContainer}>
      <DebouncedTextInput
        onDebouncedTextChange={(text) => {
          setSearchTerm(text);
        }}
      />
      <PackagesList />
    </View>
  );
}
