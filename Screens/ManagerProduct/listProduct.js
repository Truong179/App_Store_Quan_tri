import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListProduct = () => {
  const nav = useNavigation();
  const listTypeProduct = [
    {
      id: 1,
      name: "IPhone",
      image:
        "https://th.bing.com/th/id/OIP.JA6loYnkXxgyOW12hFS9iAHaDx?w=302&h=178&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    },
    {
      id: 2,
      name: "IPad",
      image:
        "https://th.bing.com/th/id/OIP.DfNYxqCvB_2XQP3ecK1I5wHaE8?w=228&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    },
    {
      id: 3,
      name: "Smart Watch",
      image:
        "https://th.bing.com/th/id/OIP.kiELBb9ik5UeDYVmXvLqrAHaE8?w=238&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    },
    {
      id: 4,
      name: "Macbook",
      image:
        "https://th.bing.com/th/id/OIP.cfYGoQ82IC-c6sGUtgZjTwHaE-?w=253&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    },
    {
      id: 5,
      name: "AirPods",
      image:
        "https://th.bing.com/th/id/OIP.AjlXl1wqvoul19TuTGi2HAHaER?w=289&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    },
  ];

  const listProduct = [
    {
      id: 1,
      name: "IPhone 15, 1T Microphone TiTan",
      image:
        "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/14/638302786719525352_ip-15-pro-max-dd.jpg",
      idType: 1,
      price: 25000000,
    },
    {
      id: 2,
      name: "IPhone 14 Pro Max",
      image:
        "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/1/31/638107858631679725_iphone-14-pro-max-dd-1.jpg",
      idType: 1,
      price: 16000000,
    },
    {
      id: 3,
      name: "IPhone 11 64GB",
      image:
        "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/17/638173197260604063_iphone-11-dd.jpg",
      idType: 1,
      price: 10000000,
    },
  ];

  const [showBtn, setShowBtn] = useState(false);
  const [dataType, setDataType] = useState(listTypeProduct);
  const [dataProduct, setProduct] = useState(listProduct);

  const formatPrice = (price) => {
    return Intl.NumberFormat("vi-VN").format(price);
  };

  const handleShowBtn = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.headerType}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataType}
          onEndReached={handleShowBtn}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.typeProduct}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                    bottom: 10,
                    left: 10,
                    elevation: 3,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {showBtn && <Button title="Them san pham" />}
      </View>

      <View style={styles.content}>
        <FlatList
          data={dataProduct}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.btnProduct}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: "70%",
                    height: "55%",
                    alignSelf: "center",
                  }}
                  source={{ uri: item.image }}
                />
                <View
                  style={{
                    width: "100%",
                    borderTopWidth: 1,
                    marginTop: 10,
                    borderColor: "gray",
                    paddingTop: 6,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      width: "100%",
                      top: 50,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {formatPrice(item.price)}đ
                    </Text>
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                        }}
                        source={require("../../Image/hidden.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("AddProduct", { dataType });
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: "white",
          }}
          source={require("../../Image/addProduct.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerType: {
    width: "100%",
    height: "18%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  typeProduct: {
    width: 150,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btnProduct: {
    width: "45%",
    height: 200,
    backgroundColor: "white",
    marginVertical: 10,
    marginRight: 25,
    padding: 10,
    borderRadius: 10,
  },
});
