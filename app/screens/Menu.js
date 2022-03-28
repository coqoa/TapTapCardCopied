import React,{ useState, useRef } from "react";
import styled from "styled-components";
import {Animated, Pressable } from "react-native";
import { Audio } from 'expo-av';
import { colors } from "../component/color";
import { transform } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

// const Shell = styled.View`
//     flex: 1;
// `
const BG = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
const MenuBoxShell = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
    const MenuBox = styled(Animated.createAnimatedComponent(Pressable))`
        background-color: white;
        width: 250px;
        height: 80px;
        margin: 20px;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.2) ;
    `
    const MenuText = styled.Text`
        font-size: 35px;
        font-family: 'SDChild';
    `

const WordSelectModalBG = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const WordSelectContainer = styled.View`
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
    background-color: ${colors.BLUE};
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);

`
const WordEngBtn = styled(WordKorBtn)`
    background-color: ${colors.REDORANGE};
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

// -------------------------------------------------------------------------------------------------

const Menu = ({navigation}) => {
    
    
    const ClickSound = async() => {
        const sound = new Audio.Sound();
      try {    
        await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
        await sound.playAsync();
      } catch (error) {
     }
    }

    //Btn Animation
    const wordSelectModal = useRef(new Animated.Value(0)).current;

    // 동물버튼
    const wordPlayBtnAnimation = useRef(new Animated.Value(1)).current;
    // 한글버튼
    const KorBtnAnimation = useRef(new Animated.Value(1)).current;
    // 영어버튼
    const EngBtnAnimation = useRef(new Animated.Value(1)).current;

    // WordPlay.js props 전달함수
    const BtnClick = (e) => {
        wordSelectModal.setValue(0)
        navigation.navigate('WordPlay',{type:e}) 
    }
    return(
    // <Shell>
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBoxShell>
            <MenuBox 
                style={{transform: [{scale:wordPlayBtnAnimation}]}}
                onPressIn={() => {ClickSound(), wordPlayBtnAnimation.setValue(0.9)}}
                onPressOut={() => (wordSelectModal.setValue(1),wordPlayBtnAnimation.setValue(1))}
            >
                <MenuText>동물</MenuText>
            </MenuBox>
            <MenuBox>
                <MenuText>수학 놀이</MenuText>
            </MenuBox>
            
        </MenuBoxShell>

        {/* 동물 세부메뉴 */}
        {/*  모달컨테이너를 제외한 전체화면 : 터치시 모달 닫기위해 구현 */}
        <WordSelectModalBG style={{transform:[{scale:wordSelectModal}]}} onPress={()=>wordSelectModal.setValue(0)}>
            <WordSelectContainer>
                <WordSelectTitle><WordSelectTitleText>단어놀이</WordSelectTitleText></WordSelectTitle>
                <WordKorBtn 
                    style={{transform: [{scale:KorBtnAnimation}]}}
                    onPressIn={() => (ClickSound(), KorBtnAnimation.setValue(0.9))}
                    onPressOut={() => {BtnClick("AnimalKOR"),KorBtnAnimation.setValue(1)}}
                >
                    <WordSelectText>한글</WordSelectText>
                </WordKorBtn>
                <WordEngBtn 
                style={{transform: [{scale:EngBtnAnimation}]}}
                onPressIn={() => {ClickSound(),EngBtnAnimation.setValue(0.9)}}
                onPressOut={() => {BtnClick("AnimalENG"),EngBtnAnimation.setValue(1)}}
                >
                    <WordSelectText>영어</WordSelectText>
                </WordEngBtn>
            </WordSelectContainer>
        </WordSelectModalBG>
    </BG>
    // </Shell>
    )
}
export default Menu;