import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_Blog } from "../../API/getAPI";
import Colors from "../../src/Colors";

const AddBlog = (props) => {
  const { getApi } = props;
  const [showDialog, setshowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const postApi = async () => {
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
      await axios.post(API_Blog, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.showWithGravity(
        "Thêm blog thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setImage("");
      getApi();
      setshowDialog(false);
    } catch (error) {
      console.log("Post api: " + error.message);
    }
  };

  return (
    <View>
      <View>
        <Modal
          visible={showDialog}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setshowDialog(false)}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.andialog}
              onPress={() => setshowDialog(false)}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add blog</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Tiêu đề</Text>
              <TextInput
                placeholder="Tiêu đề"
                style={styles.input}
                onChangeText={setTitle}
              />
              <Text style={styles.title}>Nội dung</Text>
              <TextInput
                placeholder="Nội dung bài viết"
                style={styles.input}
                onChangeText={setDesc}
              />
              <Text style={styles.title}>Ảnh</Text>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => pickImageAsync()}
              >
                {image ? (
                  <Image style={styles.image} source={{ uri: image.uri }} />
                ) : (
                  <Text style={styles.imageText}>Chọn ảnh</Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => postApi()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setshowDialog(true)}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/262/262038.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  andialog: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 20,
  },
  closeText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    backgroundColor: Colors.wwhite,
    width: "80%",
    alignSelf: "center",
    height: "80%",
    elevation: 2,
  },
  modalTitle: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
  },
  inputContainer: {
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
  imageContainer: {
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
  imageText: {
    fontSize: 16,
    fontWeight: "bold",
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
  saveButtonText: {
    color: Colors.wwhite,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddBlog;
