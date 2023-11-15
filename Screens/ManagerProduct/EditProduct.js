import React, { useState } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import { API_Product, API_URL } from "../../API/getAPI";
import axios from "axios";

const EditProduct = ({ navigation, route }) => {
  const { dataType, item } = route.params;
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState(item.name);
  const [image, setImage] = useState({ uri: `${API_URL}${item.image}` });
  const [price, setPrice] = useState(item.price.toString());
  const [disription, setDisription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [value, setValue] = useState(item.id_type._id);
  const [isCheck, setIsCheck] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const putApi = async () => {
    if (!name || !image || !price || !disription || !quantity || !value) {
      ToastAndroid.showWithGravity(
        "Vui lòng không để trống bất kỳ trường nào.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }

    setIsCheck(true);

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
      navigation.navigate("Main", { screen: "ListProduct" });
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.log("Put api: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImageAsync()}
        >
          <Image style={styles.imagePreview} source={{ uri: image.uri }} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <InputField
          label="Tên sản phẩm"
          value={name}
          maxLength={120}
          onChangeText={setName}
        />
        <InputField
          label="Mô tả sản phẩm"
          value={disription}
          maxLength={3000}
          onChangeText={setDisription}
        />

        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Vui lòng chọn"
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            style={[styles.dropdown, isFocus && styles.dropdownFocus]}
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

        <NumericInput label="Giá bán" value={price} onChangeText={setPrice} />
        <NumericInput
          label="Số lượng"
          value={quantity}
          onChangeText={setQuantity}
        />

        <TouchableOpacity
          disabled={isCheck}
          style={styles.btn}
          onPress={() => putApi()}
        >
          {isCheck ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.btnText}>Xác nhận</Text>
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
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#999999",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginTop: 10,
    height: 70,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
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
    borderRadius: 10,
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

export default EditProduct;
