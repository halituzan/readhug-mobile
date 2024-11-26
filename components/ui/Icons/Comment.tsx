import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {};

const Comment = (props: Props) => {
  return (
    <Svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='lucide lucide-message-circle'
    >
      <Path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
    </Svg>
  );
};

export default Comment;
