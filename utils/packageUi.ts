import { primary, secondary, tertiary } from "@/constants/Colors";

export type StatusColorMap = {
  [key in PackageStatus]: string;
};

export type StatusTitleMap = {
  [key in PackageStatus]: string;
};

export const normalColorMapper: StatusColorMap = {
  completed: primary[500],
  pending: secondary[500],
  problematic: tertiary[500],
};

export const transparentColorMapper: StatusColorMap = {
  completed: primary[10],
  pending: secondary[10],
  problematic: tertiary[10],
};
