import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import ChartComponent from '../../compoment/ChartCompoment';
import { FlatList } from 'react-native';
const ThongKe = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Hôm nay', value: 'Hôm nay' },
    { label: 'Hôm qua', value: 'Hôm qua' },
    { label: 'Tuần trước', value: 'Tuần trước' },
  ]);

  const dataStats = [
    {
      name: "Sản phẩm",
      Quantity: 3.23,
      percent: 3.12
    },
    {
      name: "Khách hàng",
      Quantity: 13.23,
      percent: 8.12
    },
    {
      name: "Sản phẩm đã bán",
      Quantity: 30.23,
      percent: 10.23
    },
  ]


  const CustomNumber = (number) =>{
     return (Math.round(number * 10) / 10).toFixed(1)
  }
  const CustomTextInLine = (text) =>{
    return 
  }


  return (
    <View style={{
      flex: 1, paddingHorizontal: 20
    }}>
      <View style={styles.turnover}>
        <View>
          <Text style={{
            fontSize: 18
          }}>Tổng doanh thu:</Text>
          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 5,
          }}>1.000.000đ</Text>
        </View>
        <View style={{
          position: "relative"
        }}>
          <DropDownPicker
            style={{ width: 100, height: 30, }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder='Hôm nay'
            listItemLabelStyle={{
              fontSize: 12,
              zIndex: 999
            }}
            textStyle={{
              fontSize: 12
            }}
          />

        </View>

      </View>
      <View style={{
        flexDirection: "row", marginTop: 25, zIndex: -999
      }}>
        <FlatList
          data={dataStats}
          horizontal={true}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            return (
              <View style={styles.stats}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 17 }}>{item.name}</Text>
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>{CustomNumber(item.Quantity)}k</Text>
                  <Text style={{ color: "green", fontSize: 18 }}>{CustomNumber(item.percent)}%</Text>
                </View>
              </View>
            )
          }}
        />


      </View>

      <View style={{
        width: "100%",
        height: 260, marginTop: 20,
        padding: 10, backgroundColor: "white", borderRadius: 10
      }}>

        <Text style={{
          fontWeight: "bold", marginVertical: 10, fontSize: 18
        }}>
          Biến động lợi nhuận
        </Text>

        <ChartComponent />
      </View>



    </View>
  )
}

export default ThongKe

const styles = StyleSheet.create({
  turnover: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    marginTop: 25,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stats: {
    width: 150,
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight:10

  }
})