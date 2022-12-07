import React from 'react';
import {useState,useEffect} from 'react'
import initfirebase from '../config/index';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import COLORS from './../consts/colors';

import { SearchBar } from 'react-native-elements';
import useAuth from "../hooks/useAuth";
const {width} = Dimensions.get('screen');
const database = initfirebase.database();
const ref_places=database.ref("places");

const Travel = ({navigation}) => {
  const [data,setdata]= useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const[rate,setRate]=useState(null);

  const { logout, loading ,getAllPosts} = useAuth();
  const [search, setSearch] = useState('');
  const ratingCompleted=(rating)=>{
  //console.log("Rating is: " + rating)
  setRate(rating);
  
}
const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = data.filter(function (item) {
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    //setdata(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(data);
    setSearch(text);
  }
};

 

   /* useEffect(() => {
      ref_places.on("value",(dataSnapshot)=>{
        let d = [];
        dataSnapshot.forEach((place)=>{
            d.push(place.val());
        });
        setdata(d);
        setFilteredDataSource(d);
        setMasterDataSource(d);
    })
      
      return () => {
        ref_places.off();
      };
    }, []); */
    useEffect(() => {
      const getPosts= async () => {
      
       const usersposts=await getAllPosts();
      setdata(usersposts);
      setFilteredDataSource(usersposts);
        setMasterDataSource(usersposts);
      
    };
     
    getPosts();
     },[]);
     
  const categoryIcons = [
    <Icon name="flight" size={25} color={COLORS.primary} />,
    <Icon name="beach-access" size={25} color={COLORS.primary} />,
    <Icon name="near-me" size={25} color={COLORS.primary} />,
    <Icon name="place" size={25} color={COLORS.primary} />,
  ];
  const ListCategories = () => {
    
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', {place,rate})}>
        <ImageBackground style={style.cardImage} source={place.url===null? require("../assets/location1.jpg") : {uri:place.image}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={20} color={COLORS.white} />
              <Text style={{marginLeft: 5, color: COLORS.white}}>
                {place.localisation}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
             {/* <Icon name="star" size={20} color={COLORS.white} />
              <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text>
          */}
              <Rating
              showRating
              ratingCount={5}
              
              onFinishRating={ratingCompleted}
              imageSize={20}
              style={{ paddingVertical:10,alignItems:"center",marginLeft:-100,marginBottom:-10}}
               
            />  
             
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({place}) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.url===null? require("../assets/location1.jpg") : {uri:place.image}}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>
                {place.localisation}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={22} color={COLORS.white}  />
              <Text style={{color: COLORS.white, marginLeft: 5}}>5.0</Text>
            </View>
          </View>
          <Text style={{color: COLORS.white, fontSize: 13}}>
            {place.description}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <TouchableOpacity  onPress={e=>{e.preventDefault(e),navigation.navigate("MyProfile")}}>
        <Icon name="person" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>logout()}>
    { /*   <Icon name="notifications-none" size={28} color={COLORS.white} />*/}
    <Icon name="logout"  type="AntDesign"size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>beautiful places</Text>
            <View style={style.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Search place"
                style={{color: COLORS.grey}}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
              />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredDataSource!==null?filteredDataSource:data}
            renderItem={({item}) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
export default Travel;