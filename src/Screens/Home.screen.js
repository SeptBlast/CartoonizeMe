import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Button, Image, Dimensions, Modal, FlatList } from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Carousel, { Pagination } from "react-native-snap-carousel";

import { LOGO_BACKGROUND, HOST_URI } from "../config/Constants";
import ImageElement from "../Components/ImageElement";

Ionicons.loadFont().then().catch();

const { width } = Dimensions.get("window");
const SPACING = 10;
const THUMB_SIZE = 200;

var IMAGES = {
    image1: require("../../assets/img/download1.png"),
    image2: require("../../assets/img/download2.png"),
    image3: require("../../assets/img/download3.jpeg"),
};

function Home({ navigation }) {
    // state = {
    //     modalVisible: false,
    //     modalImage: LOGO_BACKGROUND,
    //     images: [LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND, LOGO_BACKGROUND],
    // };

    // setModalVisible(visible, imageKey) {
    //     this.setState({ modelImage: this.state.images[imageKey] });
    //     this.setState({ modalVisible: visible });
    // }
    const [indexSelected, setIndexSelected] = useState(0);
    const [images, setImages] = React.useState([
        { id: 1, image: IMAGES.image1 },
        { id: 2, image: IMAGES.image2 },
        { id: 3, image: IMAGES.image3 },
        { id: 4, image: IMAGES.image1 },
        { id: 6, image: IMAGES.image2 },
        { id: 7, image: IMAGES.image3 },
        { id: 8, image: IMAGES.image1 },
        { id: 9, image: IMAGES.image2 },
    ]);
    const carouselRef = useRef();
    const flatListRef = useRef();

    const onTouchThumbnail = touched => {
        if (touched === indexSelected) return;

        carouselRef?.current?.snapToItem(touched);
    };

    const onSelect = indexSelected => {
        setIndexSelected(indexSelected);

        flatListRef?.current?.scrollToOffset({
            offset: indexSelected * THUMB_SIZE,
            animated: true,
        });
    };

    async function getImageList() {
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

    async function getImageBase64(filename) {
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

    var getImageFileName = async () => {
        console.log("getImage");
        var imagesList = await getImageList();

        console.log(imagesList.length);
        var imageBase64Path = "";
        for (let i = 0; i < imagesList.length; i++) {
            imageBase64Path = await getImageBase64(imagesList[i]);
        }

        console.log(imageBase64Path);
    };

    // let images = this.state.images.map((val, key) => {
    //     var imageBase64Path = "";
    //     return (
    //         <TouchableWithoutFeedback key={key} onPress={() => this.setModalVisible(true, key)}>
    //             <View style={styles.imageWrapper}>
    //                 {/* <ImageElement source={`data:image/png;base64,${imageBase64Path}`} /> */}
    //                 <ImageElement source={val} />
    //             </View>
    //         </TouchableWithoutFeedback>
    //     );
    // });

    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View styles={styles.titleContainer}>
                    <View style={{ flex: 1, flexDirection: "row-reverse", marginTop: 15, marginLeft: 20 }}>
                        <Ionicons name="log-out-outline" size={24} style={{ transform: [{ rotateY: "180deg" }] }} />
                    </View>
                    <Text style={styles.title}>Welcome to the CartoonizeMe! 👻</Text>
                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        <TouchableOpacity onPress={() => getImageList()}>
                            <Ionicons name="refresh" size={18} style={{ marginTop: 15, marginRight: 20, fontWeight: "600" }} />
                        </TouchableOpacity>
                        <Text style={styles.subTitle}>Image Library 👇🏻</Text>
                    </View>
                </View>

                {/* <View>
                    <Text onPress={() => getImageFileName()}>Get Image List</Text>
                </View> */}

                {/* <View style={{ marginTop: 20 }}>
                    <View style={styles.imageContainer}>
                        {/* <ImageElement image={this.state.modalImage} /> */}

                {/* {images}  */}
                {/* </View>
                </View> */}
                <View style={{ paddingVertical: 20 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    {/* <Text
                        style={{
                            fontSize: 32,
                            marginTop: 20,
                            marginBottom: 25,
                        }}>
                        My Image Gallery
                    </Text> */}

                    {/* Carousel View */}
                    <View style={{ flex: 1 / 2, marginTop: 20 }}>
                        {/* <Carousel
                            ref={carouselRef}
                            layout="default"
                            data={images}
                            sliderWidth={width}
                            itemWidth={width}
                            onSnapToItem={index => onSelect(index)}
                            renderItem={({ item, index }) => {
                                <Image key={index} style={{ width: 200, height: 200 }} resizeMode="contain" source={item.image} />;
                                <Text>Hello</Text>;
                            }}
                        /> */}
                        {/* <Pagination
                            inactiveDotColor="gray"
                            dotColor={"orange"}
                            activeDotIndex={indexSelected}
                            dotsLength={images.length}
                            animatedDuration={150}
                            inactiveDotScale={1}
                        /> */}
                    </View>
                </View>
                {/* Thumbnail component using FlatList */}
                <View style={{ marginTop: 400 }}>
                    <FlatList
                        ref={flatListRef}
                        horizontal={true}
                        data={images}
                        style={{ position: "absolute", bottom: 180 }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: SPACING,
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => onTouchThumbnail(index)} activeOpacity={0.9}>
                                <Image
                                    style={{
                                        width: THUMB_SIZE,
                                        height: THUMB_SIZE,
                                        marginRight: SPACING,
                                        borderRadius: 10,
                                        borderWidth: index === indexSelected ? 4 : 0.75,
                                        borderColor: index === indexSelected ? "orange" : "white",
                                    }}
                                    source={item.image}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {/* </View> */}
            </ScrollView>
        </SafeAreaView>
    );
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
