import { SvgGlobalProps } from "@/constants/types";
import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const GenderIcon = ({
  width = 21,
  height = 21,
  color = "currentColor",
}: SvgGlobalProps) => {
  return (
    <Svg width={width} height={height} viewBox='0 0 256 256'>
      <Path
        fill={color}
        d='M208 20h-40a12 12 0 0 0 0 24h11l-15.64 15.67A68 68 0 1 0 108 178.92V192H88a12 12 0 0 0 0 24h20v16a12 12 0 0 0 24 0v-16h20a12 12 0 0 0 0-24h-20v-13.08a67.93 67.93 0 0 0 46.9-100.84L196 61v11a12 12 0 0 0 24 0V32a12 12 0 0 0-12-12m-88 136a44 44 0 1 1 44-44a44.05 44.05 0 0 1-44 44'
      ></Path>
    </Svg>
  );
};

export default GenderIcon;
