import React, {
    useState,
    useEffect,
    useRoute,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
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
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';

import initfirebase from '../config/index';
import { useGenerateId } from '../hooks/useGeneratedId';
import { requestFrame } from 'react-native-reanimated/lib/reanimated2/core';
  export default function Chat({route}) {
    const idReceiver=route.params.userr.uid;
   // const idDisc=useGenerateId(user.uid,idReceiver);
    
    console.log(requestFrame);
    const [input, setInput] = useState("");
    const { getUser,user,auth,loading,updateProfil} = useAuth();
   // const { params } = useRoute();
   const firestore = getFirestore(initfirebase);
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const storage = initfirebase.storage();
    const database = initfirebase.database();
    const idDisc=useGenerateId(user.uid,idReceiver);
    useEffect(() => {
      const getMessage= async () => {
       
    };
     
    getMessage();
     },[]);
    const sendMessage = useCallback((messages) => {
     
        if (messages) {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages)
              );
          addDoc(
            collection(firestore,"Discussion",idDisc,"messages"),
            {
              timestamp: serverTimestamp(),
              userId: user.uid,
              displayName: user.displayName,
              photoURL: user.image,
              message: messages,
              idReceiver:idReceiver,
            }
          );
         
          //setMessages("");
        }
        ;
        }, []);
        useEffect(() => {
          const getMessages = () => {
            return onSnapshot(
              query(
                collection(firestore, "Disccussion", idDisc, "messages"),
                orderBy("timestamp", "desc")
              ),
              (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setMessages(messages);
                 
              }
            );
          };
          const unsubscribe = getMessages();
          return unsubscribe;
        }, [firestore,idDisc]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              
            >
              <AntDesign name="logout" size={24} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
      }, [navigation]);
        
      return (
     
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => sendMessage(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff',
             
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            uid: user.uid,
            avatar: require("../assets/profil.png"),
          }}
        />
      );
}