import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../src/Colors";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_Blog } from "../../API/getAPI";

const EditBlog = (props) => {
  const { getApi, item } = props;
  const [showDialog, setshowDialog] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [desc, setDesc] = useState(props.item.desc);
  const [image, setImage] = useState({ uri: props.item.image });

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
    if (!title || !image || !desc) {
      ToastAndroid.showWithGravity(
        "Vui lòng không để trống bất kỳ trường nào.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }
    // Khai báo FormData
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);

    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("image", { uri: image.uri, name: filename, type });

    try {
      await axios.put(API_Blog + item._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.showWithGravity(
        "Sửa blog thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      // Reset lại dữ liệu từ componet cha
      getApi;
      // Tắt modal khi thành công
      setshowDialog(false);
    } catch (error) {
      console.log("Put api: " + error.message);
    }
  };

  return (
    <View>
      <Modal
        visible={showDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setshowDialog(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors.wwhite,
            elevation: 2,
            width: "80%",
            alignSelf: "center",
            height: "80%",
          }}
        >
          <TouchableOpacity
            style={styles.andialog}
            onPress={() => {
              setshowDialog(false);
            }}
          >
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "right",
                marginRight: 20,
                fontSize: 20,
                marginTop: 10,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.black,
            }}
          >
            Edit blog
          </Text>
          <View style={{ margin: 10 }}>
            <Text style={styles.title}>Tiêu đề</Text>
            <TextInput
              placeholder="Tiêu đề"
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
            <Text style={styles.title}>Nội dung</Text>
            <TextInput
              placeholder="Nội dung bài viết"
              style={styles.input}
              onChangeText={setDesc}
              value={desc}
            />
            <Text style={styles.title}>Ảnh</Text>
            <TouchableOpacity
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                backgroundColor: Colors.gray,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => pickImageAsync()}
            >
              <Image
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: "contain",
                  borderRadius: 10,
                }}
                source={{ uri: image.uri }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              width: 100,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              alignSelf: "flex-end",
              margin: 10,
            }}
            onPress={() => putApi()}
          >
            <Text
              style={{ color: Colors.wwhite, fontWeight: "bold", fontSize: 18 }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setshowDialog(true)}>
        <Image
          style={{ height: 30, width: 30, margin: 10 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3597/3597075.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EditBlog;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    height: 50,
    margin: 10,
  },
});
