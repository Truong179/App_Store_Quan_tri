import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuanLiTK = () => {
  const nav = useNavigation();
  const [role, setRole] = useState("");

  const navigateTo = (screen) => {
    nav.navigate(screen);
  };

  useEffect(() => {
    async function fetchData() {
      setRole(await AsyncStorage.getItem("role"));
    }

    fetchData();
  }, [role]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {role === "Shop" && (
          <TouchableOpacity
            onPress={() => navigateTo("InfoAccount")}
            style={styles.informationAcount}
          >
            <Image style={styles.icon} source={require("../Image/user.png")} />
            <Text style={styles.label}>Quản trị thành viên</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigateTo("InfoShop")}
          style={styles.informationAcount}
        >
          <Image
            style={styles.icon}
            source={
              role === "Shop"
                ? require("../Image/shop.png")
                : require("../Image/user.png")
            }
          />
          <Text style={styles.label}>
            {role === "Shop" ? "Thông tin Shop" : "Thông tin tài khoản"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logOut}
        onPress={async () => {
          await AsyncStorage.clear();
          nav.replace("Login");
        }}
      >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuanLiTK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  informationAcount: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 15,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 17,
    marginLeft: 15,
    color: "#333",
  },
  logOut: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
  },
  logoutText: {
    fontSize: 16,
    color: "black",
  },
});
