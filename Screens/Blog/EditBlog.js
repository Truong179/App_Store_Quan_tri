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

  const putApi = async () => {
    if (!title || !image || !desc) {
      ToastAndroid.showWithGravity(
        "Vui lòng không để trống bất kỳ trường nào.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }

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
      getApi();
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
        onRequestClose={() => setshowDialog(false)}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setshowDialog(false)}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit blog</Text>
          <View style={styles.modalContent}>
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
              style={styles.imagePicker}
              onPress={() => pickImageAsync()}
            >
              {image ? (
                <Image style={styles.image} source={{ uri: image.uri }} />
              ) : (
                <Text>Chọn ảnh</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={() => putApi()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setshowDialog(true)}>
        <Image
          style={styles.addButton}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3597/3597075.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.wwhite,
    elevation: 2,
    width: "80%",
    alignSelf: "center",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 20,
  },
  closeText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 20,
    marginTop: 10,
  },
  modalTitle: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
  },
  modalContent: {
    margin: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    height: 50,
    margin: 10,
  },
  imagePicker: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: Colors.black,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 10,
  },
  saveText: {
    color: Colors.wwhite,
    fontWeight: "bold",
    fontSize: 18,
  },
  addButton: {
    height: 30,
    width: 30,
    margin: 10,
  },
});

export default EditBlog;
