import React, {useState, useEffect, useCallback, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, FlatList, Animated, Pressable, PanResponder, Text, Platform} from "react-native";
import styled from "styled-components"
import { colors } from "./Color";

import { AnimalCardArray } from "../asset/data/AnimalCardArray";
import { KorArrayConsonant, KorArrayVowel } from "../asset/data/WordArrayKOR";
import { Alphabet } from "../asset/data/Alphabet";
import { Number } from "../asset/data/Number";
//Diemensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const platformShadow  = {
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3, },
        shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
}

const Container = styled.View`
    justify-content: center;
    align-items: center;
`
const CardContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* z-index: 1; */
`
const Card = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 80%;
    height: 80%;
    padding: 0px 15px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    elevation:8;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
`
const CardImgShell = styled.View`
    align-items: center;
    justify-content: center;
    flex: 4;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    z-index: 1;
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
// 카드 텍스트 style
const CardContents = styled(Animated.createAnimatedComponent(View))`
    width: 100%;
    z-index: 15;
    align-items: center;
    justify-content: center;
`
const GanadaNameContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const GanadaNameShell = styled.View`
    flex-direction:row;
`
const GanadaNameContents = styled.TouchableOpacity`
    flex: 1;
    height: 30px;
    margin: 2px;
    border-radius: 10px;
`
const GanadaNameText = styled.Text`
    text-align: center;
    font-family: "SDChild";
    font-size: 30px;
    color: ${colors.DARKGRAY};
`
const CardNameText = styled.Text`
    height: 100px;
    text-align: center;
    font-size: 100px;
    font-family: 'SDChild';
    color: ${colors.REALDARKGRAY};
`
const CardNameModal = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0px;
    top: 0px;
    width:100%;
    height:100%;
    align-items: center;
    justify-content: center;
`
const CardNameModalText = styled(CardNameText)``

const ImageAudioBtn = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 60%;
    height: 50%;
    border-radius: 150px;
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
`
const TextAudioBtn = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 50%;
    height: 70%;
    border-radius: 80px;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
`





// 동물 2레벨 물음표박스
const QuestionMarkBg = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 95%;
    border-radius: 100px;
    background-color: ${colors.BEIGE};
    z-index: 2;
`
const QuestionMarkBtn = styled(Animated.createAnimatedComponent(Pressable))`
    width: 100%;
    height: 100%;
`
const QuestionMarkImage = styled.Image`
    width: 100%;
    height: 100%;
`
//동물 3레벨 선택지박스
const DistractorContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${colors.BEIGE};
    z-index: 3;
`
const DistractorRow = styled.View`
    flex-direction: row;
    width: 100%;
    height: 47%;
    bottom: 1%;
    justify-content: center;
    align-items: center;
    background-color: ${colors.BEIGE};
`
const Distractor = styled(Animated.createAnimatedComponent(Pressable))`
    width: 48%;
    height: 90%;
    margin: 5px;
    border-radius: 45px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
    background-color: rgba(255,255,255, 0.6);
    z-index: 100;
`
const DistractorText = styled.Text`
    font-family: 'SDChild';
    font-size: 45px;
    color: ${colors.REALDARKGRAY};
`
const CorrectAnswerContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    top: 0px;
    width: 80px;
    height: 80px;
    border-radius: 15px;
`
const CorrectAnswerImage = styled.Image`
    width: 100%;
    height: 100%;
`

//마지막 카드에서 생성되는 모달창 style
const ClearModalContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const ClearModal = styled.View`
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 2px 2px 5px ${colors.GRAY};
`
const RepeatLevel = styled.TouchableOpacity`
    width: 200px;
    height: 60px;
    border-radius: 15px;
    margin: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.BLUE};
    box-shadow: 1px 1px 3px ${colors.BLUE};
`
const NextLevel = styled(RepeatLevel)`
    background-color: ${colors.REDORANGE};
    box-shadow: 1px 1px 3px ${colors.REDORANGE};
`
const RepeatLevelText = styled.Text`
    font-size: 23px;
    color: white;
    font-family: 'SDChild';
`
const NextLevelText = styled(RepeatLevelText)``

const ClickBlock = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`

// 실사이미지
const RealPictureBtn = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 5px;
    right: 5px;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
    z-index: 49;
    align-items: center;
    justify-content: center;
`

const RealPictureBtnBGContainer = styled.View`
    width: 80%;
    height: 80%;
    justify-content: center;
    align-items: center;
    `
const RealPictureBtnBG = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 100%;
`

const RealPictureContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    align-items: center;
    width: 100%;
    height: 80%;
`
const RealPictureExitBtn =styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 50px;
    height: 35px;
    border-radius: 40px;
    background-color: rgba(255,255,255,0.4);
    justify-content: center;
    align-items: center;
    z-index: 2;
`
const RealPictureExitBtnImage = styled.ImageBackground`
    width: 40%;
    height: 40%;
`
const RealPictureScrollView = styled.ScrollView`
    background-color: ${colors.mainBgColor};
`
const PictureImageShell = styled.View`
    border: 1px solid ${colors.REALLIGHTGRAY};
    align-items: center;
    border-radius: 20px;
`
const PictureImage = styled.Image`
width: 100%;
height: 100%;
border-radius: 20px;

`
// ---------------------------------------------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [realPictureToggle, setRealPictureToggle] = useState(false);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [distractorWindowBackground, setDistractorWindowBackground] = useState(true);
    const [distractorWindow, setDistractorWindow] = useState(true);

    // props 관련
    const type = props.type
    
    const arrayAlloter = (e) => {
        if(e=="AnimalKOR"){
            return AnimalCardArray
        }else if(e == "AnimalENG"){
            return AnimalCardArray
        }else if(e=="Ganada"){
            if(props.level == "Consonant"){
                return KorArrayConsonant
            }else if (props.level == "Vowel"){
                return KorArrayVowel
            }
        }else if(e=="Language"){
            return Alphabet
        }else if(e=="Number"){
            if(props.level == undefined){
                return Number.filter(e=>e.allNum == true)
            }else if(props.level == "All"){
                return Number.filter(e=>e.allNum == true)
            }else{
                return Number.filter(e=>e.range== props.level)
            }
        }
    }
    const data = arrayAlloter(type)
    // console.log(data)

    // AnimatedValues & panResponder ~
    // 카드애니메이션 (좌우이동, scale, opacity)
    const position = useRef(new Animated.Value(0)).current;

    //Value
    const cardPosition = useRef(new Animated.Value(0)).current;
    const cardScaleValue = useRef(new Animated.Value(1)).current;
    const cardRotation = cardPosition.interpolate({
        inputRange: [-250, 250],
        outputRange:["-15deg","15deg"],
        extrapolate:"clamp"
    })
    const secondCardScale = cardPosition.interpolate({
        inputRange:[-300, 0, 300],
        outputRange:[1,0.7,1],
        extrapolate:"clamp"
    })

    const lastListModal = useRef(new Animated.Value(0)).current;

    //Animations
    const cardPressIn = Animated.spring(cardScaleValue,{
        toValue:0.95,
        useNativeDriver:true
    })
    const cardPressOut = Animated.spring(cardScaleValue,{
        toValue:1,
        useNativeDriver:true
    })
    const goLeft = Animated.timing(cardPosition, {toValue:-SCREEN_WIDTH*2,duration:200, useNativeDriver:true});
    const goRight = Animated.timing(cardPosition, {toValue:SCREEN_WIDTH*2,duration:200, useNativeDriver:true});
    const goCenter = Animated.spring(cardPosition, {toValue: 0, useNativeDriver:true});
    //Pan
    const cardPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:() => true,
        onPanResponderMove:(_,{dx})=>{
            cardPosition.setValue(dx)
            // console.log(dx)
        },
        onPanResponderGrant:()=>{
            cardPressIn.start();
        },
        onPanResponderRelease:(_,{dx})=>{
            if(dx < -180){
                playSound(require("../asset/audio/CardPass.mp3"))
                {props.level == "word2LV" && (
                    setTimeout(function(){
                        questionOpacity.setValue(1),
                        questionScale.setValue(1)
                    },70)
                ) }


                Animated.parallel([
                    distractorContainervisible,
                    distractorContainerScaleMax,
                    goLeft
                ]).start(onDismiss);
            }else if(dx > 180){
                playSound(require("../asset/audio/CardPass.mp3"))
                {props.level == "word2LV" && (
                    setTimeout(function(){
                        questionOpacity.setValue(1),
                        questionScale.setValue(1)
                    },70)
                ) }
                Animated.parallel([
                    distractorContainervisible,
                    distractorContainerScaleMax,
                    goRight
                ]).start(onDismiss);
            }else{
                Animated.parallel([
                    cardPressOut,
                    goCenter
                ]).start();
            }
        }
    })).current;
    //물음표박스 Animation
    const questionOpacity = useRef(new Animated.Value(1)).current;
    const questionOpacityPress = Animated.timing(questionOpacity,{
        toValue:0,
        duration:200,
        useNativeDriver:true
    })
    const questionScale = useRef(new Animated.Value(1)).current;
    const questionScalePress = Animated.timing(questionScale,{
        toValue:0.01,
        delay:300,
        duration:10,
        useNativeDriver:true
    })
    
    const questionPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        // onPanResponderStart:()=>{Animated.parallel([questionOpacityPress,
        //     Animated.sequence([secondTextOn, secondTextOff])]).start();}
        onPanResponderStart:()=>{Animated.parallel([
            questionOpacityPress,
            questionScalePress,
            Animated.sequence([secondTextOn, secondTextOff])
        ]).start();}
        
    })).current
    
    // 동물 3레벨 선택지 애니메이션
    // 선택지 박스
    const distractorContainerValue = useRef(new Animated.Value(1)).current;
    const distractorContainerInvisible = Animated.timing(distractorContainerValue, {
        toValue:0,
        duration:150,
        useNativeDriver:true
    })
    const distractorContainervisible = Animated.spring(distractorContainerValue, {
        toValue:1,
        duration:150,
        useNativeDriver:true
    })
    const distractorContainerScale = useRef(new Animated.Value(1)).current;
    const distractorContainerScaleMini = Animated.timing(distractorContainerScale, {
        toValue:0.01,
        duration:150,
        useNativeDriver:true
    })
    const distractorContainerScaleMax = Animated.spring(distractorContainerScale, {
        toValue:1,
        duration:150,
        useNativeDriver:true
    })
    const distractorBtn1 = useRef(new Animated.Value(1)).current;
    const btn1PressOn = Animated.spring(distractorBtn1,{
        toValue:0.85,
        useNativeDriver:true
    })
    const btn1PressOut = Animated.spring(distractorBtn1,{
        toValue:1,
        friction:1,
        useNativeDriver:true
    })
    const distractorBtn2 = useRef(new Animated.Value(1)).current;
    const btn2PressOn = Animated.spring(distractorBtn2,{
        toValue:0.85,
        useNativeDriver:true
    })
    const btn2PressOut = Animated.spring(distractorBtn2,{
        toValue:1,
        friction:1,
        useNativeDriver:true
    })
    const distractorBtn3 = useRef(new Animated.Value(1)).current;
    const btn3PressOn = Animated.spring(distractorBtn3,{
        toValue:0.85,
        useNativeDriver:true
    })
    const btn3PressOut = Animated.spring(distractorBtn3,{
        toValue:1,
        friction:1,
        useNativeDriver:true
    })
    const distractorBtn4 = useRef(new Animated.Value(1)).current;
    const btn4PressOn = Animated.spring(distractorBtn4,{
        toValue:0.85,
        useNativeDriver:true
    })
    const btn4PressOut = Animated.spring(distractorBtn4,{
        toValue:1,
        friction:1,
        useNativeDriver:true
    })

    const distracttorCorrect = (a,b) => {
        return(
            useRef(PanResponder.create({
                onStartShouldSetPanResponder:()=>true,
                onPanResponderStart:()=>{Animated.sequence([a]).start()},
                onPanResponderEnd:()=>{
                    Animated.parallel([
                        b,
                        distractorContainerInvisible,
                        distractorContainerScaleMini,
                        Animated.sequence([secondTextOn, secondTextOff]), 
                        Animated.sequence([checkMarkOn, checkMarkOff])
                    ]).start();
                }
            })).current
        )
    }
    const correct1 = distracttorCorrect(btn1PressOn, btn1PressOut)
    const correct2 = distracttorCorrect(btn2PressOn, btn2PressOut)
    const correct3 = distracttorCorrect(btn3PressOn, btn3PressOut)
    const correct4 = distracttorCorrect(btn4PressOn, btn4PressOut)

    const distracttorWrong = (a,b) => {
        return(
            useRef(PanResponder.create({
                onStartShouldSetPanResponder:()=>true,
                onPanResponderStart:()=>{Animated.sequence([a]).start()},
                onPanResponderEnd:()=>{
                    Animated.parallel([
                        b
                        // distractorContainerInvisible,
                        // Animated.sequence([secondTextOn, secondTextOff]), 
                        // Animated.sequence([checkMarkOn, checkMarkOff])
                    ]).start();
                }
            })).current
        )
    }
    const wrong1 = distracttorWrong(btn1PressOn, btn1PressOut)
    const wrong2 = distracttorWrong(btn2PressOn, btn2PressOut)
    const wrong3 = distracttorWrong(btn3PressOn, btn3PressOut)
    const wrong4 = distracttorWrong(btn4PressOn, btn4PressOut)


    //이미지 터치시 출력되는 소리

    // 텍스트 클릭시 출력하는 애니메이션
const secondTextOpacity = useRef(new Animated.Value(0)).current;
const secondTextOn = Animated.timing(secondTextOpacity,{
    toValue:1,
    duration:200,
    useNativeDriver:true
})
const secondTextOff = Animated.timing(secondTextOpacity,{
    toValue:0,
    duration:400,
    delay:200,
    useNativeDriver:true
})
const secondTextPan = useRef(PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
    onPanResponderEnd:()=>{
        Animated.sequence([secondTextOn, secondTextOff]).start();
    }
})).current

    //정답애니메이션
    const correctAnswerMarkValue = useRef(new Animated.Value(0)).current;
    const checkMarkOn = Animated.spring(correctAnswerMarkValue, {
        toValue:1,
        useNativeDriver:true
    })
    const checkMarkOff = Animated.spring(correctAnswerMarkValue, {
        toValue:0,
        delay:300,
        useNativeDriver:true
    })

    //실사 애니메이션
     // 실제사진 모달 관련 애니메이션
    const pictureBtnScale = useRef(new Animated.Value(1)).current
    const pictureContainerScale = useRef(new Animated.Value(0)).current
    const pictureContainerModalOn = Animated.spring(pictureContainerScale,{
        toValue:1,
        useNativeDriver:true
    })
    const pictureContainerModalOff = Animated.spring(pictureContainerScale,{
        toValue:0,
        useNativeDriver:true
    })
    const pictureOpacity = useRef(new Animated.Value(0)).current
    const pictureOpacityOn = Animated.spring(pictureOpacity,{
        toValue:1,
        useNativeDriver:true
    })
    const pictureOpacityOff = Animated.spring(pictureOpacity,{
        toValue:0,
        useNativeDriver:true
    })
    const pictureZIndex = useRef(new Animated.Value(0)).current
    const pictureZIndexOn = Animated.spring(pictureZIndex,{
        toValue:2,
        useNativeDriver:true
    })
    const pictureZIndexOff = Animated.spring(pictureZIndex,{
        toValue:0,
        useNativeDriver:true
    })
    const pictureOpenPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            Animated.parallel([pictureContainerModalOn, pictureOpacityOn, pictureZIndexOn]).start();
        }
    })).current

    const pictureCloseBtnScale = useRef(new Animated.Value(1)).current
    const pictureCloseBtnPressIn = Animated.timing(pictureCloseBtnScale,{
        toValue:0.8,
        duration:100,
        useNativeDriver:true
    })
    const pictureCloseBtnPressOut = Animated.timing(pictureCloseBtnScale,{
        toValue:1,
        duration:100,
        delay:50,
        useNativeDriver:true
    })
    const pictureClosePan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
        
        Animated.sequence([pictureCloseBtnPressIn, pictureCloseBtnPressOut,
            Animated.parallel([pictureContainerModalOff, pictureOpacityOff, pictureZIndexOff])]).start();
        }
    })).current


    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(1);
    const onDismiss = () => {
        setFirstIndex(prev => prev + 1);
        //카드변경 깜빡임 방지 setTimeout함수
        setTimeout(function(){
            setSecondIndex(prev => prev + 1);
            cardScaleValue.setValue(1)
            cardPosition.setValue(0);
        },100)
    }
    const end = () => {
        console.log('end')
    }
    // {console.log(index)}
    
// function
    //오디오관련
    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
        } catch (error) {
        }
    }
    const playSound = async(e) => {
        const sound = new Audio.Sound();
        try {    
            // 저장한 path로 음원 파일 불러오기 & 재생하기 
            await sound.loadAsync(e);
            await sound.playAsync();
        } catch (error) {
        }
    }
    const itemAudio = (e) => {
        switch(type){
            case "AnimalKOR":
                return data[e].SoundKOR;
            case "AnimalENG":
                return data[e].SoundENG;
            case "Language":
                return data[e].SoundImage;
            case "Number":
                return data[e].SoundImage;
            default:
                return
    }}
    const correctAudio = (e) => {
        switch(type){
            case "AnimalKOR":
                return data[e].SoundKOR;
            case "AnimalENG":
                return data[e].SoundENG;
            default:
                return
    }}
    const wrongAudio = (e) => {
        return data[e].SoundImage;
    }

    // {console.log(AnimalCardArray.length)}
    // array에 end어레이 2개씩필요함(
    {if(secondIndex == data.length-1){
        lastListModal.setValue(1)
        playSound(require("../asset/audio/LastListModal.mp3"))
    }}
        
    //랜덤배열
    
    const numberArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    //배열마다 무작위 숫자 부여
    
    const mapArray = numberArray.map(item => item*Math.floor(Math.random()*(data.length-2)))
    // // 동일한 숫자 제거
    const mapArraySort = Array.from(new Set(mapArray))
    // // 해당카드의 id는 제거한다(중복방지)
    const filterMapArray = mapArraySort.filter(function(element){
            return element !== firstIndex
        });
    const numArray =  [data[firstIndex].id, filterMapArray[0], filterMapArray[1], filterMapArray[2]]
    // // 배열 섞기
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    shuffle(numArray)
    // shuffle(numArray)
    // console.log('numArray0 = ',numArray[0]) 
    // console.log('numArray1 = ',numArray[1]) 
    // console.log('numArray2 = ',numArray[2]) 
    // console.log('numArray3 = ',numArray[3]) 
    // console.log('data[numArray[0].nameKOR] = ',data[numArray[0]].nameKOR) 
    // console.log('numArray0------------------------------',numArray[0],'------------------------')
    // console.log('numArray1------------------------------',numArray[1])
    // console.log('numArray2------------------------------',numArray[2])
    // console.log('numArray3------------------------------',numArray[3])

// 텍스트부분 중복제거
    // type Ganada일때 사용하는 함수
    const ganadaBtn = (e,j) =>{
        return(
            <GanadaNameContents onPress={()=>{playSound(e)}}><GanadaNameText>{j}</GanadaNameText></GanadaNameContents>
        )
    }
    const ganadaBtnFunc = (e) => {
        return(
            <GanadaNameContainer>
                <GanadaNameShell>
                    {ganadaBtn(data[e].SoundItem1, data[e].item1)}
                    {ganadaBtn(data[e].SoundItem2, data[e].item2)}
                    {ganadaBtn(data[e].SoundItem3, data[e].item3)}
                    {ganadaBtn(data[e].SoundItem4, data[e].item4)}
                    {ganadaBtn(data[e].SoundItem5, data[e].item5)}
                </GanadaNameShell>
                <GanadaNameShell>
                    {ganadaBtn(data[e].SoundItem6, data[e].item6)}
                    {ganadaBtn(data[e].SoundItem7, data[e].item7)}
                    {ganadaBtn(data[e].SoundItem8, data[e].item8)}
                    {ganadaBtn(data[e].SoundItem9, data[e].item9)}
                    {ganadaBtn(data[e].SoundItem10, data[e].item10)}
                </GanadaNameShell>
                {data.item11!==undefined &&(
                <GanadaNameShell>
                    {ganadaBtn(data[e].SoundItem11, data[e].item11)}
                    {ganadaBtn(data[e].SoundItem12, data[e].item12)}
                    {ganadaBtn(data[e].SoundItem13, data[e].item13)}
                    {ganadaBtn(data[e].SoundItem14, data[e].item14)}
                    {ganadaBtn()}
                </GanadaNameShell>
                )}
            </GanadaNameContainer>
        )
    }

    // 새로고침
    const refreshTimeout = useRef(null); 
    useEffect(()=>{
        refreshTimeout.current = setTimeout(function() {setRefresh(true)},100)
        return() => clearTimeout(refreshTimeout.current)
    },[refresh])

    const restartLevelBtn = () => {
        setRefresh(false)
        setFirstIndex(0)
        setSecondIndex(1)
    };
        // 다음레벨 버튼
    //자식컴포넌트에서 부모컴포넌트 state를 바꾸려면 함수를 이용해야한다 (그냥 props는 읽기전용이라 props.level="???" 이런식으로 변경 불가능)
    const nextLevelBtn = (e) => {
        if(e=='word1LV'){
            props.getData('word2LV')
        }else if(e=='word2LV'){
            props.getData('word3LV')
        }else if(e=='0~10'){
            props.getData('11~20')
        }else if(e=='11~20'){
            props.getData('21~30')
        }else if(e=='21~30'){
            props.getData('31~40')
        }else if(e=='31~40'){
            props.getData('41~50')
        }else if(e=='41~50'){
            props.getData('51~60')
        }else if(e=='51~60'){
            props.getData('61~70')
        }else if(e=='61~70'){
            props.getData('71~80')
        }else if(e=='71~80'){
            props.getData('81~90')
        }else if(e=='81~90'){
            props.getData('91~100')
        }else{
            null
        }
        setRefresh(false)
        setFirstIndex(0)
        setSecondIndex(1)
        lastListModal.setValue(0)
    }

    //data array 관련
    const dataName = (e) => {
        switch(type){
            case "AnimalKOR":
                return data[e].nameKOR;
            case "AnimalENG":
                return data[e].nameENG;
            case "Language":
                return data[e].nameKOR;
            case "Number":
                return data[e].nameKOR;
            default:
                return
    }}
     //선택지 이름
     const distractorName = (e) =>{
        switch(type){
            case "AnimalKOR":
                return data[e].nameKOR;
            case "AnimalENG":
                return data[e].nameENG;
            default:
                return
        }
    }
    //
    const answerCheck = (e) => {
        switch(type){
            case "AnimalKOR":
                if(e == data[firstIndex].nameKOR){
                    console.log('true KOR')
                    distractorContainerValue.setValue(0)
                }else{
                    console.log('false KOR')
                }
                return
            case "AnimalENG":
                if(e == data[firstIndex].nameENG){
                    console.log('true ENG')
                }else{
                    console.log('false ENG')
                }
                return
            default:
                return
        }
    }
    // {console.log(dataName(firstIndex))}
    // {console.log(dataName(numArray[0]))}

    const clickBlockerValue = useRef(new Animated.Value(0)).current
    const clickBlockerFunc = () =>{
        clickBlockerValue.setValue(2),
        setTimeout(function(){
            clickBlockerValue.setValue(0)
        },500)
    }

    //실사이미지
    const PictureImageData = (e) => {
        return(
            <PictureImageShell style={{width:SCREEN_WIDTH}}><PictureImage source={e} resizeMode="cover" /></PictureImageShell>
        )
    }
    // 실제 출력되는 부분
    const levelConsole = () => {
        return(
            // <Container style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT ,backgroundColor:"#00a8ff"}}>
            <Container style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT ,backgroundColor:colors.mainBgColor}}>
                <ClickBlock style={{zIndex:clickBlockerValue, opacity:clickBlockerValue}} />
                {/* 실사 모달창 */}
                {arrayAlloter(type) == AnimalCardArray && (
                    // <RealPictureContainer style={{opacity:pictureOpacity, transform:[{scale:pictureContainerScale}]}}>
                    <RealPictureContainer style={{zIndex: pictureZIndex, opacity:pictureOpacity, transform:[{scale:pictureContainerScale}]}}>
                        <RealPictureExitBtn  {...pictureClosePan.panHandlers} onPressIn={()=>{ClickSound()}} style={{transform:[{scale:pictureCloseBtnScale}]}}>
                            <RealPictureExitBtnImage source={require("../asset/images/RealPictureExitBtn.png")} resizeMode="contain" />
                        </RealPictureExitBtn>
                        <RealPictureScrollView style={{width:SCREEN_WIDTH}} pagingEnabled horizontal >
                            {PictureImageData(data[firstIndex].realImage1)}
                            {PictureImageData(data[firstIndex].realImage2)}
                            {PictureImageData(data[firstIndex].realImage3)}
                            {PictureImageData(data[firstIndex].realImage4)}
                            {PictureImageData(data[firstIndex].realImage5)}
                        </RealPictureScrollView>
                    </RealPictureContainer>
                )}

                {/* {refresh && ( */}
                    <CardContainer>
                        <ClearModalContainer style={{opacity:lastListModal, zIndex:lastListModal}}>
                            <ClearModal>
                            <RepeatLevel
                                onPressIn={() => ClickSound()}
                                onPressOut={() => {restartLevelBtn(), lastListModal.setValue(0)}}
                            >
                                <RepeatLevelText>Again !</RepeatLevelText>
                            </RepeatLevel>

                            { props.level == "word1LV" && (
                                <NextLevel 
                                    onPressIn={()=> ClickSound()}
                                    onPressOut={()=> nextLevelBtn(props.level)}
                                >
                                    {type == "AnimalKOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                                    {type == "AnimalENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                                </NextLevel>
                            )}
                            { props.level == "word2LV" && (
                                <NextLevel 
                                    onPressIn={()=> ClickSound()}
                                    onPressOut={()=> nextLevelBtn(props.level)}
                                >
                                    {type == "AnimalKOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                                    {type == "AnimalENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                                </NextLevel>
                            )}
                            { type=="Number" &&  props.level !== "All" && props.level !=="91~100" && (
                                <NextLevel onPressIn={()=> ClickSound()}onPressOut={()=> nextLevelBtn(props.level)}>
                                    <NextLevelText>다음레벨 도전 !</NextLevelText>
                                </NextLevel>
                            )}
                            </ClearModal>
                        </ClearModalContainer> 

                        <Card
                        style={{
                            backgroundColor: data[secondIndex].cardBgColor,
                            transform: [{scale:secondCardScale}]
                        }}>

                                <CardImgShell style={{backgroundColor:data[secondIndex].bgColor}}>
                                    <CardImg source={data[secondIndex].image} resizeMode="contain"></CardImg>
                                </CardImgShell>

                                {data[secondIndex].nameKOR.length>0 &&(
                                <>
                                    {type == "Ganada" ? (
                                        <>{ganadaBtnFunc(secondIndex)}</>
                                    ):(
                                        <CardContents style={{flex:props.level == "word3LV" ? 2 : 1, zIndex:distractorContainerValue }}>
                                            {props.level == "word2LV" && (
                                                <QuestionMarkBg>
                                                    <QuestionMarkBtn>    
                                                        <QuestionMarkImage source={data[firstIndex].questionMarkImage} resizeMode="contain"/>
                                                    </QuestionMarkBtn>                                                    
                                                </QuestionMarkBg>
                                            )}
                                            {props.level !== "word3LV" && (
                                                <CardNameText style={{fontSize:100}}>{dataName(secondIndex)}</CardNameText>
                                            ) }
                                        </CardContents>
                                    )}
                                </>
                            )}
                        </Card>

                        <Card
                        {...cardPan.panHandlers}
                        style={{
                            backgroundColor: data[firstIndex].cardBgColor,
                            transform:[{scale:cardScaleValue}, {translateX:cardPosition},{rotateZ:cardRotation}],
                            platformShadow
                        }}>
                            {/* 실사모달버튼 */}
                            {arrayAlloter(type) == AnimalCardArray && (
                                <RealPictureBtn
                                {...pictureOpenPan.panHandlers}
                                style={{transform:[{scale:pictureBtnScale}]}}
                                onPressIn={()=>{pictureBtnScale.setValue(0.8), ClickSound()}}
                                onPressOut={()=>{pictureBtnScale.setValue(1)}}
                                >
                                    <RealPictureBtnBGContainer>
                                        <RealPictureBtnBG source={data[firstIndex].realImage1} resizeMode="cover" />
                                    </RealPictureBtnBGContainer>
                                </RealPictureBtn>
                            )}

                            <CardImgShell style={{backgroundColor:data[firstIndex].bgColor}}>
                                <CardImg source={data[firstIndex].image} resizeMode="contain"></CardImg>
                                <ImageAudioBtn onPress={()=>{playSound(data[firstIndex].SoundImage),clickBlockerFunc()}}/>
                                {/* <CardImgShellModal 
                                    style={{
                                        backgroundColor: item.bgColor, 
                                        // backgroundColor: "black", 
                                        opacity:secondImageOpacity
                                    }}
                                >
                                        <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                </CardImgShellModal> */}
                            </CardImgShell>

                            {data[firstIndex].nameKOR.length>0 &&(<>
                                {type == "Ganada" ? (
                                <>{ganadaBtnFunc(firstIndex)}</>
                                ):(<>
                                <CardContents style={{flex:props.level == "word3LV" ? 2 : 1, zIndex:distractorContainerValue}}>
                                    <CardNameText>{dataName(firstIndex)}</CardNameText>


                                    <TextAudioBtn {...secondTextPan.panHandlers}
                                    onPressOut={()=>{playSound(itemAudio(firstIndex)),clickBlockerFunc()}} 
                                    />
                                    
                                    {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                    <CardNameModal style={{opacity:secondTextOpacity}}>
                                        <CardNameModalText style={{color:data[firstIndex].textColor}}>{dataName(firstIndex)}</CardNameModalText>
                                    </CardNameModal>


                                    {props.level == "word2LV" && (
                                        <QuestionMarkBg style={{opacity:questionOpacity, transform:[{scale:questionScale}]}}>
                                            <QuestionMarkBtn {...questionPan.panHandlers} onPress={() => {playSound(itemAudio(firstIndex)),clickBlockerFunc()} } >    
                                                <QuestionMarkImage source={data[firstIndex].questionMarkImage} resizeMode="contain"/>
                                            </QuestionMarkBtn>                                                    
                                        </QuestionMarkBg>
                                    )}

                                    {props.level == "word3LV" &&(<>
                                        <DistractorContainer style={{opacity:distractorContainerValue, transform:[{scale:distractorContainerScale}]}}>
                                        {/* <DistractorContainer style={{zIndex:0, opacity:1, transform:[{scale:0.01}]}}> */}
                                            <DistractorRow>
                                            {dataName(firstIndex) == dataName(numArray[0]) ? (
                                                <Distractor 
                                                    {...correct1.panHandlers} 
                                                    style={{transform:[{scale:distractorBtn1}]}}
                                                    onPressIn={()=>{playSound(correctAudio(numArray[0])),clickBlockerFunc()}}
                                                    >
                                                        <DistractorText>{dataName(numArray[0])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                    {...wrong1.panHandlers} 
                                                    style={{transform:[{scale:distractorBtn1}]}}
                                                    onPressIn={()=>playSound(wrongAudio(numArray[0]))}
                                                    >
                                                        <DistractorText>{dataName(numArray[0])}</DistractorText>
                                                    </Distractor>
                                                )}
                                                
                                                {dataName(firstIndex) == dataName(numArray[1]) ? (
                                                    <Distractor 
                                                    {...correct2.panHandlers}
                                                    style={{transform:[{scale:distractorBtn2}]}}
                                                    onPressIn={()=>{playSound(correctAudio(numArray[1])),clickBlockerFunc()}}
                                                    >
                                                        <DistractorText>{dataName(numArray[1])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                    {...wrong2.panHandlers}
                                                    style={{transform:[{scale:distractorBtn2}]}}
                                                    onPressIn={()=>playSound(wrongAudio(numArray[1]))}
                                                    >
                                                        <DistractorText>{dataName(numArray[1])}</DistractorText>
                                                    </Distractor>
                                                )}

                                                {/* 선택지 1번 */}
                                                {/* {itemName() == distractorName(0) ? (
                                                    correctAnswer(distractorBtn1Pan, distractorBtn1, distractorAudio(0), distractorName(0))
                                                ):(
                                                    wrongAnswer(distractorBtn1PanWrong, distractorBtn1, distractorAudio(0), distractorName(0), numArray[0].bgColor, wrongImageValue1 ,numArray[0].image)
                                                )} */}

                                                {/* 선택지 2번 */}
                                                {/* {itemName() == distractorName(1) ? (
                                                    correctAnswer(distractorBtn2Pan, distractorBtn2, distractorAudio(1), distractorName(1))
                                                ):(
                                                    wrongAnswer(distractorBtn2PanWrong, distractorBtn2, distractorAudio(1), distractorName(1), numArray[1].bgColor, wrongImageValue2, numArray[1].image)
                                                )} */}
                                            </DistractorRow>
                                            <DistractorRow>
                                                {dataName(firstIndex) == dataName(numArray[2]) ? (
                                                    <Distractor 
                                                        {...correct3.panHandlers}
                                                        style={{transform:[{scale:distractorBtn3}]}}
                                                        onPressIn={()=>{playSound(correctAudio(numArray[2])),clickBlockerFunc()}}
                                                    >
                                                        <DistractorText>{dataName(numArray[2])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                        {...wrong3.panHandlers}
                                                        style={{transform:[{scale:distractorBtn3}]}}
                                                        onPressIn={()=>playSound(wrongAudio(numArray[2]))}
                                                    >
                                                        <DistractorText>{dataName(numArray[2])}</DistractorText>
                                                    </Distractor>
                                                )}

                                                {dataName(firstIndex) == dataName(numArray[3]) ? (
                                                    <Distractor 
                                                        {...correct4.panHandlers}
                                                        style={{transform:[{scale:distractorBtn4}]}}
                                                        onPressIn={()=>{playSound(correctAudio(numArray[3])),clickBlockerFunc()}}
                                                    >
                                                        <DistractorText>{dataName(numArray[3])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                        {...wrong4.panHandlers}
                                                        style={{transform:[{scale:distractorBtn4}]}}
                                                        onPressIn={()=>playSound(wrongAudio(numArray[3]))}
                                                    >
                                                        <DistractorText>{dataName(numArray[3])}</DistractorText>
                                                    </Distractor>
                                                        
                                                )}

                                                {/* 선택지 3번 */}
                                                {/* {itemName() == distractorName(2) ? (
                                                    correctAnswer(distractorBtn3Pan, distractorBtn3, distractorAudio(2), distractorName(2))
                                                ):(
                                                    wrongAnswer(distractorBtn3PanWrong, distractorBtn3, distractorAudio(2), distractorName(2), numArray[2].bgColor, wrongImageValue3, numArray[2].image)
                                                )} */}
                                                {/* 선택지 4번 */}
                                                {/* {itemName() == distractorName(3) ? (
                                                    correctAnswer(distractorBtn4Pan, distractorBtn4, distractorAudio(3), distractorName(3))
                                                ):(
                                                    wrongAnswer(distractorBtn4PanWrong,distractorBtn4,distractorAudio(3), distractorName(3), numArray[3].bgColor, wrongImageValue4,numArray[3].image)
                                                )} */}
                                            </DistractorRow>
                                        </DistractorContainer>
                                    </> )}
                                </CardContents>
                                </>)}
                            </>)}
                            {/* 정답체크 */}
                            <CorrectAnswerContainer style={{transform:[{scale:correctAnswerMarkValue}], zIndex:2}}>
                                <CorrectAnswerImage source={require("../asset/images/Check.png")} />
                            </CorrectAnswerContainer>
                        </Card>
                    </CardContainer>
                    

                    
                {/* )} */}
            </Container>
        )
    }
    return(levelConsole())
}