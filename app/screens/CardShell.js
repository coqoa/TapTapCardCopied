import React, { useState, useEffect, useRef } from "react";
import {View, Dimensions, PanResponder, Animated, Pressable, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Audio } from 'expo-av';
import styled from "styled-components";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

import { colors } from "../component/Color";
import { WordCardLevel } from "../component/CardDefault";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Copyright } from "../component/Copyright";
import { BannerAds } from "../component/Ads";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Shell = styled.View`
    flex: 1;
    background-color: ${colors.mainBgColor};
    align-items: center;
    border-radius: 15px;
`
const TopContainer = styled.View`
    height:70px;
    align-items: center;
    justify-content: flex-end;
    z-index: 3;
    
`
const Top = styled.View`
    flex-direction: row;
    width: 80%;
    height: 80%;
    top: 3px;
    border-radius: 15px;
    align-items: center;
    z-index: 10;
    background-color: rgba(255,255,255,0.9);
`
const GoBack = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 35px;
    height: 35px;
    left: 5px;
    align-items: center;
    justify-content: center;
    z-index: 10;
`
const GoBackBtnImage = styled.Image`
    width: 100%;
    height: 100%;
`
const Star = styled.Pressable`
    flex: 1;
    height: 40px;
    width: 30%;
    bottom: 1px;
    align-items: center;
    justify-content: center;
`
const StarViewImage1 = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const Main = styled.View`
    flex: 1;
    flex-direction: row;
    z-index: 2;
`
const MenuText = styled.Text`
    top: 3px;
    font-size: 35px;
    font-family: "SDChild";
    color: ${colors.REALDARKGRAY};
`
const Menu =  styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 55px;
    height: 55px;
    right: 0px;
    align-items: center;
    justify-content: center;
    z-index: 10;
`
const MenuBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const MenuModalBg = styled(Animated.createAnimatedComponent(Pressable))`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    align-items: center;
    justify-content: center;
`
const MenuModalContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    top: 20%;
    width: 60%;
    height: 35%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.9);
`

const MenuModal = styled.View`
    width: 90%;
    flex:1;
    align-items: center;
    justify-content: center;
`
const MenuModalScrollView = styled.ScrollView`
    width: 90%;
    flex:1;
`
const ModalDistractor = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    padding: 5px;
    margin: 5px;
    border-radius: 15px;
    /* background-color: red; */
`
const LevelBtn = styled(Animated.createAnimatedComponent(Pressable))`

    width: 23px;
    height: 23px;
    /* align-items: center; */
    /* justify-content: center; */
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 2px;
    background-color: white;
`
const ModalMenuText =styled.Text`
/* background-color: black; */
    text-align: center;
    width: 80%;
    top: 3px;
    font-size: 28px;
    font-family: "SDChild";
    color: white;
    text-align: center;
`
const StarViewImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const PaymentBtn = styled(LevelBtn)`
    background-color: white;
`
const PaymentText = styled(ModalMenuText)`
    text-align: center;
    top: 4px;
    font-size: 24px;
    color: white;
`
const CopyrightBtn  = styled.TouchableOpacity`
    position: absolute;
    right:5px;
    bottom:10px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    z-index: 10;
`
const CopyrightShell = styled.View`
    position: absolute;
    right:10px;
    bottom:10px;
    width: 80%;
    height: 60%;
    border-radius: 15px;
    z-index: 10;
    background-color: white;
    justify-content: center;
    align-items: center;
    padding: 40px 10px;
`
const CopyrightHeader = styled.View`
    position: absolute;
    top: 10px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const CopyrightCloseBtn = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
`
const BannerShell = styled.View`
    width: 100%;
    height: 50px;
    background-color: white;
`

const CardShell = ({route, navigation}) => {

    const [copyrightModal, setCopyrightModal] = useState(false);

    // 콘텐츠 로딩 함수
    const [loading, setLoading] = useState(false);
    const contentsLoading = () => {
        setLoading(true)
        setTimeout(function(){
            setLoading(false)
        },300)
    }
    useEffect(()=>{
        contentsLoading()
    },[])

    const [cardSelector, setCardSelector] = useState();
    const [mainScreenRender, setMainScreenRender] = useState(false)
    const [typeCheckRes, setTypeCheckRes] = useState("")

    // Menu.js로부터 type을 받는다 (한글인지 영어인지) 그 후 type을 토대로 출력되는 코드들을 정해준다
    const type = route.params.type
    
    const typeCheck = (e) => {
        if(e=="AnimalKOR"){
            return setTypeCheckRes("Animal")
        }else if (e=="AnimalENG"){
            return setTypeCheckRes("Animal")
        }else{
            return setTypeCheckRes(e)
        }
    }

    useEffect(()=>{
        typeCheck(type)
    },[])

//버튼애니메이션 & 상호작용
    //햄버거 아이콘, 모달BG scale, 모달containder scale
    const menuBtnScale = useRef(new Animated.Value(1)).current
    const menuModalIndex = useRef(new Animated.Value(0)).current

    // 1레벨선택버튼
    const level1Scale = useRef(new Animated.Value(1)).current
    const level2Scale = useRef(new Animated.Value(1)).current
    const level3Scale = useRef(new Animated.Value(1)).current
    const level4Scale = useRef(new Animated.Value(1)).current
    const level5Scale = useRef(new Animated.Value(1)).current
    const level6Scale = useRef(new Animated.Value(1)).current
    const level7Scale = useRef(new Animated.Value(1)).current
    const level8Scale = useRef(new Animated.Value(1)).current
    const level9Scale = useRef(new Animated.Value(1)).current
    const level10Scale = useRef(new Animated.Value(1)).current
    const level11Scale = useRef(new Animated.Value(1)).current

//PanResponder 생성함수
    const btnPan = (a) => {
        return (
            useRef(PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderEnd:()=>{
                    contentsLoading()
                    menuModalIndex.setValue(0)
                    return cardCheck(a)
                }            
            })).current
        )
    }
// 애니메이션 적용하는 Pan
    const animal1Pan = btnPan("word1LV")
    const animal2Pan = btnPan("word2LV")
    const animal3Pan = btnPan("word3LV")

    const ganada1Pan = btnPan("Consonant")
    const ganada2Pan = btnPan("Vowel")

    const alphabetPan= btnPan("Alphabet")

    const numberAllPan = btnPan("All")
    const number0Pan = btnPan("0~10")
    const number1Pan = btnPan("11~20")
    const number2Pan = btnPan("21~30")
    const number3Pan = btnPan("31~40")
    const number4Pan = btnPan("41~50")
    const number5Pan = btnPan("51~60")
    const number6Pan = btnPan("61~70")
    const number7Pan = btnPan("71~80")
    const number8Pan = btnPan("81~90")
    const number9Pan = btnPan("91~100")
//선택지
    //숫자 메뉴 모달 선택지 함수
    const distractorFunc = (a,b,c,d) => {
        return (
            <ModalDistractor 
                style={{backgroundColor: b}}
            >
            <LevelBtn 
                {...a}
                style={{borderColor: b, transform: [{scale:c}]}}
                onPress={()=>{playSound(require("../asset/audio/btnClickSound.mp3"))}}
                onPressIn={()=>{c.setValue(0.8)}}
                onPressOut={()=>{c.setValue(1)}}
            >
                
            </LevelBtn> 
            {typeCheckRes !== "Animal" ? (
                <ModalMenuText>{d}</ModalMenuText>
            ):(
                <StarViewImage source={d} resizeMode="contain" />
            )}  
            </ModalDistractor>
        )
    }

// 뒤로가기 버튼
    const goBackBtnScale = useRef(new Animated.Value(1)).current
    const goBackPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart:() => {
                goBackBtnScale.setValue(0.8)
            },
            onPanResponderEnd:()=>{
                goBack()
                goBackBtnScale.setValue(1)
            }            
        })
    ).current

// mainScreenRender를 false로 만들면 실행되는 리렌더 함수(clearTimeout해준다)
// mainScreenRender?  메인컴포넌트를 출력하기위한 state
    const rerenderTimeout = useRef(null); 
    useEffect(()=>{
        rerenderTimeout.current = setTimeout(() => {setMainScreenRender(true)},50)
        return() => clearTimeout(rerenderTimeout.current)
    },[mainScreenRender])

    // 받은 props를 기반으로 cardSelector state를 변경하는 함수 -> mainScreenRender를 false로 바꿔서 위의 코드를 실행한다
    const cardCheck = (e) => {
        setMainScreenRender(false);
        setCardSelector(e);
    }

    //자식컴포넌트로부터 값을 받아서 state를 변경하기 위해 props로 넘길 함수
    const getData = (cardSelector) => {
        setCardSelector(cardSelector)
    }

    const goBack = () => {
        navigation.navigate('Menu')
    }

    function playSound(sound){
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((error)=>{});
    }

    const [userEmail, setUserEmail] = useState(auth()._user.email); 

    const [paymentMember, setPaymentMember] = useState(false);
    const PaymentUserCollection = firestore().collection('PaymentUsers');

    const readPaymentUserDB = async() =>{
        const readDBsnapshot = await PaymentUserCollection.get();
        readDBsnapshot.forEach(value=> (value.data().email == userEmail ? setPaymentMember(true):(null)))
    }
    useEffect(()=>{
        readPaymentUserDB()
    },[])
    
    return(    
        <>
        <Shell>
            {/* {paymentMember == false && (
                <> */}
                <BannerShell>
                    <BannerAds />
                </BannerShell>
                {/* </>
            )} */}
            <TopContainer>
            <Top>
                {/* 뒤로가기 버튼 */}
                <GoBack 
                    {...goBackPan.panHandlers} 
                    style={{transform: [{scale:goBackBtnScale}]}}
                    onPress={()=>{playSound(require("../asset/audio/btnClickSound2.mp3"))}} 
                >
                    <GoBackBtnImage source={require("../asset/images/goBack1.png")} />
                </GoBack>
                
                {/* 상단네비게이션 가운데 레벨표시하는 부분 */}
                <Star onPress={()=>{playSound(require("../asset/audio/btnClickSound2.mp3")), menuModalIndex.setValue(3)}}>
                    {typeCheckRes == "Animal" && (
                    <>
                        {(()=>{
                            if(cardSelector === "word1LV") return <StarViewImage1 source={require("../asset/images/Star1.png")} resizeMode="contain" />
                            else if(cardSelector=="word2LV") return <StarViewImage1 source={require("../asset/images/Star2.png")} resizeMode="contain" />
                            else if(cardSelector=="word3LV") return <StarViewImage1 source={require("../asset/images/Star3.png")} resizeMode="contain" />
                            else if(cardSelector==undefined){ return setCardSelector('word1LV')
                            } else {
                                return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>
                        }})()}
                    </>
                    )}
                    {typeCheckRes == "Ganada" && (
                        <>
                            {(()=>{
                            if(cardSelector === "Consonant") {return <MenuText>자 음</MenuText>}
                            else if(cardSelector=="Vowel") {return <MenuText>모 음</MenuText>}
                            else if(cardSelector==undefined){ return setCardSelector('Consonant')}
                        })()}
                        </>
                    )}
                    {typeCheckRes == "Language" && (
                        <>
                            {(()=>{
                                if(cardSelector === "Alphabet") {return <MenuText>알파벳</MenuText>}
                                else if(cardSelector==undefined){ return setCardSelector('Alphabet')}
                            })()}
                        </>
                    )}
                    {typeCheckRes == "Number" && (
                        <>
                            {(()=>{
                                if(cardSelector === undefined){return <MenuText>0~100</MenuText>}
                                else if(cardSelector === "All") {return <MenuText>0~100</MenuText>}
                                else{return <MenuText>{cardSelector}</MenuText>}
                            })()}
                        </>
                    )}
                </Star>
                {/* 메뉴 버튼 */}
                <Menu 
                    style={{transform: [{scale:menuBtnScale}]}}
                    onPress={()=>{playSound(require("../asset/audio/btnClickSound2.mp3"))}}
                    onPressIn={()=>{menuBtnScale.setValue(0.8), menuModalIndex.setValue(3)}}
                    onPressOut={()=>{menuBtnScale.setValue(1)}}
                >
                    <MenuBtnImage source={require("../asset/images/MenuBar.png")} />
                </Menu>

            </Top>
            </TopContainer>
            {/* 카드가 출력되는 부분은 CardDefault 컴포넌트를 불러와서 사용함 */}
            {mainScreenRender && (<>
                {loading ? (
                    <ActivityIndicator color={"white"} style={{flex:1}} />
                ):(
                    <Main>
                        {(()=>{ return (
                            <WordCardLevel level={cardSelector} getData={getData} type={type} />
                        )})()}
                    </Main>
                )}
            </>)}
            {/* 메뉴버튼 터치시 출력되는 모달 */}
            <MenuModalBg 
            style={{ zIndex: menuModalIndex, opacity: menuModalIndex}}
            onPressOut={() =>  {menuModalIndex.setValue(0),playSound(require("../asset/audio/btnClickSound2.mp3"))}}
            />
            <MenuModalContainer style={{zIndex: menuModalIndex, opacity: menuModalIndex}}>
                
                {typeCheckRes == "Number" ? (
                    <MenuModalScrollView contentContainerStyle = {{alignItems:"center"}}>
                        {/* {paymentMember == false && (
                            <ModalDistractor 
                                style={{backgroundColor: colors.REALDARKGRAY}}
                            >
                                <PaymentBtn  onPress={()=>{navigation.navigate("PaymentTest")}}></PaymentBtn>
                                <PaymentText>광고제거하기</PaymentText>
                            </ModalDistractor>
                        )} */}
                        {distractorFunc(numberAllPan.panHandlers, colors.REDORANGE, level1Scale, "0~100")}
                        {distractorFunc(number0Pan.panHandlers, colors.WhaleBG, level2Scale, "0~10")}
                        {distractorFunc(number1Pan.panHandlers, colors.DARKOLIVE, level3Scale, "11~20")}
                        {distractorFunc(number2Pan.panHandlers, colors.PURPLE, level4Scale, "21~30")}
                        {distractorFunc(number3Pan.panHandlers, colors.NAVY, level5Scale, "31~40")}
                        {distractorFunc(number4Pan.panHandlers, colors.GREEN, level6Scale, "41~50")}
                        {distractorFunc(number5Pan.panHandlers, colors.PASTELORANGE, level7Scale, "51~60")}
                        {distractorFunc(number6Pan.panHandlers, colors.CUSTOMPINK, level8Scale, "61~70")}
                        {distractorFunc(number7Pan.panHandlers, colors.LIGHTSEABLUE, level9Scale, "71~80")}
                        {distractorFunc(number8Pan.panHandlers, colors.REDBRICK, level10Scale, "81~90")}
                        {distractorFunc(number9Pan.panHandlers, colors.GREEN, level11Scale, "91~100")}
                    </MenuModalScrollView>
                ):(
                    <MenuModal>
                        {/* {paymentMember == false && (
                            <ModalDistractor
                                style={{backgroundColor: colors.REALDARKGRAY}}
                            >
                                <PaymentBtn  onPress={()=>{navigation.navigate("PaymentTest")}}></PaymentBtn>
                                <PaymentText>광고제거하기</PaymentText>
                            </ModalDistractor>
                        )} */}
                        {typeCheckRes == "Animal" && (
                        <>
                            {distractorFunc(animal1Pan.panHandlers,colors.BLUE,level1Scale,require("../asset/images/Star1.png"))}
                            {distractorFunc(animal2Pan.panHandlers,colors.REDORANGE,level2Scale,require("../asset/images/Star2.png"))}
                            {distractorFunc(animal3Pan.panHandlers,colors.DARKOLIVE,level3Scale,require("../asset/images/Star3.png"))}
                        </>
                        )}
                        {typeCheckRes == "Ganada" && (
                        <>
                            {distractorFunc(ganada1Pan.panHandlers, colors.LIGHTPINK, level1Scale, "자 음")}
                            {distractorFunc(ganada2Pan.panHandlers, colors.LIGHTNAVY, level2Scale, "모 음")}
                        </>
                        )}
                        {typeCheckRes == "Language" && (
                        <>
                            {distractorFunc(alphabetPan.panHandlers, colors.LIGHTPINK, level1Scale, "알파벳")}
                        </>
                        )}
                    </MenuModal>
                )}
            </MenuModalContainer>
            {/* 저작권정보 */}
            <CopyrightBtn onPress={()=>setCopyrightModal(true)}>
                <MaterialIcons name="copyright" size={22} color="lightgray" />
            </CopyrightBtn>
            {copyrightModal && (
                <CopyrightShell>
                    <CopyrightHeader>
                        <CopyrightCloseBtn onPress={()=>setCopyrightModal(false)}>
                            <Ionicons name="close-circle-outline" size={22} color="gray" />
                        </CopyrightCloseBtn>
                    </CopyrightHeader>
                    <Copyright />
                </CopyrightShell>
            )}
        </Shell>
        </>
    )
}
export default CardShell;