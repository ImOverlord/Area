import React, { useRef } from "react";
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

export default () => {
  const { navigate } = useNavigation();
  const bs = useRef(null);

  const renderContent = () => (
    <View style={{ padding: 16, backgroundColor: "white", height: "100%" }}>
      <Text>Coucou</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>AREA</Text>
            <TouchableOpacity onPress={() => navigate("Settings")}>
              <Text style={styles.email}>hugo.courthias@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => bs.current.open()}
          >
            <Text style={styles.bottomButtonText}>Get more</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <RBSheet ref={bs} closeOnDragDown>
        <View style={{ padding: 16, backgroundColor: "white", height: "100%" }}>
          <Text>Coucou</Text>
        </View>
      </RBSheet>
    </>
  );
};
