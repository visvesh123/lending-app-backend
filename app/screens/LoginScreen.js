import React from 'react';
import { Image, StyleSheet, TextInput, SafeAreaView } from 'react-native';

import AppButton from '../components/AppButton';


function LoginScreen(props) {
    return (
        <SafeAreaView style={styles.window}>
            <Image source={require("../assets/borrowit-logo.png")} />
            <TextInput style={styles.userNameBar} placeholder="Username" />
            <TextInput secureTextEntry={true} style={styles.passwordBar} placeholder="Password" />
            <AppButton title="Login" color="#0c7171" onPress={() => { alert("You clicked for login") }} />
            <AppButton title="Sign up" color="#0c7171" onPress={() => { alert("You clicked for SignIn") }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    userNameBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        height: 40,
        paddingLeft: 20,
        marginBottom: 30,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
    passwordBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        marginBottom: 20,
        height: 40,
        paddingLeft: 20,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
})
export default LoginScreen;