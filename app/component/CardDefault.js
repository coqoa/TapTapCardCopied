import React, {useState, useEffect, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder,Text, TextInput, Button } from "react-native";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
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
const LV3ClickBlocker = styled.Pressable`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 11;
    background-color: rgba(0,0,0,0);
`
const LV3ClickAlert = styled.Pressable`
position: absolute;
width: 85%;
height: 70%;
border-radius: 30px;
align-items: center;
justify-content: center;
background-color: white;
box-shadow:2px 2px 5px rgba(0,0,0,0.8);
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
    /* bottom: 1%; */
    /* border: 1px solid green; */
    /* margin: 5px; */
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
const WrongAnswerContainer = styled.View`
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
    /* border: 1px solid red; */
    /* z-index: 15; */
`
const CorrectAnswerImage = styled.Image`
    width: 100%;
    height: 100%;
`
// ----------------------------------------------------------------------------------

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
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                onPressIn.start();
            }, 
            onPanResponderMove:(_,{dx}) => {
                position.setValue(dx)
            }, 
            onPanResponderRelease: (_,{}) => {
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
                    // setLv3ClickBlockerOn(true)
                )}
                Animated.parallel([onPressOut,tensionAnimated]).start();
            }
        })
    ).current

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
        onPanResponderStart:()=>{
            console.log('1')
            Animated.sequence([secondImageOn,secondImageOff]).start();
            // secondImageOn.start();
        }
    })).current
    // 3단계 정답체크부분
    //문제모달창
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
    // 1번선택지
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
    // 정답
    const distractorBtn1Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn1PressIn, distractorBtn1PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    //오답
    const distractorBtn1PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn1PressIn, distractorBtn1PressOut]).start();
        },
    })).current

    //2번선택지
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
    //정답
    const distractorBtn2Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn2PressIn, distractorBtn2PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    //오답
    const distractorBtn2PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn2PressIn, distractorBtn2PressOut]).start();
        },
    })).current


    //3번선택지
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
    //정답
    const distractorBtn3Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn3PressIn, distractorBtn3PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    //오답
    const distractorBtn3PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn3PressIn, distractorBtn3PressOut]).start();
        },
    })).current


    // 4번선택지
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
    //정답
    const distractorBtn4Pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
            Animated.sequence([distractorBtn4PressIn, distractorBtn4PressOut, distractorContainerInvisible, checkMarkOn, checkMarkOff]).start();
        },
    })).current
    //오답
    const distractorBtn4PanWrong = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            ClickSound()
            // distractorContainerValue.setValue(0)
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
        console.log(props.level)
        
    };
    // 재시작버튼
    const restartLevelBtn = () => {
        setRefresh(false)
        setClearModalToggle((prev) => !prev)
    };
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

    //리스페쉬부분
    const refreshTimeout = useRef(null); 
    useEffect(()=>{
        refreshTimeout.current = setTimeout(function() {setRefresh(true)},100)
        return() => clearTimeout(refreshTimeout.current)
    },[refresh])

//------------------------//------------------------//------------------------//------------------------//------------------------

    const levelConsole = () => {

        return(
            // <View>
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
                    // console.log('itemid는',item.id)
                    // console.log('필터링결과는',filterMapArray)
                    // 배열 섞기
                    function shuffle(array) {
                        array.sort(() => Math.random() - 0.5);
                    }
                    shuffle(numArray);
                    // 정답체크
                    const answerCheck = (e) => {
                        if(e.nameKOR==item.nameKOR){
                            console.log('정답')
                            setDistractorWindowBackground(false) // 모달창닫기
                            setDistractorWindow(false) // 모달창닫기
                            // setLv3ClickBlockerOn(false)
                            textModalToggle() // 
                            playSound(e.SoundKOR)  // 한국어음성
                        }else{
                            console.log('오답')
                            playSound(e.SoundImage) //동물음성
                            setWrongImage(true) // 오답화면보여주기
                            setWrongImageSrc(e.image2) //오답화면이미지
                            setWrongImageBgColor(e.bgColor) //오답화면 배경색깔
                        }
                    }
                    // 정답입력전에는 터치못하도록, 정답시 화면에서 지워주고 오답시 해당버튼이미지보여줄 모달창 구현하기
                    // console.log(item.nameKOR == numArray[0].nameKOR)
                    return (
                    
                    <CardSection style={{width:SCREEN_WIDTH}}> 
                    
                        {/* 카드전체스타일 */}
                        <Card style={{
                            backgroundColor : colors.BEIGE,
                            opacity: opacityControl,
                            transform:[{scale:scaleControl},{rotateZ:rotation}]
                        }}>
                            
                        
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
                                        opacity:secondImageOpacity}}
                                >
                                        <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                </CardImgShellModal>

                                {/* {lv3ClickBlockerOn &&(
                                    <LV3ClickBlocker onPress={()=>{setLv3ClickAlertWindow(prev => !prev)}} />
                                )} */}
                            </CardImgShell>
                            {/* 이미지 터치시 출력되는 세컨드이미지 */}
                            
                            

                            {/* 카드 텍스트 부분 */}
                            <CardContents style={{flex:props.level == "word3LV" ? 2 : 1}}>
                                <CardName>
                                    {/* type에 따라 한글/영어 등 만 보이도록 */}
                                    {type == "KOR" && (<CardNameText>{item.nameKOR}</CardNameText>)}
                                    {type == "ENG" && (<CardNameText>{item.nameENG}</CardNameText>)}
                                    {/* {type == "ENG" && (<CardNameText>{item.nameENG}</CardNameText>)} */}
                                    
                                    {/* type에 따라 한글을 읽어주는지, 영어를 읽어주는지 */}
                                    {type == "KOR" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundKOR)}} />)}
                                    {type == "ENG" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundENG)}} />)}
                                    
                                    {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                    {textToggle && (
                                        <CardNameModal>
                                            {type == "KOR" && (<CardNameModalText style={{color:item.bgColor}}>{item.nameKOR}</CardNameModalText>)}
                                            {type == "ENG" && (<CardNameModalText style={{color:item.bgColor}}>{item.nameENG}</CardNameModalText>)}
                                            {/* <CardNameModalBox></CardNameModalBox> */}
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
                                                {type == "KOR" && (
                                                <>
                                                    <DistractorRow>
                                                        {/* 선택지 1번 */}
                                                        {item.nameKOR == numArray[0].nameKOR && (
                                                            // <Distractor {...checkMarkPan.panHandlers} onPress={()=>answerCheck(numArray[0])} style={{transform:[{scale:distractorBtn1}]}}>
                                                            <Distractor {...distractorBtn1Pan.panHandlers} style={{transform:[{scale:distractorBtn1}]}} onPress={()=>playSound(numArray[0].SoundKOR)}>
                                                                <DistractorText>{numArray[0].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameKOR !== numArray[0].nameKOR && (
                                                            <Distractor {...distractorBtn1PanWrong.panHandlers} style={{transform:[{scale:distractorBtn1}]}}>
                                                                <DistractorText>{numArray[0].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}

                                                        {/* 선택지 2번 */}
                                                        {item.nameKOR == numArray[1].nameKOR && (
                                                            <Distractor {...distractorBtn2Pan.panHandlers} style={{transform:[{scale:distractorBtn2}]}} onPress={()=>playSound(numArray[1].SoundKOR)}>
                                                                <DistractorText>{numArray[1].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameKOR !== numArray[1].nameKOR && (
                                                            <Distractor {...distractorBtn2PanWrong.panHandlers} style={{transform:[{scale:distractorBtn2}]}}>
                                                                <DistractorText>{numArray[1].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                    <DistractorRow>

                                                        {/* 선택지 3번 */}
                                                        {item.nameKOR == numArray[2].nameKOR && (
                                                            <Distractor {...distractorBtn3Pan.panHandlers} style={{transform:[{scale:distractorBtn3}]}} onPress={()=>playSound(numArray[2].SoundKOR)}>
                                                                <DistractorText>{numArray[2].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameKOR !== numArray[2].nameKOR && (
                                                            <Distractor {...distractorBtn3PanWrong.panHandlers} style={{transform:[{scale:distractorBtn3}]}}>
                                                                <DistractorText>{numArray[2].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}

                                                        {/* 선택지 4번 */}
                                                        {item.nameKOR == numArray[3].nameKOR && (
                                                            <Distractor {...distractorBtn4Pan.panHandlers} style={{transform:[{scale:distractorBtn4}]}} onPress={()=>playSound(numArray[3].SoundKOR)}>
                                                                <DistractorText>{numArray[3].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameKOR !== numArray[3].nameKOR && (
                                                            <Distractor  {...distractorBtn4PanWrong.panHandlers} style={{transform:[{scale:distractorBtn4}]}}>
                                                                <DistractorText>{numArray[3].nameKOR}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                </>
                                                )}
                                                {type == "ENG" && (
                                                <>
                                                    <DistractorRow>
                                                        {/* 선택지1번버튼 */}
                                                        {item.nameENG == numArray[0].nameENG && (
                                                            <Distractor {...distractorBtn1Pan.panHandlers} onPress={()=>{ClickSound(),answerCheck(numArray[0])}}>
                                                                <DistractorText>{numArray[0].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameENG !== numArray[0].nameENG && (
                                                            <Distractor onPress={()=>{ClickSound(),answerCheck(numArray[0])}}>
                                                                <DistractorText>{numArray[0].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {/* 선택지 2번 */}
                                                        {item.nameENG == numArray[1].nameENG && (
                                                            <Distractor {...distractorBtn2Pan.panHandlers} onPress={()=>{ClickSound(),answerCheck(numArray[1])}}>
                                                                <DistractorText>{numArray[1].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameENG !== numArray[1].nameENG && (
                                                            <Distractor onPress={()=>{ClickSound(),answerCheck(numArray[1])}}>
                                                                <DistractorText>{numArray[1].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                    <DistractorRow>
                                                        {/* 선택지3번버튼 */}
                                                        {item.nameENG == numArray[2].nameENG && (
                                                            <Distractor {...distractorBtn3Pan.panHandlers} onPress={()=>{ClickSound(),answerCheck(numArray[2])}}>
                                                                <DistractorText>{numArray[2].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameENG !== numArray[2].nameENG && (
                                                            <Distractor onPress={()=>{ClickSound(),answerCheck(numArray[2])}}>
                                                                <DistractorText>{numArray[2].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {/* 선택지 4번 */}
                                                        {item.nameENG == numArray[3].nameENG && (
                                                            <Distractor {...distractorBtn4Pan.panHandlers} onPress={()=>{ClickSound(),answerCheck(numArray[3])}}>
                                                                <DistractorText>{numArray[3].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                        {item.nameENG !== numArray[3].nameENG && (
                                                            <Distractor onPress={()=>{ClickSound(),answerCheck(numArray[3])}}>
                                                                <DistractorText>{numArray[3].nameENG}</DistractorText>
                                                            </Distractor>
                                                        )}
                                                    </DistractorRow>
                                                </>
                                                )}
                                                
                                                
                                                {wrongImage && (
                                                <WrongAnswerContainer style={{backgroundColor:wrongImageBgColor}}>
                                                    <WrongAnswerImage source={wrongImageSrc} resizeMode="contain" />
                                                </WrongAnswerContainer>
                                                )}
                                                </>
                                                )}
                                            </DistractorContainer>
                                        )}
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