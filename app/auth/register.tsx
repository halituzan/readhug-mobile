import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import RegisterScreen from "@/components/Auth/RegisterScreen";

type Props = {};

const register = (props: Props) => {
    return (
        <Fragment>
            <RegisterScreen />
        </Fragment>
    );
};

export default register;

const styles = StyleSheet.create({});
