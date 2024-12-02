import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStyles } from "@/hooks/useStyles";

type Props = {
  children: React.ReactNode;
  cardTitle?: string;
};

const Card = ({ children, cardTitle }: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  return (
    <View style={style.card}>
      {cardTitle && (
        <Text style={appStyle({ fontSize: 18 }).cardTitle}>{cardTitle}</Text>
      )}

      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
