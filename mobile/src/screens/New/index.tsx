import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const { navigate } = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create your own</Text>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.body}>If</Text>
            <TouchableOpacity onPress={() => navigate("ServiceSelector")}>
              <View style={styles.thisButtonWrapper}>
                <FontAwesome name="plus-square" size={56} />
                <Text style={[styles.body, { opacity: 0.4, marginLeft: 8 }]}>
                  This
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.body}>Then</Text>
            <Text style={styles.body}>That</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
