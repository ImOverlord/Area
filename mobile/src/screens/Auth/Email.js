import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import BackArrow from "../../../assets/left-arrow.svg";
import Firebase from "../providers/firebase/firebase";

export default function Email(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false)

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const goToPassword = () => {
    Keyboard.dismiss();
    setLoading(true);
    if (validateEmail(email)) {
      Firebase.auth()
        .fetchSignInMethodsForEmail(email)
        .then(response => {
          setLoading(false);
          if (response.length === 0) {
            props.navigation.navigate("Password", {
              email: email,
              status: false,
            })
          } else {
            props.navigation.navigate("Password", {
              email: email,
              status: true,
            })
          }
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ justifyContent: "space-between", flex: 1 }}
        behavior="padding"
      >
        <View style={{ paddingTop: 32 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <BackArrow width={96} height={32} />
          </TouchableOpacity>
          <Text style={styles.title}>What’s your email ?</Text>
          <TextInput
            style={styles.input}
            selectionColor={"black"}
            autoCapitalize="none"
            placeholder="Enter your email"
            autoCorrect={false}
            value={email}
            onChangeText={email => {
              setEmail(email);
              if (validateEmail(email))
                setIsValid(true)
              else
                setIsValid(false)
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => goToPassword()} disabled={!isValid}>
          <View style={isValid ? styles.button : styles.buttonDisabled}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    marginHorizontal: 32,
    marginBottom: 52,
    fontFamily: "Avenir",
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "normal"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  },
  buttonDisabled: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "normal",
    color: "#ffffff"
  },
  input: {
    fontFamily: "Avenir",
    fontSize: 25,
    marginBottom: 32,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "black",
    fontWeight: "900",
    marginHorizontal: 32
  }
});
