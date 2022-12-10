import React, { createContext, useContext, useState } from "react";
//import * as WebBrowser from "expo-web-browser";
import initfirebase from "../config/index";
import {
   
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useGenerateId } from "./useGeneratedId";

const auth = getAuth(initfirebase);
const firestore = getFirestore(initfirebase);

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const navigation = useNavigation();

  

  const login = async (email, password) => {
    if (email.length === 0 || !email.includes("@"))
      alert("Email should have this form: abc@abc.com !");
    else if (password.length < 6)
      alert("The password should contain at least 6 characters !");
    else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
          const docRef = doc(firestore, "users", response.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
            navigation.navigate("All");
           
          } else {
            alert("Profile is incomplete ! Please complete your profile!");
            setUser(response.user);
            navigation.navigate("Profile");
          }
        })
        .catch((erreur) => {
          alert(erreur);
        });
    }
  };

  const register = async (email, password, confirmPassword) => {
    if (email.length === 0 || !email.includes("@"))
      alert("Email should have this form: abc@abc.com !");
    else if (
      password.length === 0 ||
      password !== confirmPassword ||
      password.length < 6
    )
      alert("Please confirm the password !");
    else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          setUser(response.user);
          navigation.navigate("Profile");
        })
        .catch((erreur) => {
          alert(erreur);
        });
    }
  };

  const updateProfil = async (displayName,image,job,age,phone) => {
    if (!image) alert("Please upload photo or enter a photo URL");
    else {
      const updatedUser = {
        uid: user.uid,
        email: user.email,
        displayName,
        image,
        job,
        age,
        phone,
      };
      setDoc(doc(firestore, "users", user.uid), updatedUser)
        .then(() => {
          setUser(updatedUser);
          navigation.navigate("All");
        })
        .catch((error) => {
          setUser(null);
          navigation.navigate("MyProfile");
          alert(error);
        });
    }
  };

  const createProfile = async (displayName, job, age,phone,image) => {
    if (!displayName) alert("Full name is required !");
    else if (!job) alert("Occupation is required !");
    else if (!age) alert("Age is required !");
    else if(!phone) alert("Phone is required !")
    if (!image) alert("Please upload photo or enter a photo URL");
    else {
      const updatedUser = {
        uid: user.uid,
        email: user.email,
        displayName,
       image,
        job,
        age,
        phone,
       
      };
      setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        job,
        age,
        phone,
        image,
      })
        .then(() => {
          setUser(updatedUser);
          navigation.navigate("All");
        })
        .catch((error) => {
          setUser(null);
          navigation.navigate("Login");
          alert(error);
        });
    }
  };
  const createPost = async (name,localisation,description,image,id,idp) => {
   
    
    // let idp=idd.toString();
    if (!name) alert(" name is required !");
    else if (!localisation) alert("Localisation is required !");
    else if (!description) alert("Description is required !");
    else if (!image) alert("Please upload photo or enter a photo URL");
    else {
      const updatedPost = {
        
        iduser:id,
        name,
        localisation,
        description,
        image,
        idpost:idp,
       
      };
     
      setDoc(doc(firestore,"posts",idp), {
        
        iduser:id,
        name,
        localisation,
        description,
        image,
        idpost:idp,
       
      })
        .then(() => {
          setPost(updatedPost);
          alert("Add successfully")
          navigation.navigate("All");
        })
        .catch((error) => {
          setPost(null);
          navigation.navigate("All");
          alert(error);
        });
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate("Home");
      })
      .catch((erreur) => {
        alert(erreur);
      });
  };

  const getAllUsers = async () => {
    const q = query(
      collection(firestore, "users"),
      where("uid", "!=", user.uid)
    );
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      doc.data() && array.push(doc.data());
    });
    return array;
  };
  const getAllPosts = async () => {
    const q = query(
      collection(firestore, "posts"),
      where("iduser", "!=", user.uid)
    );
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // console.log(doc.data());
      doc.data() && array.push(doc.data());
    });
    return array;
  };
  const deletePost=async(idpost)=>{
     
    await deleteDoc(doc(firestore,"posts",idpost ));
    
    
    alert('deleted successfully');
    navigation.navigate("All");
  }
  const getAllDissc = async () => {
    const q = query(
      collection(firestore, "message"),
      where("uid", "!=", user.uid)
    );
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      doc.data() && array.push(doc.data());
    });
    return array;
  };
  const getPostsByUser = async () => {
    const q = query(
      collection(firestore, "posts"),
      where("iduser", "==", user.uid)
    );
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // console.log(doc.data());
      doc.data() && array.push(doc.data());
    });
    return array;
  };
  
  const getUser = async () => {
    const array=[];
   // console.log(auth.currentUser.uid);
    const ref=doc(firestore,"users",auth.currentUser.uid);
    const docSnap=await getDoc(ref);
    if (docSnap.exists()) {
    array.push(docSnap.data());
    } 
    return array;
     
    //return user;
     
  };

  /*const matchUsers = async (loggedInProfile, userSwipped) => {
    const id = useGenerateId(loggedInProfile.uid, userSwipped.uid);
    await setDoc(doc(firestore, "matches", id), {
      users: {
        [loggedInProfile.uid]: loggedInProfile,
        [userSwipped.uid]: userSwipped,
      },
      usersMatched: [user.uid, userSwipped.uid],
    });
  };*/

  return (
    <AuthContext.Provider
      value={{
        user: user,
        
        getAllUsers,
        logout,
        login,
        register,
        createProfile,
        getUser,
        updateProfil,
        createPost,
        getAllPosts,
        getPostsByUser,
        deletePost,
        loading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
 