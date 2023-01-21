import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';

const API_KEY = '2002e58b1b63a441b83a6b24a53cf29a';

export default function WeatherApp() {
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<number>();
  const [weatherFeel, setWetherFeel] = useState<number>();
  const [location, setLocation] = useState<string>('');

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`,
      );
      setWeather(response.data.weather[0].description);
      setTemperature(Math.round(response.data.main.temp));
      setWetherFeel(Math.round(response.data.main.feels_like));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.inputView}
          placeholder="Enter a location"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.buttonView}>
        <Button buttonColor="#05386B" mode="contained" onPress={getWeather}>
          Get Weather
        </Button>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.weatherDescr}>{weather}</Text>
        <Text style={styles.weatherView}>
          {temperature ? `The temperature is ${temperature} Celsius` : ''}
        </Text>
        <Text style={styles.weatherView}>
          {weatherFeel ? `Feels like ${weatherFeel} Celsius` : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 26,
    backgroundColor: '#8ee4af',
  },
  inputView: {
    justifyContent: 'center',
    borderColor: '#05386B',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
  },
  buttonView: {
    marginBottom: 10,
  },
  weatherView: {
    fontSize: 18,
  },
  weatherDescr: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoView: {
    flex: 1,
    alignItems: 'center',
  },
});
