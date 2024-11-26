import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import LoginScreen from "@/components/Auth/LoginScreen";

type Props = {};

const login = (props: Props) => {
    return (
        <Fragment>
            <LoginScreen />
        </Fragment>
    );
};

export default login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
