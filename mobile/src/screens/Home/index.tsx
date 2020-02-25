import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import Firebase from "../../providers/firebase";
import ServiceCard from "../../components/ServiceCard";
import { FlatGrid } from "react-native-super-grid";
import { getAllServices } from "../../api/Services";
export default () => {
  const { navigate } = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>AREA</Text>
            <TouchableOpacity onPress={() => navigate("Settings")}>
              <Text style={styles.email}>
                {Firebase.auth().currentUser.email}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigate("New")}
          >
            <Text style={styles.bottomButtonText}>New</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
