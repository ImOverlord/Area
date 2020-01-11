import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Firebase from "./providers/firebase/firebase";

export default function Home(props) {
  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <Button
        title="logout"
        onPress={() => {
          Firebase.auth()
            .signOut()
            .then(() => {
              props.navigation.navigate("Welcome")
            })
            .catch(error => {
              console.log(error)
            });
        }}
      />
      <Text> Home </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
