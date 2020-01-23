import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import BackArrow from "../../../assets/left-arrow.svg";
import Firebase from "../providers/firebase/firebase";

export default function Password(props) {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");


  const buttonClicked = () => {
    setLoading(true)
    if (navigation.getParam("status", false)) {
      Firebase.auth()
        .signInWithEmailAndPassword(navigation.getParam("email", ""), password)
        .then(user => {
          console.log("User Created")
          setLoading(false)
          props.navigation.navigate("Home")
        })
        .catch(error => {
          console.log(error)
        });
  
    } else {
      Firebase.auth()
      .createUserWithEmailAndPassword(navigation.getParam("email", ""), password)
      .then(user => {
        console.log("User Created")
        setLoading(false)
        props.navigation.navigate("Home")
      })
      .catch(error => {
        console.log(error)
      });
    }
  }
  

  const { navigation } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ justifyContent: "space-between", flex: 1 }}
        behavior="padding"
      >
        <View style={{ padding: 32 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow width={32} height={32} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {navigation.getParam("status", false)
              ? "Welcome back, enter your password."
              : "Create your password."}
          </Text>
          <TextInput
            style={styles.input}
            selectionColor={"black"}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Enter your password"
            autoCorrect={false}
            value={password}
            onChangeText={password => {
              setPassword(password)
              if (password.length > 5)
                setIsValid(true)
              else
                setIsValid(false)
            }}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => buttonClicked()}
          disabled={!isValid}
        >
          <View style={isValid ? styles.button : styles.buttonDisabled}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {navigation.getParam("status", false)
                  ? "Login"
                  : "Create an account"}
              </Text>
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
    fontWeight: "900"
  },
  buttonDisabled: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  }
});
