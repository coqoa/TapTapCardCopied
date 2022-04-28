import React, {useState, useEffect, useCallback, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, Animated, Pressable, PanResponder, Text, Platform, ActivityIndicator} from "react-native";
import styled from "styled-components"
import { colors } from "./Color";

import { AnimalCardArray } from "../asset/data/AnimalCardArray";
import { KorArrayConsonant, KorArrayVowel } from "../asset/data/WordArrayKOR";
import { Alphabet } from "../asset/data/Alphabet";
import { Number } from "../asset/data/Number";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AnimalAnimation from "./AnimalAnimation";
import ClearModal from './ClearModal';
import QuestionMarkAnimation from './lottieComponent/QuestionMarkAnimation';
import CorrectAnswer from "./lottieComponent/CorrectAnswer";
import WrongAnswer from './lottieComponent/WrongAnswer';

//Diemensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Container = styled.View`
flex: 1;
    justify-content: center;
    align-items: center;
`
const CardContainer = styled.View`
    /* flex: 1; */
    width: 100%;
    height: 120%;
    justify-content: center;
    align-items: center;
`
const Card = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 80%;
    height: 80%;
    padding: 0px 15px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
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
const CardImgShellModal = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    /* z-index: 1; */
`
const CardImg2 = styled(CardImg)``
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
    height: 60px;
    text-align: center;
    font-size: 60px;
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
    background-color: rgba(0,0,0,0);
`
const TextAudioBtn = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 50%;
    height: 70%;
    border-radius: 80px;
    background-color: rgba(0,0,0,0);
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
const QuestionLottie = styled.View`
    flex:1;
    top:10px;
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
    width: 50%;
    height: 90%;
    margin: 5px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    /* border: 2px solid ${colors.GRAY}; */
    background-color: rgba(255,255,255, 1);
    z-index: 100;
`
const DistractorText = styled(Animated.createAnimatedComponent(Text))`
    font-family: 'SDChild';
    font-size: 28px;
    color: ${colors.REALDARKGRAY};
`
const CorrectAnswerContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    bottom: 25%;
    width: 100px;
    height: 100px;
`
const CorrectAnswerImage = styled.Image`
    width: 100%;
    height: 100%;
`
const WrongContainer = styled(CorrectAnswerContainer)``

//마지막 카드에서 생성되는 모달창 style
const ClearModalContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
    background-color: ${colors.mainBgColor};
`
const ClickBlock = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
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
    height: 100%;
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

    //카드 로딩
    // const [loading,setLoading] = useState(true);
    // useEffect(()=>{
    //     setTimeout(function(){
    //         setLoading(false)
    //     },500)
    // },[])

    //  데이터베이스 이메일체크(결제고객체크)
    const PaymentUserCollection = firestore().collection('PaymentUsers');
    const [userEmail, setUserEmail] = useState(auth()._user.email);     
    const [paymentMember, setPaymentMember] = useState(false);
    const readPaymentUserDB = async() =>{
        const readDBsnapshot = await PaymentUserCollection.get();
        readDBsnapshot.forEach(value=> (value.data().email == userEmail ? setPaymentMember(true):(null)))
    }
    useEffect(()=>{
        readPaymentUserDB()
    },[])
    
    //정답모달창 관련 state
    const [correctAnswerMark, setCorrectAnswerMark] = useState(false)

    //useState
    const [refresh, setRefresh] = useState(true);
    const [picture, setPicture] = useState(false)

    // props 관련
    const type = props.type
    
    // 데이터배열 분배기
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
    //결제멤버/ 미결제 멤버 체크해주는 함수
    //clear모달에서 결제멤버면 다음창으로 미결제멤버면 결제버튼 출력하기
    const memberChecker = (e) => {
        // if(paymentMember == true){
        //     return arrayAlloter(e)
        // }else{
        //     return arrayAlloter(e).slice(0,8)
        // }
        return arrayAlloter(e)
    }
    const data = memberChecker(type)

    // AnimatedValues & panResponder ~
    // 카드애니메이션 (좌우이동, scale, opacity)
    const position = useRef(new Animated.Value(0)).current;

    const lastListModal = useRef(new Animated.Value(0)).current;

// 카드 애니메이션 관련
    //Value
    const cardPosition = useRef(new Animated.Value(0)).current;
    const cardScaleValue = useRef(new Animated.Value(1)).current;
    const distractorOpacity = useRef(new Animated.Value(1)).current;
    // interpolate
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
    //Animations
    const distractorOpacityUp = Animated.spring(distractorOpacity,{
        toValue:1,
        delay:300,
        useNativeDriver:true
    })
    const cardPressIn = Animated.spring(cardScaleValue,{
        toValue:0.95,
        useNativeDriver:true
    })
    const cardPressOut = Animated.spring(cardScaleValue,{
        toValue:1,
        useNativeDriver:true
    })
    const goLeft = Animated.timing(cardPosition, {toValue:-SCREEN_WIDTH*1.3,duration:200, useNativeDriver:true});
    const goRight = Animated.timing(cardPosition, {toValue:SCREEN_WIDTH*1.3,duration:200, useNativeDriver:true});
    const goCenter = Animated.spring(cardPosition, {toValue: 0, useNativeDriver:true});

    //클릭시 출력되는 secondImage Animations
    const secondImageOpacity = useRef(new Animated.Value(0)).current;
    const secondImageOn = Animated.timing(secondImageOpacity, {
        toValue:1,
        duration:500,
        useNativeDriver:true
    })
    const secondImageOff = Animated.timing(secondImageOpacity, {
        toValue:0,
        duration:500,
        delay:100,
        useNativeDriver:true
    })
    //panResponder
    const cardPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:() => true,
        onPanResponderMove:(_,{dx})=>{cardPosition.setValue(dx)},
        onPanResponderGrant:()=>{cardPressIn.start();},
        onPanResponderRelease:(_,{dx})=>{ 
            if(dx < -180){
                playSound(require("../asset/audio/CardPass.mp3"))
                {props.level == "word2LV" && (
                    setTimeout(function(){
                        questionOpacity.setValue(1),
                        questionScale.setValue(1)
                    },70)
                )}
                distractorOpacity.setValue(0)
                Animated.parallel([
                    goLeft,
                    distractorContainervisible,
                    distractorContainerScaleMax, 
                ]).start(onDismiss, Animated.parallel([distractorOpacityUp]).start());
            }else if(dx > 180){
                playSound(require("../asset/audio/CardPass.mp3"))
                {props.level == "word2LV" && (
                    setTimeout(function(){
                        questionOpacity.setValue(1),
                        questionScale.setValue(1)
                    },70)
                )}
                distractorOpacity.setValue(0)
                Animated.parallel([
                    goRight,
                    distractorContainervisible,
                    distractorContainerScaleMax,
                ]).start(onDismiss, Animated.parallel([distractorOpacityUp]).start());
            }else{
                Animated.parallel([cardPressOut,goCenter]).start();
            }
        },
        onPanResponderEnd:(_,{dx})=>{
            if(dx<30 && dx>-30){
                Animated.sequence([secondImageOn,secondImageOff]).start()
            }
        }
    })).current;
    const onDismiss = () => {
        setFirstIndex(prev => prev + 1);
        //카드변경 깜빡임 방지 setTimeout함수
        setTimeout(function(){
            setSecondIndex(prev => prev + 1);
            cardScaleValue.setValue(1)
            cardPosition.setValue(0);
        },50)
    }

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
    // 물음표 박스 panResponder
    const questionPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{Animated.parallel([
            questionOpacityPress,
            questionScalePress,
            Animated.sequence([secondTextOn, secondTextOff])
        ]).start();}
    })).current
    
    // 동물 3레벨 선택지 Animations
    const distractorContainerValue = useRef(new Animated.Value(1)).current;
    const distractorContainerInvisible = Animated.timing(distractorContainerValue, {
        toValue:0,
        duration:150,
        useNativeDriver:true
    })
    const distractorContainervisible = Animated.timing(distractorContainerValue, {
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
    const distractorContainerScaleMax = Animated.timing(distractorContainerScale, {
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
    //선택지 버튼 panResponder
    const distracttorCorrect = (a,b) => {
        return(
            useRef(PanResponder.create({
                onStartShouldSetPanResponder:()=>true,
                onPanResponderStart:()=>{Animated.sequence([a]).start()},
                onPanResponderEnd:()=>{
                    distractorOpacity.setValue(0)
                    setCorrectAnswerMark(true)
                    setTimeout(()=>{
                        setCorrectAnswerMark(false)
                    },1800)
                    Animated.parallel([
                        
                        b,
                        distractorContainerInvisible,
                        distractorContainerScaleMini,
                        Animated.sequence([secondTextOn, secondTextOff])
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
                    wrongShell.setValue(1)
                    Animated.parallel([
                        b,
                        Animated.sequence([wrongShellOn, wrongShellOff]),
                    ]).start();
                }
            })).current
        )
    }

    //오답애니메이션 
    const wrongShell = useRef(new Animated.Value(0)).current;
    const wrongShellOn = Animated.spring(wrongShell, {
        toValue:1.5,
        useNativeDriver:true
    })
    const wrongShellOff = Animated.spring(wrongShell, {
        toValue:0,
        delay:800,
        useNativeDriver:true
    })
    
    const wrong1 = distracttorWrong(btn1PressOn, btn1PressOut)
    const wrong2 = distracttorWrong(btn2PressOn, btn2PressOut)
    const wrong3 = distracttorWrong(btn3PressOn, btn3PressOut)
    const wrong4 = distracttorWrong(btn4PressOn, btn4PressOut)
    // 선택지 정답확인
    const distractorChecker = (a,b,c,d) => {
        return(
            dataName(firstIndex) == dataName(d) ? (
                <Distractor 
                    {...a.panHandlers} 
                    style={{
                        transform:[{scale:c}],
                        shadowColor: "black",
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        shadowOffset: {height: 2,width: 1,},
                        elevation:3
                    }}
                    onPressIn={()=>{playSound(correctAudio(d)),clickBlockerFunc()}}
                >
                    <DistractorText style={{opacity:distractorOpacity}}>{dataName(d)}</DistractorText>
                </Distractor>
            ):(
                <Distractor 
                {...b.panHandlers} 
                style={{transform:[{scale:c}],
                    shadowColor: "black",
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    shadowOffset: {height: 2,width: 0,},
                    elevation:3
                }}
                onPressIn={()=>playSound(wrongAudio(d))}
                >
                    <DistractorText style={{opacity:distractorOpacity}}>{dataName(d)}</DistractorText>
                </Distractor>
            )
        )
    }
    

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
        toValue:3,
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
    
// function
    //오디오관련
    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
            setTimeout(function(){
                sound.unloadAsync();
            },200) 
        } catch (error) {
            console.log('CardDefault.js ClickSound error = ', error)
        }
    }
    function playSound(sound){
        // console.log('Playing '+sound);
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                // console.log('Unloading '+sound);
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((error)=>{});
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
        switch(type){
            case "AnimalKOR":
                return data[e].SoundKOR;
            case "AnimalENG":
                return data[e].SoundENG;
            default:
                return
        }
        // return data[e].SoundImage;
    }

    {if(secondIndex == data.length-1){
        lastListModal.setValue(1)
        playSound(require("../asset/audio/LastListModal.mp3"))
        
    }}
    
    //랜덤배열
    // console.log(data[0].id)
    const numberArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    //배열마다 무작위 숫자 부여
    const mapArray = numberArray.map(item => item*Math.floor(Math.random()*(data.length-2)))
    // console.log(data.length, mapArray)
    // // 동일한 숫자 제거
    const mapArraySort = Array.from(new Set(mapArray))
    // console.log(mapArraySort)
    // // 해당카드의 id는 제거한다(중복방지)
    const filterMapArray = mapArraySort.filter(function(element){
        return element !== firstIndex
    });
    // console.log(filterMapArray)
    const numArray =  [data[firstIndex].id, filterMapArray[0], filterMapArray[1], filterMapArray[2]]
    // console.log(numArray)
    // // 배열 섞기
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    shuffle(numArray)
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
                {data[firstIndex].item11!==undefined &&(
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
        lastListModal.setValue(0)
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
            // <Container style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT}}>
            <Container>
                <ClickBlock style={{zIndex:clickBlockerValue, opacity:clickBlockerValue}} />
                {/* 실사 모달창 */}
                {arrayAlloter(type) == AnimalCardArray && (
                    <RealPictureContainer style={{zIndex: pictureZIndex, opacity:pictureOpacity, transform:[{scale:pictureContainerScale}]}}>
                        <RealPictureExitBtn  
                            {...pictureClosePan.panHandlers} 
                            onPressIn={()=>{ClickSound(),setTimeout(function(){setPicture(false)},500) }} 
                            style={{transform:[{scale:pictureCloseBtnScale}]}}
                        >
                            <RealPictureExitBtnImage source={require("../asset/images/RealPictureExitBtn.png")} resizeMode="contain" />
                        </RealPictureExitBtn>
                        {picture == true && 
                        <RealPictureScrollView style={{width:SCREEN_WIDTH}} pagingEnabled horizontal >
                            {PictureImageData(data[firstIndex].realImage1)}
                            {PictureImageData(data[firstIndex].realImage2)}
                            {PictureImageData(data[firstIndex].realImage3)}
                            {PictureImageData(data[firstIndex].realImage4)}
                            {PictureImageData(data[firstIndex].realImage5)}
                        </RealPictureScrollView>
                        }
                    </RealPictureContainer>
                )}

                {/* 카드부분 */}
                <CardContainer>
                    {/* 마지막장에 출력되는 모달창 */}
                    <ClearModalContainer style={{opacity:lastListModal, zIndex:lastListModal}}>
                        <ClearModal type={type} level={props.level} restartLevelBtn={restartLevelBtn} nextLevelBtn={nextLevelBtn} />
                    </ClearModalContainer> 
                    {/* 뒷카드 */}
                    <Card
                    style={{
                        backgroundColor: data[secondIndex].cardBgColor,
                        transform: [{scale:secondCardScale}],
                    }}>
                        {data[secondIndex].id < data.length-2 &&(
                        <RealPictureBtn>
                            <RealPictureBtnBGContainer>
                                <RealPictureBtnBG source={data[secondIndex].realImage1} resizeMode="cover" />
                            </RealPictureBtnBGContainer>
                        </RealPictureBtn>
                        )}

                            <CardImgShell style={{backgroundColor:data[secondIndex].bgColor}}>
                                {arrayAlloter(type) == AnimalCardArray ? (
                                    <AnimalAnimation id={data[secondIndex].id} />
                                ):(
                                    <CardImg source={data[secondIndex].image} resizeMode="contain"></CardImg>
                                )}
                            </CardImgShell>

                            {data[secondIndex].id.length>0 &&(
                            <>
                                {type == "Ganada" ? (
                                    <>{ganadaBtnFunc(secondIndex)}</>
                                ):(
                                    <CardContents style={{flex:props.level == "word3LV" ? 2 : 1, zIndex:distractorContainerValue }}>
                                        {props.level == "word2LV" && (
                                            <QuestionMarkBg>
                                                <QuestionMarkBtn>    
                                                    <QuestionLottie style={{transform:[{scale:2}]}}>
                                                        <QuestionMarkAnimation />
                                                    </QuestionLottie>
                                                </QuestionMarkBtn>                                                    
                                            </QuestionMarkBg>
                                        )}
                                        {props.level == "word3LV" &&(
                                        <>
                                            {data[secondIndex].id < data.length-2 &&(
                                                <DistractorContainer>
                                                    <DistractorRow>
                                                        <Distractor />
                                                        <Distractor />
                                                    </DistractorRow>
                                                    <DistractorRow>
                                                        <Distractor />
                                                        <Distractor />
                                                    </DistractorRow>
                                                </DistractorContainer>
                                            )}
                                        </>
                                        )}
                                        {props.level !== "word3LV" && (
                                            <CardNameText style={{fontSize:60}}>{dataName(secondIndex)}</CardNameText>
                                        )}
                                    </CardContents>
                                )}
                            </>
                        )}
                    </Card>
                    {/* 앞카드 */}
                    <Card
                    {...cardPan.panHandlers}
                    style={{
                        backgroundColor: data[firstIndex].cardBgColor,
                        transform:[{scale:cardScaleValue}, {translateX:cardPosition},{rotateZ:cardRotation}],
                    }}>
                        {/* 실사모달버튼 */}
                        {arrayAlloter(type) == AnimalCardArray && (
                            <RealPictureBtn
                            {...pictureOpenPan.panHandlers}
                            style={{transform:[{scale:pictureBtnScale}]}}
                            onPressIn={()=>{pictureBtnScale.setValue(0.8), ClickSound(), setPicture(true)}}
                            onPressOut={()=>{pictureBtnScale.setValue(1)}}
                            >
                                <RealPictureBtnBGContainer>
                                    <RealPictureBtnBG source={data[firstIndex].realImage1} resizeMode="cover" />
                                </RealPictureBtnBGContainer>
                            </RealPictureBtn>
                        )}
                        {/* 카드 그림부분 */}
                        <CardImgShell style={{backgroundColor:data[firstIndex].bgColor}}>
                            {arrayAlloter(type) == AnimalCardArray ? (
                            <>
                                <AnimalAnimation id={data[firstIndex].id} />
                                <ImageAudioBtn onPress={()=>{playSound(data[firstIndex].SoundImage),clickBlockerFunc()}}/>
                            </>
                            ):(
                            <>
                                <CardImg source={data[firstIndex].image} resizeMode="contain" />
                                <ImageAudioBtn {...cardPan.panHandlers} onPress={()=>{playSound(data[firstIndex].SoundImage),clickBlockerFunc()}}/>
                                <CardImgShellModal style={{
                                    backgroundColor: data[firstIndex].bgColor, 
                                    opacity:secondImageOpacity}}
                                >
                                    <CardImg2 source={data[firstIndex].image2} resizeMode="contain"></CardImg2>
                                </CardImgShellModal>
                            </>
                            )}
                        </CardImgShell>
                        {/* 카드 텍스트부분 */}
                        {data[firstIndex].id.length > 0 &&(<>
                            {type == "Ganada" ? (
                                <>{ganadaBtnFunc(firstIndex)}</>
                            ):(
                            <CardContents style={{flex:props.level == "word3LV" ? 2 : 1, zIndex:distractorContainerValue}}>
                                <CardNameText>{dataName(firstIndex)}</CardNameText>
                                <TextAudioBtn {...secondTextPan.panHandlers}
                                    onPressOut={()=>{playSound(itemAudio(firstIndex)),clickBlockerFunc()}} 
                                />
                                {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                <CardNameModal style={{opacity:secondTextOpacity}}>
                                    <CardNameModalText style={{color:data[firstIndex].textColor}}>{dataName(firstIndex)}</CardNameModalText>
                                    {/* <CardNameModalText style={{color:data[firstIndex].bgColor}}>{dataName(firstIndex)}</CardNameModalText> */}
                                </CardNameModal>

                                {props.level == "word2LV" && (
                                    <QuestionMarkBg  style={{opacity:questionOpacity, transform:[{scale:questionScale}]}}>
                                        <QuestionMarkBtn {...questionPan.panHandlers} onPress={() => {playSound(itemAudio(firstIndex)),clickBlockerFunc()}} >  
                                            <QuestionLottie style={{transform:[{scale:2}]}}>
                                                <QuestionMarkAnimation />
                                            </QuestionLottie>
                                        </QuestionMarkBtn>                                                    
                                    </QuestionMarkBg>
                                )}

                                {props.level == "word3LV" &&(
                                    <DistractorContainer style={{opacity:distractorContainerValue, transform:[{scale:distractorContainerScale}]}}>
                                        <DistractorRow>
                                            {distractorChecker(correct1, wrong1, distractorBtn1,numArray[0])}
                                            {distractorChecker(correct2, wrong2, distractorBtn2,numArray[1])}
                                        </DistractorRow>
                                        <DistractorRow>
                                            {distractorChecker(correct3, wrong3, distractorBtn3,numArray[2])}
                                            {distractorChecker(correct4, wrong4, distractorBtn4,numArray[3])}
                                        </DistractorRow>
                                    </DistractorContainer>
                                )}
                            </CardContents>
                            )}
                        </>)}
                        {/* 오답체크 */}
                        <WrongContainer style={{transform:[{scale:wrongShell}], zIndex:2}}>
                            <WrongAnswer />
                        </WrongContainer>
                        {/* 정답체크 */}
                        {correctAnswerMark && (
                            <CorrectAnswerContainer style={{transform:[{scale:3}], zIndex:2}}>
                                <CorrectAnswer />
                            </CorrectAnswerContainer>
                        )}
                    </Card>
                </CardContainer>
            </Container>
        )
    }
    return(levelConsole())
}