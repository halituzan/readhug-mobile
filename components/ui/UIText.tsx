import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = { text: string };

const UIText = ({ text }: Props) => {
    return (
        <View style={styles.div}>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
};

export default UIText;

const styles = StyleSheet.create({
    div: {
        flexDirection: "row",
        paddingVertical: 8
    },
    text: {
        flexShrink: 1
    }
});
