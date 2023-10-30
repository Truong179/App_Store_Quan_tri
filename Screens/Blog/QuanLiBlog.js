import {
  Alert,
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../src/Colors";
import EditBlog from "./EditBlog";
import AddBlog from "./AddBlog";
import axios from "axios";
import { API_Blog } from "../../API/getAPI";

const QuanLiBlog = () => {
  const [blog, setBlog] = useState([]);

  // Call api
  const getApi = async () => {
    try {
      const res = await axios.get(API_Blog);
      setBlog(res.data.message);
    } catch (error) {
      console.log("Call api: " + error.message);
    }
  };

  // Delete api
  const deleteApi = (idBlog) => {
    Alert.alert(
      "Thông báo",
      "Bạn muốn xóa blog này chứ!",
      [
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await axios.delete(API_Blog + idBlog);
              ToastAndroid.showWithGravity(
                "Xóa blog thành công",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
              // Gọi lại api
              getApi();
            } catch (error) {
              console.log("Call api: " + error.message);
            }
          },
        },
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    // Lấy blog
    getApi();
  }, []);

  const item = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: Colors.grey,
          marginTop: "2%",
        }}
      >
        <View style={{ flexDirection: "row", margin: 10 }}>
          <View
            style={{
              width: "30%",
              backgroundColor: Colors.grey,
              marginRight: 5,
            }}
          >
            <Image
              style={{
                height: 80,
                width: "100%",
                borderRadius: 10,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
          </View>

          <View style={{ width: "69%" }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text numberOfLines={2}>{item.desc}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <EditBlog item={item} />
          <TouchableOpacity onPress={() => deleteApi(item._id)}>
            <Image
              style={{
                height: 30,
                width: 30,
                alignSelf: "flex-end",
                margin: 10,
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3687/3687412.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.wwhite }}>
      <AddBlog getApi={getApi()} />
      <FlatList
        data={blog}
        keyExtractor={(item) => item._id}
        renderItem={item}
      />
    </View>
  );
};

export default QuanLiBlog;
