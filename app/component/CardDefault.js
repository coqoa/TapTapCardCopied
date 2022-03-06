import React, {useState, useEffect, useRef} from "react"
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import styled from "styled-components"
import { wordCard } from "../asset/data/wordCard";
import { colors } from "./color";


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
const Box = styled.View`
    background-color: tomato;
    width: 200px;
    height: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(Box);
export const WordCard3LV = () => {
    const [up, setUp] = useState(true)
    const toggleUp = () => setUp(prev => !prev)
    const POSITION =useRef(new Animated.ValueXY({x: 0, y: 300})).current;
    const moveUp = () => {
        Animated.timing(POSITION.y, {
            toValue: up ? -300 : 300,
            duration: 1000,
            useNativeDriver: false,
            
        }).start(toggleUp);
    }
    const borderRadius = POSITION.y.interpolate({
        inputRange : [-300,300],
        outputRange:[100,0]
    })
    const rotation = POSITION.y.interpolate({
        inputRange: [-300, 300],
        outputRange:["-360deg", "360deg"]
    })
    const boxColor= POSITION.y.interpolate({
        inputRange: [-300, 300],
        outputRange:["rgb(255, 99, 71)", "rgb(71, 166,255)"]
    })
    //color의 경우는 native에서 실행이 안되므로 useNativeDriver를 false로 해줘야 한다
    return(
        <Container>
            <Pressable onPress={moveUp} >
            <AnimatedBox 
                style={{
                    backgroundColor: boxColor,
                    borderRadius,
                    transform: [{translateY: POSITION.y}, {rotateY: rotation}]
                }} 
            />
            </Pressable>
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
