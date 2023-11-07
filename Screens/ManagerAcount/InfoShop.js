import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_User_Info } from "../../API/getAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoShop = ({ navigation }) => {
  const [idInfo, setIdInfo] = useState();
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("birthday", birthday);
    formData.append("phoneNumber", phoneNumber);

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
      navigation.replace("Main", { screen: "Home" });
    } catch (error) {
      console.log("Post api: " + error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: { accountID: await AsyncStorage.getItem("_idUser") },
      });
      setIdInfo(res.data.message._id);
      setAvatar({ uri: res.data.message?.avatar });
      setFullName(res.data.message?.fullName);
      setAddress(res.data.message?.address);
      setBirthday(res.data.message?.birthday);
      setPhoneNumber(res.data.message?.phone.toString());
    } catch (error) {
      console.error("Call api: " + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
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
          label="Tên shop"
          value={fullName}
          maxLength={30}
          onChangeText={(text) => setFullName(text)}
        />
        <InputField
          label="Địa chỉ shop"
          value={address}
          maxLength={200}
          onChangeText={(text) => setAddress(text)}
        />
        <InputField
          label="Ngày thành lập"
          value={birthday}
          maxLength={10}
          onChangeText={(text) => setBirthday(text)}
        />
        <NumericInput
          label="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleUpdate()}>
          <Text style={styles.btnText}>Xác nhận</Text>
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
        >{`${value.length}/${maxLength}`}</Text>
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
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  imagePicker: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#999999",
  },
  imagePreview: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
  },
  imageText: {
    color: "white",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 10,
    height: 70,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
  },
  inputCounter: {
    color: "gray",
  },
  input: {
    marginTop: 4,
  },
  dropdownContainer: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 100,
  },
  dropdownPlaceholder: {
    fontSize: 13,
  },
  dropdownSelectedText: {
    fontSize: 13,
  },
  dropdownFocus: {
    borderColor: "blue",
  },
  btn: {
    width: "100%",
    height: 40,
    backgroundColor: "black",
    marginTop: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
});

export default InfoShop;
