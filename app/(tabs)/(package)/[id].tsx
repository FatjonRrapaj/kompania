import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import PackageDetails from "@/components/ui/packages/PackageDetails";
import usePackageStore from "@/store/package";

const Package = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return <PackageDetails id={id} />;
};

export default Package;

const styles = StyleSheet.create({
  container: {},
});
