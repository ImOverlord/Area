import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import Log from "../../utils/Log";
import Firebase from "../../providers/firebase";

export default () => {
  const { navigate, goBack } = useNavigation();

  const signOutUser = async () => {
    try {
      await Firebase.auth().signOut();
      navigate("Welcome");
    } catch (e) {
      Log(e);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <MaterialCommunityIcons name="window-close" size={38} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.avatar}
          source={require("../../../assets/no_profile_image.png")}
        />
        <Text style={styles.email}>hugocourthias</Text>
      </View>
      <View>
        <ScrollView style={styles.scrollViewWrapper}>
          <TouchableOpacity onPress={() => signOutUser()}>
            <Text style={styles.itemText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
