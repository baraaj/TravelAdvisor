import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {useState,useEffect} from 'react'
const ratingCompleted=(rating)=>{
  console.log("Rating is: " + rating)

}

const Ratings = () => {
      const[rate,setRate]=useState(null);
    return (
        <View>

 

<Rating
  showRating
  onFinishRating={ratingCompleted(rate)}
  
  style={{ paddingVertical: 10 }}
/>
{/*
<Rating
  type='heart'
  ratingCount={3}
  imageSize={60}
  showRating
  onFinishRating={ratingCompleted}
/>*/}

  
        </View>
    );
}

const styles = StyleSheet.create({})

export default Ratings;
