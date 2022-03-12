import React, {useState, useEffect, useRef} from "react"
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder,Text } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// const CardSection = styled.View`
// const CardSection = styled(Animated.createAnimatedComponent(View))`
const CardSection = styled.View`
    justify-content: center;
    align-items: center;
    //Diemension쓰기위해 인라인 style 적용

`
const Card = styled(Animated.createAnimatedComponent(View))`
    /* flex: 1; */
    width: 290px;
    height: 510px;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
    /* margin:0px; */
    border-radius: 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
    border: 2px solid black;
`
const CardImgShell = styled.View`
    flex: 3;
    align-items: center;
    justify-content: center;
    width: 80%;
    /* border: 1px solid red; */
    `
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
    `
const CardContents = styled.View`
    flex: 1;
    width: 100%;
    /* border: 1px solid green; */
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
    
    // --------------1----------------------------1----------------------------1----------------------------1--------------
    // --------------2----------------------------2----------------------------2----------------------------2--------------
    


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
const CardList = styled(Animated.createAnimatedComponent(FlatList))`
`
const LeftArrowSplash = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 150px;
    height: 150px;
    /* border: 1px solid red; */
    justify-content: center;
    align-items: center;
`
const RightArrowSplash = styled(LeftArrowSplash)`
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
const ClearModal = styled.View`
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid red;
    align-items: center;
    justify-content: center;
`
// const CheckBtnImage = styled.Image`
// `
// const NonCheckBtnImage = styled.Image`
// `
//레벨2 레벨3은 이런식으로 작성하면 될것같음
export const WordCard2LV = () => {
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false)
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;
    

    const scaleControl = position.interpolate({
        inputRange:[-400,-200,0,200,400],
        outputRange:[1,0,1,0,1],
        extrapolate: "clamp" 
    });
    const rotation = position.interpolate({
        inputRange:[-200,0, 200],
        outputRange:["-15deg","0deg" ,"15deg"],
        extrapolate: "clamp" // 범위에서 넘어가면 interpolate를 어떻게 처리할지 ?
    });

    //Animations
    const onPressIn = Animated.spring(scale, {
        toValue:0, 
        useNativeDriver:true
    });
    const onPressOut = Animated.spring(scale, {
        toValue:1, 
        useNativeDriver:true,
    });
    const tensionAnimated = Animated.spring(position, {
        tension:10,
        friction:5,
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
        useNativeDriver:true,
    });
    const CheckBtnOpacityInput = Animated.timing(btnOpacity, {
        toValue: 0.3,
        duration:150,
        useNativeDriver:true
    })
    const CheckBtnOpacityOutput = Animated.timing(btnOpacity, {
        toValue: 0,
        duration:150,
        useNativeDriver:true
    })
    
    // const goLeft = Animated.spring(position, {
    //     // toValue: -SCREEN_WIDTH, 
    //     tension: 35,
    //     restSpeedThreshold: 1,
    //     restDisplacementThreshold:1,
    //     useNativeDriver:true
    // });
    // const goRight = Animated.spring(position, {
    //     toValue: SCREEN_WIDTH, 
    //     restSpeedThreshold: 1,
    //     restDisplacementThreshold:1,
    //     tension: 35,
    //     useNativeDriver:true
    // });

    //panResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove:(_,{dx}) => {
                position.setValue(dx)
                // console.log('Move',dx)
            //     if(dx < -184.6){
            //         Animated.sequence([CheckBtnOpacityInput,CheckBtnOpacityOutput,]).start();
            //         //     // console.log("dismiss to the left")
            //         //     // Animated.parallel([goLeft,CheckBtnOpacityOutput,checkSplashUpScale]).start(onDismiss);
            //         //     // Animated.parallel([goLeft,CheckBtnOpacityOutput]).start(onDismiss);
            //         //     Animated.parallel([goLeft]).start(onDismiss);
            //     }else if(dx>184.6){
            //         Animated.sequence([CheckBtnOpacityInput,CheckBtnOpacityOutput,]).start();
            //             //     // console.log("dismiss to the right")
            // //     // Animated.parallel([goRight,CheckBtnOpacityOutput]).start(onDismiss);
            // //     Animated.parallel([goRight]).start(onDismiss);

            //     }else{
                    // Animated.parallel([onPressOut,tensionAnimated,CheckBtnOpacityOutput]).start();
                    // Animated.parallel([CheckBtnOpacityOutput]).start();
                // }
            }, 
            // onPanResponderGrant: () => {
            //     Animated.parallel(
            //             // [onPressIn,CheckBtnOpacityInput]
            //             [CheckBtnOpacityInput]
            //             // [onPressIn]
            //         ).start();
            //         // onPressIn.start()
            //         console.log('Grant')
            //     },
            onPanResponderRelease: (_, {dx}) => {
                // console.log('Release',dx)
            //     if(dx < -184.6){
            //         //     // console.log("dismiss to the left")
            //         //     // Animated.parallel([goLeft,CheckBtnOpacityOutput,checkSplashUpScale]).start(onDismiss);
            //         //     // Animated.parallel([goLeft,CheckBtnOpacityOutput]).start(onDismiss);
            //         //     Animated.parallel([goLeft]).start(onDismiss);
            //     }else if(dx>184.6){
            //             //     // console.log("dismiss to the right")
            // //     // Animated.parallel([goRight,CheckBtnOpacityOutput]).start(onDismiss);
            // //     Animated.parallel([goRight]).start(onDismiss);

                // }else{
                    // Animated.parallel([onPressOut,tensionAnimated,CheckBtnOpacityOutput]).start();
                    // Animated.parallel([tensionAnimated,CheckBtnOpacityOutput]).start();
                    Animated.parallel([tensionAnimated]).start();
                // }
            // // Animated.parallel([onPressOut,CheckBtnOpacityOutput, goCenter]).start();
            // Animated.parallel([onPressOut, goCenter]).start();
            
            }

        })
    ).current

    const lastListModalOn = () => {
        setClearModalToggle((prev) => !prev)
    };
    const clear2 = () => {
        setRefresh((prev) => !prev)
        setClearModalToggle((prev) => !prev)
        setTimeout(function() {
            setRefresh((prev) => !prev)
        },100)
        // setClearModalToggle((prev) => !prev)
        // console.log(refresh)
    };


    return(
    <View  style={{alignItems:"center", justifyContent:"center"}}>
        {refresh ? (
        <View  style={{alignItems:"center", justifyContent:"center"}}>
            <CardList
                {...panResponder.panHandlers}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={WordCardArray}
                onEndReached={lastListModalOn}
                onEndReachedThreshold={0.1}
                renderItem = {({item, index})=>{
                    // {item.length<item.id ? console.log(item.id):console.log(item.name)}
                    // {console.log('item =',item.id, ' index=',index)}
                    // {console.log(index)}
                    return (
                    <CardSection style={{
                        width:SCREEN_WIDTH,
                    }}> 
                        <Card style={{
                            backgroundColor : item.bgColor,
                            opacity: scaleControl,
                            transform:[{scale:scaleControl},{rotateZ:rotation}]

                        }}>
                            <CardImgShell>
                                <CardImg source={item.image} resizeMode="contain"></CardImg>
                                {/* <ImageAudioBtn onPress={()=>{console.log('이미지 오디오 출력')}} /> */}
                                <ImageAudioBtn onPress={()=>{lastListModalOn()}} />
                            </CardImgShell>
                            <CardContents onPress={() => console.log(item.length)}>
                                <CardName>
                                    <CardNameText>{item.name}</CardNameText>
                                    <TextAudioBtn onPress={()=>{console.log('텍스트 오디오 출력')}} />
                                </CardName>
                            </CardContents>
                        </Card>
                    </CardSection>
                    )
                    
                }}
            />
            <LeftArrowImageContainer style={{
                opacity: btnOpacity,
            }}>
                <ArrowImage source={require("../asset/images/LeftArrow.png") } />
            </LeftArrowImageContainer>
            <RightArrowImageContainer style={{
                opacity: btnOpacity,
            }}>
                <ArrowImage  source={require("../asset/images/RightArrow.png")} />
            </RightArrowImageContainer>
        </View>):null
        }
        {clearModalToggle ? (
            <ClearModal>
            <TouchableOpacity onPress={() => clear2()}><Text>다시하기</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => clear2()}><Text>다음페이지</Text></TouchableOpacity>
        </ClearModal>
        ):null}
        
    </View>
    )
}


// --------------2----------------------------2----------------------------2----------------------------2--------------
// --------------3----------------------------3----------------------------3----------------------------3--------------



const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;  
    z-index  : 1;
    /* background-color: red; */
    `
const CardContainer = styled.View`
    flex: 1;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: center;
    z-index  : 1;
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
const LeftArrowImageContainer = styled(Animated.createAnimatedComponent(View))`
        position: absolute;
        left: 0px;
        top: 45%;
        /* border: 1px solid gray; */
`
const RightArrowImageContainer = styled(Animated.createAnimatedComponent(View))`
        position: absolute;
        right: 0px;
        top: 45%;
        /* border: 1px solid gray; */
`
const ArrowImage = styled.ImageBackground`
        width: 36px;
        height: 36px;
        align-items: center;
        justify-content: center;
        /* border: 1px solid gray; */
`
const CheckSplashScreen = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 300px;
    height: 500px;
    /* background-color: rgba(0,0,0,0.1); */
    align-items: center;
    justify-content: center;
`
const CheckSplashScreenImage = styled.View`
    width: 200px;
    height: 250px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.BEIGE};
    border-radius: 10px;
`
// const AnimatedCard = Animated.createAnimatedComponent(ExamCard);


export const WordCard3LV = () => {
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const cardImageOpacity = useRef(new Animated.Value(1)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;
    // const checkSplash = useRef(new Animated.Value(0.9)).current;

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
    const cardImageOpacityVisible = Animated.timing(cardImageOpacity, {
        toValue: 1,
        useNativeDriver:true
    })
    const cardImageOpacityInisible = Animated.timing(cardImageOpacity, {
        toValue: 0,
        useNativeDriver:true
    })
    const CheckBtnOpacityInput = Animated.timing(btnOpacity, {
        toValue: 1,
        useNativeDriver:true
    })
    const CheckBtnOpacityOutput = Animated.timing(btnOpacity, {
        toValue: 0,
        useNativeDriver:true
    })
    // const checkSplashUpScale = Animated.timing(checkSplash, {
    //     toValue: 1.1,
    //     duration: 300,
    //     delay: 0,
    //     useNativeDriver:true
    // })
    // const checkSplashDownScale = Animated.timing(checkSplash, {
    //     toValue: 0.9,
    //     duration: 100,
    //     delay: 0,
    //     useNativeDriver:true
    // })
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
        toValue: -SCREEN_WIDTH-200, 
        tension: 35,
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
        useNativeDriver:true
    });
    const goRight = Animated.spring(position, {
        toValue: SCREEN_WIDTH+200, 
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
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
                    // Animated.parallel([goLeft,CheckBtnOpacityOutput,checkSplashUpScale]).start(onDismiss);
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
    
    // let cardArrayNum = WordCardArray.length;
    // function randomIndex(){
    //     let ranNum = Math.floor(Math.random()*(cardArrayNum))+1
    //     return ranNum;
    // } 
    const randomIndexConsole =  WordCardArray.filter((dat)=>{
        if(dat.check == false){
            return dat
        }else{
            null
        }
    })
    // console.log(randomIndexConsole[0].id)

    // const [index, setIndex] = useState(randomIndexConsole[0].id);
    const [index, setIndex] = useState(0);
    const checkCard = () => {
        console.log(WordCardArray[index])
    }
    // checkCard()
    // 여기서 막혔음 (좌로 가면 check true로 바꾸고싶은데 좌로 카드를 넘겨도 계속 index가 0 으로 출력됨)
    //onDismiss에서 index를 바꾸는데 왜 PanResponder에서는 적용이 안되지? 
    // check값을 출력하고 바꾸려면 어떻게 해야하지?


    const onDismiss = async() => {
        // if (index+4 == WordCardArray.length){
        //     null
        // }else{
            await setIndex((prev) => prev +1)
            scale.setValue(1);
            position.setValue(0);
            // cardImageOpacityVisible.start();
            // Animated.sequence([checkSplashUpScale, checkSplashDownScale]).start();
            
            
            // console.log(index)//계속 0만뜬다 onDismiss밖에서는 정상작동함
        // }
    }
    const onDismissRight = () => {
        // if (index+4 == WordCardArray.length){
        //     null
        // }else{
            setIndex((prev) => prev -1)
            scale.setValue(1);
            position.setValue(0);
            // Animated.sequence([checkSplashUpScale, checkSplashDownScale]).start();
            
            
            // console.log(index)//계속 0만뜬다 onDismiss밖에서는 정상작동함
        // }
    }
    const checkPress = () => {
        goLeft.start(onDismiss);
    }
    const closePress = () =>{
        goRight.start(onDismiss);
    }
    return(
        <>
        <Container>
            
            <CardContainer>
                {/* backCard */}
                <ExamCard 
                // {...panResponder.panHandlers}
                style={{
                    backgroundColor:WordCardArray[index+1].bgColor,
                    transform:[{scale:secondScale}, {rotateZ:rotation}]
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
                {/* fronCard */}
                {WordCardArray.length-3 >= index ? ( // 배열의 마지막카드 전에 카드움직이기 멈추도록, else부분에 축하애니메이션+ 다음레벨 모달창을 넣을 수도 있음
                    <ExamCard 
                    {...panResponder.panHandlers}
                    style={{
                        backgroundColor:WordCardArray[index].bgColor,
                        transform:[{scale},{translateX:position}, {rotateZ:rotation}]
                    }}>
                        <CardImgShell style={{opacity:cardImageOpacity}}>
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
            {/* <CheckSplashScreen style={{
                    zIndex: checkSplash,
                    transform: [{scale:checkSplash}],
                    opacity: 1
                }}>
                <CheckSplashScreenImage>
                    <Ionicons name="checkmark-circle" size={50} color={colors.NAVY} />
                </CheckSplashScreenImage>
            </CheckSplashScreen> */}
        </Container>

        <CheckBtn style={{
            opacity: btnOpacity,
        }}>
            {/* <StarViewImage source={require("../asset/images/Check.png") }></StarViewImage> */}
            <CheckBtnImage>
                {/* <Ionicons name="checkmark-circle" size={50} color={colors.NAVY} /> */}
            </CheckBtnImage>
        </CheckBtn>
        <NonCheckBtn style={{
            opacity: btnOpacity,
        }}>
            <CheckBtnImage>
            {/* <StarViewImage source={require("../asset/images/Random.png")}></StarViewImage> */}
                <Ionicons name="help-circle" size={50} color={colors.TOMATO} />
            </CheckBtnImage>
        </NonCheckBtn>

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
