import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export class FileUpload extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> FileUpload Screen!! </Text>
                <Button title="Click Here!" onPress={() => alert("Button Clicked on File Upload Screen!!")}></Button>
            </View>
        );
    }
}

export default FileUpload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
});
