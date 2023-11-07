import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { validataPassWord } from "../../compoment/validate";
import { API_User } from "../../API/getAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");

  const validateLogin = async () => {
    if (!userName || !passWord) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await axios.post(API_User + "/signIn", {
        email: userName,
        password: passWord,
      });
      if (res.data.error) {
        setError(res.data.error);
      } else {
        if (res.data.role == "Shop") {
          AsyncStorage.setItem("_idUser", res.data._id);
          navigation.navigate("Main", { screen: "Home" });
        } else {
          console.warn(
            "Tài khoản của bạn không thể đăng nhập tại đây\nVui lòng đăng nhập phía khách"
          );
        }
      }
    } catch (error) {
      console.error("Post api:" + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtLogo}>IStore</Text>
        <Text style={styles.txtLogin}>Login</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          onChangeText={(text) => {
            if (text.length > 0) {
              setUserName(text);
              setErrorUserName("");
            } else {
              setErrorUserName("Không được bỏ trống user name");
            }
          }}
          style={styles.textInput}
          placeholder="User name"
        />
        {errorUserName && (
          <Text style={{ color: "red", marginTop: 5, marginStart: 10 }}>
            {errorUserName}
          </Text>
        )}
        <TextInput
          onChangeText={(text) => {
            if (text.length > 0) {
              if (validataPassWord(text)) {
                setPassword(text);
                setErrorPassword("");
              } else {
                setErrorPassword("Password không được quá 15 ký tự");
              }
            } else {
              setErrorPassword("Không được bỏ trống password");
            }
          }}
          secureTextEntry
          style={styles.textInput}
          placeholder="Password"
        />
        {errorPassword && (
          <Text style={{ color: "red", marginTop: 5, marginStart: 10 }}>
            {errorPassword}
          </Text>
        )}
        <Text style={{ marginTop: 7, marginStart: 10 }}>Quên mật khẩu?</Text>
        {error && <Text style={{ color: "red", marginTop: 20 }}>{error}</Text>}

        <TouchableOpacity
          onPress={() => {
            validateLogin();
          }}
          style={styles.btnLogin}
        >
          <Text style={{ color: "white" }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    width: "100%",
    backgroundColor: "black",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: "rgba(248, 248, 248, 1)",
    height: 45,
    borderRadius: 10,
    paddingStart: 15,
    marginTop: 20,
  },
  body: {
    height: "40%",
    backgroundColor: "white",
    marginTop: 5,
    paddingHorizontal: 20,
  },
  txtLogin: {
    fontSize: 26,
    marginTop: 15,
  },
  header: {
    height: "30%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  txtLogo: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Login;
