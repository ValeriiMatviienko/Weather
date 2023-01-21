/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import GetQuotes from './GetQuotes';
import WeatherApp from './Weather';

const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            animating={true}
            color={MD2Colors.red800}
          />
          <Text>Loading...</Text>
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'teal',
          }}>
          <Tab.Screen
            options={{
              tabBarLabel: 'Weather',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="weather-cloudy"
                  color={color}
                  size={size}
                />
              ),
            }}
            name="Weather"
            component={WeatherApp}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'Quotes',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="comment-quotes"
                  color={color}
                  size={size}
                />
              ),
            }}
            name="Quotes"
            component={GetQuotes}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
