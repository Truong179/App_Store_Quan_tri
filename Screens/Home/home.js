import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const listFunctions = [
  {
    name: "Sản phẩm",
    image: require("../../Image/product.png"),
    color: "green",
  },
  {
    name: "Đơn hàng",
    image: require("../../Image/order_menu.png"),
    color: "blue",
  },
  {
    name: "Giảm giá",
    image: require("../../Image/discount.png"),
    color: "red",
  },
  {
    name: "Xem thêm",
    image: require("../../Image/see_more.png"),
    color: "gray",
  },
];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.avatar}
            source={require("../../Image/logo.png")}
          />
          <Text style={styles.textLogo}>IStore</Text>
        </View>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../Image/notification.png")}
        />
      </View>
      <View style={styles.statistical}>
        <View style={styles.statisticalDay}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Doanh thu ngày
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              2.500.000 Đ
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: "gray",
              }}
              source={require("../../Image/statistical.png")}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Thống kê");
              }}
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                Xem chi tiết
              </Text>
              <Image
                style={{
                  width: 17,
                  height: 17,
                }}
                source={require("../../Image/next.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statisticsOrder}>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              height: 68,
              borderRightWidth: 0.5,
              borderColor: "gray",
            }}
          >
            <Text>Đơn hàng</Text>
            <Text style={{ fontWeight: "bold" }}>5</Text>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              height: 68,
            }}
          >
            <Text>Đơn hủy</Text>
            <Text style={{ fontWeight: "bold" }}>3</Text>
          </View>
        </View>
      </View>
      {/*  */}
      <View
        style={{
          height: 120,
          alignItems: "center",
        }}
      >
        <FlatList
          data={listFunctions}
          horizontal={true}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: item.color,
                    margin: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={item.image}
                  />
                </View>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        Đơn hàng đang xử lý
      </Text>

      <View
        style={{
          width: "100%",
          height: 180,
          borderRadius: 5,
          marginTop: 20,
          backgroundColor: "white",
          elevation: 8,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
            borderBottomWidth: 0.4,
            paddingBottom: 15,
            borderColor: "gray",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../Image/handle.png")}
            />
            <Text style={{ marginLeft: 15 }}>Chờ duyệt</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 15, marginRight: 10 }}>3</Text>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../Image/next.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-between",
            borderBottomWidth: 0.4,
            paddingBottom: 15,
            borderColor: "gray",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../Image/shiper.png")}
            />
            <Text style={{ marginLeft: 15 }}>Đang giao</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 15, marginRight: 10 }}>2</Text>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../Image/next.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../Image/success.png")}
            />
            <Text style={{ marginLeft: 15 }}>Đã giao </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 15, marginRight: 10 }}>1</Text>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../Image/next.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
  avatar: {
    width: 60,
    height: 60,
  },
  textLogo: {
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: 55,
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
  statisticsOrder: {
    flexDirection: "row",
  },
  itemFunction: {},
});
