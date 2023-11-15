import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { API_URL, API_User_Info } from "../API/getAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerHeader = () => {
  const [userInfo, setUserInfo] = useState();

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: { accountID: await AsyncStorage.getItem("_idUser") },
      });
      setUserInfo(res.data.message);
    } catch (error) {
      console.log("Call api: " + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: userInfo?.avatar
            ? `${API_URL}${userInfo?.avatar}`
            : "https://www.bing.com/th?id=OIP.audMX4ZGbvT2_GJTx2c4GgHaHw&w=150&h=157&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{userInfo?.fullName}</Text>
        <Text style={styles.whiteText}>{userInfo?.accountID?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "#5256", // Màu xanh dương, bạn có thể thay đổi theo ý muốn
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
    fontSize: 16,
  },
  whiteText: {
    color: "white",
    fontSize: 14,
  },
});

export default CustomDrawerHeader;
