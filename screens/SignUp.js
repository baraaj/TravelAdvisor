import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState,useLayoutEffect} from "react";
import initfirebase from './../config/index';
import useAuth from "../hooks/useAuth";
import Background from './../components/Background';
export default function SignUp({navigation}) {
    //const auth = initfirebase.auth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, loading } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, []);
    return (
       
        <View style={styles.container}>
       
            <StatusBar style="auto" />
            <Background />
            <View
                style={{
                    height:400,
                    width:"90%",
                    backgroundColor:"#0005",
                    borderRadius:10,
                    alignItems:"center",
                    justifyContent:"center",
                    
                }}
                
            >
              
                <Text style={{fontSize:36,fontWeight:"bold",color:"white",marginTop:0}}>
                    Sign Up
                </Text>
                <TextInput
                    style={styles.textinput}
                    keyboardType="email-address"
                    placeholder="mail@site.com"
                    onChangeText={(text) => setEmail(text)}

                ></TextInput>
                <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                ></TextInput>
                <TextInput
                    style={styles.textinput}
                    placeholder="Repeat Password"
                    secureTextEntry={true}
                    onChangeText={(text)=>setConfirmPassword(text)}
                ></TextInput>
                
                <TouchableOpacity /*onPress={()=>{
                   auth.createUserWithEmailAndPassword(email,password)
                        .then(()=>{props.navigation.replace("All")})
                        .catch((err)=>{
                            alert(err);
                        }) }}*/
                        onPress={async () => {
                            await register(email, password, confirmPassword);
                             
                          }}
                title="Create New Account" style={styles.button}>  
                <Text style={{textAlign:"center",justifyContent:"center",color:"white",fontWeight:"bold",fontSize:18}}>Create New Account</Text>
                </TouchableOpacity>
                </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    textinput: {
        backgroundColor: "white",
        width: "90%",
        height: 40,
        textAlign: "center",
        borderRadius: 8,
        margin: 10,
        marginTop:20,
        marginBottom:20
    },
    container: {
        backgroundColor: '#204969',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width:"50%",
         borderRadius:5,
         backgroundColor:"#50C1E9",
         height:50,
         width:190,
         justifyContent:"center",
         marginTop:80,
         alignSelf:"center",
         marginTop:20
       
        
      }
});