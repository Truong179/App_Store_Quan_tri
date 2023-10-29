import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useRoute } from "@react-navigation/native";

const AddProduct = () => {
  const route = useRoute();
  const { dataType } = route.params;

  const [countName, setCountName] = useState(0);
  const [countDes, setCountDes] = useState(0);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [disription, setDisription] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {/* {image && <FlatList 
                      data={image}
                      horizontal={true}
                      keyExtractor={item => item}
                />} */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: "white",
            }}
            source={require("../../Image/add.png")}
          />
          <Text style={{ color: "white" }}>Thêm ảnh</Text>
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>{countName}</Text>
              <Text style={{ color: "gray" }}>/120</Text>
            </View>
          </View>
          <TextInput
            maxLength={120}
            onChangeText={(text) => {
              setCountName(text.length);
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>{countDes}</Text>
              <Text style={{ color: "gray" }}>/3000</Text>
            </View>
          </View>
          <TextInput
            maxLength={3000}
            onChangeText={(text) => {
              setCountDes(text.length);
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
                valueField="id"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                maxHeight={150}
                onChange={(item) => {
                  setValue(item.id);
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
                setCount(text);
              }}
              placeholder="Số lượng sản phẩm"
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => {}}>
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
