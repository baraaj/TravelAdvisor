import { View, Text } from 'react-native'
import {StyleSheet} from 'react-native'
import React from 'react'
import { HeroImage } from "../assets";
import * as Animatable from "react-native-animatable";
import { useEffect,useRef } from 'react';
import { Animated, Easing, ImageBackground } from 'react-native';
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from '../consts/constants';
const Background = () => {
    const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;
    useEffect(() => {
        const translate = () => {
          translateValue.setValue(initialValue);
          Animated.timing(translateValue, {
            toValue: ANIMATION_TO_VALUE,
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => translate());
        };
    
        translate();
      }, [translateValue]);
    
      const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
      });
  return (
    <AnimetedImage 
    resizeMode="repeat" 
    style={[styles.background,{
        transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
    }]}
    source={HeroImage} />
  )
}
const styles = StyleSheet.create({    
    
    background: {
        position: 'absolute',
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.2,
        transform: [
          {
            translateX: 0,
          },
          {
            translateY: 0,
          },
        ],      
      }, 
  });

export default Background