import {View, Text, Button,TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, FlatList,  ImageBackground } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {useState,useEffect} from 'react'
import initfirebase from '../config/index';
import * as ImagePicker from 'expo-image-picker';
import Background from "./Background";
import useAuth from "../hooks/useAuth";
import COLORS from './../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function MyProfile({ navigation,route}) {
   //const nom = route?route.params.nom:"Baraa";
   const { getUser,loading,getAllUsers } = useAuth();
   
     const [utilisateurs,setUsers]=useState([]);
     const[data,setData]=useState([{}]);
    
    useEffect(() => {
        const getUserBy= async () => {
        const userone = await getUser();
         const usersplus=await getAllUsers();
        setData(userone[0]);
        setUsers(usersplus);
      };
      getUserBy();
      getAllUsers();
       },[]);
      // console.log(utilisateurs);
      const Card = ({userr}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8} 
            >
            <ImageBackground style={{height:150,width:150, borderRadius:60,borderWidth: 4,
          borderColor: "white"}}source={userr.image===null? require("../assets/location1.jpg") : {uri:userr.image}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {userr.age}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginLeft: 5, color: COLORS.white}}>
                    {}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
             
                 
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      };
        return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={e=>{e.preventDefault,navigation.navigate("All")}}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    </TouchableOpacity>
                    
                    
                     
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                     
                    <Image source={ data.image===null? require("../assets/profil.png") : {uri:data.image}} style={styles.image} ></Image>
                         
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    
                    <View style={styles.add}>
                    <TouchableOpacity onPress={e=>{e.preventDefault,navigation.navigate("Update")}}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.infoContainer}>
                    
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.displayName}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{data.email}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{data.age}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{data.job}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{data.phone}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={utilisateurs}
            renderItem={({item}) => <Card userr={item} />}
          />
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{utilisateurs.length}</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});


 
