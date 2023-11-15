import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { API_User } from "../../API/getAPI";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Vui lòng nhập đủ các trường dữ liệu");
      return;
    }

    setIsCheck(true);

    try {
      const res = await axios.put(
        `${API_User}${await AsyncStorage.getItem("_idUser")}`,
        {
          oldPassword,
          newPassword,
        }
      );
      if (res.data.status) {
        ToastAndroid.show("Thay đổi mật khẩu thành công", ToastAndroid.SHORT);
        navigation.replace("Main", { screen: "Home" });
      } else {
        setError(res.data.message);
      }
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.error("Put api: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thay Đổi Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        onChangeText={setOldPassword}
        placeholder="Mật khẩu cũ"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        placeholder="Mật khẩu mới"
        secureTextEntry={true}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        disabled={isCheck}
        style={styles.button}
        onPress={handleChangePassword}
      >
        {isCheck ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Xác Nhận</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 8,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});

export default ChangePassword;
