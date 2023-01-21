import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput,ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function App() {
  
  const [weight, setWeight] = useState()
  const [weightsList, setWeightsList] = useState([{date: new Date(), weight: 50}])


  
  const weightX = weightsList.map(weightItem => weightItem.date)
  const weightY = weightsList.map(weightItem => weightItem.weight)

  console.log(weightX, weightY)

  const chartData = {
    labels: weightX,
    datasets:[{
      data: weightY,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }]
  }
  const testData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [
        50,
        20,
        2,
        86,
        71,
        100
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }]
  }

  const testData2 = {
    labels: weightX,
    datasets: [{
      data: weightY,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }]
  }

  const handlePress = (event) => {
    const weightData = { date: new Date(), weight: weight }
    console.log(weightData)
    setWeightsList(prevWeightsList => [...prevWeightsList, weightData])
    console.log(weightsList)
    setWeight()
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Enter your weight</Text>
        <TextInput
          style={{height: 40, borderWidth:0.5, borderRadius:8}}
          placeholder="Enter weight in kg"
          onChangeText={newWeight => setWeight(newWeight)}
          defaultValue={weight}
        />
        <Button
          title="Add"
          onPress={handlePress}
        />

        <Text>Your weight is {weight}. Boom boom</Text>
        <View style={styles.container}>
        <LineChart
          verticalLabelRotation={90}
          data={testData2}
          width={Dimensions.get("window").width}
          height={300}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        </View>
      </View>

      {weightsList && weightsList.map(weightItem => (<Text key={weightItem.date.toLocaleString()}>{weightItem.date.toLocaleString()}: {weightItem.weight}</Text>))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
