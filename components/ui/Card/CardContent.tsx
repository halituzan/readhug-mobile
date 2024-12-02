import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStyles } from "@/hooks/useStyles";

type Props = {
  children: React.ReactNode;
};
const CardContent = ({ children }: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  return <View style={style.cardContent}>{children}</View>;
};

export default CardContent;

const styles = StyleSheet.create({});
