import {View, Text, Button,TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import React from 'react'
import {useState,useEffect} from 'react'
import initfirebase from '../config/index';
import * as ImagePicker from 'expo-image-picker';
import Background from "./Background";
export default function Experience({ navigation }) {
    const database = initfirebase.database();
    const [data,setdata]= useState([]);
    const storage = initfirebase.storage();
    const [name, setName] = useState("");
    const [localisation, setLocal] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDesc] = useState("");
    const [nblike,setNb]=useState(null);
    //const [{nom,prenom,pseudo},setData] = useState({nom:"",prenom:"",pseudo:""});
    const imageToBlob = async (uri) => {
      const blob=await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request Failed"));
        };
        xhr.responseType = "blob"; //arraybuffer
        xhr.open("GET", uri, true);
        xhr.send(null);

      });
  return blob;
}


const uploadImage = async(uri)=>{
  //convert image to blob
  const blob = await imageToBlob(uri);
  //save blob to ref image
  const ref_img = storage.ref().child("imageplaces")
      .child("image"+Math.random()*10000+".jpg");
  await ref_img.put(blob)
  //get url
  const url = await ref_img.getDownloadURL();
  return url;
} ;
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
       
      setImage(result.uri);
  }
};

      
  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.titre}>share with us your experience!</Text>
    
      <TextInput placeholder="Name of the place" onChangeText={e=>{setName(e)}} style={styles.TextInput}></TextInput>
      <TextInput placeholder="Localisation" onChangeText={e=>{setLocal(e)}} style={styles.TextInput}></TextInput>
      <TextInput
      style={styles.textArea}
      
     
      numberOfLines={10}
      multiline={true}
    
       placeholder="Description" onChangeText={e=>{setDesc(e)}} style={styles.TextInput}></TextInput>
         <TouchableOpacity onPress={pickImage}>
      <Image  source={ image === null ? require("../assets/location1.jpg") : {uri:image}}
      style={{
          width:230,
          height:130,
          borderRadius:3,
          borderWidth: 4,
          borderColor: "white",
          marginBottom:10,
         alignSelf:'center',
          
          marginTop:20
          
      }}
     ></Image>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (image != null) {
            const url = await uploadImage(image);
            const ref_places = database.ref("places");
            const key = ref_places.push().key;
            ref_places.child("place" + key).set({
              name: name,
              localisation: localisation,
              description:description,
              url: url,
              nblike:nblike
            });
            navigation.navigate("Travel");
          } else {
            const url = await uploadImage(image);
            const ref_places = database.ref("places");
            const key = ref_places.push().key;
            ref_places.child("place" + key).set({
              name: name,
              localisation: localisation,
              description:description,
              nblike:nblike,
              url: null,
            });
            navigation.navigate("Travel");
          }
        }}
      >
        
        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:'white'}}>Add</Text>

      </TouchableOpacity>
      
      {/* <Button style={styles.button}
      onPress={()=>{
          database.ref("profils").child("profil").set({
              nom:"nom",
              prenom:"ppp",
              pseudo:"sss",
          });
      }}
      title="Save"></Button> */}
    </View>
    
  )

}


const styles = StyleSheet.create({
    TextInput:{
        textAlign:"center",
        borderRadius:5 ,
        borderTopEndRadius:5,
        borderTopStartRadius:5,
         //marginTop:20,
        margin:20,
        width:250,
        alignSelf:"center"
    },
    titre:{
       fontSize:34,
       fontWeight:"bold",
       fontStyle:'italic',
       color:"#385F71",
      textAlign:"center",
      marginTop:100,
      marginBottom:40
    },
    container:{
         flex:1,
         backgroundColor:'#ffff',
        // alignItems:"center",
         justifyContent:'flex-start',
        

    },
    button: {
        width:"50%",
         borderRadius:5,
         backgroundColor:"#225560",
         height:40,
         width:100,
         justifyContent:"center",
         marginTop:40,
         alignSelf:"center"

      },
      textArea: {
        height: 150,
        justifyContent: "flex-start",
        marginBottom:40,
      }
}

)