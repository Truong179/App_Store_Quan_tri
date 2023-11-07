import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import { API_Product, API_Type_Product } from "../API/getAPI";

const ListProduct = ({ navigation }) => {
  const [dataType, setDataType] = useState([]);
  const [dataProduct, setProduct] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Macbook");

  const formatPrice = (price) => {
    return Intl.NumberFormat("vi-VN").format(price);
  };

  const getApi = async () => {
    setRefreshing(true);
    try {
      const res1 = await axios.get(API_Product, { params: { role: "Shop" } });
      setProduct(res1.data.message);
      const res2 = await axios.get(API_Type_Product);
      setDataType(res2.data.message);
      setRefreshing(false);
    } catch (error) {
      console.log("Call api: " + error.message);
    }
  };

  const putHidden = async (item) => {
    let formData = new FormData();

    let localUri = item.image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("image", { uri: item.image, name: filename, type });
    formData.append("hidden", !item.hidden);

    try {
      await axios.put(`${API_Product}${item._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getApi();
    } catch (error) {
      console.log("Put api: " + error.message);
    }
  };

  const onRefresh = useCallback(() => {
    getApi();
  }, []);

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerType}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataType}
          keyExtractor={(key) => key._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.typeProduct}
                onPress={() => setSelectedCategory(item.name)}
              >
                <Image
                  style={styles.typeProductImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.typeProductName}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container}
      >
        <FlatList
          scrollEnabled={false}
          data={dataProduct[selectedCategory]}
          numColumns={2}
          keyExtractor={(key) => key._id}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.btnProduct}
                onPress={() => {
                  navigation.navigate("EditProduct", {
                    item: item,
                    dataType: dataType,
                  });
                }}
              >
                <Image
                  style={styles.productImage}
                  source={{ uri: item.image }}
                />
                <View style={styles.productInfoContainer}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productQuantity} numberOfLines={2}>
                    Còn: {item.quantity}
                  </Text>
                  <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>
                      {formatPrice(item.price)}đ
                    </Text>
                    <TouchableOpacity onPress={() => putHidden(item)}>
                      <Image
                        style={styles.hiddenIcon}
                        source={
                          item.hidden
                            ? require("../Image/hidden2.png")
                            : require("../Image/hidden.png")
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate("AddProduct", { dataType: dataType });
        }}
        style={styles.addButton}
      >
        <Image
          style={styles.addIcon}
          source={require("../Image/addProduct.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerType: {
    marginTop: "1%",
    width: "100%",
    height: "13%",
    backgroundColor: "white",
    paddingHorizontal: "1%",
  },
  typeProduct: {
    width: 150,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  typeProductImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  typeProductName: {
    position: "absolute",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    bottom: 10,
    left: 10,
    elevation: 3,
  },
  btnProduct: {
    width: "47%",
    height: 230,
    backgroundColor: "white",
    padding: "2%",
    margin: "1%",
    borderRadius: 10,
  },
  productImage: {
    width: "95%",
    height: "65%",
    borderRadius: 10,
    alignSelf: "center",
  },
  productInfoContainer: {
    borderTopWidth: 1,
    marginTop: "4%",
    borderColor: "gray",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  productQuantity: {
    fontWeight: "bold",
    fontSize: 12,
  },
  productPriceContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: "4%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productPrice: {
    fontWeight: "bold",
  },
  hiddenIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  addIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
});

export default ListProduct;
