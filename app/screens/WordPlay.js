import React, { useState, useEffect, useRef } from "react";
import {View, Text, Dimensions, PanResponder, Animated, Pressable } from "react-native";
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
    /* border: 1px solid green; */
`
const Top = styled.View`
    flex-direction: row;
    width: 80%;
    height: 55px;
    top: 20px;
    border-radius: 20px;
    align-items: center;
    z-index: 30;
    background-color: rgba(255,255,255,0.6);
    box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
`
const GoBack = styled.View`
    position: absolute;
    width: 35px;
    height: 35px;
    left: 5px;
    align-items: center;
    justify-content: center;
    z-index: 30;
    /* border: 1px solid black; */
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
    /* border: 1px solid gray; */
`
const StarViewImage1 = styled.ImageBackground`
    /* top: 2px; */
    width: 100%;
    height: 100%;
`


const Menu = styled.View`
    position: absolute;
    width: 55px;
    height: 55px;
    /* top: 3px; */
    right: 0px;
    align-items: center;
    justify-content: center;
    z-index: 30;
`
const MenuBtn = styled.Pressable`
    width: 100%;
    height: 100%;
`
const MenuBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

const MenuModalBg = styled.Pressable`
    z-index: 35;
    align-items: center;
    justify-content: center;
`
const MenuModalContainer = styled.View`
    position: absolute;
    top: 80px;
    /* right: 10px; */
    width: 200px;
    height: 200px;
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
const LevelBtn = styled.Pressable`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
    border-radius: 15px;
    /* background-color: rgba(255,255,255,0.8); */
    /* /* background-color: ${colors.BLUE}; */
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
`
const StarViewImage = styled.ImageBackground`
    width: 80%;
    height: 80%;
`
const Main = styled.View`
    flex: 1;
    flex-direction: row;
`


const WordPlay = ({route, navigation}) => {

    const [loading, setLoading] = useState(true);
    const [cardSelector, setCardSelector] = useState();
    const [modalToggle, setModalToggle] = useState(false);
    const [mainScreenRender, setMainScreenRender] = useState(false)
    
    // mainScreenRender를 false로 만들면 실행되는 리렌더코드(clearTimeout해준다)
    const rerenderTimeout = useRef(null); 
    useEffect(()=>{
        rerenderTimeout.current = setTimeout(() => {setMainScreenRender(true)},50)
        return() => clearTimeout(rerenderTimeout.current)
    },[mainScreenRender])


    const modalTogglePress = () => setModalToggle(!modalToggle)

    const cardCheck = (e) => {
        // console.log("e",e)
        setMainScreenRender(false);
        setCardSelector(e);
        // setMainScreenRender(true);
        // setTimeout(function(){
        //     setMainScreenRender(true)
        // },50)
        setModalToggle(!modalToggle);
    }
    //자식컴포넌트로부터 값을 받아서 state를 변경하기 위해 props로 넘길 함수
    const getData = (cardSelector) => {
        setCardSelector(cardSelector)
    }

    // Menu.js로부터 type을 받는다 (한글인지 영어인지) 그 후 type을 토대로 출력되는 코드들을 정해준다
    const type = route.params.type
    // console.log(type)

    const goBack = () => {
        navigation.goBack()
    }

    const playBtnSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
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
    // 버튼 애니메이션
    // 뒤로가기버튼
    const [goBackBtnAnimation, setGaBackBtnAnimation] = useState(1)
    const goBackScaleToggle = (e) =>{setGaBackBtnAnimation(e)}
    // 메뉴버튼
    const [menuBtnAnimation, setMenuBtnAnimation] = useState(1)
    const menuScaleToggle = (e) =>{setMenuBtnAnimation(e)}
    // 1레벨버튼
    const [level1Clicked, setLevel1Clicked] = useState(1)
    const level1Animated = (e) =>{setLevel1Clicked(e)}
    // 2레벨버튼
    const [level2Clicked, setLevel2Clicked] = useState(1)
    const level2Animated = (e) =>{setLevel2Clicked(e)}
    // 1레벨버튼
    const [level3Clicked, setLevel3Clicked] = useState(1)
    const level3Animated = (e) =>{setLevel3Clicked(e)}
    return( 
        // loading ? (
        //     <Loader>
        //         <ActivityIndicator />
        //     </Loader>
        // ) : (
            
            <Shell>
            <Top>
                <GoBack>
                    <GoBackBtn 
                        style={{transform: [{scale:goBackBtnAnimation}]}}
                        onPressIn={() => {ClickSound(), goBackScaleToggle(0.8)}}
                        onPressOut={() => {goBack(), goBackScaleToggle(1)}}
                    >
                        <GoBackBtnImage source={require("../asset/images/goBack1.png")}></GoBackBtnImage>
                    </GoBackBtn>
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
                <Menu>
                    <MenuBtn
                        style={{transform: [{scale:menuBtnAnimation}]}}
                        onPressIn={() => {ClickSound(), menuScaleToggle(0.8)}}
                        onPressOut={(e) => {modalTogglePress(), menuScaleToggle(1)}}
                        // style={{transform: [{scale:btnScale}]}}
                    >
                        <MenuBtnImage source={require("../asset/images/MenuBar.png")}></MenuBtnImage>
                    </MenuBtn>
                </Menu>

            </Top>
            {/* 카드를 출력되는 부분은 CardDefault 컴포넌트를 불러와서 사용함 */}
            {mainScreenRender && (
            <Main>
                {(()=>{ return ( <WordCardLevel level={cardSelector} getData={getData} type={type} /> )})()}
            </Main>
            )}
            {/* 햄버거바 터치시 출력되는 모달 */}
            {modalToggle && (
                <MenuModalBg 
                style={{position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT, backgroundColor:"rgba(0,0,0,0)"}} 
                onPress={()=>{modalTogglePress()}}>
                    <MenuModalContainer>
                        <MenuModal>
                            {/* 1레벨이 아닌 이미지가 출력되도록 바꿀예정 */}
                            <LevelBtn 
                                style={{
                                    backgroundColor: colors.BLUE,
                                    transform: [{scale:level1Clicked}]}}
                                onPressIn={() => {ClickSound(), level1Animated(0.8)}} 
                                onPressOut={()=>{cardCheck("word1LV"), level1Animated(1)}}
                            >
                                <StarViewImage source={require("../asset/images/Star1.png")} />
                            </LevelBtn>
                            <LevelBtn 
                                style={{
                                    backgroundColor: colors.REDORANGE,
                                    transform: [{scale:level2Clicked}]}}
                                onPressIn={() => {ClickSound(), level2Animated(0.8)}} 
                                onPressOut={()=>{cardCheck("word2LV"), level2Animated(1)}}
                            >
                                <StarViewImage source={require("../asset/images/Star2.png")} />
                            </LevelBtn>
                            <LevelBtn 
                                style={{
                                    backgroundColor: colors.DARKOLIVE,
                                    transform: [{scale:level3Clicked}]}}
                                onPressIn={() => {ClickSound(), level3Animated(0.8)}} 
                                onPressOut={()=>{cardCheck("word3LV"), level3Animated(1)}}
                            >
                                <StarViewImage source={require("../asset/images/Star3.png")} />
                            </LevelBtn>
                        </MenuModal>
                    </MenuModalContainer>
                </MenuModalBg>
            )}
            </Shell>
        )
}
export default WordPlay;