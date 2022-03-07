import React, {useState, useEffect, useRef} from "react"
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import styled from "styled-components"
import { wordCard } from "../asset/data/wordCard";
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
    flex: 3;
    align-items: center;
    width: 70%;
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
const CardContents = styled.Pressable`
    flex: 1;
`
const CardName = styled.View`
    flex:1;
    align-items: center;
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
        data={wordCard}
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
            data={wordCard}
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
const ExamCard = styled(Animated.createAnimatedComponent(View))`
    background-color: beige;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    position: absolute;
`
const BtnContainer = styled.View`
    flex-direction: row;
    flex: 1;
`

const Btn = styled.TouchableOpacity`
    margin: 0px 10px;
`
const CardContainer = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
`
// const AnimatedCard = Animated.createAnimatedComponent(ExamCard);

export const WordCard3LV = () => {
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
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
    //Animations
    const onPressIn = Animated.spring(scale, {
        toValue:1.05, 
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
        tension: 5,
        restSpeedThreshold: 100,
        restDisplacementThreshold:100,
        useNativeDriver:true
    });
    const goRight = Animated.spring(position, {
        toValue:400, 
        tension: 5,
        useNativeDriver:true
    });
    //panResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove:(_,{dx}) => {
                position.setValue(dx)

            }, 
            onPanResponderGrant: () => onPressIn.start(),
            onPanResponderRelease: (_, {dx}) => {
                if(dx < -200){
                    // console.log("dismiss to the left")
                    goLeft.start(onDismiss);
                }else if(dx>200){
                    // console.log("dismiss to the right")
                    goRight.start(onDismiss);

                }else 
                Animated.parallel([onPressOut, goCenter]).start();
                
            },

        })
    ).current
    // State
    const [index, setIndex] = useState(0);
    const onDismiss = () => {
        // if (index+4 == wordCard.length){
        //     null
        // }else{
            scale.setValue(1);
            position.setValue(0);
            setIndex((prev) => prev +1)
        // }
    }
    const checkPress = () => {
        goLeft.start(onDismiss);
    }
    const closePress = () =>{
        goRight.start(onDismiss);
    }
    
    console.log(wordCard.length);
    console.log(index)

    
    return(
        <Container>
            <CardContainer>
                <ExamCard 
                // {...panResponder.panHandlers}
                style={{
                    transform:[{scale:secondScale}]
                }}>
                    {/* <Ionicons name="beer" color="#192a56" size={98}/> */}
                    <CardImg source={wordCard[index+1].image} resizeMode="contain"></CardImg>
                </ExamCard>
                <ExamCard 
                {...panResponder.panHandlers}
                style={{
                    transform:[{scale},{translateX:position}, {rotateZ:rotation}]
                }}>
                    {/* <Ionicons name="pizza" color="#192a56" size={98}/> */}
                    <CardImg source={wordCard[index].image} resizeMode="contain"></CardImg>
                </ExamCard>
            </CardContainer>
            <BtnContainer>
                <Btn onPress={checkPress}>
                    <Ionicons name="checkmark-circle" color="black" size={42} />
                </Btn>
                <Btn onPress={closePress}>
                    <Ionicons name="close-circle" color="black" size={42} />
                </Btn>
            </BtnContainer>
        </Container>
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
    //         data={wordCard}
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
