import { useEffect } from "react";
import { router } from "expo-router";

import useAuthStore from "@/store/auth";
import { View } from "@/components/Themed";

interface IndexPageProps {}

const IndexPage = (props: IndexPageProps) => {
  return <View style={{ backgroundColor: "red", flex: 1 }} />;
};

export default IndexPage;
