import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PackagesList from "@/components/ui/home/PackagesList";

export default function HomeScreen() {
  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <PackagesList />
    </View>
  );
}
