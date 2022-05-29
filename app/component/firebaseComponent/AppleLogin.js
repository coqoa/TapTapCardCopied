import React from 'react';
import styled from "styled-components/native";
import {colors} from "../Color"
import {Ionicons} from "@expo/vector-icons";

import firebase from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const SocialSign = styled.TouchableOpacity`
    flex-direction: row;
    width: 70%;
    height: 45px;
    margin: 10px 0px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
`
const SocialText = styled.Text`
    color: white;
    font-size: 23px;
    font-family: "SDChild";
    font-size: 20px;
    padding: 0px 10px ;
`

const AppleLogin = () => {

    //애플소셜로그인
    async function onAppleButtonPress() {
        // 1). 로그인 요청 수행
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        // 2).요청이 성공하면 토큰과 nonce를 추출
        const { identityToken, nonce } = appleAuthRequestResponse;
        
        if (identityToken) {
            // 3).Firebase `AppleAuthProvider` credential 생성
            const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
        
            // 4). 생성된 `AppleAuthProvider` credential을 사용해서 Firebase인증 요청을 시작한다,
            //     이 예제에서는 `signInWithCredential`이 사용되지만, 기존 사용자와 연결하려면 `linkWithCredential`를 호출할 수 있다
            const userCredential = await firebase.auth().signInWithCredential(appleCredential);
        
            // 사용자가 로그인되면 모든 Firebase의 `onAuthStateChanged` 리스너가 트리거된다 
            console.log(`Login.js 애플을 통해 인증된 파이어베이스, 유저아이디: ${userCredential.user.uid}`);
          } else {
            // 재시도하기 위한 처리부분
          }
    }

    return (
    <>
        {appleAuth.isSupported && (
            <SocialSign style={{backgroundColor:colors.REALDARKGRAY}} onPress={() => onAppleButtonPress()}>
                <Ionicons name="logo-apple" size={22} color="white" /><SocialText>애플계정으로 시작하기</SocialText>
            </SocialSign>
        )}
    </>
    )
};
export default AppleLogin;