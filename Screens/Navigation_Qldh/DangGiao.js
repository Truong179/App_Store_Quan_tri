import { FlatList, Image, Text, View } from "react-native";
import React from "react";
import Colors from "../../src/Colors";

const DangGiao = () => {
  const donhang = [
    {
      id: "1",
      avatar:
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
      name: "TruongNguyen",
      image:
        "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
      soluong: "1",

      giatien: "20000000",
      trangthai: "Đang giao",
      tensp: "Macbook pro",
    },
    {
      id: "2",
      avatar:
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
      name: "TruongNguyen",
      image:
        "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
      soluong: "1",

      giatien: "20000000",
      trangthai: "Đang giao",
      tensp: "Macbook pro",
    },
    {
      id: "3",
      avatar:
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
      name: "TruongNguyen",
      image:
        "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
      soluong: "1",

      giatien: "20000000",
      trangthai: "Đang giao",
      tensp: "Macbook pro",
    },
  ];
  const renderDonhang = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 5,
              }}
              source={{ uri: item.avatar }}
            />
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ color: Colors.green }}>{item.trangthai}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ height: 40, width: 50, marginRight: 5 }}
              source={{ uri: item.image }}
            />
            <Text>{item.tensp}</Text>
          </View>
          <View>
            <Text>x{item.soluong}</Text>
            <Text style={{ color: Colors.red }}>${item.giatien}</Text>
          </View>
        </View>
        <View>
          <Image source={require("../../src/icons/line.png")} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text>1 sản phẩm</Text>
          <Text>Thành tiền: {item.giatien} </Text>
        </View>
        <View>
          <Image source={require("../../src/icons/line.png")} />
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: Colors.wwhite, flex: 1 }}>
      <FlatList
        data={donhang}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={renderDonhang}
      ></FlatList>
    </View>
  );
};

export default DangGiao;
