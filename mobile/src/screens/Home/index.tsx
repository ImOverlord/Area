import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import Firebase, { db } from "../../providers/firebase";
import ServiceCard from "../../components/ServiceCard";
import { FlatGrid } from "react-native-super-grid";
import { getAllServices, getUserAREA } from "../../api/Services";
import { observer, inject, Observer } from "mobx-react";
import SubscribeCard from "../../components/SubscribeCard";
function Home(props) {
  const { navigate } = useNavigation();

  const { subscribe, setSubscribe, deleteSubscribe } = props.store;

  useEffect(() => {
    getUserAREA(Firebase.auth().currentUser.email).then(res =>
      setSubscribe(res)
    );
  }, []);

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
          <FlatList
            data={subscribe}
            style={{ paddingTop: 24 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <SubscribeCard
                action={item.data.action.name}
                reaction={item.data.reaction.name}
                email={item.data.user}
                id={item.id}
                index={index}
              />
            )}
          />
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
}

export default inject("store")(observer(Home));
