import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeSeries from "./components/TimeSeries";

export default function App() {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@weightsList");
      if (jsonValue != null) {
        setWeightsList(JSON.parse(jsonValue));
      } else {
        setWeightsList([]);
      }
    } catch (e) {
      // handle this
    }
  };

  useEffect(() => getData, []);

  const [weight, setWeight] = useState();
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

  const handlePress = async () => {
    const weightData = { date: new Date(), weight };
    setWeightsList((prevWeightsList) => [...prevWeightsList, weightData]);
    await storeData();
    setWeight();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>Enter your weight</Text>
        <TextInput
          style={{
            height: 40,
            width: 300,
            borderWidth: 0.5,
            borderRadius: 8,
          }}
          placeholder="Enter weight in kg"
          onChangeText={(newWeight) => setWeight(newWeight)}
          defaultValue={weight}
          inputMode="numeric"
          keyboardType="numeric"
          clearButtonMode="always"
          returnKeyType="done"
        />
        <Button title="Add" onPress={handlePress} />

        <Text>Your weight is {weight}. Boom boom</Text>
      </View>

      <View style={styles.container}>
        {weightsList.length !== 0 && <TimeSeries x={weightX} y={weightY} />}
      </View>

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
