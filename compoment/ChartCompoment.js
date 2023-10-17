import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const data = {
  labels: ['09:00', '14:00', '15:00', '18:00', '21:00'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
    },
  ],
};

const ChartComponent = () => {
  return (
    <View>
      <LineChart
        data={data}
        width={300}
        height={200}
        yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          formatXLabel:value => `$ ${value}`
        }}
      />
    </View>
  );
};

export default ChartComponent;
