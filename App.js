import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Tabs, RootStackScreen } from "./src/routes";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <NavigationContainer>
                {/* <RootStackScreen /> */}
                <Tabs />
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
