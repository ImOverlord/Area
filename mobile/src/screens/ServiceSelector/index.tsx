import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const { navigate } = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create your own</Text>
          <Text style={styles.headerSubTitle}>Select trigger service</Text>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={22} />
            <TextInput
              placeholder="Search services"
              style={styles.searchBarText}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
