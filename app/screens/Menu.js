import React,{ useRef, useEffect, useState } from "react";
import styled from "styled-components";
import {Platform, Animated, Pressable, View, Text, Button, TouchableOpacity} from "react-native";
import { Audio } from 'expo-av';
import { colors } from "../component/Color";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import { loadAsync } from "expo-font";


// const BG = styled.ImageBackground`
const BG = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${colors.bgColor};
`
const MenuBoxShell = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 1;
`
const MenuBox = styled(Animated.createAnimatedComponent(Pressable))`
    background-color: white;
    width: 250px;
    height: 80px;
    margin: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
`
const TextShell = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.5);
    justify-content: center;
    align-items: center;
    /* background-color: red; */
`
const MenuText = styled.Text`
    position: absolute;
    font-size: 35px;
    font-family: 'SDChild';
`
const MenuImage = styled.Image`
    width: 100%;
    height: 100%;
    flex: 1;
`
const SelectModalBG = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const SelectContainer = styled(Animated.createAnimatedComponent(View))`
    width: 250px;
    height: 270px;
    background-color: white;
    border-radius: 20px;

    box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
    align-items: center;
    justify-content: center;
`
const WordSelectTitle = styled.View`
    width: 200px;
    height: 60px;
    align-items: center;
    justify-content: center;
    font-family: 'SDChild';
`
const WordKorBtn = styled(Animated.createAnimatedComponent(Pressable))`
    width: 200px;
    height: 60px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    z-index: 100;
`
const WordSelectText = styled.Text`
    font-size: 32px;
    font-weight: 800;
    color: white;
    font-family: 'SDChild';
`
const WordSelectTitleText = styled(WordSelectText)`
    font-size: 40px;
    color: ${colors.REALDARKGRAY};
    margin-bottom: 10px;
`
const FullAdBtn = styled.Button`
    z-index: 100;
`
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
const Menu = ({navigation}) => {
    function playSound(sound){
        // console.log('Playing '+sound);
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                // console.log('Unloading '+sound);
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((error)=>{console.log('Menu = ', error)});
    }
    
// 메뉴 모달창 관련 버튼애니메이션
    // 가나다버튼
    const ganadaBtnAnimation = useRef(new Animated.Value(1)).current;
    // ABC버튼
    const languageBtnAnimation = useRef(new Animated.Value(1)).current;
    // 숫자버튼
    const numberBtnAnimation = useRef(new Animated.Value(1)).current;
    // 동물버튼
    const wordPlayBtnAnimation = useRef(new Animated.Value(1)).current;
    // 동물버튼 모달창
    const animalSelectScale = useRef(new Animated.Value(0)).current
    // 동물 버튼 모달창 외부 클릭했을때 모달창을 닫기위한 Animated
    const animalModalZIndex = useRef(new Animated.Value(0)).current;
    // 동물-한글버튼
    const KorBtnAnimation = useRef(new Animated.Value(1)).current;
    // 동물-영어버튼
    const EngBtnAnimation = useRef(new Animated.Value(1)).current;

    //메뉴 버튼 애니메이션 & 실행함수
    const btnFunc = (a,b,c,d) => {
        return(
        // <MenuBox style={{backgroundColor:colors.SKYBLUE}}>
        //     <MenuImage source={require("../asset/images/ganada1.png")} resizeMode="contain" />
        // </MenuBox>
        <MenuBox
            style={{
                backgroundColor:d,
                transform: [{scale:a}], 
                shadowColor: "black",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                shadowOffset: {height: 2,width: 0,},
                elevation:1
            }}
            onPress={() => {playSound(require("../asset/audio/btnClickSound.mp3"))}}
            onPressIn={() => {a.setValue(0.9)}}
            onPressOut={() => (BtnClick(b),a.setValue(1))}
        >
                {/* <MenuText>{c}</MenuText> */}
                <MenuImage source={c} resizeMode="contain" />
                {/* <TextShell>
                    <MenuText>{e}</MenuText>
                </TextShell> */}
        </MenuBox>
        )
    }
    // 모달창 내부 버튼 애니메이션 & 실행함수
    const modalBtnFunc = (a,b,c,d) => {
        return(
        <WordKorBtn 
            style={{transform: [{scale:a}], backgroundColor:b, 
                shadowColor: "black",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                shadowOffset: {height: 2,width: 0,},
                elevation:1
            }}
            onPress={()=>{playSound(require("../asset/audio/btnClickSound.mp3"))}}
            onPressIn={() => (a.setValue(0.9))}
            onPressOut={() => {BtnClick(c),a.setValue(1)}}
        >
            <WordSelectText>{d}</WordSelectText>
        </WordKorBtn>
        )
    }
    // WordPlay.js에 props 전달하는 함수
    const BtnClick = (e) => {
        navigation.navigate('WordPlay',{type:e}) 
        animalModalZIndex.setValue(0)
    }
    const logout = async()=>{
        await auth().signOut()
    }
    const firestoreUserColl = firestore().collection('TAPTAPUSER');
    useEffect(async()=>{
        await firestoreUserColl.doc(auth()._user.email).set({
            email:auth()._user.email,
        })
    },[])
    

    return(
    <BG>
    {/* <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch"> */}

        <MenuBoxShell>
            <TouchableOpacity style={{position:"absolute", left:-10, top:20}} onPress={()=>{logout(), console.log('로그아웃')}}><Text>로그아웃</Text></TouchableOpacity>
            
            {btnFunc(ganadaBtnAnimation,"Ganada",require("../asset/images/ganada.png"),colors.LIGHTPINK)}
            {btnFunc(languageBtnAnimation,"Language",require("../asset/images/ABC.png"),colors.LIGHTPASTELORANGE)}
            {btnFunc(numberBtnAnimation,"Number",require("../asset/images/123.png"),colors.LIGHTSKYBLUE)}

            <MenuBox
                style={{
                    backgroundColor:colors.LIGHTPASTELGREEN,
                    transform: [{scale:wordPlayBtnAnimation}], 
                    shadowColor: "black",
                    shadowOpacity: 0.1,
                    // shadowRadius: 15,
                    shadowOffset: {height: 2,width: 0,},
                    elevation:1
                }}
                onPress={() => {playSound(require("../asset/audio/btnClickSound.mp3"))}}
                onPressIn={() => {wordPlayBtnAnimation.setValue(0.9)}}
                onPressOut={() => (animalModalZIndex.setValue(2), animalSelectScale.setValue(1) ,wordPlayBtnAnimation.setValue(1))}
            >
                <MenuImage source={require("../asset/images/BtnAnimal.png")} resizeMode="contain" />
                {/* <TextShell>
                    <MenuText>동물</MenuText>
                </TextShell> */}
            </MenuBox>
        </MenuBoxShell>

        {/* 동물 모달창 세부사항 */}
        {/*  모달컨테이너를 제외한 전체화면 : 터치시 모달 닫기위해 구현 */}
        <SelectModalBG style={{zIndex:animalModalZIndex, opacity:animalModalZIndex}} onPress={()=>{animalModalZIndex.setValue(0), animalSelectScale.setValue(0)}}>
            <SelectContainer style={{
                transform:[{scale:animalSelectScale}], 
                shadowColor: "black",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                shadowOffset: {height: 2,width: 0},
                elevation:1
            }}>
                <WordSelectTitle><WordSelectTitleText>동물</WordSelectTitleText></WordSelectTitle>
                {modalBtnFunc(KorBtnAnimation,colors.BLUE,"AnimalKOR","한글")}
                {modalBtnFunc(EngBtnAnimation,colors.REDORANGE,"AnimalENG","영어")}
            </SelectContainer>
        </SelectModalBG>
    </BG>
    )
}
export default Menu;