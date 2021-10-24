import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, SafeAreaView, Platform, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as mime from "react-native-mime-types";

import { HOST_URI } from "../config/Constants";
import { ScrollView } from "react-native-gesture-handler";
// import RNFetchBlob from "react-native-fetch-blob";
// import RNFS from "react-native-fs";
// const { fs } = RNFetchBlob;

Ionicons.loadFont().then().catch();

const FileUpload = ({ navigation }) => {
    // const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const [mimeType, setMimeType] = useState(null);
    const [imageURI, setImageURI] = useState(null);
    const [response, setResponse] = useState("Response of ImageUpload");
    const [type, setType] = useState(Camera.Constants.Type.back);

    var handleProgress = event => {
        setUploadProgress(Math.round((event.loaded * 100) / event.total));
    };

    useEffect(() => {
        (async () => {
            // const cameraStatus = await Camera.requestCameraPermissionsAsync();
            // setHasCameraPermission(cameraStatus.status === "granted");

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync();
            // console.log(photo.uri);
            setImage(photo.uri);
        }
    };

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result.uri);
            setImage(result.uri);
        }
    };

    const uploadImage = async elements => {
        console.log(image);
        var mimetype = mime.lookup(image);
        setMimeType(mimetype);

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", {
            uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
            type: mimetype,
            name: image.split("/")[image.split("/").length - 1],
        });

        xhr.upload.addEventListener("progress", handleProgress);
        xhr.addEventListener("load", () => {
            setUploadProgress(100);
            // console.log(xhr.response);
            console.log();
            setFileName(xhr.response);
        });
        xhr.open("POST", `${HOST_URI}/cartoonizeme/uploadFile`);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formData);

        // if (uploadProgress === 100) {
        //     sleep(1000).then(() => {
        //         navigation.navigate("Home");
        //     });
        // }
    };

    var downloadImage = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        // var Base64Code = base64Image.split(`data:${mime.lookup(image)};base64,`);

        // var fs = RNFetchBlob.fs;
        // var dir = RNFetchBlob.fs.dirs;
        // var path = dir.DCIMDir + "/" + fileName;

        // const { DownloadDir } = fs.dirs;
        // var result = RNFetchBlob.config({
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         useDownloadManager: true,
        //         notification: true,
        //         path: `${DownloadDir}/${fileName}`,
        //         description: "Image from cartoonizeme is downloading...",
        //     },
        // })
        // var result =

        await fetch(HOST_URI + "/cartoonizeme/render/" + fileName, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("File Download Request rendered!!");
                setFilePath(result);
            })
            .catch(error => console.log("error", error));

        setImageURI(`data:${mimeType};base64,${filePath}`);
        // console.log(`data:${mimeType};base64,${filePath}`);
    };

    if (hasGalleryPermission === null) {
        return <View />;
    }
    if (hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {/* <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio="1:1" />
                </View> */}

                    {/* <Button
                title="Flip Camera"
                style={styles.flipButton}
                onPress={() => {
                    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }}
                /> */}
                    {/* <Button title="Click Photo!" onPress={() => takePicture()} /> */}

                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={styles.text}>Chosen Image</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>{image && <Image source={{ uri: image }} style={{ width: 350, height: 350, margin: 20 }} />}</View>

                    <View style={{ alignItems: "center", marginTop: 5, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12 }}>Uploaded {uploadProgress}%</Text>
                    </View>
                    <TouchableOpacity onPress={() => pickImage()}>
                        <View style={[styles.Button, { marginTop: 40 }]}>
                            <Ionicons name="image" size={18} color="#FF1654" />
                            <Text style={styles.text}>Pick Image from Gallery... </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => uploadImage()}>
                        <View style={styles.Button}>
                            <Ionicons name="cloud-upload" size={18} color="#FF1654" />
                            <Text style={styles.text}>Upload!! </Text>
                        </View>
                        {/* <Text style={{ fontSize: 12 }}>{response}</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => downloadImage()}>
                        <View style={styles.Button}>
                            <Ionicons name="cloud-download" size={18} color="#FF1654" />
                            <Text style={styles.text}>View Formatted Image</Text>
                        </View>
                        {/* <Text style={{ fontSize: 12 }}>{response}</Text> */}
                    </TouchableOpacity>

                    <View style={{ paddingBottom: 80, justifyContent: "center" }}>
                        {/* <Text>{filePath}</Text> */}
                        <Image
                            source={{ uri: imageURI }}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                width: 300,
                                height: 300,
                                margin: 10,
                                borderColor: "black",
                                borderWidth: 1,
                                borderRadius: 10,
                                marginLeft: 20,
                                paddingRight: 10,
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FileUpload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
    },
    text: {
        color: "#FF1654",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 10,
    },
    Button: {
        justifyContent: "center",
        flexDirection: "row",
        marginHorizontal: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(171, 180, 189, 0.65)",
        borderRadius: 4,
        backgroundColor: "#fff",
        shadowColor: "rgba(171, 180, 189, 0.65)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    },
    fixedRatio: { flex: 1, aspectRatio: 1 },
    cameraContainer: { flex: 1, flexDirection: "row" },
});
