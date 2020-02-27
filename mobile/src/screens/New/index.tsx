import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import CloseButton from "../../components/CloseButton";
import styles from "./styles";
import CreationButton from "../../components/CreationButton";
import { action } from "mobx";
import {
  getIdToken,
  API_URL,
  getServiceActions,
  getUserAREA
} from "../../api/Services";
import axios from "axios";
import Firebase from "../../providers/firebase";

function New(props) {
  const { navigate } = useNavigation();
  const {
    actionStatic,
    reactionStatic,
    action,
    reaction,
    setSubscribe
  } = props.store;

  const createAREA = async () => {
    const actionName = actionStatic.slugName;
    const reactionName = reactionStatic.slugName;
    const actionData = actionStatic.form;
    const reactionData = reactionStatic.form;
    const idToken: string = await getIdToken();
    axios
      .put(
        `${API_URL}/subscribe`,
        {
          actionName,
          actionData,
          reactionName,
          reactionData
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          getUserAREA(Firebase.auth().currentUser.email).then(res => {
            setSubscribe(res);
            navigate("Home");
          });
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <Header title="Create your own" subTitle="" color="black" />
        <View style={styles.container}>
          <View>
            <Text style={styles.body}>If</Text>
            <CreationButton title="This" index={1} />
            <Text style={styles.body}>Then</Text>
            <CreationButton title="That" index={2} />
          </View>
        </View>
        <CloseButton />
        {reaction && action && (
          <TouchableOpacity onPress={() => createAREA()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create AREA</Text>
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(New));
