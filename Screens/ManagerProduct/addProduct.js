import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
// Khai báo các thư viện
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import { API_Product } from "../../API/getAPI";
import axios from "axios";

const AddProduct = ({ navigation, route }) => {
  const { dataType } = route.params;
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [disription, setDisription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Post api
  const postApi = async () => {
    // Kiểm tra dữ liệu trống
    if (!name || !image || !price || !disription || !quantity || !value) {
      ToastAndroid.showWithGravity(
        "Vui lòng không để trống bất kỳ trường nào.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }
    // Khai báo FormData
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", disription);
    formData.append("quantity", quantity);
    formData.append("id_type", value);

    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("image", { uri: image.uri, name: filename, type });

    try {
      await axios.post(API_Product, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.showWithGravity(
        "Thêm sản phẩm thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      navigation.replace("ListProduct");
    } catch (error) {
      console.log("Post api: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#999999",
          }}
          onPress={() => pickImageAsync()}
        >
          {image ? (
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={{ uri: image.uri }}
            />
          ) : (
            <Text style={{ color: "white" }}>Thêm ảnh</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View
          style={{
            marginTop: 10,
            height: 70,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Tên sản phẩm
            </Text>
            <Text style={{ color: "gray" }}>{name.length}/120</Text>
          </View>
          <TextInput
            maxLength={120}
            onChangeText={(text) => {
              setName(text);
            }}
            style={{
              marginTop: 4,
            }}
            placeholder="Nhập tên sản phẩm"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            height: 70,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Mô tả sản phẩm
            </Text>
            <Text style={{ color: "gray" }}>{disription.length}/3000</Text>
          </View>
          <TextInput
            maxLength={3000}
            onChangeText={(text) => {
              setDisription(text);
            }}
            style={{
              marginTop: 4,
            }}
            placeholder="Nhập mô tả sản phẩm"
          />
        </View>

        <View
          style={{
            marginTop: 10,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: "#EEEEEE",
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Thể loại
            </Text>
            <View>
              <Dropdown
                placeholder="Vui lòng chọn"
                placeholderStyle={{ fontSize: 13 }}
                selectedTextStyle={{ fontSize: 13 }}
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                data={dataType}
                labelField="name"
                valueField="_id"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                maxHeight={150}
                onChange={(item) => {
                  setValue(item._id);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              marginTop: 6,
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#EEEEEE",
            }}
          >
            <Text>Giá bán</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => {
                setPrice(text);
              }}
              placeholder="Nhập giá"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              marginTop: 6,
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#EEEEEE",
            }}
          >
            <Text>Số lượng</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => {
                setQuantity(text);
              }}
              placeholder="Số lượng sản phẩm"
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => postApi()}>
            <Text style={{ color: "white" }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddProduct;

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
  body: {
    flex: 1,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 100,
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
});
