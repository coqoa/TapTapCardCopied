import React, {useState, useEffect, useRef} from "react"
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CardSection = styled.View`
//Diemension쓰기위해 인라인 style 적용
`
const Card = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin:30px;
    /* border: 1px solid black; */
    border-radius: 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
`
const CardImgShell = styled.View`
    /* flex: 3; */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    `
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
    `
const CardContents = styled.View`
    width: 200px;
    height: 100px;
`
const CardName = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
`
const CardNameText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    color: ${colors.REALDARKGRAY};
`

export const WordCard1LV = () => {

    return(
    <FlatList
        horizontal
        pagingEnabled
        data={WordCardArray}
        renderItem = {({item})=>(
            <CardSection style={{width:SCREEN_WIDTH}}> 
                <Card style={{backgroundColor : item.bgColor}}>
                    {/* <CheckBtn onPress={() => console.log(item.id)}>
                        <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                    </CheckBtn> */}
                    <CardImgShell>
                        <CardImg source={item.image} resizeMode="contain"></CardImg>
                    </CardImgShell>
                    <CardContents onPress={() => console.log(item.name)}>
                        <CardName>
                            <CardNameText>{item.name}</CardNameText>
                        </CardName>
                    </CardContents>
                </Card>
            </CardSection>
        )}
    />
    )
}

const Record = styled.View`
    height: 30px;
    flex-direction: row;
`
const CheckRecord = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const CheckRecordImage = styled.ImageBackground`
    width: 24px;
    height: 24px;
    width: 40px;
    `
const CheckRecordText = styled.Text`
    color: green;
    font-size: 17px;
    bottom: 1px;
`

//레벨2 레벨3은 이런식으로 작성하면 될것같음
export const WordCard2LV = () => {

    return(
    <View>
        <Record>
            <CheckRecord>
                <CheckRecordImage source={require("../asset/images/Check.png")} resizeMode="contain"></CheckRecordImage>
                <CheckRecordText>2레벨</CheckRecordText>
            </CheckRecord>
        </Record>

        <FlatList
            horizontal
            pagingEnabled
            data={WordCardArray}
            renderItem = {({item})=>(
                
                <CardSection style={{width:SCREEN_WIDTH}}> 
                    <Card>
                        {/* <CheckBtn onPress={() => console.log(item.id)}>
                            <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                        </CheckBtn> */}
                        <CardImgShell>
                            <CardImg source={item.image} resizeMode="contain"></CardImg>
                        </CardImgShell>
                        <CardContents onPress={() => console.log(item.name)}>
                            <CardName>
                                <CardNameText>{item.name}</CardNameText>
                            </CardName>
                        </CardContents>
                    </Card>
                </CardSection>
            )}
        />
    </View>
    )
}
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;    
    `
const CardContainer = styled.View`
    flex: 1;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: center;
`
const ExamCard = styled(Animated.createAnimatedComponent(View))`
    width: 300px;
    height: 540px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    position: absolute;
    border:2px solid ${colors.REALDARKGRAY} ;
`
// const BtnContainer = styled.View`
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-between;
//     border: 1px solid red;
// `
const CheckBtn = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    left: 0px;
    top: 40%;
    /* border: 1px solid gray; */
    `
const NonCheckBtn = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    right: 0px;
    top: 40%;
    /* border: 1px solid gray; */
    `
const CheckBtnImage = styled.ImageBackground`
    width: 56px;
    height: 56px;
    align-items: center;
    justify-content: center;
    /* border: 1px solid gray; */
`
const ImageAudioBtn = styled.TouchableOpacity`
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: rgba(0,0,0,0.1);
    `
const TextAudioBtn = styled.TouchableOpacity`
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: rgba(0,0,0,0.1);
`
// const AnimatedCard = Animated.createAnimatedComponent(ExamCard);
export const WordCard3LV = () => {
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;

    const rotation = position.interpolate({
        inputRange:[-250, 250],
        outputRange:["-15deg", "15deg"],
        extrapolate: "clamp" // 범위에서 넘어가면 interpolate를 어떻게 처리할지 ?
    });
    const secondScale = position.interpolate({
        inputRange:[-200, 0, 200],
        outputRange:[1, 0.7, 1],
        extrapolate:"clamp"
    }) ;
    const CheckBtnOpacityInput = Animated.timing(btnOpacity, {
        toValue: 1,
        useNativeDriver:true
    })
    const CheckBtnOpacityOutput = Animated.timing(btnOpacity, {
        toValue: 0,
        useNativeDriver:true
    })
    //Animations
    const onPressIn = Animated.spring(scale, {
        toValue:0.9, 
        useNativeDriver:true
    });
    const onPressOut = Animated.spring(scale, {
        toValue:1, 
        useNativeDriver:true
    });
    const goCenter = Animated.spring(position, {
        toValue:0,
        tension:100,
        friction:5,
        useNativeDriver:true,
    });
    const goLeft = Animated.spring(position, {
        toValue: -SCREEN_WIDTH, 
        tension: 35,
        restSpeedThreshold: 100,
        restDisplacementThreshold:100,
        useNativeDriver:true
    });
    const goRight = Animated.spring(position, {
        toValue: SCREEN_WIDTH, 
        restSpeedThreshold: 100,
        restDisplacementThreshold:100,
        tension: 35,
        useNativeDriver:true
    });
    //panResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove:(_,{dx}) => {
                position.setValue(dx)

            }, 
            onPanResponderGrant: () => {
                Animated.parallel(
                    [CheckBtnOpacityInput,onPressIn]
                ).start();
                // onPressIn.start()
            },
            onPanResponderRelease: (_, {dx}) => {
                if(dx < -180){
                    // console.log("dismiss to the left")
                    Animated.parallel([goLeft,CheckBtnOpacityOutput]).start(onDismiss);
                }else if(dx>180){
                    // console.log("dismiss to the right")
                    Animated.parallel([goRight,CheckBtnOpacityOutput]).start(onDismiss);

                }else
                Animated.parallel([onPressOut,CheckBtnOpacityOutput, goCenter]).start();
                
            },

        })
    ).current
    // State
    const [index, setIndex] = useState(0);
    const onDismiss = () => {
        // if (index+4 == WordCardArray.length){
        //     null
        // }else{
            setIndex((prev) => prev +1)
            scale.setValue(1);
            position.setValue(0);
        // }
    }
    const checkPress = () => {
        goLeft.start(onDismiss);
    }
    const closePress = () =>{
        goRight.start(onDismiss);
    }
    console.log(WordCardArray.length-2);
    console.log(index)
    
    
    return(
        <>
        <Container>
            <CardContainer>
                <ExamCard 
                // {...panResponder.panHandlers}
                style={{
                    backgroundColor:WordCardArray[index+1].bgColor,
                    transform:[{scale:secondScale}]
                }}>
                    <CardImgShell>
                        <CardImg source={WordCardArray[index+1].image} resizeMode="contain"></CardImg>
                    </CardImgShell>
                    {/* <CardContents onPress={() => console.log(wordCard[index+1].id)}> */}
                    <CardContents>
                        <CardName>
                            <CardNameText>{WordCardArray[index+1].name}</CardNameText>
                        </CardName>
                    </CardContents>
                </ExamCard>
                
                {WordCardArray.length-3 >= index ? ( // 배열의 마지막카드 전에 카드움직이기 멈추도록, else부분에 축하애니메이션+ 다음레벨 모달창을 넣을 수도 있음
                    <ExamCard 
                    {...panResponder.panHandlers}
                    style={{
                        backgroundColor:WordCardArray[index].bgColor,
                        transform:[{scale},{translateX:position}, {rotateZ:rotation}]
                    }}>
                        <CardImgShell>
                        <CardImg 
                        source={WordCardArray[index].image} 
                        resizeMode="contain"
                        onPress={() => console.log(WordCardArray[index].id)}
                        />
                        <ImageAudioBtn onPress={()=>{console.log('이미지 오디오 출력')}} />
                    
                        </CardImgShell>
                        {/* <CardContents onPress={() => console.log(wordCardArray[index].id)}> */}
                        <CardContents>
                            <CardName>
                                <CardNameText>{WordCardArray[index].name}</CardNameText>
                                <TextAudioBtn onPress={()=>{console.log('텍스트 오디오 출력')}} />
                            </CardName>
                        </CardContents>
                    </ExamCard>
                ) : (
                    <ExamCard 
                    style={{
                        backgroundColor:WordCardArray[index].bgColor,
                        transform:[{scale},{translateX:position}, {rotateZ:rotation}]
                    }}>
                        <CardImgShell>
                        <CardImg 
                        source={WordCardArray[index].image} 
                        resizeMode="contain"
                        onPress={() => console.log(WordCardArray[index].id)}
                        />
                        <ImageAudioBtn onPress={()=>{console.log('이미지 오디오 출력')}} />
                    
                        </CardImgShell>
                        {/* <CardContents onPress={() => console.log(WordCardArray[index].id)}> */}
                        <CardContents>
                            <CardName>
                                <CardNameText>{WordCardArray[index].name}</CardNameText>
                                <TextAudioBtn onPress={()=>{console.log('텍스트 오디오 출력')}} />
                            </CardName>
                        </CardContents>
                    </ExamCard>
                )}
                
                    
            </CardContainer>
        </Container>
        {/* <BtnContainer style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}> */}
            {/* <CheckBtn onPress={checkPress}> */}
            <CheckBtn style={{
                opacity: btnOpacity,
            }}>
                {/* <StarViewImage source={require("../asset/images/Check.png") }></StarViewImage> */}
                <CheckBtnImage>
                    <Ionicons name="checkmark-circle" size={50} color={colors.PASTELBLUE} />
                </CheckBtnImage>
            </CheckBtn>
            <NonCheckBtn style={{
                opacity: btnOpacity,
            }}>
                {/* <StarViewImage source={require("../asset/images/Random.png")}></StarViewImage> */}
                <CheckBtnImage>
                    <Ionicons name="help-circle" size={50} color={colors.TOMATO} />
                </CheckBtnImage>
            </NonCheckBtn>
        {/* </BtnContainer> */}
        </>
    )
}
    // <View>
    //     <Record>
    //         <CheckRecord>
    //             <CheckRecordImage source={require("../asset/images/Check.png")} resizeMode="contain"></CheckRecordImage>
    //             <CheckRecordText>3레벨</CheckRecordText>
    //         </CheckRecord>
    //     </Record>

    //     <FlatList
    //         horizontal
    //         pagingEnabled
    //         data={WordCardArray}
    //         renderItem = {({item})=>(
    //             <CardSection style={{width:SCREEN_WIDTH}}> 
    //                 <Card>
    //                     {/* <CheckBtn onPress={() => console.log(item.id)}>
    //                         <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
    //                     </CheckBtn> */}
    //                     <CardImgShell>
    //                         <CardImg source={item.image} resizeMode="contain"></CardImg>
    //                     </CardImgShell>
    //                     <CardContents onPress={() => console.log(item.name)}>
    //                         <CardName>
    //                             <CardNameText>{item.name}</CardNameText>
    //                         </CardName>
    //                     </CardContents>
    //                 </Card>
    //             </CardSection>
    //         )}
    //     />
    // </View>
//     )
// }
