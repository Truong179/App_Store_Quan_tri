// OrderDetail.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_User_Pay, API_URL } from "../../API/getAPI";
import Colors from "../../src/Colors";
import { formatCurrency } from "../Home";

const OrderDetail = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDuyet = async () => {
    try {
      if (!isProcessing) {
        setIsProcessing(true);
        await axios.put(`${API_User_Pay}${order._id}`, {
          status: "Đang vận chuyển",
          updateAll: false,
        });
        setNotification("Duyệt đơn hàng thành công");
        setTimeout(() => {
          setNotification(null);
          navigation.goBack();
        }, 2000);
      }
    } catch (error) {
      console.error("Put API: " + error.message);
      setNotification("Đã xảy ra lỗi khi duyệt đơn hàng");
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thông tin đơn hàng</Text>
      {notification && <Text style={styles.notification}>{notification}</Text>}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Người dùng:</Text>
        <Text>{order?.userId?.fullName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text>{order?.userId?.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text>{order?.userId?.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={styles.status}>{order.status}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ngày mua:</Text>
        <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.price}>
          {formatCurrency(order?.productId?.price)}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Ảnh sản phẩm:</Text>
        <Image
          style={styles.productImage}
          source={{ uri: `${API_URL}${order?.productId?.image}` }}
        />
      </View>
      <Text style={styles.label}>Tên sản phẩm:</Text>
      <Text style={styles.productName}>{order?.productId?.name}</Text>

      {/* ... hiển thị thông tin khác ... */}

      {/* Hiển thị nút Duyệt nếu đơn hàng chờ duyệt */}
      {order.status === "Đang xử lý" && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleDuyet}
          disabled={isProcessing}
        >
          <Text style={{ color: Colors.wwhite }}>
            {isProcessing ? "Đang xử lý..." : "Duyệt"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wwhite,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.black,
  },
  notification: {
    fontSize: 16,
    color: Colors.green,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    color: Colors.black,
  },
  status: {
    fontWeight: "bold",
    color: Colors.green,
  },
  price: {
    fontWeight: "bold",
    color: Colors.red,
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.black,
  },
  imageContainer: {
    marginBottom: 16,
  },
  productImage: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
});

export default OrderDetail;
