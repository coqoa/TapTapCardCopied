import React, {useState, useEffect, useRef} from "react"
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder,Text } from "react-native";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { transform } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
//Diemensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Star = styled.View`
    height: 65px;
    width: 250px;
    align-items: center;
    /* justify-content: center;
    background-color: rgba(0,0,0,0.5); */
`
const StarView = styled.View`
    width: 170px;
    height: 60px;
    align-items: center;
    justify-content: center;
`
const StarViewImage = styled.ImageBackground`
    top: 2px;
    width: 220px;
    height: 70px;
    /* border: 1px solid gray; */
`

const CardList = styled(Animated.createAnimatedComponent(FlatList))``
const CardSection = styled.View`
    justify-content: center;
    align-items: center;
    //Diemension쓰기위해 인라인 style 적용
`
const Card = styled(Animated.createAnimatedComponent(View))`
    width: 290px;
    height: 510px;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    border: 2px solid ${colors.REALDARKGRAY};
`
const CardImgShell = styled.View`
    /* flex: 3; */
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 350px;
    margin: 15px 5px;
    border-radius: 10px;
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
const CardImgShellModal = styled.View`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 260px;
    height:350px;
    margin: 15px 13px;
    border-radius: 10px;
`
const CardImg2 = styled(CardImg)`

`
const CardContents = styled.View`
    flex: 1;
    margin-bottom: 2px;
    width: 100%;
    /* border: 1px solid gray; */
`
const CardName = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`
const CardNameText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    color: ${colors.REALDARKGRAY};
`
const CardNameModal = styled.View`
    position: absolute;
    left: 0px;
    top: 0px;
    width:100%;
    height:100%;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
`
const CardNameModalText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    color: ${colors.SEABLUE};
`
const CardNameModalBox = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    /* left: 104; */
    width: 80%;
    height: 70px;
    /* border: 1px solid black; */
    background-color: transparent;
    /* background-color: ${colors.BEIGE}; */
    /* background-color: blue; */
`


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
const ImageAudioBtn = styled.TouchableOpacity`
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 150px;
    background-color: rgba(0,0,0,0.1);
`
const TextAudioBtn = styled.TouchableOpacity`
    position: absolute;
    width: 220px;
    height: 60px;
    border-radius: 80px;
    background-color: rgba(0,0,0,0.1);
`
const ClearModalContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
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
const RepeatLevel = styled.Pressable`
    width: 200px;
    height: 60px;
    border-radius: 15px;
    margin: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.LIGHTBLUE};
    box-shadow: 2px 2px 5px ${colors.LIGHTBLUE};
    
`
const NextLevel = styled(RepeatLevel)`
    background-color: ${colors.REDORANGE};
    box-shadow: 2px 2px 5px ${colors.REDORANGE};
`
const RepeatLevelText = styled.Text``
const NextLevelText = styled.Text``

const TextBarContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
`
const TextBar = styled.TextInput`
    background-color: white;
    padding: 0px 15px;
    border-radius: 15px;
    width: 230px;
    height: 100px;
    margin: 10px auto;
    font-size: 50px;
    font-weight: 600;
    border: 1px solid ${colors.REALDARKGRAY};
    align-content:center;
`

// ----------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [imageToggle, setImageToggle] = useState(false)
    const [textToggle, setTextToggle] = useState(false)
    const [questionMarkBackground, setQuestionMarkBackground] = useState(true);
    const [questionMark, setQuestionMark] = useState(true);
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;
    //interpolate
    const scaleControl = position.interpolate({
        inputRange:[-100,0,100,],
        outputRange:[0.2,1,0.2],
        extrapolate: "clamp" 
    });
    const opacityControl = position.interpolate({
        inputRange:[-150,0,150,],
        outputRange:[0,1,0],
        extrapolate: "clamp" 
    });
    const rotation = position.interpolate({
        inputRange:[-200,0, 200],
        outputRange:["-15deg","0deg" ,"15deg"],
        extrapolate: "clamp" // 범위에서 넘어가면 interpolate를 어떻게 처리할지 ?
    });
    //Animated
    const tensionAnimated = Animated.spring(position, {
        tension:10,
        friction:5,
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
        useNativeDriver:true,
    });
    const onPressIn =  Animated.spring(scale, {
        toValue:0.9,
        useNativeDriver:true
    })
    const onPressOut = Animated.spring(scale, {
        toValue:1,
        useNativeDriver:true
    })
    const goCenter = Animated.spring(position, {
        toValue:0,
        useNativeDriver:true
    })
    const goLeft = Animated.spring(position, {
        toValue:-SCREEN_WIDTH, 
        useNativeDriver:true
    })
    const goRight = Animated.spring(position, {
        toValue:SCREEN_WIDTH,
        useNativeDriver:true
    })
    //panResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                // console.log(position)
            //     position.setOffset({
            //         x:position._value
            // });
            onPressIn.start();
            }, 
            onPanResponderMove:(_,{dx}) => {
                console.log("Move",dx)
                position.setValue(dx)
            }, 
            onPanResponderRelease: (_,{dx}) => {
                console.log("Release",dx)
                // if(dx<-150){
                //     position.setValue(0)
                //     // console.log('dismiss!!!!1')
                //     // Animated.parallel([onPressOut,tensionAnimated,goLeft]).start();
                //     Animated.spring(position, {
                //         toValue:-dx, 
                //         useNativeDriver:true
                //     }).start()
                    
                // }else if(dx>150){
                //     position.setValue(0)
                //     // console.log('dismiss!!!!2')
                //     Animated.parallel([onPressOut,goRight,tensionAnimated]).start();
                    
                // }else{
                //     // console.log('dismiss!!!!3')
                    // Animated.parallel([onPressOut,goCenter,tensionAnimated]).start();
                    setQuestionMarkBackground(true)
                    setTimeout(function() {
                        setQuestionMark(true)
                    },30)
                    Animated.parallel([onPressOut,tensionAnimated]).start();
                // }
            }
        })
    ).current
    // modal

    const imageModalToggle = () => {
        setImageToggle((prev) => !prev)
        setTimeout(function() {
            setImageToggle((prev) => !prev)
        },2000)
    }
    const textModalToggle = () => {
        setTextToggle((prev) => !prev)
        setTimeout(function() {
            setTextToggle((prev) => !prev)
        },1000)
    }
    // const QuestionMarkClick = () => {
    //     setQuestionMark(false)
    //     // console.log(e.nativeEvent)
    // }
    const lastListModalOn = () => {
        setClearModalToggle((prev) => !prev)
    };
    const restartLevelBtn = () => {
        setRefresh((prev) => !prev)
        setClearModalToggle((prev) => !prev)
        setTimeout(function() {
            setRefresh((prev) => !prev)
        },100)
    };
    const nextLevelBtn = () => {
        props.level = "word2LV"
        // setRefresh((pre
        console.log(props.level)
    };
    //자식컴포넌트에서 부모컴포넌트 state를 바꾸려면 함수를 이용해야한다 (그냥 props는 읽기전용이라 props.level="???" 이런식으로 변경 불가능)
    const childComponentClick = () => {
        props.getData('word2LV')
        setRefresh((prev) => !prev)
        setClearModalToggle((prev) => !prev)
        setTimeout(function() {
            setRefresh((prev) => !prev)
        },100)
    }


    const levelConsole = () => {
        return(
            <View  style={{alignItems:"center", justifyContent:"center"}}>
            <SafeAreaView style={{flex:1}}>
                <View  style={{alignItems:"center", justifyContent:"center"}}>
                <Star>
                    <StarView>
                        {(()=>{
                            if(props.level === "word1LV") return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>;
                            else if(props.level=="word2LV") return <StarViewImage source={require("../asset/images/Star2.png")}></StarViewImage>;
                            else if(props.level=="word3LV") return <StarViewImage source={require("../asset/images/Star3.png")}></StarViewImage>;
                            else return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>
                        })()}
                    </StarView>
                </Star>

                {/* 본문 */}
                {refresh && (
                <>
                    <CardList
                        {...panResponder.panHandlers}
                        data={WordCardArray}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onEndReached={lastListModalOn}
                        onEndReachedThreshold={0.1}
                        renderItem = {({item})=>{
                            return (
                            <CardSection style={{width:SCREEN_WIDTH}}> 
                                <Card style={{
                                    backgroundColor : colors.BEIGE,
                                    opacity: opacityControl,
                                    transform:[{scale:scaleControl},{rotateZ:rotation}]
                                }}>
                                    <CardImgShell style={{backgroundColor:item.bgColor}}>
                                        <CardImg source={item.image} resizeMode="contain"></CardImg>
                                        <ImageAudioBtn onPress={()=>imageModalToggle()} />
                                    </CardImgShell>
                                    {imageToggle && (
                                        <CardImgShellModal style={{backgroundColor: item.bgColor}}>
                                            <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                        </CardImgShellModal>
                                    )}
                                    

                                    <CardContents>
                                        <CardName>
                                            <CardNameText>{item.name}</CardNameText>
                                            <TextAudioBtn onPress={()=>textModalToggle()} />
                                            {textToggle && (
                                                <CardNameModal>
                                                    <CardNameModalText>{item.name}</CardNameModalText>
                                                    <CardNameModalBox></CardNameModalBox>
                                                </CardNameModal>
                                            )}

                                            {/* 2레벨에서만 사용되는 물음표 박스 컴포넌트 */}
                                            {props.level == "word2LV" && questionMarkBackground && (
                                                <QuestionMarkBg
                                                style={{backgroundColor: colors.BEIGE}}
                                                >
                                                {props.level == "word2LV" && questionMark && (
                                                    <QuestionMarkBtn onPress={()=>{setQuestionMark(false), setQuestionMarkBackground(false)}} >    
                                                        <QuestionMarkImage source={item.questionMarkImage} resizeMode="contain"/>
                                                    </QuestionMarkBtn>
                                                )}
                                            </QuestionMarkBg>
                                            )}
                                        </CardName>
                                    </CardContents>

                                </Card>
                            </CardSection>
                            )
                        }}
                    />
                </>
                )}
                {/* 마지막리스트 도달하면 열리는 모달창 */}
                {clearModalToggle ? (
                    <ClearModalContainer>
                        <ClearModal>
                            <ClearImage  source={require("../asset/images/Check.png")} />
                            <RepeatLevel onPress={() => restartLevelBtn()}>
                                <RepeatLevelText>다시 하기!</RepeatLevelText>
                            </RepeatLevel>
                            <NextLevel onPress={()=> childComponentClick()}>
                                <NextLevelText>다음레벨 도전!</NextLevelText>
                            </NextLevel>
                        </ClearModal>
                    </ClearModalContainer>  
                ):null} 
                </View>
            </SafeAreaView>
            </View>
        )
    }

// const Container = styled.View`
//     flex-direction: row;
//     position: absolute;
//     /* left: -50%; */
//     /* top: 0px; */
//     /* padding: 0px; */
//     background-color: red;
// `
// const CardShell = styled.View`
//     align-items: center;
//     justify-content: center;
//     z-index: 10;
// `
// const Card = styled(Animated.createAnimatedComponent(View))`
//     width: 300px;
//     height: 300px;
//     justify-content: center;
//     align-items: center;
//     border-radius: 12px;
//     box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
//     z-index: 15;
// `
//     const wordCardMapFunction = WordCardArray.map(function(item){
//         // const scale = useRef(new Animated.Value(1)).current;
//         return (
//             <CardShell  key={item.id} style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT}}>
                
//                 <Card 
//                 {...panResponder.panHandlers}
//                 style={{
//                     backgroundColor: item.bgColor, 
//                     // opacity: scaleControl,
//                     // transform: [{scale:scaleControl}, {translateX:position}]
//                     transform: [{scale}, {translateX:position}]
//                 }}>
//                     <Text>{item.name}</Text>
//                 </Card>
//             </CardShell>
//         )
//     })
    return(levelConsole())
    // return(
    //     <Container>
    //         {/* <Card><Text>123</Text></Card> */}
    //         {wordCardMapFunction}
    //     </Container>
    // )
}