import { Skeleton as DefaultSkeleton } from "moti/skeleton";
import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { useColorScheme } from "react-native";
import { View, ViewProps } from "../Themed";

interface SkeletonProps extends Omit<MotiSkeletonProps, "Gradient"> {}

const Skeleton = (props: SkeletonProps) => {
  const colorScheme = useColorScheme();
  return <DefaultSkeleton {...props} colorMode={colorScheme ?? "light"} />;
};

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => (
  <View style={{ width, height }} />
);

export { Skeleton, Spacer };
