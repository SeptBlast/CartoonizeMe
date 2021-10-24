import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../Screens/Home.screen";
import FileUploadScreen from "../Screens/FileUpload.screen";
import UserProfile from "../Screens/UserProfile.screen";
import LoginScreen from "../Screens/Authentication/Login.screen";
import RegisterScreen from "../Screens/Authentication/Register.screen";

// deepcode ignore PromiseNotCaughtGeneral: Promise handler not required
Ionicons.loadFont().then();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const CustomTabBarIcon = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={[styles.customTabIcon, styles.shadow]} onPress={onPress}>
            <View style={styles.customTabIconView}>{children}</View>
        </TouchableOpacity>
    );
};

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "image" : "image-outline";
                    } else if (route.name === "Login") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "FileUpload") {
                        iconName = focused ? "cloud-upload" : "cloud-upload-outline";
                    } else if (route.name === "UserProfile") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#FF1654",
                tabBarInactiveTintColor: "#979797",
                tabBarShowLabel: false,
                tabBarStyle: [styles.tabBarStyle, styles.shadow],
                tabBarIconStyle: styles.tabIcons,
                title: route.name,
                headerShown: false,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen
                name="FileUpload"
                component={FileUploadScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        iconName = focused ? "cloud-upload" : "cloud-upload-outline";
                        return <Ionicons name={iconName} size={34} color={"#fff"} style={{ paddingBottom: 20, paddingLeft: 2 }} />;
                    },
                    tabBarButton: props => <CustomTabBarIcon {...props} />,
                }}
            /> */}
            <Tab.Screen name="FileUpload" component={FileUploadScreen} />
            {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
        </Tab.Navigator>
    );
};

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator screenOptions={({ route }) => ({ headerShown: false })}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
    </RootStack.Navigator>
);

export { Tabs, RootStackScreen };

const styles = StyleSheet.create({
    tabBarStyle: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 60,
    },
    shadow: {
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabIcons: {
        alignItems: "center",
        justifyContent: "center",
        top: 13,
    },
    customTabIcon: {
        top: -5,
        justifyContent: "center",
        alignItems: "center",
    },
    customTabIconView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FF1654",
    },
});
