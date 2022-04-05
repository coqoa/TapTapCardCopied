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
    {if(secondIndex == AnimalCardArray.length-1){
        lastListModal.setValue(1)
    }}
    // function
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
                            backgroundColor: AnimalCardArray[secondIndex].cardBgColor,
                            transform: [{scale:secondCardScale}]
                        }}>

                                <CardImgShell style={{backgroundColor:AnimalCardArray[secondIndex].bgColor}}>
                                    <CardImg source={AnimalCardArray[secondIndex].image} resizeMode="contain"></CardImg>
                                    {/* <ImageAudioBtn 
                                        {...secondImagePan.panHandlers}
                                        onPress={()=>playSound(AnimalCardArray[index].SoundImage)}
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

                            {AnimalCardArray[secondIndex].nameKOR.length>0 &&(
                                <Text style={{fontSize:100}}>{AnimalCardArray[secondIndex].nameKOR}</Text>
                            )}
                        </Card>

                        <Card
                        {...cardPan.panHandlers}
                        style={{
                            backgroundColor: AnimalCardArray[firstIndex].cardBgColor,
                            transform:[{scale:cardScaleValue}, {translateX:cardPosition},{rotateZ:cardRotation}]
                        }}>

                            <CardImgShell style={{backgroundColor:AnimalCardArray[firstIndex].bgColor}}>
                                <CardImg source={AnimalCardArray[firstIndex].image} resizeMode="contain"></CardImg>
                                {/* <ImageAudioBtn 
                                    {...secondImagePan.panHandlers}
                                    onPress={()=>playSound(AnimalCardArray[index].SoundImage)}
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
                            {AnimalCardArray[firstIndex].nameKOR.length>0 &&(
                                <Text style={{fontSize:100}}>{AnimalCardArray[firstIndex].nameKOR}</Text>
                            )}
                        </Card>
                    </CardContainer>
                    

                    
                {/* )} */}
            </Container>
        )
    }
    return(levelConsole())
}