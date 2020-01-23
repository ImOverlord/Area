import React, { useRef } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Log from "../../utils/Log";
import { loginGoogleStandalone } from "../../api/Auth";

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

export default () => {
  const { navigate } = useNavigation();

  const handleGoogle = () => {
    loginGoogleStandalone()
      .then(() => navigate("Home"))
      .catch(err => Alert.alert("Error:", err));
  };
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
        />
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
              onPress={() => handleGoogle()}
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
                  [{ text: "OK" }]
                );
              }}
            >
              <View style={[styles.button, { backgroundColor: "#4265a7" }]}>
                <Text style={styles.buttonText}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigate("Email")}>
            <View style={[styles.button, styles.emailButton]}>
              <Text style={styles.buttonText}>Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
