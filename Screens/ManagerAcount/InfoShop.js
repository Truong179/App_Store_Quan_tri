import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/Colors";

const InfoShop = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Liên hệ</Text>
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text>IStore</Text>
        </View>
        <Image
          style={styles.lineImage}
          source={require("../../Image/line.png")}
        />
        <View style={styles.infoItem}>
          <TextInput value="0978786765" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Địa chỉ</Text>
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <TextInput value="Hà Nội, Quận Nam Từ Liêm, Phường Cầu Diễn" />
        </View>
        <Image
          style={styles.lineImage}
          source={require("../../Image/line.png")}
        />
        <View style={styles.infoItem}>
          <TextInput value="Ký Túc Xá Mỹ Đình 3, Đường Hàm Nghi" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
  },
  infoSection: {
    height: 120,
    width: "100%",
    backgroundColor: Colors.wwhite,
    justifyContent: "center",
  },
  infoItem: {
    padding: 10,
  },
  lineImage: {
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: Colors.black,
    borderRadius: 5,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    width: 330,
  },
  buttonText: {
    color: Colors.white,
  },
});
