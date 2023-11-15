import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_URL, API_User_Info } from "../../API/getAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoShop = ({ navigation }) => {
  const [idInfo, setIdInfo] = useState();
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [role, setRole] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    if (!avatar || !fullName || !address || !birthday || !phoneNumber) {
      ToastAndroid.show("Vui lòng nhập đầy đủ các trường", ToastAndroid.SHORT);
      return;
    }

    setIsCheck(true);
    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("birthday", birthday);
    formData.append("phone", phoneNumber);

    let localUri = avatar.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("avatar", { uri: avatar.uri, name: filename, type });

    try {
      await axios.put(`${API_User_Info}${idInfo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.show("Lưu thông tin thành công", ToastAndroid.SHORT);
      navigation.replace("Main");
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.log("Post api: " + error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: { accountID: await AsyncStorage.getItem("_idUser") },
      });
      setIdInfo(res.data.message._id);
      setAvatar({ uri: `${API_URL}${res.data.message?.avatar}` });
      setFullName(res.data.message?.fullName);
      setAddress(res.data.message?.address);
      setBirthday(res.data.message?.birthday);
      setPhoneNumber(res.data.message?.phone);
    } catch (error) {
      console.error("Call api: " + error.message);
    }
  };

  useEffect(() => {
    getApi();
    async function fetchData() {
      setRole(await AsyncStorage.getItem("role"));
    }

    fetchData();
  }, [role]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImageAsync()}
        >
          {avatar?.uri ? (
            <Image style={styles.imagePreview} source={{ uri: avatar?.uri }} />
          ) : (
            <Text style={styles.imageText}>Chọn ảnh</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <InputField
          label={role === "Shop" ? "Tên shop" : "Họ tên"}
          value={fullName}
          maxLength={30}
          onChangeText={(text) => setFullName(text)}
        />
        <InputField
          label={role === "Shop" ? "Địa chỉ shop" : "Địa chỉ"}
          value={address ? address : ""}
          maxLength={200}
          onChangeText={(text) => setAddress(text)}
        />
        <InputField
          label={role === "Shop" ? "Ngày thành lập" : "Ngày sinh"}
          value={birthday ? birthday : ""}
          maxLength={10}
          onChangeText={(text) => setBirthday(text)}
        />
        <NumericInput
          label="Số điện thoại"
          value={phoneNumber ? phoneNumber : ""}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity
          disabled={isCheck}
          style={styles.btn}
          onPress={() => handleUpdate()}
        >
          {isCheck ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.btnText}>Cập nhật</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputField = ({ label, value, maxLength, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputHeader}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Text
          style={styles.inputCounter}
        >{`${value?.length}/${maxLength}`}</Text>
      </View>
      <TextInput
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={`Nhập ${label.toLowerCase()}`}
      />
    </View>
  );
};

const NumericInput = ({ label, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputHeader}>
        <Text style={styles.inputLabel}>{label}</Text>
      </View>
      <TextInput
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => onChangeText(parseInt(text) || 0)}
        style={styles.input}
        placeholder={`Nhập ${label.toLowerCase()}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  imageText: {
    color: "white",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: "#555",
  },
  inputCounter: {
    color: "#888",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  btn: {
    width: "100%",
    height: 40,
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
});

export default InfoShop;
