import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function TimeSeries({ x, y }) {
  const chartData = {
    labels: x,
    datasets: [
      {
        data: y,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      },
    ],
  };

  return (
    <LineChart
      verticalLabelRotation={90}
      data={chartData}
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height / 4}
      yAxisSuffix="kg"
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#11b069",
        backgroundGradientTo: "rgb(140, 216, 25)",
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#cccccc",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}

export default TimeSeries;
