import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import Stack from './app/navigators/Stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordPlay from './app/screens/WordPlay';


export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () =>{
    // 로딩하고 싶은 것들을 담는 공간 
    // (ex. API호출 혹은 정보를 받거나 video요소를 미리 받아놓거나, DB를 미리 열거나, 아이콘을 미리준비)
  };
  if(!ready){
    return (
    <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.log} />
      // ready가 안되어있으면 AppLoading은 splash screen을 비추도록 강제하고 startAsync를 호출,
      // startAsync가 완료되면 AppLoading은 onFinish함수를 호출, 
      // onFinish는 state를 변경시키고 state가 변경되면 조건문 else에 해당하는 부분을 render한다
    );
  }
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex:1}}>
        {/* <Stack /> */}
        <WordPlay />
      </SafeAreaView>
    </NavigationContainer>
  )
}