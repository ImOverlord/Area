import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import styles from "./styles";
import ActionButton from "../../components/ActionButton";
import CloseButton from "../../components/CloseButton";
import { getServiceActions } from "../../api/Services";

export default () => {
  const { image, color, description, name, type } = useNavigation().getParam(
    "serviceInfo"
  );

  const [actions, setActions] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    console.log(type);
    getServiceActions(name, type).then(res =>
      setActions(type === "action" ? res.data.actions : res.data.reactions)
    );
  }, []);
  return (
    <>
      <SafeAreaView
        style={[styles.topSafeAreaView, { backgroundColor: color }]}
      />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <Header
          title="Create your own"
          subTitle="Choose trigger"
          color={color}
        />
        <View
          style={{
            backgroundColor: color,
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 62, height: 62 }}
            source={{
              uri: image
            }}
          />
          <Text style={styles.description}>{description}</Text>
        </View>
        <CloseButton />
        <FlatList
          data={actions}
          style={{ paddingTop: 24 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ActionButton
              index={index}
              name={item.name}
              color={color}
              image={image}
              onPress={() => navigate("Form", { item, image, color, type })}
              // onPress={() => console.log(item)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};
