import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import styles from "./styles";

export default () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
