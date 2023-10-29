import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Colors from "../../src/Colors";

const InformationAcount = (props) => {
  const nav = useNavigation();
  const status = useIsFocused();
  if (status) {
    nav.setOptions({});
  }
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          height: 189,
          width: 330,
          backgroundColor: Colors.wwhite,
          marginTop: 50,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.textTitle}>Email</Text>
          <Text style={styles.textItem}>vanhung@gmail.com</Text>
        </View>
        <Image
          style={{ marginTop: 9 }}
          source={require("../../Image/line.png")}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.textTitle}>Số điện thoại</Text>
          <Text style={styles.textItem}>098787890</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.wwhite,
          width: 330,
          height: 55,
          marginTop: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Đổi mật khẩu</Text>
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../Image/next.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logOut}>
        <Text style={{}}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InformationAcount;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  textItem: {
    color: Colors.gray,
    fontSize: 16,
  },
  logOut: {
    width: 330,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 100,
    borderWidth: 1,
    borderRadius: 5,
  },
});
