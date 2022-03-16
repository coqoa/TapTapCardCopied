import React, {useState, useEffect, useRef} from "react"
import { Audio } from 'expo-av';
import {View, Dimensions, FlatList, Animated, TouchableOpacity, Pressable, PanResponder,Text } from "react-native";
import styled from "styled-components"
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "./color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
//Diemensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Star = styled.View`
    height: 65px;
    width: 250px;
    align-items: center;
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
`

const CardList = styled(Animated.createAnimatedComponent(FlatList))``
const CardSection = styled.View`
    justify-content: center;
    align-items: center;
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
const ClickBlocker = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.5); */
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
    font-family: 'SDChild';
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
`
const CardNameModalText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    font-family: 'SDChild';
    color: ${colors.SEABLUE};
`
const CardNameModalBox = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 80%;
    height: 70px;
    background-color: transparent;
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
    z-index: 1;
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

// ----------------------------------------------------------------------------------

export const WordCardLevel = (props) => {
    //useState
    const [refresh, setRefresh] = useState(true);
    const [clearModalToggle, setClearModalToggle] = useState(false);
    const [imageToggle, setImageToggle] = useState(false)
    const [textToggle, setTextToggle] = useState(false)
    const [questionMarkBackground, setQuestionMarkBackground] = useState(true);
    const [questionMark, setQuestionMark] = useState(true);
    const [clickBlockerToggle, setClickBlockerToggle] = useState(false)
    //Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
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
    //panResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                onPressIn.start();
            }, 
            onPanResponderMove:(_,{dx}) => {
                position.setValue(dx)
            }, 
            onPanResponderRelease: (_,{dx}) => {
                setQuestionMarkBackground(true)
                setTimeout(function() {
                    setQuestionMark(true)
                },30)
                Animated.parallel([onPressOut,tensionAnimated]).start();
            }
        })
    ).current
    // modal
    // 터치시 이미지 변경 및 오디오출력 함수
    const imageChangeFunc = () =>{
        setImageToggle((prev) => !prev)
        setClickBlockerToggle((prev) => !prev)
    }
    const imageModalToggle = () => {
        imageChangeFunc()
        setTimeout(function() {imageChangeFunc()},1700)
    }
    //터치시 텍스트 변경 함수
    const textChangeFunc = () =>{
        setTextToggle((prev) => !prev)
        setClickBlockerToggle((prev) => !prev)
    }
    const textModalToggle = () => {
        textChangeFunc()
        setTimeout(function() {textChangeFunc()},1000)
    }
    //마지막 카드에서 출력되는 모달창, 다시하기버튼, 다음레벨 버튼
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
    //자식컴포넌트에서 부모컴포넌트 state를 바꾸려면 함수를 이용해야한다 (그냥 props는 읽기전용이라 props.level="???" 이런식으로 변경 불가능)
    const nextLevelBtn = () => {
        props.getData('word2LV')
        setRefresh((prev) => !prev)
        setClearModalToggle((prev) => !prev)
        setTimeout(function() {
            setRefresh((prev) => !prev)
        },100)
    }
    //부모 컴포넌트로부터 type props(KOR, ENG 등등)를 받아서 그에 맞는 화면을 출력해주기 위한 변수 
    const type = props.type

    // 오디오출력, props를 받아서 해당 파일을 출력해줌
    const playSound = async(e) => {
        console.log(e)
        const sound = new Audio.Sound();
      try {    
      	// 저장한 path로 음원 파일 불러오기 
        await sound.loadAsync(e);
        // 음원 재생하기 
        await sound.playAsync();
      } catch (error) {
     }
    }



    const levelConsole = () => {
        return(
            <View  style={{alignItems:"center", justifyContent:"center"}}>
            <SafeAreaView style={{flex:1}}>
            <View  style={{alignItems:"center", justifyContent:"center"}}>
            <Star>
                <StarView>
                    {(()=>{
                        if(props.level === "word1LV") return <StarViewImage source={require("../asset/images/Star1.png")} />
                        else if(props.level=="word2LV") return <StarViewImage source={require("../asset/images/Star2.png")} />
                        else if(props.level=="word3LV") return <StarViewImage source={require("../asset/images/Star3.png")} />
                        else return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>
                    })()}
                </StarView>
            </Star>

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
                onEndReachedThreshold={0.1}
                renderItem = {({item})=>{

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
                                <ImageAudioBtn onPress={()=>{imageModalToggle(), playSound(item.SoundImage)}} />
                            </CardImgShell>
                            {/* 이미지 터치시 출력되는 세컨드이미지 */}
                            {imageToggle && (
                                // <CardImageContainer>
                                    <CardImgShellModal style={{backgroundColor: item.bgColor}}>
                                        <CardImg2 source={item.image2} resizeMode="contain"></CardImg2>
                                    </CardImgShellModal>
                                // </CardImageContainer>
                            )}
                            
                            {/* 카드 텍스트 부분 */}
                            <CardContents>
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
                                            {type == "KOR" && (<CardNameModalText>{item.nameKOR}</CardNameModalText>)}
                                            {type == "ENG" && (<CardNameModalText>{item.nameENG}</CardNameModalText>)}
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
            {clickBlockerToggle && (<ClickBlocker />)}
            </>
            )}
            {/* 마지막리스트 도달하면 열리는 모달창 */}
            {clearModalToggle ? (
                <ClearModalContainer>
                    <ClearModal>
                        <ClearImage  source={require("../asset/images/Check.png")} />
                        <RepeatLevel onPress={() => restartLevelBtn()}>
                            {type == "KOR" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
                            {type == "ENG" && (<RepeatLevelText>Again !</RepeatLevelText>)}
                        </RepeatLevel>
                        <NextLevel onPress={()=> nextLevelBtn()}>
                            {type == "KOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                            {type == "ENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                        </NextLevel>
                    </ClearModal>
                </ClearModalContainer>  
            ):null} 
            </View>
            </SafeAreaView>
            </View>
        )
    }
    return(levelConsole())
}