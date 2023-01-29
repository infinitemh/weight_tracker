import { Text, View, Button, TextInput } from "react-native";

function DataInput({ weight, handleChange, handlePress }) {
  return (
    <View>
      <Text>Enter your weight</Text>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderWidth: 0.5,
          borderRadius: 8,
        }}
        placeholder="Enter weight in kg"
        onChangeText={(newWeight) => handleChange(newWeight)}
        value={weight}
        inputMode="numeric"
        keyboardType="numeric"
        clearButtonMode="always"
        returnKeyType="done"
      />
      <Button title="Add" onPress={handlePress} />

      <Text className="text-blue-600">Your weight is {weight}. Boom boom</Text>
    </View>
  );
}

export default DataInput;
