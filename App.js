import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View,StyleSheet } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../TravelAdvisor/screens/HomeScreen';
import Discover from './screens/Discover';
import ItemScreen from './screens/ItemScreen';
import * as React from 'react';
import Travel from './screens/Travel';
import DetailsScreen from './screens/DetailsScreen';
 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Travel" component={Travel} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
        <Stack.Screen name="Discover" component={Discover} />
      </Stack.Navigator>
    </NavigationContainer>
  </TailwindProvider>
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
