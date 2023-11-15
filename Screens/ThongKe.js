import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ChartComponent from "../compoment/ChartCompoment";

const dataStats = [
  { name: "Sản phẩm", quantity: 3.23, percent: 3.12 },
  { name: "Khách hàng", quantity: 13.23, percent: 8.12 },
  { name: "Sản phẩm đã bán", quantity: 30.23, percent: 10.23 },
];

const ThongKe = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    { label: "Hôm nay", value: 1 },
    { label: "Hôm qua", value: 2 },
    { label: "Tuần trước", value: 3 },
    { label: "Tháng trước", value: 4 },
  ]);

  const CustomNumber = (number) => {
    return (Math.round(number * 10) / 10).toFixed(1);
  };

  const renderStatsItem = ({ item }) => (
    <View style={styles.stats}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsName}>
        {item.name}
      </Text>
      <View style={styles.statsDetails}>
        <Text style={styles.statsValue}>{CustomNumber(item.quantity)}k</Text>
        <Text style={styles.statsPercent}>{CustomNumber(item.percent)}%</Text>
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
    marginHorizontal: 10,
    marginTop: 20,
  },
  turnover: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  turnoverInfo: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  turnoverLabel: {
    fontSize: 18,
    color: "#333",
  },
  turnoverValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  dropdownContainer: {
    marginHorizontal: 10,
  },
  dropdown: {
    width: 120,
  },
  statsContainer: {
    marginTop: 20,
    zIndex: -1,
  },
  stats: {
    width: 150,
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    elevation: 2,
  },
  statsName: {
    fontSize: 16,
    color: "#333",
  },
  statsDetails: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statsPercent: {
    fontSize: 16,
    color: "green",
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: -1,
    padding: 15,
  },
  chartTitle: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});

export default ThongKe;
