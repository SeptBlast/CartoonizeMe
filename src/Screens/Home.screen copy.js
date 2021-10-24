import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image, Dimensions, Modal } from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { LOGO_BACKGROUND, HOST_URI } from "../config/Constants";
import ImageElement from "../Components/ImageElement";

Ionicons.loadFont().then().catch();

export class Home extends Component {
    state = {
        modalVisible: false,
        modalImage: LOGO_BACKGROUND,
        images: [LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND],
    };

    IMAGES = {
        image1: require("../../assets/img/download1.png"),
        image2: require("../../assets/img/download2.png"),
        image3: require("../../assets/img/download3.jpeg"),
        image4: require("../../assets/img/download4.jpeg"),
    };

    setModalVisible(visible, imageKey) {
        this.setState({ modelImage: this.state.images[imageKey] });
        this.setState({ modalVisible: visible });
    }

    async getImageList() {
        console.log("getImageList");
        var requestOptions = {
            method: "GET",
            headers: {},
            redirect: "follow",
        };

        var result = await fetch(HOST_URI + "/cartoonizeme/images", requestOptions)
            .then(response => response.json())
            // .then(result => console.log(result))
            .catch(error => console.log("error", error));

        return result;
    }

    async getImageBase64(filename) {
        var requestOptions = {
            method: "GET",
            headers: {},
            redirect: "follow",
        };

        var result = await fetch(HOST_URI + "/cartoonizeme/render/" + filename, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));

        return result;
    }

    getImageFileName = async () => {
        console.log("getImage");
        var imagesList = await this.getImageList();

        console.log(imagesList.length);
        var imageBase64Path = "";
        for (let i = 0; i < imagesList.length; i++) {
            imageBase64Path = await this.getImageBase64(imagesList[i]);
        }

        console.log(imageBase64Path);
    };

    render() {
        let images = this.state.images.map((val, key) => {
            var imageBase64Path = "";
            return (
                <TouchableWithoutFeedback key={key} onPress={() => this.setModalVisible(true, key)}>
                    <View style={styles.imageWrapper}>
                        {/* <ImageElement source={`data:image/png;base64,${imageBase64Path}`} /> */}
                        <ImageElement source={val} />
                    </View>
                </TouchableWithoutFeedback>
            );
        });

        return (
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: "#fff" }}>
                    <View styles={styles.titleContainer}>
                        <View style={{ flex: 1, flexDirection: "row-reverse", marginTop: 15, marginLeft: 20 }}>
                            <Ionicons name="log-out-outline" size={24} style={{ transform: [{ rotateY: "180deg" }] }} />
                        </View>
                        <Text style={styles.title}>Welcome to the CartoonizeMe! 👻</Text>
                        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                            <TouchableOpacity onPress={() => this.getImageList()}>
                                <Ionicons name="refresh" size={18} style={{ marginTop: 15, marginRight: 20, fontWeight: "600" }} />
                            </TouchableOpacity>
                            <Text style={styles.subTitle}>Image Library 👇🏻</Text>
                        </View>
                    </View>

                    <View>
                        <Text onPress={() => this.getImageFileName()}>Get Image List</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.imageContainer}>
                            {/* <ImageElement image={this.state.modalImage} /> */}

                            {images}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        marginTop: Dimensions.get("window").height / 15,
        marginLeft: Dimensions.get("window").width / 20,
        fontFamily: "Avenir Next",
        fontSize: 36,
        fontWeight: "bold",
    },
    subTitle: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400",
        marginTop: 15,
        flex: 1,
        flexDirection: "row",
        textAlign: "left",
    },
    imageWrapper: {
        alignContent: "center",
        margin: 4,
        padding: 2,
        width: Dimensions.get("window").width / 2 - 9,
        height: Dimensions.get("window").height / 3 - 12,
        // backgroundColor: "#ffe",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 5,
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    text: {
        flex: 1,
        flexDirection: "row",
        textAlign: "right",
        color: "#fff",
    },
});

{
    /* <Modal style={styles.modal} animationType="fade" transparent={true} visible={this.state.modelVisible} onRequestClose={() => {}}>
                                <View style={styles.modal}>
                                    <Text
                                        style={styles.text}
                                        onPress={() => {
                                            this.setModalVisible(false);
                                        }}>
                                        ❌ Close
                                    </Text>
                                    <ImageElement image={this.state.modalImage} />
                                </View>
                            </Modal> */
}
