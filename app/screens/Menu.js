import React,{ useRef } from "react";
import styled from "styled-components";
import {Animated, Pressable, View} from "react-native";
import { Audio } from 'expo-av';
import { colors } from "../component/color";

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
    const animalModalScale = useRef(new Animated.Value(0)).current;
    // 한글버튼
    const KorBtnAnimation = useRef(new Animated.Value(1)).current;
    // 영어버튼
    const EngBtnAnimation = useRef(new Animated.Value(1)).current;

    //메뉴 버튼 애니메이션 & 실행함수
    const btnFunc = (a,b,c) => {
        return(
            <MenuBox
                style={{transform: [{scale:a}]}}
                onPressIn={() => {ClickSound(), a.setValue(0.9)}}
                onPressOut={() => (BtnClick(b),a.setValue(1))}
            >
                    <MenuText>{c}</MenuText>
            </MenuBox>
        )
    }
    // 모달창 내부 버튼 애니메이션 & 실행함수
    const modalBtnFunc = (a,b,c,d) => {
        return(
                <WordKorBtn 
                    style={{transform: [{scale:a}], backgroundColor:b}}
                    onPressIn={() => (ClickSound(), a.setValue(0.9))}
                    onPressOut={() => {BtnClick(c),a.setValue(1)}}
                >
                    <WordSelectText>{d}</WordSelectText>
                </WordKorBtn>
        )
    }
    // WordPlay.js에 props 전달하는 함수
    const BtnClick = (e) => {
        animalModalScale.setValue(0)
        navigation.navigate('WordPlay',{type:e}) 
    }
    return(
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBoxShell>
            {btnFunc(ganadaBtnAnimation,"ganada","가나다")}
            {btnFunc(languageBtnAnimation,"Language","ABC")}
            {btnFunc(numberBtnAnimation,"Number","숫자")}
            <MenuBox 
                style={{transform: [{scale:wordPlayBtnAnimation}]}}
                onPressIn={() => {ClickSound(), wordPlayBtnAnimation.setValue(0.9)}}
                onPressOut={() => (animalModalScale.setValue(1), animalSelectScale.setValue(1) ,wordPlayBtnAnimation.setValue(1))}
            >
                <MenuText>동물</MenuText>
            </MenuBox>
        </MenuBoxShell>

        {/* 동물 모달창 세부사항 */}
        {/*  모달컨테이너를 제외한 전체화면 : 터치시 모달 닫기위해 구현 */}
        <SelectModalBG style={{transform:[{scale:animalModalScale}]}} onPress={()=>{animalModalScale.setValue(0), animalSelectScale.setValue(0)}}>

            <SelectContainer style={{transform:[{scale:animalSelectScale}]}}>
                <WordSelectTitle><WordSelectTitleText>동물</WordSelectTitleText></WordSelectTitle>

                {modalBtnFunc(KorBtnAnimation,colors.BLUE,"AnimalKOR","한글")}
                {modalBtnFunc(EngBtnAnimation,colors.REDORANGE,"AnimalENG","영어")}
            </SelectContainer>
        </SelectModalBG>
    </BG>
    )
}
export default Menu;