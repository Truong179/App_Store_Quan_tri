import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from './Screens/Feed';
import Arrticel from './Screens/Arrticel';
import { NavigationContainer } from '@react-navigation/native';
import QuanLiSP from './Screens/QuanLiSP';
import QuanLiDH from './Screens/QuanLiDH';
import QuanLiBlog from './Screens/QuanLiBlog';
import NhanTin from './Screens/NhanTin';
import ThongKe from './Screens/ThongKe';
import QuenMatKhau from './Screens/QuenMatKhau';
import QuanLiTK from './Screens/QuanLiTK';
import Home from './Screens/Home/home';
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='QuanLiSP'>
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Drawer.Screen name="Quản lí dơn hàng" component={QuanLiDH} />
      <Drawer.Screen name="Quản lí blog" component={QuanLiBlog} />
      <Drawer.Screen name="Nhắn tin" component={NhanTin} />
      <Drawer.Screen name="Thống kê" component={ThongKe} />
      <Drawer.Screen name="Quên mật khẩu" component={QuenMatKhau} />
      <Drawer.Screen name="Quản lí tài khoản" component={QuanLiTK} />

    </Drawer.Navigator> 
    </NavigationContainer>
    
  );
}
export default App;
