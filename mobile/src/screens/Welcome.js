import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import LottieView from "lottie-react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

import Firebase, {
  GOOGLE_CLIENT_IOS_STAND,
  GOOGLE_CLIENT_IOS,
  WEB_CLIENT_ID,
  WEB_CLIENT_SECRET
} from "./providers/firebase/firebase.js";

export default function Welcome(props) {
  useEffect(() => {
    this.animation.play(50, 218);
  });

  const loginGoogleStandalone = async navigation => {
    try {
      await GoogleSignIn.initAsync({
        clientId:
          "367765098795-oj72gj0p2a9iel8bf7ruajesgsaclvdr.apps.googleusercontent.com",
        isOfflineEnabled: true,
        webClientId:
          "367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com"
      });
    } catch ({ message }) {
      alert("GoogleSignIn.initAsync(): " + message);
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        fetch(
          `https://oauth2.googleapis.com/token?code=${user.serverAuthCode}&client_id=367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com&client_secret=310Q_Q_42Yi_Fg5tkvgem91D&grant_type=authorization_code`,
          {
            method: "POST"
          }
        )
          .then(response => response.json())
          .then(data => {
            const token = {
              accessToken: data.access_token,
              idToken: user.auth.idToken,
              refreshToken: data.refresh_token
            };
            const credential = firebase.auth.GoogleAuthProvider.credential(
              token.idToken,
              token.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(response => {
                navigation.navigate("Home");
              });
          });
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  const { navigation } = props;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          paddingTop: 32,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>AREA</Text>
          <Text style={styles.subtitle}>One tap to connect your life.</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            marginTop: -50,
            alignItems: "center"
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent"
            }}
            source={require("../../assets/welcome.json")}
          />
        </View>
        <View style={{ paddingHorizontal: 50, width: "100%" }}>
          <Text style={styles.subtitle2}>Sign in with</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 24,
              width: "100%"
            }}
          >
            <TouchableOpacity
              style={{ width: "48%" }}
              onPress={() => loginGoogleStandalone(navigation)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "48%" }}
              onPress={() => {
                Alert.alert(
                  "Facebook",
                  "Facebook login is not available for the moment.",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                );
              }}
            >
              <View style={[styles.button, { backgroundColor: "#4265a7" }]}>
                <Text style={styles.buttonText}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Email")}>
            <View style={[styles.button, styles.emailButton]}>
              <Text style={styles.buttonText}>Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Avenir",
    fontSize: 42,
    fontWeight: "900",
    marginLeft: 32
  },
  subtitle: {
    marginHorizontal: 32,
    fontFamily: "Avenir",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    marginTop: 12
  },
  subtitle2: {
    width: "100%",
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "normal",
    textAlign: "center"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d24a3b",
    justifyContent: "center",
    alignItems: "center"
  },
  emailButton: {
    backgroundColor: "#000000"
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "normal",
    color: "#ffffff"
  }
});
