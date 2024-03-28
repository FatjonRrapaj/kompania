import { useEffect } from "react";
import { router } from "expo-router";

import useAuthStore from "@/store/auth";
import { View } from "@/components/Themed";
import { H1Bold } from "@/components/StyledText";
import globalStyles from "@/components/globalStyles";

interface IndexPageProps {}

const IndexPage = (props: IndexPageProps) => {
  const initializing = useAuthStore((store) => store.initializing);
  const user = useAuthStore((store) => store.user);
  console.log("user: ", user);

  useEffect(() => {
    if (initializing) {
      return;
    }
    if (user) {
      router.replace("/(tabs)/(home)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [initializing, user]);

  return (
    <View style={globalStyles.screenContainer}>
      {initializing ? <H1Bold>Initializing...</H1Bold> : null}
    </View>
  );
};

export default IndexPage;
