import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Colors from "../../src/Colors";
import { API_URL } from "../../API/getAPI";
import moment from "moment";

const BlogDetail = ({ route }) => {
  const { blog } = route.params;

  // Định dạng thời gian sử dụng thư viện moment
  const formattedDate = moment(blog.createdAt).format("DD/MM/YYYY HH:mm");

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: `${API_URL}${blog.image}` }} />
      <View style={styles.contentContainer}>
        <Text style={styles.date}>Ngày đăng: {formattedDate}</Text>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.description}>{blog.desc}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.black,
  },
  description: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 8,
  },
});

export default BlogDetail;
