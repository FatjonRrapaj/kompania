import { useLocalSearchParams } from "expo-router";
import PackageInfo from "@/components/ui/packages/PackageInfo";

const Package = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return <PackageInfo id={id} />;
};

export default Package;
