/*import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View,StyleSheet } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../TravelAdvisor/screens/HomeScreen';
import Discover from './screens/Discover';
import SignUp from './screens/SignUp';
import * as React from 'react';
import Travel from './screens/Travel';
import DetailsScreen from './screens/DetailsScreen';
import Background from './screens/Background';
import Authentification from './screens/Authentification';
import Accueil from './screens/Accueil';
import MyProfile from './screens/MyProfile';
import Chat from "./screens/Chat";



 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
     
    <TailwindProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
         
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Background" component={Background} />
        <Stack.Screen name="Auth" component={Authentification} />
        <Stack.Screen name="All" component={Accueil} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Chat" component={Chat} />
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
*/
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import StackNavigator from "./components/StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { Provider as PaperProvider } from "react-native-paper";
import "./config/index";
export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider >
        <PaperProvider>
          {/* HOC */}
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </PaperProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});