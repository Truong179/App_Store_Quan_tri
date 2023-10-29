import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Feed from './Screens/Feed';
import Arrticel from './Screens/Arrticel';
import { NavigationContainer } from '@react-navigation/native';
import QuanLiSP from './Screens/QuanLiSP';
import QuanLiDH from './Screens/QuanLiDH';
import NhanTin from './Screens/NhanTin';
import ThongKe from './Screens/Stats/ThongKe';
import QuanLiTK from './Screens/ManagerAcount/QuanLiTK';
import Home from './Screens/Home/home';
import { Image } from 'react-native'
import React, { useState } from 'react'
import CustomDrawerHeder from './compoment/headerDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import ChangePassword from './Screens/ChangePassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InformationAcount from './Screens/ManagerAcount/informationAcount';
import QuanLiBlog from './Screens/Blog/QuanLiBlog';
import ListProduct from './Screens/ManagerProduct/listProduct';
import AddProduct from './Screens/ManagerProduct/addProduct';
import Login from './Screens/Login/Login';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const [isLogin, setIsLogin] = useState(false)

  function ManagerAcountNav() {
    return (
      <Stack.Navigator initialRouteName='QuanLiTK'>
        <Stack.Screen name='QuanLiTK' component={QuanLiTK} options={{ headerShown: false }} />
        <Stack.Screen name='InformationAcount' component={InformationAcount} options={{}} />
      </Stack.Navigator>
    )
  }

  function ManagerProductNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='ListProduct' component={ListProduct} options={{ title: "Quản lý sản phẩm" }} />
        <Stack.Screen name='AddProduct' component={AddProduct} options={{ title: "Thêm sản phẩm" }} />
      </Stack.Navigator>
    )
  }

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) =>
          <SafeAreaView>
            <CustomDrawerHeder />
            <DrawerItemList {...props} />
          </SafeAreaView>
        }
      >
        <Drawer.Screen name="Home" component={Home}
          options={{
            headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/home_focus.png') : require('./Image/home.png')} style={{ height: size, width: size, }} />
            )
          }} />
        <Drawer.Screen name="Quản lí dơn hàng" component={QuanLiDH}
          options={{
            // headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/order_focus.png') : require('./Image/order.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="ManagerProductNav" component={ManagerProductNav}
          options={{
            title: "Quản lý sản phẩm",
            headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/managerProduct_focus.png') : require('./Image/managerProduct.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="Quản lí blog" component={QuanLiBlog}
          options={{
            // headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/blog_focus.png') : require('./Image/blog.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="Nhắn tin" component={NhanTin}
          options={{
            // headerShown: false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/chat_focus.png') : require('./Image/chat.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="Thống kê" component={ThongKe}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/stats_focus.png') : require('./Image/stats.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="Đổi mật khẩu" component={ChangePassword}
          options={{
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/clock_focus.png') : require('./Image/clock.png')} style={{ height: size, width: size, }} />
            )
          }}
        />
        <Drawer.Screen name="Quản lí tài khoản" component={ManagerAcountNav}

          options={{
            // headerShown:false,
            drawerActiveBackgroundColor: "#D3D3D3",
            drawerActiveTintColor: "black",
            drawerIcon: ({ focused, size }) => (
              <Image source={focused ? require('./Image/setting_focus.png') : require('./Image/setting.png')} style={{ height: size, width: size, }} />
            )
          }}
        />

      </Drawer.Navigator>
    )
  }

  const LoginNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Login' options={{headerShown:false}}>
          {(props) => <Login {...props} setIsLogin={setIsLogin} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      {isLogin ? <DrawerNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}
export default App;
