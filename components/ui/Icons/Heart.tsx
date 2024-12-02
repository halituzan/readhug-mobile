import { SvgGlobalProps } from "@/constants/types";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface HeartProps extends SvgGlobalProps {
  likedColor?: string;
}

const Heart = ({
  width = 21,
  height = 21,
  color = "currentColor",
  likedColor = "none",
}: HeartProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={likedColor}
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-heart'
    >
      <Path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </Svg>
  );
};

export default Heart;
