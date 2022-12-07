
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, firestore} from '../config/index';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import useAuth from '../hooks/useAuth';
import initfirebase from '../config/index';
import COLORS from './../consts/colors';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
   
    
    
    TextInput,
    ImageBackground,
    FlatList,
    Dimensions,
    
  } from 'react-native';
import {
    getFirestore,
    setDoc,
    addDoc,
    orderBy,
    doc,
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    getDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import { useGenerateId } from '../hooks/useGeneratedId';
  const {width} = Dimensions.get('screen');

const ChatScreen = ({ navigation }) => {
    
    const {width} = Dimensions.get('screen'); const firestore = getFirestore(initfirebase);
    const { getUser,user,auth,loading,updateProfil,logout} = useAuth();
    const [messages, setMessages] = useState([]);
   // const idReceiver=route.params.userr.uid;
   // const idDisc=useGenerateId(user.uid,idReceiver);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri:user.image,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={e=>{e.preventDefault,navigation.navigate("All")}}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            )
        })

        const q = query(collection(firestore,'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, [navigation]);

     
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user,} = messages[0];
    
      addDoc(collection(firestore, 'chats'), {_id, createdAt,  text, user });
    }, []);
    /*console.log(messages[0])*/
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <TouchableOpacity  onPress={e=>{e.preventDefault(e),navigation.navigate("MyProfile")}}>
        <Icon name="person" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e)=>{navigation.navigate("All")}}>
    { /*   <Icon name="notifications-none" size={28} color={COLORS.white} />*/}
    <Icon name="home"  type="AntDesign"size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            renderUsernameOnMessage={true} 
            onSend={messages => onSend(messages)}
            user={{
                uid:user.uid,
                name:user.displayName,
                avatar: user.image,
                 
            }}
        />
    </SafeAreaView>

     
    );
}
const style = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.primary,
    },
    headerTitle: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 23,
    },
    inputContainer: {
      height: 60,
      width: '100%',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      position: 'absolute',
      top: 90,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      elevation: 12,
    },
    categoryContainer: {
      marginTop: 60,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconContainer: {
      height: 60,
      width: 60,
      backgroundColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    cardImage: {
      height: 220,
      width: width / 2,
      marginRight: 20,
      padding: 10,
      overflow: 'hidden',
      borderRadius: 10,
    },
    rmCardImage: {
      width: width - 40,
      height: 200,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
  });
 

export default ChatScreen;