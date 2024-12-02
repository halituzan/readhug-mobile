import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStyles } from "@/hooks/useStyles";

type Props = {
  children: React.ReactNode;
};

const CardHeader = ({ children }: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  return <View style={style.cardHeader}>{children}</View>;
};

export default CardHeader;

const styles = StyleSheet.create({});
