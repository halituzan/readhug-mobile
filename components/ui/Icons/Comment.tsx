import { SvgGlobalProps } from "@/constants/types";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
interface CommentProps extends SvgGlobalProps {
  messageColor?: string;
}
const Comment = ({
  width = 21,
  height = 21,
  color = "currentColor",
  messageColor = "none",
}: CommentProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={messageColor}
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-message-circle'
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flex: 1,
      }}
    >
      <Path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
    </Svg>
  );
};

export default Comment;
