import DebouncedTextInput from "@/components/DebouncedSearchInput";
import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PackagesList from "@/components/ui/packages/PackagesList";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <DebouncedTextInput
        onDebouncedTextChange={(text) => {
          setSearchTerm(text);
        }}
      />
      <PackagesList searchTerm={searchTerm} />
    </View>
  );
}
