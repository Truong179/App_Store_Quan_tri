import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_User } from "../API/getAPI";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listFunctions = [
  {
    name: "Sản phẩm",
    screen: "ListProduct",
    image: require("../Image/product.png"),
    color: "green",
  },
  {
    name: "Đơn hàng",
    screen: "Quản lí dơn hàng",
    image: require("../Image/order_menu.png"),
    color: "blue",
  },
];

const Home = ({ navigation }) => {
  const [synthetic, setSynthetic] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getApi();
    async function fetchData() {
      setRole(await AsyncStorage.getItem("role"));
    }

    fetchData();
  }, [role]);

  useFocusEffect(
    useCallback(() => {
      getApi();
    }, [])
  );

  const getApi = async () => {
    try {
      const res = await axios.get(`${API_User}synthetic`);
      setSynthetic(res.data.message);
    } catch (error) {
      console.error("Call API: " + error.message);
    }
  };

  const FunctionItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.functionItem} onPress={onPress}>
      <View
        style={[styles.functionIconContainer, { backgroundColor: item.color }]}
      >
        <Image style={styles.functionIcon} source={item.image} />
      </View>
      <Text style={styles.functionName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const OrderStatusItem = ({ status, count, onPress }) => (
    <TouchableOpacity style={styles.orderStatusItem} onPress={onPress}>
      <View style={styles.orderStatusIconContainer}>
        <Image style={styles.orderStatusIcon} source={status.image} />
        <Text style={styles.orderStatusText}>{status.label}</Text>
      </View>
      <View style={styles.orderStatusTextContainer}>
        <Text style={styles.orderStatusCount}>{count}</Text>
        <Image
          style={styles.orderStatusIcon}
          source={require("../Image/next.png")}
        />
      </View>
    </TouchableOpacity>
  );

  const renderFunctionItem = ({ item }) => (
    <FunctionItem
      item={item}
      onPress={() => navigation.navigate(item.screen)}
    />
  );

  const renderOrderStatusItem = (status, count, screen) => (
    <OrderStatusItem
      status={status}
      count={count}
      onPress={() =>
        navigation.navigate("Quản lí dơn hàng", {
          screen,
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../Image/logo.png")} />
            <Text style={styles.logoText}>IStore</Text>
          </View>
          <Image
            style={styles.notificationIcon}
            source={require("../Image/notification.png")}
          />
        </View>
        <View style={styles.statistical}>
          <View style={styles.statisticalDay}>
            <View style={styles.statisticalItem}>
              <Text style={styles.statisticalTitle}>Doanh thu hôm nay</Text>
              <Text style={styles.statisticalValue}>
                {synthetic.dailyRevenue}
              </Text>
            </View>
            <View style={styles.statisticalItem}>
              <Image
                style={styles.statisticalIcon}
                source={require("../Image/statistical.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  if (role != "Shop") {
                    Alert.alert(
                      "Thông báo",
                      "Chỉ có quản trị mới xem được nội dung này!"
                    );
                  } else navigation.navigate("Thống kê");
                }}
                style={styles.statisticalDetails}
              >
                <Text style={styles.statisticalDetailsText}>Xem chi tiết</Text>
                <Image
                  style={styles.statisticalDetailsIcon}
                  source={require("../Image/next.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.statisticsOrder}>
            <View style={styles.orderCountItem}>
              <Text>Đơn hàng</Text>
              <Text style={styles.orderCount}>{synthetic.orderCount}</Text>
            </View>
            <View style={styles.orderCountItem}>
              <Text>Đơn hủy</Text>
              <Text style={styles.orderCount}>{synthetic.cancelCount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.functionList}>
          <FlatList
            data={listFunctions}
            horizontal={true}
            keyExtractor={(item) => item.name}
            renderItem={renderFunctionItem}
          />
        </View>

        <Text style={styles.orderProcessingTitle}>Đơn hàng đang xử lý</Text>

        <View style={styles.orderProcessingContainer}>
          {renderOrderStatusItem(
            { label: "Chờ duyệt", image: require("../Image/handle.png") },
            synthetic?.orderStatusCounts?.orderStatusCounts["Đang xử lý"],
            "DonHang"
          )}
          {renderOrderStatusItem(
            { label: "Đang giao", image: require("../Image/shiper.png") },
            synthetic?.orderStatusCounts?.orderStatusCounts["Đang vận chuyển"],
            "DangGiao"
          )}
          {renderOrderStatusItem(
            { label: "Đã giao", image: require("../Image/success.png") },
            synthetic?.orderStatusCounts?.orderStatusCounts["Đã giao"],
            "DaGiao"
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: 55,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  statistical: {
    width: "100%",
    height: 140,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 8,
  },
  statisticalDay: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  statisticalItem: {
    alignItems: "center",
  },
  statisticalTitle: {
    fontSize: 18,
  },
  statisticalValue: {
    fontSize: 17,
    fontWeight: "bold",
  },
  statisticalIcon: {
    width: 20,
    height: 20,
    tintColor: "gray",
  },
  statisticalDetails: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  statisticalDetailsText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  statisticalDetailsIcon: {
    width: 17,
    height: 17,
  },
  statisticsOrder: {
    flexDirection: "row",
  },
  orderCountItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 68,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "gray",
  },
  orderCount: {
    fontWeight: "bold",
  },
  functionList: {
    height: 120,
    alignItems: "center",
  },
  functionItem: {
    alignItems: "center",
  },
  functionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  functionIcon: {
    width: 30,
    height: 30,
  },
  functionName: {
    marginTop: 5,
  },
  orderProcessingTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  orderProcessingContainer: {
    width: "100%",
    height: 180,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "white",
    elevation: 8,
    padding: 10,
  },
  orderStatusItem: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    paddingBottom: 15,
    borderColor: "gray",
  },
  orderStatusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderStatusIcon: {
    width: 25,
    height: 25,
  },
  orderStatusTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderStatusText: {
    marginLeft: 15,
  },
  orderStatusCount: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Home;
