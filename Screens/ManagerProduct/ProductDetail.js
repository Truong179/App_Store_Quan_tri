import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../src/Colors";
import { API_URL } from "../../API/getAPI";
import { formatCurrency } from "../Home";

const ProductDetail = ({ route, navigation }) => {
  // Lấy dữ liệu sản phẩm từ route.params
  const { product, dataType, role } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${API_URL}${product.image}` }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>Giá: {formatCurrency(product.price)}</Text>
        <Text style={styles.quantity}>Số lượng: {product.quantity}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      {role === "Shop" && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditProduct", {
              item: product,
              dataType: dataType,
            })
          }
        >
          <Text style={styles.editButtonText}>Sửa sản phẩm</Text>
        </TouchableOpacity>
      )}
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
    resizeMode: "contain", // Để ảnh không bị căng ra quá mức
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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
  },
  quantity: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: Colors.darkGray,
    marginTop: 16,
  },
  editButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    marginHorizontal: "5%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  editButtonText: {
    color: Colors.wwhite,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetail;
