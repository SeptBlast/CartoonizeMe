import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";

import { LOGO, HOST_URI } from "../../config/Constants";
import InputTextField from "../../Components/InputTextField";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");

    const signupActivity = async () => {
        var createDate = new Date();
        var formattedDate = createDate.getFullYear() + "-" + (createDate.getMonth() + 1) + "-" + createDate.getDate();
        var formattedTime = createDate.getHours() + ":" + createDate.getMinutes() + ":" + createDate.getSeconds();
        var formattedDateTime = formattedDate + " " + formattedTime;
        console.log(formattedDateTime);

        await fetch(`${HOST_URI}/cartoonizeme/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName, password: password, email_id: email, full_name: name, created_datetime: formattedDateTime }),
            redirect: "follow",
        })
            .then(res => res.text())
            .then(resData => {
                console.log(resData);
                alert(resData);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image source={LOGO} style={styles.logo} />
                    <Text style={[styles.text, { fontSize: 22, fontWeight: "600", marginTop: 20 }]}>CartoonizeMe!</Text>
                </View>

                <InputTextField style={{ marginTop: 40, marginBottom: 8 }} title="Full Name" onChangeText={name => setName(name)} />
                <InputTextField style={{ marginTop: 15, marginBottom: 8 }} title="Username" onChangeText={userName => setUserName(userName)} />
                <InputTextField style={{ marginTop: 15, marginBottom: 8 }} title="Email" onChangeText={email => setEmail(email)} />
                <InputTextField style={{ marginTop: 15, marginBottom: 8 }} title="Password" isSecure={true} onChangeText={password => setPassword(password)} />

                <TouchableOpacity style={[styles.submitContainer, { marginTop: 20 }]} onPress={signupActivity}>
                    <Text style={[styles.text, { color: "#fff", fontWeight: "600", fontSize: 16 }]}>Register</Text>
                </TouchableOpacity>

                <Text style={[styles.text, { fontSize: 14, color: "#ABB4BD", textAlign: "center", marginTop: 24 }]}>
                    Already have an account?{" "}
                    <Text style={[styles.text, styles.link]} onPress={() => navigation.navigate("Login")}>
                        Login Now!
                    </Text>
                </Text>

                <Text style={[styles.text, { fontSize: 14, color: "#ABB4BD", textAlign: "center", marginTop: 24 }]}>
                    Made with <Text style={[styles.text, { fontSize: 12 }]}>❤</Text> in India!
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
    },
    logo: {
        marginTop: 40,
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

export default RegisterScreen;
