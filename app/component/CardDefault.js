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

// const platformShadow

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
    box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
    /* z-index: 1; */
`
const CardImgShell = styled.View`
    align-items: center;
    justify-content: center;
    flex: 4;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    /* z-index: 10; */
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
// 카드 텍스트 style
const CardContents = styled.View`
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
    height: 80%;
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
    top: -40px;
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
const RepeatLevelText = styled.Text`
    font-size: 23px;
    color: white;
    font-family: 'SDChild';
`
// ---------------------------------------------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [distractorWindowBackground, setDistractorWindowBackground] = useState(true);
    const [distractorWindow, setDistractorWindow] = useState(true);
    const [scrollOn, setScrollOn] = useState(true)

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
                goLeft.start(onDismiss);
            }else if(dx > 180){
                goRight.start(onDismiss);
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
        useNativeDriver:true
    })
    const questionPan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        // onPanResponderStart:()=>{Animated.parallel([questionOpacityPress,
        //     Animated.sequence([secondTextOn, secondTextOff])]).start();}
        onPanResponderStart:()=>{Animated.parallel([questionOpacityPress]).start();}
        
    })).current
    // 동물 3레벨 선택지 애니메이션
    // 선택지 박스
    const distractorContainerValue = useRef(new Animated.Value(1)).current;
    const distractorContainerInvisible = Animated.timing(distractorContainerValue, {
        toValue:0,
        duration:150,
        useNativeDriver:true
    })
    const distracttorCorrect = () => {
        return(
            useRef(PanResponder.create({
                onStartShouldSetPanResponder:()=>true,
                onPanResponderStart:()=>{
                    // ClickSound()
                    console.log('start')
                },
                onPanResponderEnd:()=>{
                    Animated.parallel([
                        distractorContainerInvisible,
                        Animated.sequence([secondTextOn, secondTextOff]), 
                        Animated.sequence([checkMarkOn, checkMarkOff])
                    ]).start();
                }
            })).current
        )
    }
    const correct1 = distracttorCorrect()
    const correct2 = distracttorCorrect()
    const correct3 = distracttorCorrect()
    const correct4 = distracttorCorrect()

    const distracttorWrong = () => {
        return(
            useRef(PanResponder.create({
                onStartShouldSetPanResponder:()=>true,
                onPanResponderStart:()=>{
                    // ClickSound()
                    console.log('오답')
                },
                onPanResponderEnd:()=>{
                    Animated.parallel([
                        // distractorContainerInvisible,
                        // Animated.sequence([secondTextOn, secondTextOff]), 
                        // Animated.sequence([checkMarkOn, checkMarkOff])
                    ]).start();
                }
            })).current
        )
    }
    const wrong1 = distracttorWrong()
    const wrong2 = distracttorWrong()
    const wrong3 = distracttorWrong()
    const wrong4 = distracttorWrong()


    // 텍스트 클릭시 출력하는 애니메이션
const secondTextOpacity = useRef(new Animated.Value(0)).current;
const secondTextOn = Animated.timing(secondTextOpacity,{
    toValue:1,
    duration:700,
    useNativeDriver:true
})
const secondTextOff = Animated.timing(secondTextOpacity,{
    toValue:0,
    duration:700,
    delay:100,
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
    // {console.log(AnimalCardArray.length)}
    // array에 end어레이 2개씩필요함(
    {if(secondIndex == data.length-1){
        lastListModal.setValue(1)
    }}
// function
    //오디오관련
    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
            await sound.unloadAsync();
        } catch (error) {
            console.log(error)
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
    {console.log(dataName(firstIndex))}
    {console.log(dataName(numArray[0]))}

    // 실제 출력되는 부분
    const levelConsole = () => {
        return(
            <Container style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT ,backgroundColor:"#00a8ff"}}>
                

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
                            </ClearModal>
                        </ClearModalContainer> 

                        <Card
                        style={{
                            backgroundColor: data[secondIndex].cardBgColor,
                            transform: [{scale:secondCardScale}]
                        }}>

                                <CardImgShell style={{backgroundColor:data[secondIndex].bgColor}}>
                                    <CardImg source={data[secondIndex].image} resizeMode="contain"></CardImg>
                                    {/* <ImageAudioBtn 
                                        {...secondImagePan.panHandlers}
                                        onPress={()=>playSound(data[index].SoundImage)}
                                    />
                                    <CardImgShellModal 
                                        style={{
                                            backgroundColor: item.bgColor, 
                                            // backgroundColor: "black", 
                                            opacity:secondImageOpacity
                                        }}
                                    >
                                            <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                    </CardImgShellModal> */}
                                </CardImgShell>

                                {data[secondIndex].nameKOR.length>0 &&(
                                <>
                                    {type == "Ganada" ? (
                                        <>{ganadaBtnFunc(secondIndex)}</>
                                    ):(
                                        <CardNameText style={{fontSize:100}}>{dataName(secondIndex)}</CardNameText>
                                    )}
                                </>
                            )}
                        </Card>

                        <Card
                        {...cardPan.panHandlers}
                        style={{
                            backgroundColor: data[firstIndex].cardBgColor,
                            transform:[{scale:cardScaleValue}, {translateX:cardPosition},{rotateZ:cardRotation}]
                        }}>

                            <CardImgShell style={{backgroundColor:data[firstIndex].bgColor}}>
                                <CardImg source={data[firstIndex].image} resizeMode="contain"></CardImg>
                                {/* <ImageAudioBtn 
                                    {...secondImagePan.panHandlers}
                                    onPress={()=>playSound(data[index].SoundImage)}
                                />
                                <CardImgShellModal 
                                    style={{
                                        backgroundColor: item.bgColor, 
                                        // backgroundColor: "black", 
                                        opacity:secondImageOpacity
                                    }}
                                >
                                        <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                </CardImgShellModal> */}
                            </CardImgShell>
                            {data[firstIndex].nameKOR.length>0 &&(
                                <>
                                    {type == "Ganada" ? (
                                    <>{ganadaBtnFunc(firstIndex)}</>
                                    ):(
                                    <>
                                    <CardContents style={{flex:props.level == "word3LV" ? 2 : 1}}>
                                        <CardNameText>{dataName(firstIndex)}</CardNameText>


                                        <TextAudioBtn {...secondTextPan.panHandlers}
                                        // onPressOut={()=>{playSound(itemAudio()),clickBlockerFunc()}} 
                                        />
                                        
                                        {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                        <CardNameModal style={{opacity:secondTextOpacity}}>
                                            <CardNameModalText style={{color:data[firstIndex].textColor}}>{dataName(firstIndex)}</CardNameModalText>
                                        </CardNameModal>


                                        {props.level == "word2LV" && (
                                            <QuestionMarkBg style={{opacity:questionOpacity}}>
                                                <QuestionMarkBtn {...questionPan.panHandlers} onPress={() => {playSound(itemAudio(firstIndex))} } >    
                                                    <QuestionMarkImage source={data[firstIndex].questionMarkImage} resizeMode="contain"/>
                                                </QuestionMarkBtn>                                                    
                                            </QuestionMarkBg>
                                        )}

                                        {props.level == "word3LV" &&(
                                        <>
                                            <DistractorContainer style={{opacity:distractorContainerValue, transform:[{scale:distractorContainerValue}]}}>
                                                <DistractorRow>
                                                {dataName(firstIndex) == dataName(numArray[0]) ? (
                                                
                                                    <Distractor 
                                                    {...correct1.panHandlers} 
                                                    >
                                                        <DistractorText>{dataName(numArray[0])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                    {...wrong1.panHandlers} 
                                                    >
                                                        <DistractorText>{dataName(numArray[0])}</DistractorText>
                                                    </Distractor>
                                                    
                                                )}
                                                
                                                {dataName(firstIndex) == dataName(numArray[1]) ? (
                                                
                                                    <Distractor 
                                                    {...correct2.panHandlers} 
                                                    >
                                                        <DistractorText>{dataName(numArray[1])}</DistractorText>
                                                    </Distractor>
                                                ):(
                                                    <Distractor 
                                                    {...wrong2.panHandlers} 
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
                                                        >
                                                            <DistractorText>{dataName(numArray[2])}</DistractorText>
                                                        </Distractor>
                                                    ):(
                                                        <Distractor 
                                                        {...wrong3.panHandlers} 
                                                        >
                                                            <DistractorText>{dataName(numArray[2])}</DistractorText>
                                                        </Distractor>
                                                        
                                                    )}
                                                    {dataName(firstIndex) == dataName(numArray[3]) ? (
                                                
                                                        <Distractor 
                                                        {...correct4.panHandlers} 
                                                        >
                                                            <DistractorText>{dataName(numArray[3])}</DistractorText>
                                                        </Distractor>
                                                    ):(
                                                        <Distractor 
                                                        {...wrong4.panHandlers} 
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
                                            {/* 정답체크 */}
                                            <CorrectAnswerContainer style={{transform:[{scale:correctAnswerMarkValue}]}}>
                                                <CorrectAnswerImage source={require("../asset/images/Check.png")} />
                                            </CorrectAnswerContainer>
                                        </> 
                                        )}


                                    </CardContents>
                                    </>
                                    )}
                                </>
                            )}
                        </Card>
                    </CardContainer>
                    

                    
                {/* )} */}
            </Container>
        )
    }
    return(levelConsole())
}