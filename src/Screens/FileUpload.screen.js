import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, SafeAreaView, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as mime from "react-native-mime-types";

import { HOST_URI } from "../config/Constants";

Ionicons.loadFont().then().catch();

const FileUpload = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState("Response of ImageUpload");
    const [type, setType] = useState(Camera.Constants.Type.back);

    var handleProgress = event => {
        setUploadProgress(Math.round((event.loaded * 100) / event.total));
    };

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");

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
            setResponse(xhr.response);
            console.log(xhr.response);
            console.log();
        });
        xhr.open("POST", `${HOST_URI}/cartoonizeme/uploadFile`);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formData);
    };

    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
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
                <TouchableOpacity style={{ marginBottom: 120 }} onPress={() => uploadImage()}>
                    <View style={styles.Button}>
                        <Ionicons name="cloud-upload" size={18} color="#FF1654" />
                        <Text style={styles.text}>Upload!! </Text>
                    </View>
                    {/* <Text style={{ fontSize: 12 }}>{response}</Text> */}
                </TouchableOpacity>
            </View>
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
