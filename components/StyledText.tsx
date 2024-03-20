import { Text, TextProps } from "./Themed";

export function RegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Satoshi" }]} />;
}

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SatoshiBold" }]} />
  );
}
