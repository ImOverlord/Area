import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react";
import { db } from "../../providers/firebase";

export type SubscribeCard = {
  action: string;
  reaction: string;
  email: string;
  onPress: any;
};

function SubscribeCard(params) {
  const { subscribe, setSubscribe, deleteSubscribe } = params.store;

  const removeSub = (id, index) => {
    db.collection("Area")
      .doc(id)
      .delete()
      .then(function() {
        deleteSubscribe(index);
        console.log(subscribe);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => removeSub(params.id, params.index)}
      style={{
        backgroundColor: "black",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 24,
        borderRadius: 10
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "Avenir Next",
          fontWeight: "700",
          fontSize: 28
        }}
      >
        {`If ${params.action}, then ${params.reaction}`}
      </Text>
      <Text
        style={{
          color: "white",
          fontFamily: "Avenir Next",
          fontSize: 16,
          marginTop: 16,
          fontWeight: "600"
        }}
      >
        {`by ${params.email}`}
      </Text>
    </TouchableOpacity>
  );
}

export default inject("store")(observer(SubscribeCard));
