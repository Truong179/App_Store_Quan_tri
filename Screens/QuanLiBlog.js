import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../src/Colors";
import EditBlog from "./Blog/EditBlog";
import AddBlog from "./Blog/AddBlog";
import axios from "axios";
import { API_Blog } from "../API/getAPI";

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
      <View style={styles.blogContainer}>
        <View style={styles.blogContent}>
          <Image style={styles.blogImage} source={{ uri: item.image }} />
          <View style={styles.blogTextContainer}>
            <Text style={styles.blogTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.blogDescription} numberOfLines={2}>
              {item.desc}
            </Text>
          </View>
        </View>
        <View style={styles.blogActions}>
          <EditBlog getApi={getApi} item={item} />
          <TouchableOpacity onPress={() => deleteApi(item._id)}>
            <Image
              style={styles.deleteIcon}
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wwhite,
  },
  blogContainer: {
    backgroundColor: Colors.grey,
    marginTop: "2%",
  },
  blogContent: {
    flexDirection: "row",
    margin: 10,
  },
  blogImage: {
    height: 80,
    width: "30%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  blogTextContainer: {
    width: "69%",
    left: "5%",
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  blogDescription: {
    fontSize: 16,
  },
  blogActions: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  deleteIcon: {
    height: 30,
    width: 30,
    alignSelf: "flex-end",
    margin: 10,
  },
});
