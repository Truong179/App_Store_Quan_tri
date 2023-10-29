import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QuanLiTK = () => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("InformationAcount");
          }}
          style={styles.informationAcount}
        >
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../../Image/user.png")}
          />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            Thông tin tài khoản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.informationAcount}
          onPress={() => {
            nav.navigate("InfoShop");
          }}
        >
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../../Image/shop.png")}
          />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            Thông tin Shop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.informationAcount}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../../Image/pay.png")}
          />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            Rút tiền
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.information2}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../../Image/address.png")}
          />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            Địa chỉ Shop
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logOut}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuanLiTK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    marginTop: 50,
    borderRadius: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  informationAcount: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: "gray",
  },
  information2: {
    flexDirection: "row",
    paddingTop: 15,
    borderColor: "gray",
  },
  logOut: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 150,
    borderWidth: 1,
    borderRadius: 5,
  },
});
