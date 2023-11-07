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
} from "react-native";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Vui lòng nhập đủ các trường dữ liệu");
      return;
    }

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
    } catch (error) {
      console.error("Put api: " + error.message);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setOldPassword}
        placeholder="Mật khẩu mới"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        placeholder="Xác nhận mật khẩu"
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginTop: 50,
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
  },
});

export default ChangePassword;
