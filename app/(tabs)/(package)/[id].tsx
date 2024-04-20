import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import PackageInfo from "@/components/ui/packages/PackageInfo";
import usePackageStore from "@/store/package";

const Package = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return <PackageInfo id={id} />;
};

export default Package;

const styles = StyleSheet.create({
  container: {},
});
