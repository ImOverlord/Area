import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import Firebase from "./providers/firebase/firebase";

export default class AppLoading extends Component {
  state = { loading: false };
  unsubscribe = null;

  componentDidMount = () => {
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("AppLoading: User is logged");
        this.props.navigation.navigate("Home");
      } else {
        console.log("AppLoading: User isn't logged");
        this.props.navigation.navigate("Welcome");
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
}


  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }
}
