import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "react-navigation-hooks";
import styles from "./styles";
import { ServiceProps } from "../../type/ServiceType";
import { loginOauth, handleNotification } from "../../api/Auth";

export default (props: ServiceProps) => {
  const { image, color, name } = props;
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.wrapper, { backgroundColor: color }]}
      onPress={() => {
        if (props.name === "Notification") {
          handleNotification()
            .then(() => navigate("ActionSelector", { serviceInfo: props }))
            .catch(err => console.log(err));
        } else if (props.authentification) {
          loginOauth(props.authentification, name)
            .then(() => navigate("ActionSelector", { serviceInfo: props }))
            .catch(err => console.log(err));
        } else {
          navigate("ActionSelector", { serviceInfo: props });
        }
      }}
    >
      <View>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: image
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
