import React, {useState, useEffect, useCallback, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, FlatList, Animated, Easing, TouchableOpacity, Pressable, PanResponder,Text, TextInput, Button, ScrollView } from "react-native";
import styled from "styled-components"
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimalCardArray } from "../asset/data/AnimalCardArray";
import { KorArrayConsonant, KorArrayVowel } from "../asset/data/WordArrayKOR";
import { Alphabet } from "../asset/data/Alphabet";
//Diemensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


const CardList = styled(Animated.createAnimatedComponent(FlatList))``
const CardSection = styled.View`
    justify-content: center;
    align-items: center;
`
const Card = styled(Animated.createAnimatedComponent(View))`
    width: 80%;
    height: 100%;
    padding: 0px 15px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
`
const CardImgShell = styled.View`
    align-items: center;
    justify-content: center;
    flex: 4;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    z-index: 10;
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
const ClickBlock = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
    z-index: 1;
`
const CardImgShellModal = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`
const CardImg2 = styled(CardImg)`

`
const CardContents = styled.View`
    width: 100%;
    z-index: 15;
    `
const CardName = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    `
const CardNameText = styled.Text`
    height: 90px;
    text-align: center;
    font-size: 90px;
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


const QuestionMarkBg = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 90%;
    height: 90%;
    background-color: ${colors.BEIGE};
    /* border: 1px solid red; */
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
const ClearModalContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
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
const ClearImage = styled.Image`
    width: 130px;
    height: 130px;
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
    top: -40px;
    width: 80px;
    height: 80px;
    border-radius: 15px;
`
const CorrectAnswerImage = styled.Image`
    width: 100%;
    height: 100%;
`
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
/* border: 1px solid red; */
border-radius: 10px;

    width: 100%;
    height: 100%;
`

const RealPictureContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    z-index: 50;
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
    /* border: 1px solid green; */
    /* z-index: 100; */
`
const PictureImageShell = styled.View`
    /* justify-content: flex-start; */
    border: 1px solid ${colors.REALLIGHTGRAY};
    align-items: center;
    border-radius: 20px;
    `
const PictureImage = styled.Image`
width: 100%;
height: 100%;
border-radius: 20px;

`
const ViewWrong = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 45px;
    `
const ViewWrongImage = styled.Image`
background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: 15px;
`
//가나다관련
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
    /* border:0.3px solid ${colors.LIGHTGRAY}; */
`
const GanadaNameText = styled.Text`
    text-align: center;
    font-family: "SDChild";
    font-size: 30px;
    color: ${colors.DARKGRAY};
`
// ---------------------------------------------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [distractorWindowBackground, setDistractorWindowBackground] = useState(true);
    const [distractorWindow, setDistractorWindow] = useState(true);
    const [scrollOn, setScrollOn] = useState(true)
    // AnimatedValues & panResponder
    // 카드애니메이션
    const position = useRef(new Animated.Value(0)).current;
    const scaleControl = position.interpolate({
        inputRange:[-170,0,170,],
        outputRange:[0,1,0],
        extrapolate: "clamp" 
    });
    const opacityControl = position.interpolate({
        inputRange:[-200,0,200,],
        outputRange:[0,1,0],
        extrapolate: "clamp" 
    });
    const rotation = position.interpolate({
        inputRange:[-200,0, 200],
        outputRange:["-15deg","0deg" ,"15deg"],
        extrapolate: "clamp" // 범위에서 넘어가면 interpolate를 어떻게 처리할지 ?
    });
    const tensionAnimated = Animated.spring(position, {
        tension:10,
        friction:5,
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
        useNativeDriver:true,
    });

    const defaultAnimated1 = useRef(new Animated.Value(1)).current;
    const onPressIn =  Animated.spring(defaultAnimated1, {
        toValue:0.9,
        useNativeDriver:true
    })
    const onPressOut = Animated.spring(defaultAnimated1, {
        toValue:1,
        useNativeDriver:true
    })
    const panResponder = useRef(PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {onPressIn.start();}, 
            onPanResponderMove:(_,{dx}) => {position.setValue(dx)}, 
            onPanResponderRelease: () => {
                playSound(require("../asset/audio/CardPass.mp3"))
                {props.level == "word2LV" && (
                    setTimeout(function(){
                        questionOpacity.setValue(1)
                    },70)
                ) }
                {props.level == "word3LV" && (
                    distractorContainerValue.setValue(1),
                    setTimeout(function() {
                        setDistractorWindow(true)
                    },80)
                )}
                Animated.parallel([onPressOut,tensionAnimated]).start();
            }
        })
    ).current
    
    //클릭시 나오는 두번째 이미지
    const secondImageOpacity = useRef(new Animated.Value(0)).current;
    const secondImageOn = Animated.timing(secondImageOpacity, {
        toValue:1,
        useNativeDriver:true
    })
    const secondImageOff = Animated.timing(secondImageOpacity, {
        toValue:0,
        delay:500,
        useNativeDriver:true
    })
    const secondImagePan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderEnd:()=>{Animated.sequence([secondImageOn,secondImageOff]).start();}
    })).current

    // 텍스트클릭 애니메이션
    const secondTextOpacity = useRef(new Animated.Value(0)).current;
    const secondTextOn = Animated.timing(secondTextOpacity,{
        toValue:1,
        useNativeDriver:true
    })
    const secondTextOff = Animated.timing(secondTextOpacity,{
        toValue:0,
        delay:1000,
        useNativeDriver:true
    })
    const secondTextPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderEnd:()=>{
            Animated.sequence([secondTextOn, secondTextOff]).start();
        }
    })).current
    // 물음표 애니메이션
    const questionOpacity = useRef(new Animated.Value(1)).current;
    const questionOpacityPress = Animated.timing(questionOpacity,{
        toValue:0,
        useNativeDriver:true
    })
    const questionPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{Animated.parallel([questionOpacityPress,
            Animated.sequence([secondTextOn, secondTextOff])]).start();}
        
    })).current
     // 실사 애니메이션
    const pictureBtnScale = useRef(new Animated.Value(1)).current
    const pictureBtnPressIn = Animated.timing(pictureBtnScale,{
        toValue:0.8,
        duration:100,
        useNativeDriver:true
    })
    const pictureBtnPressOut = Animated.timing(pictureBtnScale,{
        toValue:1,
        duration:100,
        delay:50,
        useNativeDriver:true
    })

    const pictureContainerScale = useRef(new Animated.Value(0)).current
    const pictureContainerModalOn = Animated.spring(pictureContainerScale,{
        toValue:1,
        // duration:200,
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
    const pictureOpenPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            // Animated.sequence([pictureBtnPressIn, 
                Animated.parallel([pictureContainerModalOn, pictureOpacityOn]).start();
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
            // console.log('asd')
        Animated.sequence([pictureCloseBtnPressIn, pictureCloseBtnPressOut,
            Animated.parallel([pictureContainerModalOff,pictureOpacityOff])]).start();
        }
    })).current

    // 3LV 정답체크부분
    // 클릭블로커
    const clickBlockerValue = useRef(new Animated.Value(0)).current
    const clickBlockerFunc = () =>{
        clickBlockerValue.setValue(1),
        setTimeout(function(){
            clickBlockerValue.setValue(0)
        },1000)
    }
    
    // 선택지 모달창
    const distractorContainerValue = useRef(new Animated.Value(1)).current;
    const distractorContainerInvisible = Animated.timing(distractorContainerValue, {
        toValue:0,
        duration:150,
        useNativeDriver:true
    })
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
    
    // 1번 선택지
    const distractorBtn1 = useRef(new Animated.Value(1)).current;
    // 1번 정답
    const distractorBtn1Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },
        onPanResponderEnd:()=>{
            Animated.parallel([
                distractorContainerInvisible,
                Animated.sequence([secondTextOn, secondTextOff]), 
                Animated.sequence([checkMarkOn, checkMarkOff])
            ]).start();
        }
    })).current
    // 1번 오답
    const wrongImageValue1 = useRef(new Animated.Value(0)).current
    const wrongImageOn1 = Animated.spring(wrongImageValue1,{
        toValue:1,
        friction:6,
        tension:70,
        useNativeDriver:true
    })
    const wrongImageOff1 = Animated.timing(wrongImageValue1,{
        toValue:0,
        delay:700,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn1PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },
        onPanResponderEnd:()=>{
            Animated.sequence([wrongImageOn1, wrongImageOff1]).start();
        }
    })).current

    // 2번 선택지
    const distractorBtn2 = useRef(new Animated.Value(1)).current;
    // 2번 정답
    const distractorBtn2Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },onPanResponderEnd:()=>{
            Animated.parallel([
                distractorContainerInvisible,
                Animated.sequence([secondTextOn, secondTextOff]), 
                Animated.sequence([checkMarkOn, checkMarkOff])
            ]).start();
        }
    })).current
    // 2번 오답
    const wrongImageValue2 = useRef(new Animated.Value(0)).current
    const wrongImageOn2 = Animated.spring(wrongImageValue2,{
        toValue:1,
        friction:6,
        tension:70,
        useNativeDriver:true
    })
    const wrongImageOff2 = Animated.timing(wrongImageValue2,{
        toValue:0,
        delay:700,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn2PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },
        onPanResponderEnd:()=>{
            Animated.sequence([wrongImageOn2, wrongImageOff2]).start();
        }
    })).current

    // 3번 선택지
    const distractorBtn3 = useRef(new Animated.Value(1)).current;
    // 3번 정답
    const distractorBtn3Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },onPanResponderEnd:()=>{
            Animated.parallel([
                distractorContainerInvisible,
                Animated.sequence([secondTextOn, secondTextOff]), 
                Animated.sequence([checkMarkOn, checkMarkOff])
            ]).start();
        }
    })).current
    // 3번 오답
    const wrongImageValue3 = useRef(new Animated.Value(0)).current
    const wrongImageOn3 = Animated.spring(wrongImageValue3,{
        toValue:1,
        friction:6,
        tension:70,
        useNativeDriver:true
    })
    const wrongImageOff3 = Animated.timing(wrongImageValue3,{
        toValue:0,
        delay:700,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn3PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },
        onPanResponderEnd:()=>{
            Animated.sequence([wrongImageOn3, wrongImageOff3]).start();
        }
    })).current


    // 4번 선택지
    const distractorBtn4 = useRef(new Animated.Value(1)).current;
    // 4번 정답
    const distractorBtn4Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },onPanResponderEnd:()=>{
            Animated.parallel([
                distractorContainerInvisible,
                Animated.sequence([secondTextOn, secondTextOff]), 
                Animated.sequence([checkMarkOn, checkMarkOff])
            ]).start();
        }
    })).current
    // 4번 오답
    const wrongImageValue4 = useRef(new Animated.Value(0)).current
    const wrongImageOn4 = Animated.spring(wrongImageValue4,{
        toValue:1,
        friction:6,
        tension:70,
        useNativeDriver:true
    })
    const wrongImageOff4 = Animated.timing(wrongImageValue4,{
        toValue:0,
        delay:700,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn4PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
        },
        onPanResponderEnd:()=>{
            Animated.sequence([wrongImageOn4, wrongImageOff4]).start();
        }
    })).current
    
    //마지막 카드에서 출력되는 모달창, 다시하기버튼, 다음레벨 버튼
    const lastListModalOn = () => {
        setClearModalToggle((prev) => !prev)
        playSound(require("../asset/audio/LastListModal.mp3"))
        
    };
    // 다시하기 버튼
    const restartLevelBtn = () => {
        setRefresh(false)
        setClearModalToggle((prev) => !prev)
    };
    // 다음레벨 버튼
    //자식컴포넌트에서 부모컴포넌트 state를 바꾸려면 함수를 이용해야한다 (그냥 props는 읽기전용이라 props.level="???" 이런식으로 변경 불가능)
    const nextLevelBtn = (e) => {
        if(e=='word1LV'){
            props.getData('word2LV')
        }else if(e=='word2LV'){
            props.getData('word3LV')
        }else{
            null
        }
        setRefresh(false)
        setClearModalToggle((prev) => !prev)
    }
    //부모 컴포넌트로부터 type props(KOR, ENG 등등)를 받아서 그에 맞는 화면을 출력해주기 위한 변수 
    const type = props.type
    
    // 오디오출력, props를 받아서 해당 파일을 출력해줌
    const playSound = async(e) => {
        const sound = new Audio.Sound();
        try {    
            // 저장한 path로 음원 파일 불러오기 
            await sound.loadAsync(e);
            // 음원 재생하기 
            await sound.playAsync();
        } catch (error) {
        }
    }
    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
        } catch (error) {
        }
    }
//setTimeout / clearTimeout
    // 새로고침
    const refreshTimeout = useRef(null); 
    useEffect(()=>{
        refreshTimeout.current = setTimeout(function() {setRefresh(true)},100)
        return() => clearTimeout(refreshTimeout.current)
    },[refresh])

    // FlatList data 분배기
    const arrayAlloter = (e) => {
        if(e=="AnimalKOR"){
            // console.log(e)
            return AnimalCardArray
        }else if(e == "AnimalENG"){
            return AnimalCardArray
        }else if(e=="ganada"){
            if(props.level == "Consonant"){
                return KorArrayConsonant
            }else if (props.level == "Vowel"){
                return KorArrayVowel
            }
        }else if(e=="Language"){
            return Alphabet
        }
    }
    const levelConsole = () => {
        return(
            <View  style={{alignItems:"center", justifyContent:"center"}}>
            {/* 카드부분 */}
            {refresh && (
            <>
            {/* {console.log(arrayAlloter(type))} */}
            <CardList
                {...panResponder.panHandlers}
                data={arrayAlloter(type)}
                pagingEnabled
                scrollEnabled={scrollOn}
                horizontal
                showsHorizontalScrollIndicator={false}
                onEndReached={lastListModalOn}
                onEndReachedThreshold={-0.1}
                renderItem = {({item})=>{

                    // {console.log(WordArrayKOR)}
                    // {console.log(arrayAlloter(type) == AnimalCardArray)}
                    // 무작위배열만들기
                    const numberArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                    // 배열마다 무작위 숫자 부여
                    const mapArray = numberArray.map(item => item*Math.floor(Math.random()*AnimalCardArray.length)) 
                    //동일한 숫자 제거
                    const mapArraySort = Array.from(new Set(mapArray))
                    // 해당카드의 id는 제거한다(중복방지)
                    const filterMapArray = mapArraySort.filter(function(element){
                        return element !== item.id
                    });
                    const numArray =  [item, AnimalCardArray[filterMapArray[0]], AnimalCardArray[filterMapArray[1]], AnimalCardArray[filterMapArray[2]]]
                    // 배열 섞기
                    function shuffle(array) {
                        array.sort(() => Math.random() - 0.5);
                    }
                    shuffle(numArray);
                    
                        //type에 따라 다른 값 출력
                    const itemName = () => {
                        switch(type){
                            case "AnimalKOR":
                                return item.nameKOR;
                            case "AnimalENG":
                                return item.nameENG;
                            case "Language":
                                return item.nameKOR;
                            default:
                                return
                    }}
                    const itemAudio = () => {
                        switch(type){
                            case "AnimalKOR":
                                return item.SoundKOR;
                            case "AnimalENG":
                                return item.SoundENG;
                            case "Language":
                                return item.SoundKOR;
                            default:
                                return
                    }}
                    //선택지 type에 따라 다르게 표시하기
                    //선택지 이름
                    const distractorName = (e) =>{
                        switch(type){
                            case "AnimalKOR":
                                return numArray[e].nameKOR;
                            case "AnimalENG":
                                return numArray[e].nameENG;
                            default:
                                return
                        }
                    }
                    // 선택지 오디오
                    const distractorAudio = (e) => {
                        switch(type){
                            case "AnimalKOR":
                                return numArray[e].SoundKOR;
                            case "AnimalENG":
                                return numArray[e].SoundENG;
                            default:
                                return
                    }}
                    const PictureImageData = (e) => {
                        return(
                            <PictureImageShell style={{width:SCREEN_WIDTH}}><PictureImage source={e} resizeMode="cover" /></PictureImageShell>
                        )
                    }

                    // 가나다버튼
                    const ganadaBtn = (e,j) =>{
                        return(
                            <GanadaNameContents onPress={()=>{playSound(e)}}><GanadaNameText>{j}</GanadaNameText></GanadaNameContents>
                        )
                    }

                    return (
                    <CardSection style={{width:SCREEN_WIDTH}}> 
                        
                        {/* 실사 모달창 */}
                        {arrayAlloter(type) == AnimalCardArray && (
                        <RealPictureContainer style={{opacity:pictureOpacity, transform:[{scale:pictureContainerScale}]}}>
                            <RealPictureExitBtn  {...pictureClosePan.panHandlers} onPressIn={()=>{ClickSound()}} onPressOut={()=>{setScrollOn(true)}} style={{transform:[{scale:pictureCloseBtnScale}]}}>
                                <RealPictureExitBtnImage source={require("../asset/images/RealPictureExitBtn.png")} resizeMode="contain" />
                            </RealPictureExitBtn>
                            <RealPictureScrollView style={{width:SCREEN_WIDTH}}  pagingEnabled horizontal>
                                {PictureImageData(item.realImage1)}
                                {PictureImageData(item.realImage2)}
                                {PictureImageData(item.realImage3)}
                                {PictureImageData(item.realImage4)}
                                {PictureImageData(item.realImage5)}
                            </RealPictureScrollView>
                        </RealPictureContainer>
                        )}

                        {/* 카드전체스타일 */}
                        <Card style={{
                            backgroundColor : colors.BEIGE,
                            opacity: opacityControl,
                            transform:[{scale:scaleControl},{rotateZ:rotation}]
                        }}>

                            {/* 실사모달버튼 */}
                            {arrayAlloter(type) == AnimalCardArray && (
                                <RealPictureBtn
                                {...pictureOpenPan.panHandlers}
                                style={{transform:[{scale:pictureBtnScale}]}}
                                onPressIn={()=>{ClickSound(), pictureBtnScale.setValue(0.8)}}
                                onPressOut={()=>{setScrollOn(false), pictureBtnScale.setValue(1)}}
                                >
                                    <RealPictureBtnBGContainer>
                                        <RealPictureBtnBG source={item.realImage1} resizeMode="cover" />
                                    </RealPictureBtnBGContainer>
                                </RealPictureBtn>
                            )}
                                

                            {/* 카드 이미지 부분 */}
                            <CardImgShell style={{backgroundColor:item.bgColor}}>
                                <CardImg source={item.image} resizeMode="contain"></CardImg>
                                <ImageAudioBtn 
                                    {...secondImagePan.panHandlers}
                                    onPress={()=>playSound(item.SoundImage)}
                                />
                                <CardImgShellModal 
                                    style={{
                                        backgroundColor: item.bgColor, 
                                        opacity:secondImageOpacity
                                    }}
                                >
                                        <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                </CardImgShellModal>
                            </CardImgShell>

                            {/* 카드 텍스트 부분 */}
                            <CardContents style={{flex:props.level == "word3LV" ? 2 : 1}}>
                                <CardName>

                                    {/* {arrayAlloter(type) == KorArrayConsonant && ( */}
                                    {type == "ganada" && (
                                    <GanadaNameContainer>
                                        <GanadaNameShell>
                                            {ganadaBtn(item.SoundItem1, item.item1)}
                                            {ganadaBtn(item.SoundItem2, item.item2)}
                                            {ganadaBtn(item.SoundItem3, item.item3)}
                                            {ganadaBtn(item.SoundItem4, item.item4)}
                                            {ganadaBtn(item.SoundItem5, item.item5)}
                                        </GanadaNameShell>
                                        <GanadaNameShell>
                                            {ganadaBtn(item.SoundItem6, item.item6)}
                                            {ganadaBtn(item.SoundItem7, item.item7)}
                                            {ganadaBtn(item.SoundItem8, item.item8)}
                                            {ganadaBtn(item.SoundItem9, item.item9)}
                                            {ganadaBtn(item.SoundItem10, item.item10)}
                                        </GanadaNameShell>
                                        {item.item11!==undefined &&(
                                        <GanadaNameShell>
                                            {ganadaBtn(item.SoundItem11, item.item11)}
                                            {ganadaBtn(item.SoundItem12, item.item12)}
                                            {ganadaBtn(item.SoundItem13, item.item13)}
                                            {ganadaBtn(item.SoundItem14, item.item14)}
                                            {ganadaBtn()}
                                        </GanadaNameShell>
                                        )}
                                    </GanadaNameContainer>
                                    )}

                                    {/* {arrayAlloter(type) == AnimalCardArray && ( */}
                                    {type !== "ganada" && (
                                    <>
                                        <CardNameText>{itemName()}</CardNameText>
                                    
                                        {/* type에 따라 한글을 읽어주는지, 영어를 읽어주는지 */}
                                        <TextAudioBtn {...secondTextPan.panHandlers}
                                        onPressOut={()=>{playSound(itemAudio()),clickBlockerFunc()}} />
                                        
                                        {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                        <CardNameModal style={{opacity:secondTextOpacity}}>
                                            <CardNameModalText style={{color:item.textColor}}>{itemName()}</CardNameModalText>
                                        </CardNameModal>

                                        {/* 2레벨에서만 사용되는 물음표 박스 컴포넌트 */}
                                        {props.level == "word2LV" && (
                                            <QuestionMarkBg style={{opacity:questionOpacity}}>
                                                <QuestionMarkBtn {...questionPan.panHandlers} onPress={() => {playSound(itemAudio())} } >    
                                                    <QuestionMarkImage source={item.questionMarkImage} resizeMode="contain"/>
                                                </QuestionMarkBtn>                                                    
                                            </QuestionMarkBg>
                                        )}
                                        {props.level == "word3LV" &&(
                                        <>
                                            {distractorWindowBackground&&(
                                                <DistractorContainer style={{opacity:distractorContainerValue, transform:[{scale:distractorContainerValue}]}}>
                                                    {distractorWindow && (
                                                    <>
                                                        <DistractorRow>
                                                            {/* 선택지 1번 */}
                                                            {itemName() == distractorName(0) ? (
                                                                <Distractor {...distractorBtn1Pan.panHandlers} style={{transform:[{scale:distractorBtn1}]}} onPressIn={()=> distractorBtn1.setValue(0.8) } onPressOut={() => {distractorBtn1.setValue(1), playSound(distractorAudio(0)),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(0)}</DistractorText>
                                                                </Distractor>
                                                            ):(
                                                                <Distractor {...distractorBtn1PanWrong.panHandlers} style={{transform:[{scale:distractorBtn1}]}} onPressIn={()=>distractorBtn1.setValue(0.8)} onPressOut={() => {distractorBtn1.setValue(1), playSound(numArray[0].SoundImage),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(0)}</DistractorText>
                                                                    <ViewWrong style={{backgroundColor:numArray[0].bgColor ,transform:[{scale:wrongImageValue1}]}}><ViewWrongImage source={numArray[0].image} resizeMode="contain" /></ViewWrong>
                                                                </Distractor>
                                                            )}

                                                            {/* 선택지 2번 */}
                                                            {itemName() == distractorName(1) ? (
                                                                <Distractor {...distractorBtn2Pan.panHandlers} style={{transform:[{scale:distractorBtn2}]}} onPressIn={()=> distractorBtn2.setValue(0.8) } onPressOut={() => {distractorBtn2.setValue(1), playSound(distractorAudio(1)),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(1)}</DistractorText>
                                                                </Distractor>
                                                            ):(
                                                                <Distractor {...distractorBtn2PanWrong.panHandlers} style={{transform:[{scale:distractorBtn2}]}} onPressIn={()=>distractorBtn2.setValue(0.8)} onPressOut={() => {distractorBtn2.setValue(1), playSound(numArray[1].SoundImage),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(1)}</DistractorText>
                                                                    <ViewWrong style={{backgroundColor:numArray[1].bgColor ,transform:[{scale:wrongImageValue2}]}}><ViewWrongImage source={numArray[1].image} resizeMode="contain" /></ViewWrong>
                                                                </Distractor>
                                                            )}
                                                        </DistractorRow>
                                                        <DistractorRow>
                                                            {/* 선택지 3번 */}
                                                            {itemName() == distractorName(2) ? (
                                                                <Distractor {...distractorBtn3Pan.panHandlers} style={{transform:[{scale:distractorBtn3}]}} onPressIn={()=> distractorBtn3.setValue(0.8) } onPressOut={() => {distractorBtn3.setValue(1), playSound(distractorAudio(2)),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(2)}</DistractorText>
                                                                </Distractor>
                                                            ):(
                                                                <Distractor {...distractorBtn3PanWrong.panHandlers} style={{transform:[{scale:distractorBtn3}]}} onPressIn={()=>distractorBtn3.setValue(0.8)} onPressOut={() => {distractorBtn3.setValue(1), playSound(numArray[2].SoundImage),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(2)}</DistractorText>
                                                                    <ViewWrong style={{backgroundColor:numArray[2].bgColor ,transform:[{scale:wrongImageValue3}]}}><ViewWrongImage source={numArray[2].image} resizeMode="contain" /></ViewWrong>
                                                                </Distractor>
                                                            )}
                                                            {/* 선택지 4번 */}
                                                            {itemName() == distractorName(3) ? (
                                                                <Distractor {...distractorBtn4Pan.panHandlers} style={{transform:[{scale:distractorBtn4}]}} onPressIn={()=> distractorBtn4.setValue(0.8) } onPressOut={() => {distractorBtn4.setValue(1), playSound(distractorAudio(3)),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(3)}</DistractorText>
                                                                </Distractor>
                                                            ):(
                                                                <Distractor {...distractorBtn4PanWrong.panHandlers} style={{transform:[{scale:distractorBtn4}]}} onPressIn={()=>distractorBtn4.setValue(0.8)} onPressOut={() => {distractorBtn4.setValue(1), playSound(numArray[3].SoundImage),clickBlockerFunc()}}>
                                                                    <DistractorText>{distractorName(3)}</DistractorText>
                                                                    <ViewWrong style={{backgroundColor:numArray[3].bgColor ,transform:[{scale:wrongImageValue4}]}}><ViewWrongImage source={numArray[3].image} resizeMode="contain" /></ViewWrong>
                                                                </Distractor>
                                                            )}
                                                        </DistractorRow>
                                                    </>
                                                    )}
                                                </DistractorContainer>
                                            )}
                                            {/* 정답체크 */}
                                            <CorrectAnswerContainer style={{transform:[{scale:correctAnswerMarkValue}]}}>
                                                <CorrectAnswerImage source={require("../asset/images/Check.png")} />
                                            </CorrectAnswerContainer>
                                        </> 
                                        )}
                                    </>
                                    )}
                                    
                                </CardName>
                            </CardContents>
                        </Card>
                    </CardSection>
                    )
                }}
                />
            <ClickBlock style={{transform:[{scale:clickBlockerValue}]}} />
            </>
            )}
            {/* 마지막리스트 도달하면 열리는 모달창 */}
            {clearModalToggle && (
                <ClearModalContainer>
                    <ClearModal>
                        <ClearImage  source={require("../asset/images/Check.png")} />
                        <RepeatLevel
                            onPressIn={() => ClickSound()}
                            onPressOut={() => restartLevelBtn()}
                        >
                            {type == "AnimalKOR" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
                            {type == "AnimalENG" && (<RepeatLevelText>Again !</RepeatLevelText>)}
                            {type == "ganada" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
                            {type == "Language" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
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
                    </ClearModal>
                </ClearModalContainer>  
            )} 
            </View>
        )
    }
    return(levelConsole())
}