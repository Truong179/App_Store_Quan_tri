import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";
import { API_URL, API_User_Pay } from "../../API/getAPI";
import Colors from "../../src/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "../Home";

const USER_ROLE = "Shop";

const DaGiao = ({ navigation }) => {
  const [donhang, setDonHang] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(API_User_Pay, {
        params: { role: USER_ROLE },
      });
      setDonHang(res.data.message["Đã giao"]);
    } catch (error) {
      console.error("Call API: " + error.message);
    }
  };

  const renderDonHang = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("OrderDetail", { order: item })}
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={{ uri: `${API_URL}${item?.userId?.avatar}` }}
          />
          <Text>{item?.userId?.fullName}</Text>
        </View>
        <View>
          <Text style={{ color: Colors.blue }}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={{ flexDirection: "row", width: "50%" }}>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}${item?.productId?.image}` }}
          />
          <Text numberOfLines={2}>{item?.productId?.name}</Text>
        </View>

        <View>
          <Text>x{item.quantity}</Text>
          <Text style={{ color: Colors.red }}>
            {formatCurrency(item?.productId?.price)}
          </Text>
        </View>
      </View>
      <View style={styles.divider}>
        <Image source={require("../../src/icons/line.png")} />
      </View>
      <View style={styles.totalContainer}>
        <Text>{item.quantity} sản phẩm</Text>
        <Text>Thành tiền: {formatCurrency(item?.totalPrice)} </Text>
      </View>
      <View style={styles.divider}>
        <Image source={require("../../src/icons/line.png")} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={donhang}
        keyExtractor={(item) => item._id}
        renderItem={renderDonHang}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.wwhite,
  },
  container: {
    marginVertical: 10,
    borderBottomWidth: 10,
    borderBottomColor: Colors.grey,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  userContainer: {
    flexDirection: "row",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 5,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  productImage: {
    height: 40,
    width: 50,
    marginRight: 5,
  },
  divider: {
    marginTop: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default DaGiao;
