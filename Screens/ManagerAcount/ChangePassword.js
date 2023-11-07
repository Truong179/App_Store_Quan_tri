import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Mật khẩu mới" />
      <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" />
      <TouchableOpacity style={styles.button}>
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
