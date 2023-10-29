import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../src/Colors";

const InfoShop = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 20,
          marginLeft: 10,
          fontSize: 16,
          color: Colors.gray,
        }}
      >
        Liên hệ
      </Text>
      <View
        style={{
          height: 120,
          width: "100%",
          backgroundColor: Colors.wwhite,
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 10 }}>
          <Text>IStore</Text>
        </View>
        <Image
          style={{ width: "100%" }}
          source={require("../../Image/line.png")}
        />
        <View style={{ padding: 10 }}>
          <TextInput value="0978786765" />
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          color: Colors.gray,
          marginTop: 30,
          marginBottom: 20,
          marginLeft: 10,
        }}
      >
        Địa chỉ
      </Text>
      <View
        style={{
          height: 120,
          width: "100%",
          backgroundColor: Colors.wwhite,
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 10 }}>
          <TextInput value="Hà Nội, Quận Nam Từ Liêm, Phường Cầu Diễn" />
        </View>
        <Image
          style={{ width: "100%" }}
          source={require("../../Image/line.png")}
        />
        <View style={{ padding: 10 }}>
          <TextInput value="Ký Túc Xá Mỹ Đình 3, Đường Hàm Nghi" />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.black,
            borderRadius: 5,
            height: 38,
            alignItems: "center",
            justifyContent: "center",
            width: 330,
            marginTop: 50,
          }}
        >
          <Text style={{ color: Colors.wwhite }}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoShop;

const styles = StyleSheet.create({});
