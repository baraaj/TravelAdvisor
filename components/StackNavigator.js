
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Authentification from './../screens/Authentification';
import SignUp from './../screens/SignUp';
import MyProfile from './../screens/MyProfile';
import Accueil from './../screens/Accueil';
import DetailsScreen from './../screens/DetailsScreen';
import HomeScreen from "../screens/HomeScreen";
 
import Discover from "../screens/Discover";
 
import useAuth from "../hooks/useAuth";
import Profile from './../screens/Profile';
import Travel from './../screens/Travel';
import Experience from './../screens/Experience';
import UpdateProfile from './../screens/UpdateProfile';
import MyPosts from './../screens/MyPosts';
import Chat from "../screens/Chat";
import Background from "./Background";
import ChatScreen from './../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  
  return (
    <Stack.Navigator defaultScreenOptions={{ headerShown: false }}>
   
      {/*<Stack.Group screenOptions={{presentation:""}}>*/}
      {user ? (
        <>
         
          <Stack.Group>
          <Stack.Screen name="All" component={Accueil} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
         
        <Stack.Screen name="Discover" component={Discover} />
        
        <Stack.Screen name="Background" component={Background} />
       
        <Stack.Screen name="MyPosts" component={MyPosts} />
       
        <Stack.Screen name="Update" component={UpdateProfile} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Travel" component={Travel} />
        <Stack.Screen name="Chatme" component={Chat} />
        <Stack.Screen name="Ask" component={ChatScreen} />
        <Stack.Screen name="Share" component={Experience} />
       
        
             </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="Login" component={Authentification} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
