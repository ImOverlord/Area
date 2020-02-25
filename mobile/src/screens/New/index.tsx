import React, { useEffect } from "react";
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
import Header from "../../components/Header";
import CloseButton from "../../components/CloseButton";
import { observer, inject } from "mobx-react";

function New(props) {
  const { navigate } = useNavigation();

  useEffect(() => {
    props.store.updateText("coucou");
    console.log(props.store.text);
  }, []);
  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <Header title="Create your own" subTitle="" color="black" />
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
        <CloseButton />
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(New));
