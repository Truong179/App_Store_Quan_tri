import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet, Modal, Alert } from "react-native";
import {
  SearchBar,
  ListItem,
  Avatar,
  Text,
  Button,
} from "react-native-elements";
import { API_URL, API_User, API_User_Info } from "../../API/getAPI";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const InfoAccount = () => {
  const [searchText, setSearchText] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [originalEmployeeList, setOriginalEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getApi = async () => {
    try {
      const res = await axios.get(`${API_User_Info}all`);
      setEmployeeList(res.data.message);
      setOriginalEmployeeList(res.data.message);
    } catch (error) {
      console.log("Call api: ", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getApi();
    }, [])
  );

  const renderEmployeeItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        setSelectedEmployee(item);
        setModalVisible(true);
      }}
    >
      <Avatar
        size={70}
        rounded
        source={{
          uri: item?.avatar
            ? `${API_URL}${item?.avatar}`
            : "https://th.bing.com/th?id=OIF.VrD%2bB9aSlPX%2b8pXlVwXk7g&w=183&h=181&c=7&r=0&o=5&pid=1.7",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item?.fullName}</ListItem.Title>
        <ListItem.Subtitle>Email: {item?.accountID?.email}</ListItem.Subtitle>
        <ListItem.Subtitle
          style={styles.subtitle}
        >{`Vai trò: ${item?.accountID?.role}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const filterEmployees = (text) => {
    setSearchText(text);
    if (text === "") {
      setEmployeeList(originalEmployeeList);
    } else {
      const filteredList = originalEmployeeList.filter((employee) =>
        employee?.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setEmployeeList(filteredList);
    }
  };

  const handleEditRole = async (role) => {
    // Hiển thị cảnh báo xác nhận trước khi sửa vai trò
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc muốn đổi vai trò này thành ${
        role === "User" ? "Staff" : "User"
      } không?`,
      [
        {
          text: "Hủy bỏ",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              await axios.put(
                `${API_User}${selectedEmployee?.accountID?._id}`,
                {
                  role: role === "User" ? "Staff" : "User",
                }
              );
              setModalVisible(false);
              getApi(); // Làm mới danh sách sau khi chỉnh sửa vai trò
            } catch (error) {
              console.log("Error editing role: ", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm nhân viên"
        onChangeText={(text) => filterEmployees(text)}
        value={searchText}
        platform="ios"
        loadingProps={true}
        containerStyle={styles.searchBarContainer}
      />
      <FlatList
        data={employeeList}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item?._id}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <>
                <View style={styles.headerContainer}>
                  <Avatar
                    size={100}
                    rounded
                    source={{
                      uri: selectedEmployee?.avatar
                        ? `${API_URL}${selectedEmployee?.avatar}`
                        : "https://th.bing.com/th?id=OIF.VrD%2bB9aSlPX%2b8pXlVwXk7g&w=183&h=181&c=7&r=0&o=5&pid=1.7",
                    }}
                  />
                  <Text h4 style={styles.employeeName}>
                    {selectedEmployee?.fullName}
                  </Text>
                  <Text style={styles.employeeEmail}>
                    {selectedEmployee?.accountID?.email}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Số điện thoại: {selectedEmployee?.phone || "N/A"}
                  </Text>
                  <Text style={styles.infoText}>
                    Địa chỉ: {selectedEmployee?.address || "N/A"}
                  </Text>
                  <Text style={styles.infoText}>
                    Ngày sinh: {selectedEmployee?.birthday || "N/A"}
                  </Text>
                  <Text style={styles.infoText}>
                    Vai trò: {selectedEmployee?.accountID?.role}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Đổi vai trò"
                    onPress={() =>
                      handleEditRole(selectedEmployee?.accountID?.role)
                    }
                    buttonStyle={styles.editButton}
                    titleStyle={styles.buttonTitle}
                  />
                  <Button
                    title="Đóng"
                    onPress={() => setModalVisible(false)}
                    buttonStyle={styles.closeButton}
                    titleStyle={styles.buttonTitle}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchBarContainer: {
    paddingBottom: 8,
    padding: "4%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  subtitle: {
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  employeeName: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  employeeEmail: {
    color: "#666",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 16,
    color: "#fff",
  },
});

export default InfoAccount;
