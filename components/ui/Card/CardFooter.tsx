import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStyles } from "@/hooks/useStyles";

type Props = {
  children: React.ReactNode;
};

const CardFooter = ({ children }: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  return <View style={style.cardFooter}>{children}</View>;
};

export default CardFooter;

const styles = StyleSheet.create({});
