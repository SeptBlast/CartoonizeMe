import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export class UserProfile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> UserProfile Screen!! </Text>
                <Button title="Click Here!" onPress={() => alert("Button Clicked on UserProfile Screen!!")}></Button>
            </View>
        );
    }
}

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
});
