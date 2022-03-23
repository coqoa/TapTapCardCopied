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

// const Star = styled.View`
//     height: 55px;
//     width: 50%;
//     top: 3%;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid red;
//     `
// const StarViewImage = styled.ImageBackground`
//     /* top: 2px; */
//     width: 100%;
//     height: 100%;
// `

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
    background-color: rgba(0,0,0,0.3);
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
    /* border: 1px solid black; */
    /* margin-bottom: 15px; */
    `
const CardName = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    `
const CardNameText = styled.Text`
    font-size: 65px;
    font-weight: 900;
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
const CardNameModalText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    font-family: 'SDChild';
    color: ${colors.SEABLUE};
`
// const CardNameModalBox = styled(Animated.createAnimatedComponent(Pressable))`
//     position: absolute;
//     width: 80%;
//     height: 70px;
//     background-color: transparent;
// `


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
    height: 70%;
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
    /* background-color: rgba(0,0,0,0.1); */
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


const DistractorContainer = styled.View`
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
const Distractor = styled.TouchableOpacity`
    width: 48%;
    height: 90%;
    margin: 5px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.3);
    background-color: rgba(255,255,255, 0.9);
    `
const DistractorText = styled.Text`
    font-family: 'SDChild';
    font-size: 30px;
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
    const [distractorWindowBackground, setDistractorWindowBackground] = useState(true);
    const [distractorWindow, setDistractorWindow] = useState(true);
    const [wrongImage, setWrongImage] = useState(false)
    const [wrongImageSrc, setWrongImageSrc] = useState("")
    const [wrongImageBgColor, setWrongImageBgColor] = useState("")
    const [lv3ClickBlockerOn, setLv3ClickBlockerOn] = useState(true)
    const [lv3ClickAlertWindow, setLv3ClickAlertWindow] = useState(false);

    //Values
    const defaultAnimated1 = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const secondImageOpacity = useRef(new Animated.Value(0)).current;
    //interpolate
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
    //Animated
    const tensionAnimated = Animated.spring(position, {
        tension:10,
        friction:5,
        restSpeedThreshold: 1,
        restDisplacementThreshold:1,
        useNativeDriver:true,
    });
    const onPressIn =  Animated.spring(defaultAnimated1, {
        toValue:0.9,
        useNativeDriver:true
    })
    const onPressOut = Animated.spring(defaultAnimated1, {
        toValue:1,
        useNativeDriver:true
    })
    const secondImageOn = Animated.timing(secondImageOpacity, {
        toValue:1,
        useNativeDriver:true
    })
    const secondImageOff = Animated.timing(secondImageOpacity, {
        toValue:0,
        delay:1700,
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
                // if(dx<-100 || dx>100){
                playSound(require("../asset/audio/CardPass.mp3"))
                // }
                {props.level == "word2LV" && (
                    setQuestionMarkBackground(true),
                    setTimeout(function() {
                        setQuestionMark(true)
                    },30)
                ) }
                {props.level == "word3LV" && (
                    setDistractorWindowBackground(true),
                    setTimeout(function() {
                        setDistractorWindow(true)
                    },80),
                    setLv3ClickBlockerOn(true)
                )}
                Animated.parallel([onPressOut,tensionAnimated]).start();
            }
        })
    ).current
    const secondImagePan = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderStart:()=>{
            // console.log('1')
            Animated.sequence([secondImageOn,secondImageOff]).start();
            // secondImageOn.start();
        },
        onPanResponderRelease:()=>{
            // console.log('2')
            // secondImageOff.start();
        }
    })).current
    // modal
    // 터치시 이미지 변경 및 오디오출력 함수
    const imageModalToggle = () => {
        setImageToggle(true)
        setClickBlockerToggle(true)
    }
    //터치시 텍스트 변경 함수
    const textModalToggle = () => {
        setTextToggle(true)
        setClickBlockerToggle(true)
    }
    //마지막 카드에서 출력되는 모달창, 다시하기버튼, 다음레벨 버튼
    const lastListModalOn = () => {
        setClearModalToggle((prev) => !prev)
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
    // 이미지 터치시 시작되는 Timeout
    const imageChangeTimeout = useRef(null); 
    useEffect(()=>{
        imageChangeTimeout.current = setTimeout(() => {setImageToggle(false), setClickBlockerToggle(false)},1700)
        return() => clearTimeout(imageChangeTimeout.current)
    },[imageToggle])
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
                            setDistractorWindowBackground(false)
                            setDistractorWindow(false)
                            setLv3ClickBlockerOn(false)
                            textModalToggle()
                            playSound(e.SoundKOR)
                        }else{
                            console.log('오답')
                            playSound(e.SoundImage)
                            setWrongImage(true)
                            setWrongImageSrc(e.image)
                            setWrongImageBgColor(e.bgColor)
                        }
                    }
                    // 정답입력전에는 터치못하도록, 정답시 화면에서 지워주고 오답시 해당버튼이미지보여줄 모달창 구현하기

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
                                    {type == "nameKOR" && (<CardNameText>{item.nameKOR}</CardNameText>)}
                                    {type == "ENG" && (<CardNameText>{item.nameENG}</CardNameText>)}
                                    {/* {type == "ENG" && (<CardNameText>{item.nameENG}</CardNameText>)} */}
                                    
                                    {/* type에 따라 한글을 읽어주는지, 영어를 읽어주는지 */}
                                    {type == "nameKOR" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundKOR)}} />)}
                                    {type == "ENG" && (<TextAudioBtn onPress={()=>{textModalToggle(), playSound(item.SoundENG)}} />)}
                                    
                                    {/* 터치시 텍스트 색깔을 바꿔주는 모달 */}
                                    {textToggle && (
                                        <CardNameModal>
                                            {type == "nameKOR" && (<CardNameModalText>{item.nameKOR}</CardNameModalText>)}
                                            {type == "ENG" && (<CardNameModalText>{item.nameENG}</CardNameModalText>)}
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
                                                {type == "nameKOR" && (
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
                                    {props.level == "word3LV" && distractorWindowBackground &&(
                                        <>
                                            <DistractorContainer>
                                                {distractorWindow && (
                                                <>
                                                <DistractorRow>
                                                    <Distractor  onPress={()=>{ClickSound(),answerCheck(numArray[0], console.log(type))}}><DistractorText>{numArray[0].nameKOR}</DistractorText></Distractor>
                                                    <Distractor  onPress={()=>{ClickSound(),answerCheck(numArray[1])}}><DistractorText>{numArray[1].nameKOR}</DistractorText></Distractor>
                                                </DistractorRow>
                                                <DistractorRow>
                                                    <Distractor  onPress={()=>{ClickSound(),answerCheck(numArray[2])}}><DistractorText>{numArray[2].nameKOR}</DistractorText></Distractor>
                                                    <Distractor  onPress={()=>{ClickSound(),answerCheck(numArray[3])}}><DistractorText>{numArray[3].nameKOR}</DistractorText></Distractor>
                                                </DistractorRow>
                                                {wrongImage && (
                                                <WrongAnswerContainer style={{backgroundColor:wrongImageBgColor}}>
                                                    <WrongAnswerImage source={wrongImageSrc} resizeMode="contain" />
                                                </WrongAnswerContainer>
                                                )}
                                                </>
                                                )}
                                                {/* {lv3ClickAlertWindow && (
                                                    <LV3ClickAlert onPress={()=>{setLv3ClickAlertWindow(false)}}>
                                                        <Text>정답먼저!</Text>
                                                    </LV3ClickAlert>
                                                )} */}
                                            </DistractorContainer>
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
                            {type == "nameKOR" && (<RepeatLevelText>다시 하기 !</RepeatLevelText>)}
                            {type == "ENG" && (<RepeatLevelText>Again !</RepeatLevelText>)}
                        </RepeatLevel>
                        <NextLevel 
                            onPressIn={()=> ClickSound()}
                            onPressOut={()=> nextLevelBtn(props.level)}
                        >
                            {type == "nameKOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                            {type == "ENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                        </NextLevel>
                    </ClearModal>
                </ClearModalContainer>  
            )} 
            </View>
        )
    }
    return(levelConsole())
}