import React, { useState, useEffect, useRef } from "react";
import {View, Dimensions, PanResponder, Animated, Pressable, TouchableOpacity, Text } from "react-native";
import { Audio } from 'expo-av';
import styled from "styled-components";
import { colors } from "../component/Color";
import { WordCardLevel } from "../component/CardDefault";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Shell = styled.View`
    flex: 1;
    background-color: ${colors.mainBgColor};
    align-items: center;
    padding: 10px 0px;
`
const Main = styled.View`
    flex: 10;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    z-index: 2;
`
const TopContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    z-index: 3;
    
`
const Top = styled.View`
    flex-direction: row;
    width: 80%;
    height: 100%;
    border-radius: 15px;
    align-items: center;
    z-index: 10;
    background-color: rgba(255,255,255,0.6);
`
const GoBack = styled(Animated.createAnimatedComponent(View))`
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

const Star = styled.View`
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
    background-color: rgba(0,0,0,0.1);
    align-items: center;
    justify-content: center;
`
const MenuModalContainer = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    top: 10%;
    width: 60%;
    height: 25%;
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
const LevelBtn = styled(Animated.createAnimatedComponent(Pressable))`
    width: 60%;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
    border-radius: 15px;
    `
const ModalMenuText =styled.Text`
    font-size: 30px;
    font-family: "SDChild";
    color: white;
    text-align: center;
`
const StarViewImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

const WordPlay = ({route, navigation}) => {

    const [loading, setLoading] = useState(true);
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
                 menuModalIndex.setValue(0)
                    return cardCheck(a)
                }            
            })
        ).current
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
    //가나다 메뉴 모달 선택지 함수
    const ganadaDistractor = (a,b,c,d) => {
        return (
            <LevelBtn 
                {...a}
                style={{backgroundColor: b, transform: [{scale:c}]}}
                onPressIn={()=>{c.setValue(0.8),ClickSound()}}
                onPressOut={()=>c.setValue(1)}
            >
                <ModalMenuText>{d}</ModalMenuText>
            </LevelBtn>
        )
    }
    //숫자 메뉴 모달 선택지 함수
    const numberDistractor = (a,b,c,d) => {
        return (
            <LevelBtn 
                {...a}
                style={{backgroundColor: b, transform: [{scale:c}]}}
                onPressIn={()=>{c.setValue(0.8),ClickSound()}}
                onPressOut={()=>c.setValue(1)}
            >
            <ModalMenuText>{d}</ModalMenuText>
            </LevelBtn>   
        )
    }
    // 동물 메뉴 모달 선택지
    const animalDistractor = (a,b,c,d) => {
        return (
            <LevelBtn 
                {...a}
                style={{backgroundColor: b, transform: [{scale:c}], 
                    shadowColor: "black",
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {height: 2,width: 0,},
                    elevation:5
                }}
                onPressIn={()=>{c.setValue(0.8),ClickSound()}}
                onPressOut={()=>c.setValue(1)}
            >
            <StarViewImage source={d} resizeMode="contain" />
            </LevelBtn>
        )
    }

    // 뒤로가기 버튼
    const goBackBtnScale = useRef(new Animated.Value(1)).current
    const goBackPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                ClickSound()
                goBackBtnScale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
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

    // 받은props를 기반으로 cardSelector state를 변경하는 함수 -> mainScreenRender를 false로 바꿔서 위의 코드를 실행한다
    const cardCheck = (e) => {
        setMainScreenRender(false);
        setCardSelector(e);
    }

    //자식컴포넌트로부터 값을 받아서 state를 변경하기 위해 props로 넘길 함수
    const getData = (cardSelector) => {
        setCardSelector(cardSelector)
    }

    const goBack = () => {
        navigation.goBack()
    }

    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
        } catch (error) {
        }
    }
    
    return(    
        <Shell>
            <TopContainer>
            <Top>
                {/* 뒤로가기 버튼 */}
                <GoBack 
                    {...goBackPan.panHandlers} 
                    style={{transform: [{scale:goBackBtnScale}]}} 
                >
                    <GoBackBtnImage source={require("../asset/images/goBack1.png")} />
                </GoBack>
                {/* 상단네비게이션 가운데 레벨표시하는 부분 */}
                <Star>
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
                    onPressIn={()=>{menuBtnScale.setValue(0.8), ClickSound(), menuModalIndex.setValue(2)}}
                    onPressOut={()=>{menuBtnScale.setValue(1)}}
                >
                    <MenuBtnImage source={require("../asset/images/MenuBar.png")} />
                </Menu>

            </Top>
            </TopContainer>

            {/* 카드가 출력되는 부분은 CardDefault 컴포넌트를 불러와서 사용함 */}
            {mainScreenRender && (
            <Main>
                {(()=>{ return ( <WordCardLevel level={cardSelector} getData={getData} type={type} /> )})()}
            </Main>
            )}
            
            {/* 메뉴버튼 터치시 출력되는 모달 */}
            <MenuModalBg 
            // style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT,transform: [{scale menuModalIndex}]}}
            style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT, zIndex: menuModalIndex, opacity: menuModalIndex}}
            onPressOut={() =>  menuModalIndex.setValue(0)}
            />
            <MenuModalContainer style={{zIndex: menuModalIndex, opacity: menuModalIndex}}>
            {typeCheckRes == "Number" ? (
                <MenuModalScrollView contentContainerStyle = {{alignItems:"center"}}>
                    {numberDistractor(numberAllPan.panHandlers, colors.REDORANGE, level1Scale, "0~100")}
                    {numberDistractor(number0Pan.panHandlers, colors.WhaleBG, level2Scale, "0~10")}
                    {numberDistractor(number1Pan.panHandlers, colors.DARKOLIVE, level3Scale, "11~20")}
                    {numberDistractor(number2Pan.panHandlers, colors.PURPLE, level4Scale, "21~30")}
                    {numberDistractor(number3Pan.panHandlers, colors.NAVY, level5Scale, "31~40")}
                    {numberDistractor(number4Pan.panHandlers, colors.GREEN, level6Scale, "41~50")}
                    {numberDistractor(number5Pan.panHandlers, colors.PASTELORANGE, level7Scale, "51~60")}
                    {numberDistractor(number6Pan.panHandlers, colors.CUSTOMPINK, level8Scale, "61~70")}
                    {numberDistractor(number7Pan.panHandlers, colors.LIGHTSEABLUE, level9Scale, "71~80")}
                    {numberDistractor(number8Pan.panHandlers, colors.REDBRICK, level10Scale, "81~90")}
                    {numberDistractor(number9Pan.panHandlers, colors.GREEN, level11Scale, "91~100")}
                </MenuModalScrollView>
            ):(
                <MenuModal>
                    {typeCheckRes == "Animal" && (
                    <>
                        {animalDistractor(animal1Pan.panHandlers,colors.BLUE,level1Scale,require("../asset/images/Star1.png"))}
                        {animalDistractor(animal2Pan.panHandlers,colors.REDORANGE,level2Scale,require("../asset/images/Star2.png"))}
                        {animalDistractor(animal3Pan.panHandlers,colors.DARKOLIVE,level3Scale,require("../asset/images/Star3.png"))}
                    </>
                    )}
                    {typeCheckRes == "Ganada" && (
                    <>
                        {ganadaDistractor(ganada1Pan.panHandlers, colors.LIGHTPINK, level1Scale, "자 음")}
                        {ganadaDistractor(ganada2Pan.panHandlers, colors.LIGHTNAVY, level2Scale, "모 음")}
                    </>
                    )}
                    {typeCheckRes == "Language" && (
                    <>
                        {ganadaDistractor(alphabetPan.panHandlers, colors.LIGHTPINK, level1Scale, "알파벳")}
                    </>
                    )}
                </MenuModal>
            )}
            </MenuModalContainer>
        </Shell>
    )
}
export default WordPlay;