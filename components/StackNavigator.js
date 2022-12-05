
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Authentification from './../screens/Authentification';
import SignUp from './../screens/SignUp';
import MyProfile from './../screens/MyProfile';
import Accueil from './../screens/Accueil';
import Background from "../screens/Background";
import DetailsScreen from './../screens/DetailsScreen';
import HomeScreen from "../screens/HomeScreen";
 
import Discover from "../screens/Discover";
 
import useAuth from "../hooks/useAuth";
import Profile from './../screens/Profile';
import Travel from './../screens/Travel';
import Experience from './../screens/Experience';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  
  return (
    <Stack.Navigator defaultScreenOptions={{ headerShown: false }}>
   
       <Stack.Screen name="Home" component={HomeScreen} /> 
      {user ? (
        <>
          <Stack.Group>
          
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
         
        <Stack.Screen name="Discover" component={Discover} />
        
        <Stack.Screen name="Background" component={Background} />
       
        <Stack.Screen name="All" component={Accueil} />

        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Travel" component={Travel} />
        
        <Stack.Screen name="Share" component={Experience} />

        
             </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
          
          <Stack.Screen name="Login" component={Authentification} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
