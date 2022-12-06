import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import ChatHeader from "../components/ChatHeader";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useTailwind } from "tailwind-rn";
  import { Ionicons } from "@expo/vector-icons";
  import ReceiverMessage from "../components/ReceiverMessage";
  import SenderMessage from "../components/SenderMessage";
  import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from "firebase/firestore";
  import initfirebase from "../config/firebase";
  import useAuth from "../hooks/useAuth";
  
  const firestore = getFirestore(initfirebase);
  
  const MessagesScreen = () => {
    const [input, setInput] = useState("");
    const tailwind = useTailwind();
    const { params } = useRoute();
    const { user } = useAuth();
    const { matchDetails, matchedUserInfo } = params;
    const [messages, setMessages] = useState([
      // { id: 1, message: "Bonjour", userId: user.uid },
      // { id: 2, message: "Chna7walek", userId: user.uid },
      // {
      //   id: 3,
      //   message: "Hello",
      //   userId: matchedUserInfo.uid,
      //   photoURL: matchedUserInfo.photoURL,
      // },
    ]);
    const sendMessage = () => {
      if (input) {
        addDoc(
          collection(firestore, "matches", matchDetails.item.id, "messages"),
          {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            message: input,
          }
        );
        // setMessages([
        //   ...messages,
        //   {
        //     id: messages.length + 1,
        //     message: input,
        //     userId: user.uid,
        //     photoURL: user.photoURL,
        //   },
        // ]);
        setInput("");
      }
    };
  
    // useEffect(() => {
    //   onSnapshot(
    //     query(
    //       collection(firestore, "matches", matchDetails.item.id, "messages"),
    //       orderBy("timestamp", "desc")
    //     )
    //   ),
    //     (snapshot) =>
    //       setMessages(
    //         snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    //       );
    // }, [matchDetails, firestore]);
  
    // useEffect(() => {
    //   const getMessages = async () => {
    //     const usersCollection = collection(
    //       firestore,
    //       "matches",
    //       matchDetails.item.id,
    //       "messages"
    //     );
    //     const data = await getDocs(usersCollection);
    //     let msgs = [];
    //     data.docs.forEach(async (doc) => {
    //       msgs.push({ ...doc.data(), id: doc.id });
    //     });
    //     setMessages(msgs);
    //     console.log("**********************", msgs);
    //   };
    //   getMessages();
    // }, [firestore, matchDetails]);
  
    useEffect(() => {
      const getMessages = () => {
        return onSnapshot(
          query(
            collection(firestore, "matches", matchDetails.item.id, "messages"),
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
    }, [firestore, matchDetails]);
  
    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <ChatHeader callEnbaled={true} title={matchedUserInfo.displayName} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tailwind("flex-1")}
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              inverted={-1}
              style={[tailwind("pl-4")]}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) => {
                return message.userId === user.uid ? (
                  <SenderMessage key={message.id} message={message.message} />
                ) : (
                  <ReceiverMessage
                    key={message.id}
                    message={message.message}
                    photoURL={message.photoURL}
                  />
                );
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={tailwind(
              "flex-row justify-between items-center border border-gray-200 px-5 py-5"
            )}
          >
            <TextInput
              style={tailwind("h-10 text-lg")}
              placeholder="Send Message..."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={tailwind("p-3 bg-gray-100 rounded-xl")}
            >
              <Ionicons name="send-sharp" size={34} color="#FF5864" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default MessagesScreen;