import { View, Text, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { TailwindProvider } from "tailwindcss-react-native";
const ReceiverMessage = ({ message, photoURL }) => {
  const tailwind = useTailwind();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 5,
      }}
    >
      <Image
        style={[tailwind("rounded-full"), { width: 50, height: 50 }]}
        source={{ uri: photoURL }}
      />
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#FF5864",
          padding: 8,
          marginLeft: 5,
          marginRight: 100,
          marginVertical: 5,
          borderRadius: 10,
        }}
      >
        <Text style={tailwind("text-white")}>{message}</Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;