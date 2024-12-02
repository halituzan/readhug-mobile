import { GlobalStyles } from "@/constants/Theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={GlobalStyles.flexFullCenter}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
