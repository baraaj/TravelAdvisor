import {View, Text, Button,TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import React from 'react'
import {useState,useEffect} from 'react'
import initfirebase from '../config/index';
import * as ImagePicker from 'expo-image-picker';
import Background from "./Background";
import useAuth from "../hooks/useAuth";
import { number } from "prop-types";
export default function UpdateProfile({navigation }) {
   const database = initfirebase.database();
    const [data,setdata]= useState([]);
    const storage = initfirebase.storage();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [image, setImage] = useState(null);
    const [pseudo, setPseudo] = useState("");
    const [displayName, setDisplayName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const[admin,setAdmin]=useState("");
  const { getUser, auth,loading,updateProfil} = useAuth();
  useEffect(() => {
    const getUserBy= async () => {
    const userone = await getUser();
      
    setAdmin(userone[0]);
    
  };
  getUserBy();
   
   },[]);
   
    // const [mail,setMail]=useState(email);
     
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
  const ref_img = storage.ref().child("imageprofiles")
      .child("image"+user.uid+".jpg");
  await ref_img.put(blob)
  //get url
  const url = await ref_img.getDownloadURL();
  setImage(url);
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
       
      setImage(result.assets[0].uri);
  }
};
 
      
  return (
    <View style={styles.container}>
        <Background />
        <Text style={styles.titre2}>Welcome </Text>
        <Text style={styles.titre2}>{admin.email}</Text>
      <Text style={styles.titre}>Update your Profile</Text>
      <TouchableOpacity onPress={pickImage}>
      <Image  source={ image === null ? require("../assets/profil.png") : {uri:image}}
      style={{
          width:130,
          height:130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom:10,
         alignSelf:'center',
          
          marginTop:20
          
      }}
     ></Image>
      </TouchableOpacity>
      <TextInput placeholder="Name" onChangeText={e=>{setDisplayName(e)}} style={styles.TextInput}></TextInput>
      <TextInput placeholder="Job" onChangeText={e=>{setJob(e)}} style={styles.TextInput}></TextInput>
      <TextInput placeholder="Age" onChangeText={e=>{setAge(e)}} style={styles.TextInput}></TextInput>
      <TextInput placeholder="phone" onChangeText={e=>{setPhone(e)}} style={styles.TextInput}></TextInput>
      <TouchableOpacity
        style={styles.button}
      /*  onPress={async () => {
          if (image != null) {
            const url = await uploadImage(image);

            const ref_profils = database.ref("profils");
            const key = ref_profils.push().key;
            ref_profils.child("profil" + key).set({
              nom: nom,
              prenom: prenom,
              pseudo: pseudo,
              //mail:mail,
              url: url,
            });
            navigation.navigate("MyProfile",{nom,prenom,pseudo,url});
          } else {
            const url = await uploadImage(image);
            const ref_profils = database.ref("profils");
            const key = ref_profils.push().key;
            ref_profils.child("profil" + key).set({
              nom: nom,
              prenom: prenom,
              pseudo: pseudo,
              mail:mail,
              url: null,
            });
            navigation.navigate("MyProfile",{nom,prenom,pseudo,url});
          }
        }}*/
        
        onPress={  async () =>{
          
        await updateProfil(displayName,image,job,age,phone);
          
            
          
        }}
      >
        
        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:'white'}}>Save</Text>

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
        marginTop:20,
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
    titre2:{
      fontSize:20,
      textAlign:"center",
      marginTop:15,
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
         marginTop:80,
         alignSelf:"center"
      },
}

)