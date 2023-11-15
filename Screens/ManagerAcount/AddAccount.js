import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Avatar, TextInput, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { API_User, API_User_Info } from "../../API/getAPI";

const AddAccount = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isCheck, setIscheck] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleAddEmployee = async () => {
    // Reset thông báo lỗi trước khi kiểm tra
    setErrorText("");

    // Kiểm tra nếu bất kỳ trường nào không được nhập hoặc không đúng định dạng
    if (!name || !email || !password || !role) {
      setErrorText("Vui lòng nhập đầy đủ thông tin và chọn vai trò");
      return;
    }

    // Kiểm tra tên không chứa ký tự số
    if (/\d/.test(name)) {
      setErrorText("Tên không được chứa ký tự số");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorText("Email không hợp lệ");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      setErrorText("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // Kiểm tra vai trò
    if (role === "") {
      setErrorText("Vui lòng chọn vai trò");
      return;
    }

    setIscheck(true);

    try {
      const res = await axios.post(`${API_User}signup`, {
        email,
        passWord: password,
        role,
      });
      if (res.data.error) {
        alert(res.data.error);
      } else {
        await axios.post(API_User_Info, {
          fullName: name,
          accountID: res.data._id,
        });
        ToastAndroid.show("Tạo tài khoản thành công!", ToastAndroid.show);
        // Quay lại màn hình danh sách tài khoản và làm mới danh sách
        navigation.goBack();
      }
      setIscheck(false);
    } catch (error) {
      setIscheck(false);
      console.log("Call api: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={145}
        source={{
          uri: "https://p16.topbuzzcdn.com/img/user-avatar-alisg/8b2d129706043cdf3b7ce9c2f9031cd1~1200x0.image", // Thay đổi URL hình ảnh tượng trưng
        }}
        style={styles.avatar}
      />

      <TextInput
        label="Họ và Tên"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        left={
          <TextInput.Icon icon={() => <FontAwesome name="user" size={24} />} />
        }
        theme={{
          colors: {
            primary: "black",
          },
        }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
        left={
          <TextInput.Icon
            icon={() => <FontAwesome name="envelope" size={24} />}
          />
        }
        theme={{
          colors: {
            primary: "black",
          },
        }}
      />

      <TextInput
        label="Mật khẩu"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        left={
          <TextInput.Icon icon={() => <FontAwesome name="lock" size={24} />} />
        }
        theme={{
          colors: {
            primary: "black",
          },
        }}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Vai Trò</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item enabled={false} label="Chọn role" />
            <Picker.Item label="Khách hàng" value="User" />
            <Picker.Item label="Nhân viên" value="Staff" />
          </Picker>
        </View>
      </View>
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

      <Pressable
        disabled={isCheck}
        mode="contained"
        onPress={handleAddEmployee}
        style={styles.button}
      >
        {isCheck ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }}>
            Thêm
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  avatar: {
    borderWidth: 1,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "green",
    marginBottom: "10%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    color: "black",
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 8,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    borderColor: "black",
  },
  picker: {
    height: 40,
    width: "100%",
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default AddAccount;
