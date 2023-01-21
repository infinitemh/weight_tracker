import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function App() {
  
  const [weight, setWeight] = useState()
  const [weightsList, setWeightsList] = useState([])

  const handlePress = (event) => {
    const weightData = { date: new Date(), weight: weight }
    console.log(weightData)
    setWeightsList(prevWeightsList => [weightData, ...prevWeightsList])
    console.log(weightsList)
    setWeight()
  }

  return (
    <View style={styles.container}>
      <Text>Enter your weight</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Enter weight in kg"
        onChangeText={newWeight => setWeight(newWeight)}
        defaultValue={weight}
      />
      <Text>Your weight is {weight}. Boom boom</Text>
      <Button
        title="Add"
        onPress={handlePress}
      />
      {weightsList && weightsList.map(weightItem => (<Text>{weightItem.date.toLocaleString()}: {weightItem.weight}</Text>))}
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
