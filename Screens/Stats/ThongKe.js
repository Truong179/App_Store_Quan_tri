import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ChartComponent from "../../compoment/ChartCompoment";

const dataStats = [
  { name: "Sản phẩm", Quantity: 3.23, percent: 3.12 },
  { name: "Khách hàng", Quantity: 13.23, percent: 8.12 },
  { name: "Sản phẩm đã bán", Quantity: 30.23, percent: 10.23 },
];

const ThongKe = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Hôm nay", value: 1 },
    { label: "Hôm qua", value: 2 },
    { label: "Tuần trước", value: 3 },
    { label: "Tuần trước", value: 4 },
  ]);

  const CustomNumber = (number) => {
    return (Math.round(number * 10) / 10).toFixed(1);
  };

  const renderStatsItem = ({ item }) => (
    <View style={styles.stats}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 17 }}>
        {item.name}
      </Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {CustomNumber(item.Quantity)}k
        </Text>
        <Text style={{ color: "green", fontSize: 18 }}>
          {CustomNumber(item.percent)}%
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.turnover}>
        <View style={styles.turnoverInfo}>
          <Text style={styles.turnoverLabel}>Tổng doanh thu</Text>
          <Text style={styles.turnoverValue}>1.000.000đ</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Hôm nay"
          />
        </View>
      </View>
      <View style={styles.statsContainer}>
        <FlatList
          data={dataStats}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={renderStatsItem}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Biến động lợi nhuận</Text>
        <ChartComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "2%",
  },
  turnover: {
    height: 100,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  turnoverInfo: {
    alignItems: "center",
    marginHorizontal: "2%",
  },
  turnoverLabel: {
    fontSize: 18,
  },
  turnoverValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  dropdownContainer: {
    marginHorizontal: "2%",
  },
  dropdown: {
    width: 120,
  },
  statsContainer: {
    marginTop: 25,
    zIndex: -1,
  },
  stats: {
    width: 150,
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: -1,
  },
  chartTitle: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
  },
});

export default ThongKe;
