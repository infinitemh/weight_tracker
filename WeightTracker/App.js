import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeSeries from "./components/TimeSeries";
import DataInput from "./components/DataInput";
// import uuid from 'react-native-uuid';

export default function App() {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@weightsList");
      if (jsonValue != null) {
        const jsonParsed = JSON.parse(jsonValue);
        const jsonFormatted = jsonParsed.map((weightItem) => ({
          date: Date.parse(weightItem.date),
          weight: Number.parseFloat(weightItem.weight),
        }));
        setWeightsList(jsonFormatted);
        // setWeightsList(JSON.parse(jsonValue));
      } else {
        setWeightsList([]);
      }
    } catch (e) {
      // handle this
    }
  };

  useEffect(() => getData, []);

  const [weight, setWeight] = useState("");
  const [weightsList, setWeightsList] = useState([]);

  const weightX = weightsList.map((weightItem) => weightItem.date);
  const weightY = weightsList.map((weightItem) => weightItem.weight);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(weightsList);
      await AsyncStorage.setItem("@weightsList", jsonValue);
      const storedData = await AsyncStorage.getItem("@weightsList");
      console.log(storedData);
    } catch (e) {
      // handle this
    }
  };

  const handleChange = (newWeight) => setWeight(newWeight);

  const handlePress = async () => {
    const weightData = { date: new Date(), weight: Number.parseFloat(weight) };
    setWeightsList((prevWeightsList) => [...prevWeightsList, weightData]);
    await storeData();
    setWeight("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View className="flex justify-center">
        <View className="max-w-sm rounded overflow-hidden shadow-lg">
          <View className="px-6 py-4">
            <Text className="font-bold text-xl mb-2">The Coldest Sunset</Text>

            <Text className="text-gray-700 text-base">Some example</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        {weightsList.length !== 0 && <TimeSeries x={weightX} y={weightY} />}
      </View>

      <DataInput
        weight={weight}
        handleChange={handleChange}
        handlePress={handlePress}
      />

      <View style={styles.container}>
        {weightsList &&
          weightsList.map((weightItem) => (
            <Text key={weightItem.date.toLocaleString()}>
              {weightItem.date.toLocaleString()}: {weightItem.weight}
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
