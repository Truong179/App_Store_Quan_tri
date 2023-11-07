import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { API_User_Info } from "../API/getAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerHeader = () => {
  const [array, setArray] = useState();

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: { accountID: await AsyncStorage.getItem("_idUser") },
      });
      setArray(res.data.message);
    } catch (error) {
      console.log("Call api: " + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: array?.avatar }} />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{array?.fullName}</Text>
        <Text style={styles.whiteText}>{array?.accountID.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  whiteText: {
    color: "white",
  },
});

export default CustomDrawerHeader;
