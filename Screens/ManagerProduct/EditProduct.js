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

const EditProduct = ({ navigation, route }) => {
  const { dataType, item } = route.params;
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState(item.name);
  const [image, setImage] = useState({ uri: item.image });
  const [price, setPrice] = useState(item.price.toString());
  const [disription, setDisription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [value, setValue] = useState(item.id_type._id);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Put api
  const putApi = async () => {
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
    // formData.append("price", price);
    // formData.append("description", disription);
    // formData.append("quantity", quantity);
    // formData.append("id_type", value);

    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("image", { uri: image.uri, name: filename, type });

    try {
      await axios.put(API_Product + item._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.showWithGravity(
        "Sửa sản phẩm thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      navigation.replace("ListProduct");
    } catch (error) {
      console.log("Put api: " + error.message);
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
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              borderRadius: 10,
            }}
            source={{ uri: image.uri }}
          />
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
            value={name}
            onChangeText={setName}
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
            value={disription}
            onChangeText={setDisription}
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
                value={value}
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
              value={price}
              keyboardType="numeric"
              onChangeText={setPrice}
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
              value={quantity}
              keyboardType="numeric"
              onChangeText={setQuantity}
              placeholder="Số lượng sản phẩm"
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => putApi()}>
            <Text style={{ color: "white" }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProduct;

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
