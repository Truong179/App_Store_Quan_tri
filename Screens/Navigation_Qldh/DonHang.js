import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { API_User_Pay } from "../../API/getAPI";
import Colors from "../../src/Colors";

const USER_ROLE = "Shop";

const DonHang = () => {
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
      setDonHang(res.data.message["Đang xử lý"]);
      setRefreshing(false);
    } catch (error) {
      console.error("Call API: " + error.message);
    }
  };

  const handleDuyet = async (item) => {
    // Xử lý logic duyệt từng item ở đây
    try {
      await axios.put(`${API_User_Pay}${item._id}`, {
        status: "Đang vận chuyển",
        updateAll: false,
      });
      fetchData();
    } catch (error) {
      console.error("Put API: " + error.message);
    }
  };

  const handleDuyetTatCa = async () => {
    // Xử lý logic duyệt tất cả ở đây
    if (donhang.length === 0) {
      ToastAndroid.show("Đơn hàng đã được duyệt hết", ToastAndroid.SHORT);
      return;
    }
    try {
      await axios.put(`${API_User_Pay}demo`, {
        status: "Đang vận chuyển",
        updateAll: true,
      });
      fetchData();
    } catch (error) {
      console.error("Put API: " + error.message);
    }
  };

  const renderDonHang = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={{ uri: item?.userId?.avatar }}
          />
          <Text>{item?.userId?.fullName}</Text>
        </View>
        <View>
          <Text style={{ color: Colors.green }}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={{ flexDirection: "row", width: "50%" }}>
          <Image
            style={styles.productImage}
            source={{ uri: item?.productId?.image }}
          />
          <Text numberOfLines={2}>{item?.productId?.name}</Text>
        </View>

        <View>
          <Text>x{item.quantity}</Text>
          <Text style={{ color: Colors.red }}>${item?.productId?.price}</Text>
        </View>
      </View>
      <View style={styles.divider}>
        <Image source={require("../../src/icons/line.png")} />
      </View>
      <View style={styles.totalContainer}>
        <Text>{item.quantity} sản phẩm</Text>
        <Text>Thành tiền: {item?.totalPrice} </Text>
      </View>
      <View style={styles.divider}>
        <Image source={require("../../src/icons/line.png")} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDuyet(item)}
        >
          <Text style={{ color: Colors.wwhite }}>Duyệt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        data={donhang}
        keyExtractor={(item) => item._id}
        renderItem={renderDonHang}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDuyetTatCa}>
          <Text style={{ color: Colors.wwhite }}>Duyệt tất cả</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
    backgroundColor: Colors.black,
    borderRadius: 5,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    width: 117,
  },
});

export default DonHang;
