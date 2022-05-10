import { NavigationContainer } from '@react-navigation/native';
import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';
import React, { useState, useEffect, useCallback } from 'react';
import {View, ActivityIndicator} from "react-native";
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import InStack from './app/navigators/InStack';
import OutStack from './app/navigators/OutStack'

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { NativeBaseProvider } from 'native-base';
import {SSRProvider} from '@react-aria/ssr'; 

GoogleSignin.configure({ webClientId: '694781280993-81244ijlf95pvdvn4du0im7ebh456ns1.apps.googleusercontent.com'}) 
  const googleSigninConfigure = () => { 
}

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  
  const startLoading = async() =>{
    // 로딩하고 싶은 것들을 담는 공간 
    // (ex. API호출 혹은 정보를 받거나 video요소를 미리 받아놓거나, DB를 미리 열거나, 아이콘을 미리준비)
    try {
      await Font.loadAsync({
          "SDChild": require("./app/asset/fonts/SDChildfundkorea.otf")
      })
      console.log("try")
    }catch(e){
      console.log(e)
      console.log("catch")
    }finally{
      setReady(true);
      console.log("finally")
    }
  };
  
  useEffect(()=>{
    googleSigninConfigure();
    startLoading();
    console.log("useEffect")
  },[])

  useEffect(()=>{
    auth().onAuthStateChanged((user)=>{
      // user를 받아서 user값이 참이면 로그인, false면 로그아웃 -> user값에 따라 isLoggedIn state값을 변경시켜서 로그인스크린을 보여줄지 메뉴스크린을 보여줄지 정한다
      if(user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    })
  },[])
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); /** 추가 **/
        console.log('hide');
      }, 1000); /** 스플래시 시간 조절 (2초) **/
    } catch(e) {
      console.log('에러발생');
      console.log(e);
    }
  });
  // const onLayoutRootView = useCallback(async () => {
  //   if (ready) {
  //     console.log('Hide the splash screen immediately')
  //     await SplashScreen.hideAsync();
  //   }
  // }, [ready]);
  // if (!ready) {
  //   return null;
  // }

  // if(!ready){
  //   return (
  //   <AppLoading
  //     startAsync={startLoading}
  //     onFinish={onFinish}
  //     onError={console.log} />
  //     // ready가 안되어있으면 AppLoading은 splash screen을 비추도록 강제하고 startAsync를 호출,
  //     // startAsync가 완료되면 AppLoading은 onFinish함수를 호출, 
  //     // onFinish는 state를 변경시키고 state가 변경되면 조건문 else에 해당하는 부분을 render한다
  //   );
  // }

  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          {ready && (
            <SafeAreaView style={{flex:1}}>
              {/* <View style={{flex:1}} onLayout={onLayoutRootView}> */}
                {isLoggedIn ? <InStack />: <OutStack />}
              {/* </View> */}
            </SafeAreaView>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  )
}