import React, {useState, useEffect, useCallback, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, FlatList, Animated, Easing, TouchableOpacity, Pressable, PanResponder,Text, TextInput, Button } from "react-native";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
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
    /* top: 1%; */
    height: 100%;
    padding: 0px 15px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
    /* border: 2px solid ${colors.REALDARKGRAY}; */
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
const ClickBlocker = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.5); */
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
    /* margin-bottom: 15px; */
    `
const CardName = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
    `
const CardNameText = styled.Text`
    /* width: 80px; */
    height: 90px;
    text-align: center;
    font-size: 90px;
    font-family: 'SDChild';
    color: ${colors.REALDARKGRAY};
    /* border: 1px solid black; */
`
const CardNameModal = styled.View`
    position: absolute;
    left: 0px;
    top: 0px;
    width:100%;
    height:100%;
    align-items: center;
    justify-content: center;
`
const CardNameModalText = styled(CardNameText)``


const QuestionMarkBg = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
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
    /* border: 1px solid black; */
`
const TextAudioBtn = styled.TouchableOpacity`
    position: absolute;
    width: 90%;
    height: 90%;
    border-radius: 80px;
    background-color: rgba(0,0,0,0);
`
const ClearModalContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.1); */
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
    /* border: 1px solid red; */
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
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.3);
    background-color: rgba(255,255,255, 0.9);
    z-index: 1;
    `
const DistractorText = styled.Text`
    font-family: 'SDChild';
    font-size: 45px;
    color: ${colors.REALDARKGRAY};
    `
const WrongAnswerContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 100%;
    height: 95%;
    bottom: 5%;
    background-color: white;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);

`
const WrongAnswerImage = styled.Image`
    width: 100%;
    height: 100%;
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
    width: 50px;
    height: 50px;
    top: 0px;
    right: 0px;
    border: 3px solid black;
    z-index: 49;
`
const RealPictureContainer = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    z-index: 50;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
`
const RealPictureSection = styled.View`
    width: 100%;
    height: 100%;
    border: 1px solid green;
`
const PictureImage = styled.Image`
    width: 100%;
    height: 100%;
`
// ---------------------------------------------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [textToggle, setTextToggle] = useState(false)
    const [questionMarkBackground, setQuestionMarkBackground] = useState(true);
    const [questionMark, setQuestionMark] = useState(true);
    const [clickBlockerToggle, setClickBlockerToggle] = useState(false)
    const [distractorWindowBackground, setDistractorWindowBackground] = useState(true);
    const [distractorWindow, setDistractorWindow] = useState(true);
    const [wrongImage, setWrongImage] = useState(false)
    const [wrongImageSrc, setWrongImageSrc] = useState("")
    const [wrongImageBgColor, setWrongImageBgColor] = useState("")

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
                    setQuestionMarkBackground(true),
                    setTimeout(function() {
                        setQuestionMark(true)
                    },30)
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
        delay:1700,
        useNativeDriver:true
    })
    const secondImagePan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{Animated.sequence([secondImageOn,secondImageOff]).start();}
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
            Animated.sequence([pictureBtnPressIn, pictureBtnPressOut, 
                Animated.parallel([pictureContainerModalOn, pictureOpacityOn])
            ]).start();
        }
    })).current
    const pictureClosePan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
        Animated.parallel([pictureContainerModalOff,pictureOpacityOff]).start();
        }
    })).current

    // 3LV 정답체크부분
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
    
    // const wrongAnswerValue = useRef(new Animated.Value(0)).current;
    // const wrongMarkOn = Animated.timing(wrongAnswerValue, {
    //     toValue:1,
    //     duration:10,
    //     easing:Easing.bounce,
    //     useNativeDriver:true
    // })
    // const wrongMarkOff = Animated.timing(wrongAnswerValue, {
    //     toValue:0,
    //     duration:10,
    //     easing:Easing.bounce,
    //     delay:1700,
    //     useNativeDriver:true
    // })
    // 1번 선택지
    const distractorBtn1 = useRef(new Animated.Value(1)).current;
    const distractorBtn1PressIn = Animated.timing(distractorBtn1,{
        toValue:0.8,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn1PressOut= Animated.timing(distractorBtn1,{
        toValue:1,
        duration:50,
        useNativeDriver:true
    })
    // 1번 정답
    const distractorBtn1Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn1PressIn, distractorBtn1PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    // 1번 오답
    const distractorBtn1PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn1PressIn, distractorBtn1PressOut]).start();
        },
    })).current

    // 2번 선택지
    const distractorBtn2 = useRef(new Animated.Value(1)).current;
    const distractorBtn2PressIn = Animated.timing(distractorBtn2,{
        toValue:0.8,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn2PressOut= Animated.timing(distractorBtn2,{
        toValue:1,
        duration:50,
        useNativeDriver:true
    })
    // 2번 정답
    const distractorBtn2Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn2PressIn, distractorBtn2PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    // 2번 오답
    const distractorBtn2PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn2PressIn, distractorBtn2PressOut]).start();
        },
    })).current


    // 3번 선택지
    const distractorBtn3 = useRef(new Animated.Value(1)).current;
    const distractorBtn3PressIn = Animated.timing(distractorBtn3,{
        toValue:0.8,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn3PressOut= Animated.timing(distractorBtn3,{
        toValue:1,
        duration:50,
        useNativeDriver:true
    })
    // 3번 정답
    const distractorBtn3Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn3PressIn, distractorBtn3PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    // 3번 오답
    const distractorBtn3PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn3PressIn, distractorBtn3PressOut]).start();
        },
    })).current


    // 4번 선택지
    const distractorBtn4 = useRef(new Animated.Value(1)).current;
    const distractorBtn4PressIn = Animated.timing(distractorBtn4,{
        toValue:0.8,
        duration:50,
        useNativeDriver:true
    })
    const distractorBtn4PressOut= Animated.timing(distractorBtn4,{
        toValue:1,
        duration:50,
        useNativeDriver:true
    })
    // 4번 정답
    const distractorBtn4Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn4PressIn, distractorBtn4PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    // 4번 오답
    const distractorBtn4PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            Animated.sequence([distractorBtn4PressIn, distractorBtn4PressOut]).start();
        },
    })).current
    
    // modal
    //터치시 텍스트 변경 함수
    const textModalToggle = () => {
        setTextToggle(true)
        setClickBlockerToggle(true)
    }
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
        // console.log(e)
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
    // 텍스트 터치시 시작되는 Timeout
    const textChangeTimeout = useRef(null); 
    useEffect(()=>{
        textChangeTimeout.current = setTimeout(() => {setTextToggle(false), setClickBlockerToggle(false)},1000)
        return() => clearTimeout(textChangeTimeout.current)
    },[textToggle])

    // 3레벨 오답처리  Timeout
    const wrongImageTimeout = useRef(null); 
    useEffect(()=>{
        wrongImageTimeout.current = setTimeout(() => {setWrongImage(false)},1800)
        return() => clearTimeout(wrongImageTimeout.current)
    },[wrongImage])

    // 새로고침
    const refreshTimeout = useRef(null); 
    useEffect(()=>{
        refreshTimeout.current = setTimeout(function() {setRefresh(true)},100)
        return() => clearTimeout(refreshTimeout.current)
    },[refresh])


    const levelConsole = () => {

        return(
            <View  style={{alignItems:"center", justifyContent:"center"}}>
            {/* 카드부분 */}
            {refresh && (
            <>
            <CardList
                {...panResponder.panHandlers}
                data={WordCardArray}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onEndReached={lastListModalOn}
                onEndReachedThreshold={-0.1}
                renderItem = {({item})=>{
                    // 무작위배열만들기
                    const numberArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                    // 배열마다 무작위 숫자 부여
                    const mapArray = numberArray.map(item => item*Math.floor(Math.random()*WordCardArray.length)) 
                    //동일한 숫자 제거
                    const mapArraySort = Array.from(new Set(mapArray))
                    // 해당카드의 id는 제거한다(중복방지)
                    const filterMapArray = mapArraySort.filter(function(element){
                        return element !== item.id
                    });
                    const numArray =  [item, WordCardArray[filterMapArray[0]], WordCardArray[filterMapArray[1]], WordCardArray[filterMapArray[2]]]
                    // 배열 섞기
                    function shuffle(array) {
                        array.sort(() => Math.random() - 0.5);
                    }
                    shuffle(numArray);
                    // 정답체크
                    const wrongAnswerFunc = (e) => {
                        if(e.nameKOR!==item.nameKOR){
                            console.log('오답')
                            setWrongImage(true) // 오답화면보여주기
                            playSound(e.SoundImage) //동물음성
                            setWrongImageSrc(e.image2) //오답화면이미지
                            setWrongImageBgColor(e.bgColor) //오답화면 배경색깔
                        }
                    }
                    //선택지 type에 따라 다르게 표시하기
                    const itemName = () => {
                        switch(type){
                            case "KOR":
                                return item.nameKOR;
                            case "ENG":
                                return item.nameENG;
                            default:
                                return
                    }}
                    //1번선택지
                    const numArrayName0 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[0].nameKOR;
                            case "ENG":
                                return numArray[0].nameENG;
                            default:
                                return
                    }}
                    const numArraySound0 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[0].SoundKOR;
                            case "ENG":
                                return numArray[0].SoundENG;
                            default:
                                return
                    }}
                    // const panAnswerCheckAction = () =>{
                    //     {itemName() == numArrayName0() ? playSound(numArraySound0()) : wrongAnswerFunc(numArray[0]) }
                    // }
                    //2번선택지
                    const numArrayName1 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[1].nameKOR;
                            case "ENG":
                                return numArray[1].nameENG;
                            default:
                                return
                    }}
                    const numArraySound1 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[1].SoundKOR;
                            case "ENG":
                                return numArray[1].SoundENG;
                            default:
                                return
                    }}
                    //3번선택지
                    const numArrayName2 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[2].nameKOR;
                            case "ENG":
                                return numArray[2].nameENG;
                            default:
                                return
                    }}
                    const numArraySound2 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[2].SoundKOR;
                            case "ENG":
                                return numArray[2].SoundENG;
                            default:
                                return
                    }}
                    //4번선택지
                    const numArrayName3 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[3].nameKOR;
                            case "ENG":
                                return numArray[3].nameENG;
                            default:
                                return
                    }}
                    const numArraySound3 = () => {
                        switch(type){
                            case "KOR":
                                return numArray[3].SoundKOR;
                            case "ENG":
                                return numArray[3].SoundENG;
                            default:
                                return
                    }}

                    
                    return (
                    <CardSection style={{width:SCREEN_WIDTH}}> 
                        {/* 실사 모달창 */}
                        <RealPictureContainer {...pictureClosePan.panHandlers} style={{opacity:pictureOpacity, transform:[{scale:pictureContainerScale}]}}>
                            <RealPictureSection>
                                <PictureImage source={item.realImage} resizeMode="contain" />
                            </RealPictureSection>
                        </RealPictureContainer>
                        {/* 카드전체스타일 */}
                        <Card style={{
                            backgroundColor : colors.BEIGE,
                            opacity: opacityControl,
                            transform:[{scale:scaleControl},{rotateZ:rotation}]
                        }}>

                            {/* 실사모달버튼 */}
                            <RealPictureBtn
                            {...pictureOpenPan.panHandlers}
                            style={{transform:[{scale:pictureBtnScale}]}}
                            ></RealPictureBtn>

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
                                    {/* type에 따라 한글/영어 등 만 보이도록 */}
                                    {type == "KOR" && (<CardNameText>{item.nameKOR}</CardNameText>)}
                                    {type == "ENG" && (<CardNameText>{item.nameENG}</CardNameText>)}
                                    
                                    {/* type에 따라 한글을 읽어주는지, 영어를 읽어주는지 */}
                                    {type == "KOR" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundKOR)}} />)}
                                    {type == "ENG" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundENG)}} />)}
                                    
                                    {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                    {textToggle && (
                                        <CardNameModal>
                                            {type == "KOR" && (<CardNameModalText style={{color:item.bgColor}}>{item.nameKOR}</CardNameModalText>)}
                                            {type == "ENG" && (<CardNameModalText style={{color:item.bgColor}}>{item.nameENG}</CardNameModalText>)}
                                        </CardNameModal>
                                    )}

                                    {/* 2레벨에서만 사용되는 물음표 박스 컴포넌트 */}
                                    {props.level == "word2LV" && questionMarkBackground && (
                                        <QuestionMarkBg
                                            style={{backgroundColor: colors.BEIGE}}
                                        >
                                            {props.level == "word2LV" && questionMark && (
                                                <>
                                                    {type == "KOR" && (
                                                        <QuestionMarkBtn onPress={()=>{setQuestionMark(false), setQuestionMarkBackground(false),textModalToggle(), playSound(item.SoundKOR)}} >    
                                                            <QuestionMarkImage source={item.questionMarkImage} resizeMode="contain"/>
                                                        </QuestionMarkBtn>                                                    
                                                    )}
                                                    {type == "ENG" && (
                                                        <QuestionMarkBtn onPress={()=>{setQuestionMark(false), setQuestionMarkBackground(false),textModalToggle(), playSound(item.SoundENG)}} >    
                                                            <QuestionMarkImage source={item.questionMarkImage} resizeMode="contain"/>
                                                        </QuestionMarkBtn> 
                                                    )}
                                                </>
                                            )}
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
                                                        {itemName() == numArrayName0() ? (
                                                            <Distractor {...distractorBtn1Pan.panHandlers} style={{transform:[{scale:distractorBtn1}]}} onPressOut={() => playSound(numArraySound0())}>
                                                                <DistractorText>{numArrayName0()}</DistractorText>
                                                            </Distractor>
                                                        ):(
                                                            <Distractor {...distractorBtn1PanWrong.panHandlers} style={{transform:[{scale:distractorBtn1}]}} onPressOut={() => wrongAnswerFunc(numArray[0])}>
                                                                <DistractorText>{numArrayName0()}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {/* 선택지 2번 */}
                                                        {itemName() == numArrayName1() ? (
                                                            <Distractor {...distractorBtn2Pan.panHandlers} style={{transform:[{scale:distractorBtn2}]}} onPressOut={() => playSound(numArraySound1())}>
                                                                <DistractorText>{numArrayName1()}</DistractorText>
                                                            </Distractor>
                                                        ):(
                                                            <Distractor {...distractorBtn2PanWrong.panHandlers} style={{transform:[{scale:distractorBtn2}]}} onPressOut={() => wrongAnswerFunc(numArray[1])}>
                                                                <DistractorText>{numArrayName1()}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                    <DistractorRow>
                                                        {/* 선택지 3번 */}
                                                        {itemName() == numArrayName2() ? (
                                                            <Distractor {...distractorBtn3Pan.panHandlers} style={{transform:[{scale:distractorBtn3}]}} onPressOut={() => playSound(numArraySound2())}>
                                                                <DistractorText>{numArrayName2()}</DistractorText>
                                                            </Distractor>
                                                        ):(
                                                            <Distractor {...distractorBtn3PanWrong.panHandlers} style={{transform:[{scale:distractorBtn3}]}} onPressOut={() => wrongAnswerFunc(numArray[2])}>
                                                                <DistractorText>{numArrayName2()}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {/* 선택지 4번 */}
                                                        {itemName() == numArrayName3() ? (
                                                            <Distractor {...distractorBtn4Pan.panHandlers} style={{transform:[{scale:distractorBtn4}]}} onPressOut={() => playSound(numArraySound3())}>
                                                                <DistractorText>{numArrayName3()}</DistractorText>
                                                            </Distractor>
                                                        ):(
                                                            <Distractor {...distractorBtn4PanWrong.panHandlers} style={{transform:[{scale:distractorBtn4}]}} onPressOut={() => wrongAnswerFunc(numArray[3])}>
                                                                <DistractorText>{numArrayName3()}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                {/* 오답체크 */}
                                                {wrongImage && (
                                                <WrongAnswerContainer style={{backgroundColor:wrongImageBgColor}}>
                                                    <WrongAnswerImage source={wrongImageSrc} resizeMode="contain" />
                                                </WrongAnswerContainer>
                                                )}

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
                                </CardName>
                            </CardContents>
                        </Card>
                    </CardSection>
                    )
                }}
                />
            {clickBlockerToggle && (<ClickBlocker />)}
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
                            {type == "KOR" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
                            {type == "ENG" && (<RepeatLevelText>Again !</RepeatLevelText>)}
                        </RepeatLevel>
                        { props.level !== "word3LV" && (
                        <NextLevel 
                            onPressIn={()=> ClickSound()}
                            onPressOut={()=> nextLevelBtn(props.level)}
                        >
                            {type == "KOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                            {type == "ENG" && (<NextLevelText>Next Level !</NextLevelText>)}
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