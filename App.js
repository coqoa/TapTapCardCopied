import { NavigationContainer } from '@react-navigation/native';
import * as Font from "expo-font"
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { NativeBaseProvider } from 'native-base';
import {SSRProvider} from '@react-aria/ssr'; 
import { Platform, StatusBar} from "react-native";


import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import InStack from './app/navigators/InStack';
import OutStack from './app/navigators/OutStack'
import MenuStack from './app/navigators/MenuStack';

GoogleSignin.configure({ webClientId: '694781280993-81244ijlf95pvdvn4du0im7ebh456ns1.apps.googleusercontent.com'}) 

if(Platform.OS == 'android'){
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
}
StatusBar.setBarStyle("dark-content")

export default function App() {
  const [ready, setReady] = useState(false);
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  
  const startLoading = async() =>{
    // 로딩하고 싶은 것들을 담는 공간 
    // (ex. API호출 혹은 정보를 받거나 video요소를 미리 받아놓거나, DB를 미리 열거나, 아이콘을 미리준비)
    try {
      await Font.loadAsync({
          "SDChild": require("./app/asset/fonts/SDChildfundkorea.otf")
      })
    }catch(e){
      console.log(e)
    }finally{
      setReady(true);
    }
  };

  useEffect(()=>{
    startLoading();
    auth().onAuthStateChanged((user)=>{
      //user값에 따라 isLoggedIn state값을 변경시켜서 로그인스크린을 보여줄지 메뉴스크린을 보여줄지 정한다
      if(user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    });
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000); /** 스플래시 시간 조절 (1초) **/
    } catch(e) {
      // console.log(e); 
    }
    
  },[])

  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          {ready && (
          <SafeAreaView style={{flex:1}}>
            {isLoggedIn ? <MenuStack /> : <OutStack />}
            {/* <InStack /> */}
            {/* <MenuStack /> */}
          </SafeAreaView>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  )
}