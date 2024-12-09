import { SvgGlobalProps } from "@/constants/types";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface NotificationProps extends SvgGlobalProps {
  isNotification?: boolean;
}

const NotificationIcon = ({
  color = "currentColor",
  width = 21,
  height = 21,
  isNotification = false,
}: NotificationProps) => {
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24'>
      <Path
        fill={isNotification ? "green" : color}
        d='M22 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0'
      ></Path>
      <Path
        fill={color}
        fillRule='evenodd'
        d='M6.25 14a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75'
        clipRule='evenodd'
      ></Path>
      <Path
        fill={color}
        fillRule='evenodd'
        d='M3.464 20.536C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12c0-1.399 0-2.59-.038-3.612a4.5 4.5 0 0 1-6.35-6.35C14.59 2 13.399 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535M6.25 17.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75'
        clipRule='evenodd'
      ></Path>
    </Svg>
  );
};

export default NotificationIcon;
