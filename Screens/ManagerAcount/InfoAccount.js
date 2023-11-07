import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Colors from "../../src/Colors";

const InformationAcount = (props) => {
  const nav = useNavigation();
  const status = useIsFocused();
  if (status) {
    nav.setOptions({});
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.textTitle}>Email</Text>
          <Text style={styles.textItem}>vanhung@gmail.com</Text>
        </View>
        <Image
          style={styles.lineImage}
          source={require("../../Image/line.png")}
        />
        <View style={styles.infoItem}>
          <Text style={styles.textTitle}>Số điện thoại</Text>
          <Text style={styles.textItem}>098787890</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.changePasswordButton}>
        <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
        <Image
          style={styles.nextImage}
          source={require("../../Image/next.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InformationAcount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  infoContainer: {
    height: 189,
    width: 330,
    backgroundColor: Colors.white,
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
  },
  infoItem: {
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  textItem: {
    color: Colors.gray,
    fontSize: 16,
  },
  lineImage: {
    marginTop: 9,
  },
  changePasswordButton: {
    backgroundColor: Colors.white,
    width: 330,
    height: 55,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
  },
  changePasswordText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nextImage: {
    height: 20,
    width: 20,
  },
  saveButton: {
    width: 330,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 100,
    borderWidth: 1,
    borderRadius: 5,
  },
  saveButtonText: {},
});
