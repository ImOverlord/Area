import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import styles from "./styles";
import ActionButton from "../../components/ActionButton";
import CloseButton from "../../components/CloseButton";
import { getServiceActions } from "../../api/Services";
import { Dropdown } from "react-native-material-dropdown";

export default () => {
  const { navigate } = useNavigation();
  const item = useNavigation().getParam("item");
  let formResult = {};

  const onChangeText = (name, text) => {
    formResult[name] = text;
    console.log(formResult);
  };
  const renderForm = item => {
    const values = [];
    console.log(item);
    if (item.selectionBox) {
      for (let i = 0; i < item.selectionBox.values.length; i += 1) {
        values.push({ value: item.selectionBox.values[i] });
      }
      return (
        <Dropdown
          label={item.selectionBox.name}
          data={values}
          onChangeText={text => onChangeText(item.selectionBox.name, text)}
        />
      );
    } else if (item.checkbox) {
      formResult[item.checkbox.name] = false;
      console.log("checkbox");
    }
  };

  const isReady = () => {
    navigate("New");
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <Header
          title="Create your own"
          subTitle="Configure action"
          color="black"
        />
        <CloseButton />
        <Text style={styles.description}>{item.description}</Text>
        <View
          style={{
            paddingHorizontal: 24,
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <FlatList
            data={item.form}
            style={{ paddingTop: 24 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderForm(item)}
          />
          <TouchableOpacity onPress={() => isReady()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
