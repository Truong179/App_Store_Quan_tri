import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../src/Colors";

const AddBlog = () => {
  const [showDialog, setshowDialog] = useState(false);

  return (
    <View>
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
              width: "80%",
              alignSelf: "center",
              height: "80%",
              elevation: 2,
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
              Add blog
            </Text>
            <View style={{ margin: 10 }}>
              <Text style={styles.title}>Tiêu đề</Text>
              <TextInput placeholder="Tiêu đề" style={styles.input} />
              <Text style={styles.title}>Nội dung</Text>

              <TextInput placeholder="Nội dung bài viết" style={styles.input} />
              <Text style={styles.title}>Ảnh</Text>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: Colors.gray,
                  alignSelf: "center",
                }}
              />
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
            >
              <Text
                style={{
                  color: Colors.wwhite,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setshowDialog(true)}>
          <Image
            style={{
              height: 30,
              width: 30,
              alignSelf: "flex-end",
              marginRight: 20,
            }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/262/262038.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBlog;

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
