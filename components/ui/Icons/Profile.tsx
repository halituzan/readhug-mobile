import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgGlobalProps } from "@/constants/types";

const Profile = ({
  color = "currentColor",
  width = 21,
  height = 21,
}: SvgGlobalProps) => {
  return (
    <Svg width={width} height={height} viewBox='0 0 512 512'>
      <Path
        fill={color}
        fillRule='evenodd'
        d='M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64'
      ></Path>
    </Svg>
  );
};

export default Profile;