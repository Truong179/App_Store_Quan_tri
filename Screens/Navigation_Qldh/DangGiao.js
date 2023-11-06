import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Colors from "../../src/Colors";
import axios from "axios";
import { API_User_Pay } from "../../API/getAPI";

const USER_ROLE = "Shop";

const DangGiao = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [donhang, setDonHang] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(API_User_Pay, {
        params: { role: USER_ROLE },
      });
      setDonHang(res.data.message["Đang vận chuyển"]);
      setRefreshing(false);
    } catch (error) {
      console.error("Call API: " + error.message);
    }
  };

  const renderDonHangItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.userInfoContainer}>
          <Image style={styles.avatar} source={{ uri: item.productId.image }} />
          <Text>{item.userId.fullName}</Text>
        </View>
        <View>
          <Text style={{ color: Colors.green }}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.productInfoContainer}>
          <Image
            style={styles.productImage}
            source={{ uri: item.productId.image }}
          />
          <Text>{item.productId.name}</Text>
        </View>
        <View>
          <Text>x{item.quantity}</Text>
          <Text style={{ color: Colors.red }}>${item.productId.price}</Text>
        </View>
      </View>
      <Image source={require("../../src/icons/line.png")} />
      <View style={styles.rowContainer}>
        <Text>{item.quantity} sản phẩm</Text>
        <Text>Thành tiền: {item.totalPrice}</Text>
      </View>
      <Image source={require("../../src/icons/line.png")} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        data={donhang}
        keyExtractor={(item) => item._id}
        renderItem={renderDonHangItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.wwhite,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "column",
    marginTop: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 5,
  },
  productInfoContainer: {
    flexDirection: "row",
  },
  productImage: {
    height: 40,
    width: 50,
    marginRight: 5,
  },
});

export default DangGiao;
