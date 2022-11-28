import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from './../screens/HomeScreen';
import Discover from './../screens/Discover';
import ItemScreen from './../screens/ItemScreen';
import DetailsScreen from './../screens/DetailsScreen';
import Travel from './../screens/Travel';

const Stack = createNativeStackNavigator();