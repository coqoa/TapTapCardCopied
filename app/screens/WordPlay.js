import React, { useState, useEffect, useRef } from "react";
import {View, Text, Dimensions, PanResponder, Animated, Pressable, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import styled from "styled-components";
import { colors } from "../component/color";
import { WordCardLevel } from "../component/CardDefault";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// const Loader = styled.View`
//     flex: 1;
//     justify-content: center;
//     align-items: center;
// `;
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
`
const TopContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    
`
const Top = styled.View`
    flex-direction: row;
    width: 80%;
    height: 100%;
    border-radius: 15px;
    align-items: center;
    z-index: 30;
    background-color: rgba(255,255,255,0.6);
    box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
`
const GoBack = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 35px;
    height: 35px;
    left: 5px;
    align-items: center;
    justify-content: center;
    z-index: 30;
`
const GoBackBtn = styled.Pressable`
    width: 100%;
    height: 100%;
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

const Menu =  styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 55px;
    height: 55px;
    /* top: 3px; */
    right: 0px;
    align-items: center;
    justify-content: center;
    z-index: 30;
`
const MenuBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

const MenuModalBg = styled(Animated.createAnimatedComponent(TouchableOpacity))`
    z-index: 35;
    align-items: center;
    justify-content: center;
`
const MenuModalContainer = styled.View`
    position: absolute;
    /* bottom: 14%; */
    /* right: 10px; */
    top: 10%;
    width: 60%;
    height: 25%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.9);
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
`
const MenuModal = styled.View`
    width: 90%;
    height: 90%;
`
const LevelBtn = styled(Animated.createAnimatedComponent(View))`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 2px;
    padding: 5px;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
`
const StarViewImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const GoBackModalBg = styled.TouchableOpacity`
    z-index: 35;
    align-items: center;
    justify-content: center;
`
const GoBackModalContainer = styled.View`
    position: absolute;
    bottom: 14%;
    width: 55%;
    height: 25%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.9);
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
`
const GoBackModal = styled.View`
    width: 95%;
    height: 90%;
    align-items: center;
    justify-content: center;
`
const ModalBtn = styled(Animated.createAnimatedComponent(View))`
    flex: 1;
    width: 90%;
    height: 90%;
    align-items: center;
    justify-content: center;
    margin: 5px;
    border-radius: 15px;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.3); 
    background-color: rgba(255,255,255, 0.9);
    `
const GoBackText = styled.Text`
    font-size: 25px;
    font-family: 'SDChild';
    color : white;
`


const WordPlay = ({route, navigation}) => {

    const [loading, setLoading] = useState(true);
    const [cardSelector, setCardSelector] = useState();
    const [mainScreenRender, setMainScreenRender] = useState(false)
    
    //버튼애니메이션 & 상호작용
    //햄버거 바 버튼
    const menuBtnScale = useRef(new Animated.Value(1)).current
    const menuModalScale = useRef(new Animated.Value(0)).current
    const menuPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart:() => {
                if(JSON.stringify(menuModalScale) == 0){menuModalScale.setValue(1)}
                else{menuModalScale.setValue(0)}
                ClickSound()
            },
            onPanResponderGrant:() => {
                menuBtnScale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                menuBtnScale.setValue(1)
            }            
        })
    ).current
    // 1레벨선택버튼
    const level1Scale = useRef(new Animated.Value(1)).current
    const level1Pan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                ClickSound()
                level1Scale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                cardCheck("word1LV")
                menuModalScale.setValue(0)
                level1Scale.setValue(1)
            }            
        })
    ).current
    // 2레벨선택버튼
    const level2Scale = useRef(new Animated.Value(1)).current
    const level2Pan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                ClickSound()
                level2Scale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                cardCheck("word2LV")
                menuModalScale.setValue(0)
                level2Scale.setValue(1)
            }            
        })
    ).current
    // 3레벨선택버튼
    const level3Scale = useRef(new Animated.Value(1)).current
    const level3Pan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                ClickSound()
                level3Scale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                cardCheck("word3LV")
                menuModalScale.setValue(0)
                level3Scale.setValue(1)
            }            
        })
    ).current

    // 뒤로가기 버튼
    const goBackBtnScale = useRef(new Animated.Value(1)).current
    const goBackModalScale = useRef(new Animated.Value(0)).current
    const goBackPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart:() => {
                if(JSON.stringify(goBackModalScale) == 0){goBackModalScale.setValue(1)}
                else{goBackModalScale.setValue(0)}
            },
            onPanResponderGrant:() => {
                ClickSound()
                goBackBtnScale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                goBackBtnScale.setValue(1)
            }            
        })
    ).current
    // 뒤로가기선택지
    const goBackDistractorScale = useRef(new Animated.Value(1)).current
    const goBackDistractorPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                ClickSound()
                goBackDistractorScale.setValue(0.8)
            },
            onPanResponderRelease:()=>{
                goBackDistractorScale.setValue(1)
                goBack()
                goBackModalScale.setValue(0)
            }            
        })
    ).current
    //그냥있기 선택지
    const stayDistractorScale = useRef(new Animated.Value(1)).current
    const stayDistractorPan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant:() => {
                stayDistractorScale.setValue(0.8)
                ClickSound()
            },
            onPanResponderRelease:()=>{
                stayDistractorScale.setValue(1)
                goBackModalScale.setValue(0)
            }            
        })
    ).current


    // mainScreenRender를 false로 만들면 실행되는 리렌더코드(clearTimeout해준다)
    const rerenderTimeout = useRef(null); 
    useEffect(()=>{
        rerenderTimeout.current = setTimeout(() => {setMainScreenRender(true)},50)
        return() => clearTimeout(rerenderTimeout.current)
    },[mainScreenRender])
    // 받은props를 기반으로 cardSelector state를 변경, -> mainScreenRender를 false로 바꿔서 위의 코드를 실행한다
    const cardCheck = (e) => {
        setMainScreenRender(false);
        setCardSelector(e);
    }
    //자식컴포넌트로부터 값을 받아서 state를 변경하기 위해 props로 넘길 함수
    const getData = (cardSelector) => {
        setCardSelector(cardSelector)
    }

    // Menu.js로부터 type을 받는다 (한글인지 영어인지) 그 후 type을 토대로 출력되는 코드들을 정해준다
    const type = route.params.type

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
        // loading ? (
        //     <Loader>
        //         <ActivityIndicator />
        //     </Loader>
        // ) : (
            
            <Shell>
                {/* 카드를 출력되는 부분은 CardDefault 컴포넌트를 불러와서 사용함 */}
            
            <TopContainer>
            <Top>
                <GoBack 
                    {...goBackPan.panHandlers} 
                    style={{transform: [{scale:goBackBtnScale}]}} 
                >
                    <GoBackBtnImage source={require("../asset/images/goBack1.png")} />
                </GoBack>
                <Star>
                    {(()=>{
                        if(cardSelector === "word1LV") return <StarViewImage1 source={require("../asset/images/Star1.png")} resizeMode="contain" />
                        else if(cardSelector=="word2LV") return <StarViewImage1 source={require("../asset/images/Star2.png")} resizeMode="contain" />
                        else if(cardSelector=="word3LV") return <StarViewImage1 source={require("../asset/images/Star3.png")} resizeMode="contain" />
                        else if(cardSelector==undefined){ return setCardSelector('word3LV')
                        } else {
                            return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>
                        }})()}
                </Star>
                <Menu 
                    {...menuPan.panHandlers} 
                    style={{transform: [{scale:menuBtnScale}]}} 
                >
                    <MenuBtnImage source={require("../asset/images/MenuBar.png")} />
                </Menu>

            </Top>
            </TopContainer>
            {mainScreenRender && (
            <Main>
                {(()=>{ return ( <WordCardLevel level={cardSelector} getData={getData} type={type} /> )})()}
            </Main>
            )}
            {/* 햄버거바 터치시 출력되는 모달 */}
            <MenuModalBg 
            style={{
                position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT, backgroundColor:"rgba(0,0,0,0)",
                transform: [{scale:menuModalScale}]
            }}
            onPress={() => menuModalScale.setValue(0)}
            >
                <MenuModalContainer>
                    <MenuModal>
                        {/* 1레벨이 아닌 이미지가 출력되도록 바꿀예정 */}
                        <LevelBtn 
                            {...level1Pan.panHandlers}
                            style={{
                                backgroundColor: colors.BLUE,
                                transform: [{scale:level1Scale}]}}
                        >
                            <StarViewImage source={require("../asset/images/Star1.png")} resizeMode="contain" />
                        </LevelBtn>
                        <LevelBtn 
                            {...level2Pan.panHandlers}
                            style={{
                                backgroundColor: colors.REDORANGE,
                                transform: [{scale:level2Scale}]}}
                        >
                            <StarViewImage source={require("../asset/images/Star2.png")} resizeMode="contain" />
                        </LevelBtn>
                        <LevelBtn 
                            {...level3Pan.panHandlers}
                            style={{
                                backgroundColor: colors.DARKOLIVE,
                                transform: [{scale:level3Scale}]}}
                        >
                            <StarViewImage source={require("../asset/images/Star3.png")} resizeMode="contain" />
                        </LevelBtn>
                    </MenuModal>
                </MenuModalContainer>
            </MenuModalBg>

            <GoBackModalBg 
            style={{
                position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT, backgroundColor:"rgba(0,0,0,0)",
                transform:[{scale:goBackModalScale}]
            }} 
            onPress={()=>goBackModalScale.setValue(0)}
            >
                <GoBackModalContainer>
                    <GoBackModal>
                        <ModalBtn 
                        {...goBackDistractorPan.panHandlers}
                        style={{
                            backgroundColor:colors.BLUE, 
                            transform:[{scale:goBackDistractorScale}]
                            }}
                        >
                            <GoBackText>메뉴로 가실?</GoBackText>
                        </ModalBtn>
                        <ModalBtn 
                        {...stayDistractorPan.panHandlers}
                        style={{
                            backgroundColor:colors.REDORANGE, 
                            transform:[{scale:stayDistractorScale}]
                            }}
                        >
                            <GoBackText>그냥 여기있으실?</GoBackText>
                        </ModalBtn>
                    </GoBackModal>
                </GoBackModalContainer>
            </GoBackModalBg>
            
            </Shell>
        )
}
export default WordPlay;