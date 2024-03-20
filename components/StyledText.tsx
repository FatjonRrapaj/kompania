import { Text, TextProps } from "./Themed";

export function RegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Satoshi" }]} />;
}

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SatoshiBold" }]} />
  );
}

export function H1Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 80 }]} />;
}

export function H2Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 60 }]} />;
}

export function H3Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 40 }]} />;
}

export function H4Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 28 }]} />;
}

export function H5Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 24 }]} />;
}

export function H6Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 24 }]} />;
}

export function Body1Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 16 }]} />;
}

export function Body2Bold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 14 }]} />;
}

export function CaptionBold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 12 }]} />;
}

export function LabelBold(props: TextProps) {
  return <BoldText {...props} style={[props.style, { fontSize: 11 }]} />;
}

export function H1(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 80 }]} />;
}

export function H2(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 60 }]} />;
}

export function H3(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 40 }]} />;
}

export function H4(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 28 }]} />;
}

export function H5(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 24 }]} />;
}

export function H6(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 24 }]} />;
}

export function Body1(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 16 }]} />;
}

export function Body2(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 14 }]} />;
}

export function Caption(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 12 }]} />;
}

export function Label(props: TextProps) {
  return <RegularText {...props} style={[props.style, { fontSize: 11 }]} />;
}
