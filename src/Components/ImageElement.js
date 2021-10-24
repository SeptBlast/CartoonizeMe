import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";

export default class ImageElement extends Component {
    render() {
        return <Image source={this.props.imageSource} style={styles.image} />;
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        alignSelf: "stretch",
    },
});
