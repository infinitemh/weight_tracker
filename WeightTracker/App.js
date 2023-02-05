import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import uuid from "react-native-uuid";
import TimeSeries from "./components/TimeSeries";
import DataInput from "./components/DataInput";

export default function App() {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@weightsList");
      if (jsonValue != null) {
        const jsonParsed = JSON.parse(jsonValue);
        const jsonFormatted = jsonParsed.map((weightItem) => ({
          ...weightItem,
          date: Date.parse(weightItem.date),
          weight: Number.parseFloat(weightItem.weight),
        }));
        setWeightsList(jsonFormatted);
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
      // const storedData = await AsyncStorage.getItem("@weightsList");
      AsyncStorage.getItem("@weightsList")
        .then((value) => console.log(value))
        .catch((error) => console.log(error));
    } catch (e) {
      // handle this
    }
  };

  const handleChange = (newWeight) => setWeight(newWeight);

  const handlePress = async () => {
    const weightData = {
      id: uuid.v4(),
      date: new Date(),
      weight: Number.parseFloat(weight),
    };
    setWeightsList((prevWeightsList) => [...prevWeightsList, weightData]);
    await storeData();
    setWeight("");
  };

  const statusbarStyle =
    Platform.OS === "android" ? styles.androidStatusBar : "";

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={statusbarStyle} />
      <ScrollView>
        {weightsList.length !== 0 && (
          <View className="flex justify-center">
            <Card>
              <Card.Title>Graph</Card.Title>
              <Card.Divider />
              <View className="max-w-sm rounded overflow-hidden shadow-lg">
                <View className="mx-auto">
                  <View>
                    <TimeSeries x={weightX} y={weightY} />
                  </View>
                </View>
              </View>
            </Card>
          </View>
        )}
        <View className="flex justify-center">
          <Card>
            <Card.Title>Add a new weight</Card.Title>
            <Card.Divider />
            <View className="max-w-sm rounded overflow-hidden shadow-lg">
              <View className="px-6 py-4">
                <DataInput
                  weight={weight}
                  handleChange={handleChange}
                  handlePress={handlePress}
                />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      <View className="flex justify-center">
        <Card>
          <Card.Title>History</Card.Title>
          <Card.Divider />
          <View className="max-w-sm rounded overflow-hidden shadow-lg">
            <View className="px-6 py-4">
              <View>
                {weightsList.length !== 0 ? (
                  <FlatList
                    data={weightsList}
                    renderItem={({ item }) => (
                      <Text>
                        {moment(item.date.toLocaleString()).calendar()}:{" "}
                        {item.weight} kg
                      </Text>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                ) : (
                  <Text>Enter a weight to get history.</Text>
                )}
              </View>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidStatusBar: {
    paddingTop: 24,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
