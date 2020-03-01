<<<<<<< HEAD
import React, { useRef, useEffect } from "react";
=======
import React, { useRef } from "react";
>>>>>>> edge
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
<<<<<<< HEAD
  View,
  FlatList,
  Platform
=======
  View
>>>>>>> edge
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
<<<<<<< HEAD
import Firebase, { db } from "../../providers/firebase";
import ServiceCard from "../../components/ServiceCard";
import { FlatGrid } from "react-native-super-grid";
import { getAllServices, getUserAREA } from "../../api/Services";
import { observer, inject, Observer } from "mobx-react";
import SubscribeCard from "../../components/SubscribeCard";
import { toJS } from "mobx";
import Placeholder from "../../components/Placeholder";

function Home(props) {
  const { navigate } = useNavigation();

  const { subscribe, setSubscribe, deleteSubscribe } = props.store;

  useEffect(() => {
    getUserAREA(Firebase.auth().currentUser.email).then(res =>
      setSubscribe(res)
    );
  }, []);
=======
import Firebase from "../../providers/firebase";

export default () => {
  const { navigate } = useNavigation();
  const bs = useRef(null);
>>>>>>> edge

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
<<<<<<< HEAD
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <View style={styles.topContainer}>
          <Text style={styles.title}>AREA</Text>
          <TouchableOpacity onPress={() => navigate("Settings")}>
            <Text style={styles.email}>
              {Firebase.auth().currentUser.email}
            </Text>
          </TouchableOpacity>
        </View>
        {subscribe.length === 0 ? (
          <Placeholder message="You currently have no AREA setup. You can start creating a new one by clicking the button below." />
        ) : (
          <ScrollView style={styles.scrollView}>
            <FlatList
              data={subscribe}
              extraData={toJS(subscribe)}
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
        )}
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
=======
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
            onPress={() => bs.current.open()}
          >
            <Text style={styles.bottomButtonText}>Get more</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <RBSheet
        ref={bs}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center"
          },
          draggableIcon: {
            backgroundColor: "black"
          }
        }}
        closeOnDragDown
        height={800}
        duration={400}
      >
        <View style={styles.bsWrapper}>
          <Text>Coucou</Text>
        </View>
      </RBSheet>
    </>
  );
};
>>>>>>> edge
