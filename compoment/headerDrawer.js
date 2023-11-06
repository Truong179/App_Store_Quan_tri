import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const CustomDrawerHeader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require("../Image/avatar.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Admin</Text>
        <Text style={styles.whiteText}>Admin@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  whiteText: {
    color: "white",
  },
});

export default CustomDrawerHeader;
