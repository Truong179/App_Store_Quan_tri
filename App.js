import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuanLiDH from "./Screens/QuanLiDH";
import ThongKe from "./Screens/ThongKe";
import QuanLiTK from "./Screens/QuanLiTK";
import CustomDrawerHeader from "./compoment/headerDrawer";
import ChangePassword from "./Screens/ManagerAcount/ChangePassword";
import InfoAccount from "./Screens/ManagerAcount/InfoAccount";
import QuanLiBlog from "./Screens/QuanLiBlog";
import ListProduct from "./Screens/QuanLiSp";
import AddProduct from "./Screens/ManagerProduct/addProduct";
import EditProduct from "./Screens/ManagerProduct/EditProduct";
import Login from "./Screens/Login/Login";
import InfoShop from "./Screens/ManagerAcount/InfoShop";
import { MaterialIcons } from "@expo/vector-icons";
import AddAccount from "./Screens/ManagerAcount/AddAccount";
import Home from "./Screens/Home";
import BlogDetail from "./Screens/Blog/BlogDetail ";
import ProductDetail from "./Screens/ManagerProduct/ProductDetail";
import OrderDetail from "./Screens/Navigation_Qldh/OrderDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const DrawerNavigator = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
      async function fetchData() {
        setRole(await AsyncStorage.getItem("role"));
      }

      fetchData();
    }, [role]);
    return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <SafeAreaView>
            <CustomDrawerHeader />
            <DrawerItemList {...props} />
          </SafeAreaView>
        )}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/home_focus.png")
                    : require("./Image/home.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Quản lí dơn hàng"
          component={QuanLiDH}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/order_focus.png")
                    : require("./Image/order.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ListProduct"
          component={ListProduct}
          options={{
            title: "Quản lý sản phẩm",
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/managerProduct_focus.png")
                    : require("./Image/managerProduct.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Quản lí blog"
          component={QuanLiBlog}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/blog_focus.png")
                    : require("./Image/blog.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
        {role === "Shop" && (
          <Drawer.Screen
            name="Thống kê"
            component={ThongKe}
            options={{
              drawerActiveBackgroundColor: "#D3D3D3",
              drawerActiveTintColor: "black",
              drawerIcon: ({ focused, size }) => (
                <Image
                  source={
                    focused
                      ? require("./Image/stats_focus.png")
                      : require("./Image/stats.png")
                  }
                  style={{ height: size, width: size }}
                />
              ),
            }}
          />
        )}
        <Drawer.Screen
          name="Đổi mật khẩu"
          component={ChangePassword}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/clock_focus.png")
                    : require("./Image/clock.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Quản lí tài khoản"
          component={QuanLiTK}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require("./Image/setting_focus.png")
                    : require("./Image/setting.png")
                }
                style={{ height: size, width: size }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: "Thông tin sản phẩm" }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ title: "Thêm sản phẩm" }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{ title: "Sửa sản phẩm" }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ title: "Thông tin đơn hàng" }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ title: "Thông tin blog" }}
        />
        <Stack.Screen
          name="InfoAccount"
          component={InfoAccount}
          options={({ navigation }) => ({
            title: "Danh sách tài khoản",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddAccount")}
              >
                <MaterialIcons name="group-add" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddAccount"
          component={AddAccount}
          options={{ title: "Thêm thành viên" }}
        />
        <Stack.Screen
          name="InfoShop"
          component={InfoShop}
          options={{ title: "Thông tin shop" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
