import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";

import { LOGO, GOOGLE_ICON, INSTAGRAM_ICON, HOST_URI } from "../../config/Constants";
import InputTextField from "../../Components/InputTextField";
import HomeScreen from "../Home.screen";

function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    var loginActivity = async () => {
        await fetch(HOST_URI + "/cartoonizeme/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
            redirect: "follow",
        })
            .then(res => res.text())
            .then(resData => {
                console.log(resData);
                // alert(resData.message + " " + resData.username);
                // if (resData.indexOf("ACCEPTED") >= 0) navigation.push("Home");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
        // navigation.push({
        //     component: HomeScreen,
        // });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image source={LOGO} style={styles.logo} />
                    <Text style={[styles.text, { fontSize: 22, fontWeight: "600", marginTop: 20 }]}>CartoonizeMe!</Text>
                </View>
                {/* <View
                    style={{
                        marginTop: 50,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={() => alert("Will be available soon!!")}>
                        <View style={styles.socialButtons}>
                            <Image source={GOOGLE_ICON} style={styles.socialLogo} />
                            <Text style={styles.text}>Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("Will be available soon!!")}>
                        <View style={styles.socialButtons}>
                            <Image source={INSTAGRAM_ICON} style={styles.socialLogo} />
                            <Text style={styles.text}>Instagram</Text>
                        </View>
                    </TouchableOpacity>
                </View> 

                <Text
                    style={[
                        styles.text,
                        {
                            color: "#ABB4BD",
                            fontSize: 15,
                            textAlign: "center",
                            marginVertical: 30,
                        },
                    ]}>
                    or
                </Text> */}
                <View style={{ marginTop: 120 }} />
                <InputTextField title="Username" onChangeText={username => setUsername(username)} />
                <InputTextField style={{ marginTop: 20, marginBottom: 8 }} title="Password" isSecure={true} onChangeText={password => setPassword(password)} />

                {/* <Text style={[styles.text, styles.link, { textAlign: "right" }]}>Forgot Password?</Text> */}

                <TouchableOpacity style={[styles.submitContainer, { marginTop: 20 }]} onPress={loginActivity}>
                    <Text style={[styles.text, { color: "#fff", fontWeight: "600", fontSize: 16 }]}>Login</Text>
                </TouchableOpacity>

                <Text style={[styles.text, { fontSize: 14, color: "#ABB4BD", textAlign: "center", marginTop: 24 }]}>
                    Don't have an account?{" "}
                    <Text style={[styles.text, styles.link]} onPress={() => navigation.navigate("Register")}>
                        Register Now!
                    </Text>
                </Text>

                <Text style={[styles.text, { fontSize: 14, color: "#ABB4BD", textAlign: "center", marginTop: 28 }]}>
                    Made with <Text style={[styles.text, { fontSize: 12 }]}>❤</Text> in India!
                </Text>
            </View>
        </ScrollView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
    },
    logo: {
        marginTop: 60,
        width: 200,
        height: 200,
    },
    text: {
        fontFamily: "Avenir Next",
        color: "#1D2029",
        fontWeight: "400",
    },
    socialButtons: {
        flexDirection: "row",
        marginHorizontal: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
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
    socialLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    link: {
        color: "#FF1654",
        fontSize: 14,
        fontWeight: "500",
    },
    submitContainer: {
        backgroundColor: "#FF1654",
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 20,
        alignItems: "center",
        shadowColor: "rgba(255, 22, 84, 0.14)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
    },
});
