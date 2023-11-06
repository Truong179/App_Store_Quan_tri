import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/Colors";
import EditBlog from "./EditBlog";
import AddBlog from "./AddBlog";
import axios from "axios";
import { API_Blog } from "../../API/getAPI";

const QuanLiBlog = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getApi = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(API_Blog);
      setBlogs(response.data.message);
      setRefreshing(false);
    } catch (error) {
      console.log("Call API: " + error.message);
    }
  };

  // Delete API
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
              ToastAndroid.show("Xóa blog thành công", ToastAndroid.SHORT);
              getApi();
            } catch (error) {
              console.log("Call API: " + error.message);
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
    getApi();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.grey, marginTop: "2%" }}>
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
      <AddBlog getApi={getApi} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getApi} />
        }
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default QuanLiBlog;
