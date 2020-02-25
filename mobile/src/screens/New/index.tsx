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
import { getIdToken, API_URL, getServiceActions } from "../../api/Services";
import axios from "axios";

function New(props) {
  const { navigate } = useNavigation();
  const { actionStatic, reactionStatic, action, reaction } = props.store;

  const subscribe = async () => {
    const actionName = actionStatic.name;
    const reactionName = reactionStatic.name;
    const actionData = actionStatic.form;
    const reactionData = reactionStatic.form;
    const idToken: string = await getIdToken();

    // const response = fetch(`${API_URL}/subscribe`, {
    //   method: "put",
    //   headers: {
    //     Authorization: idToken
    //   },
    //   body: {
    //     actionName,
    //     actionData,
    //     reactionName,
    //     reactionData
    //   }
    // });
    console.log("actionName", actionStatic);
    console.log("actiondata", actionData);
    console.log("reactionName", reactionName);
    console.log("reactionData", reactionData);

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
      .then(res => console.log(res))
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
          <TouchableOpacity onPress={() => subscribe()}>
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
