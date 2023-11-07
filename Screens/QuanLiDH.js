import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DonHang from "./Navigation_Qldh/DonHang";
import DangGiao from "./Navigation_Qldh/DangGiao";
import DaGiao from "./Navigation_Qldh/DaGiao";
import DaHuy from "./Navigation_Qldh/DaHuy";
import Colors from "../src/Colors";

const Tab = createMaterialTopTabNavigator();

const QuanLiDH = () => {
  return (
    <Tab.Navigator
      initialRouteName="DonHang"
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarStyle: { backgroundColor: Colors.wwhite },
        tabBarInactiveTintColor: Colors.gray,
      }}
    >
      <Tab.Screen
        name="DonHang"
        component={DonHang}
        options={{ tabBarLabel: "Đơn hàng" }}
      />
      <Tab.Screen
        name="DangGiao"
        component={DangGiao}
        options={{ tabBarLabel: "Đang giao" }}
      />
      <Tab.Screen
        name="DaGiao"
        component={DaGiao}
        options={{ tabBarLabel: "Đã giao" }}
      />
      <Tab.Screen
        name="DaHuy"
        component={DaHuy}
        options={{ tabBarLabel: "Đã hủy" }}
      />
    </Tab.Navigator>
  );
};

export default QuanLiDH;
