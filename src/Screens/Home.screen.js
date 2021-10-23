import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Home Screen </Text>
                <Button title="Click Here!" onPress={() => alert("Button Clicked on Home Screen!!")}></Button>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
});
