import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import Colors from "../src/Colors";
import EditBlog from "./Blog/EditBlog";
import AddBlog from "./Blog/AddBlog";
import axios from "axios";
import { API_Blog, API_URL } from "../API/getAPI";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuanLiBlog = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState("");

  const getApi = async () => {
    try {
      const response = await axios.get(API_Blog);
      setBlogs(response.data.message);
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
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
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
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      getApi();
    }, [])
  );

  useEffect(() => {
    getApi();
    async function fetchData() {
      setRole(await AsyncStorage.getItem("role"));
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("BlogDetail", { blog: item })}
        style={styles.blogContainer}
      >
        <Image
          style={styles.blogImage}
          source={{ uri: `${API_URL}${item.image}` }}
        />
        <View style={styles.blogTextContainer}>
          <Text style={styles.blogTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.blogDescription} numberOfLines={2}>
            {item.desc}
          </Text>
          <View style={styles.blogActions}>
            <EditBlog getApi={getApi} item={item} />
            {role === "Shop" && (
              <TouchableOpacity onPress={() => deleteApi(item._id)}>
                <Image
                  style={styles.deleteIcon}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3687/3687412.png",
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {role === "Shop" && <AddBlog getApi={getApi} />}
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default QuanLiBlog;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wwhite,
  },
  blogContainer: {
    backgroundColor: Colors.grey,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  blogImage: {
    height: 80,
    width: windowWidth * 0.3,
    borderRadius: 10,
    resizeMode: "contain",
  },
  blogTextContainer: {
    marginLeft: 10,
    flex: 1,
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
    justifyContent: "flex-end",
    marginTop: 10,
    alignItems: "center",
  },
  deleteIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginLeft: 10,
  },
});
