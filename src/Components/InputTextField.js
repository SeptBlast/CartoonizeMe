import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Value } from "react-native-reanimated";

export default class InputTextField extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                <Text style={styles.inputTitle}>{this.props.title}</Text>
                <TextInput placeholder={this.props.placeholderText} secureTextEntry={this.props.isSecure} style={styles.input} onChangeText={this.props.onChangeText}></TextInput>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputTitle: {
        color: "#abb4bd",
        fontSize: 14,
    },
    input: {
        paddingVertical: 8,
        color: "#1d2029",
        fontSize: 14,
        fontFamily: "Avenir Next",
    },
});
