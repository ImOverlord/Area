import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Firebase from "../providers/firebase";
import Log from "../utils/Log";

export default () => {
  const { navigate } = useNavigation();
  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <Button
        title="logout"
        onPress={() => {
          Firebase.auth()
            .signOut()
            .then(() => navigate("Welcome"))
            .catch(error => {
              Log(error);
            });
        }}
      />
      <Text> Home </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
