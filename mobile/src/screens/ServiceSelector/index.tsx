import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { FlatGrid } from "react-native-super-grid";
import ServiceCard from "../../components/ServiceCard";
import CloseButton from "../../components/CloseButton";
import Header from "../../components/Header";
import { getAllServices } from "../../api/Services";
import styles from "./styles";
import { ServiceProps } from "../../type/ServiceType";

export default () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServices().then(result => setServices(result));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        <StatusBar barStyle="light-content" />
        <Header title="Create your own" subTitle="Select trigger service" />
        <CloseButton />
        {services.length > 0 ? (
          <FlatGrid
            itemDimension={100}
            items={services}
            fixed
            spacing={0}
            renderItem={({ item }: { item: ServiceProps }) => (
              <ServiceCard
                authentification={item.authentification}
                name={item.name}
                color={item.color}
                description={item.description}
                image={item.image}
              />
            )}
          />
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    </>
  );
};
