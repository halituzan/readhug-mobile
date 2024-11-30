import { GlobalStyles } from "@/constants/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={GlobalStyles.flexFullCenter}>
      <Text style={{ color: "white" }}>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
