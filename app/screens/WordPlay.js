import React, { useState } from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components";
import { colors } from "../component/color";
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
    background-color: white;
    align-items: center;
`
const Top = styled.View`
    position: absolute;
    width: 100%;
    height: 80px;
    flex-direction: row;
    background-color: transparent;
    z-index: 30;
`
const GoBack = styled.View`
    position: absolute;
    width: 65px;
    height: 65px;
    align-items: center;
    justify-content: center;
`
const GoBackBtn = styled.Pressable`
    width: 100%;
    height: 100%;
`
const GoBackBtnImage = styled.Image`
    width: 100%;
    height: 100%;
`
const Menu = styled.View`
    position: absolute;
    width: 65px;
    height: 65px;
    right: 0px;
    align-items: center;
    justify-content: center;
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
    z-index: 15;
`
const MenuModalContainer = styled.View`
    position: absolute;
    top: 60px;
    right: 10px;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
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
    border-radius: 15px;
    background-color: ${colors.LIGHTBLUE};
    box-shadow: 0px 1px 3px ${colors.LIGHTBLUE};
`
const StarViewImage = styled.ImageBackground`
    width: 80%;
    height: 80%;
`
const Main = styled.View`
    flex: 5;
    flex-direction: row;
    z-index: 10;
`


const WordPlay = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    
    const [cardSelector, setCardSelector] = useState("word1LV");
    const [modalToggle, setModalToggle] = useState(false);
    const [mainScreenRender, setMainScreenRender] = useState(true)
    
    const modalTogglePress = () => setModalToggle(!modalToggle)

    const cardCheck = (e) => {
        setMainScreenRender(false);
        setCardSelector(e);
        setTimeout(function(){
            setMainScreenRender(true)
        },50)
        setModalToggle(!modalToggle);
    }
    //자식컴포넌트로부터 값을 받아서 state를 변경하기 위해 props로 넘길 함수
    const getData = (cardSelector) => {
        setCardSelector(cardSelector)
    }

    // Menu.js로부터 type을 받는다 (한글인지 영어인지) 그 후 type을 토대로 출력되는 코드들을 정해준다
    const type = route.params.type
    // console.log(type)
    
    return( 

        // loading ? (
        //     <Loader>
        //         <ActivityIndicator />
        //     </Loader>
        // ) : (
            
            <Shell>
            <Top>
                <GoBack>
                    <GoBackBtn onPress={() => navigation.goBack()}>
                        <GoBackBtnImage source={require("../asset/images/goBack1.png")}></GoBackBtnImage>
                    </GoBackBtn>
                </GoBack>
                <Menu>
                    <MenuBtn onPress={() => modalTogglePress()}>
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
                            <LevelBtn onPress={()=>{cardCheck("word1LV")}}><StarViewImage source={require("../asset/images/Star1.png")} /></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word2LV")}}><StarViewImage source={require("../asset/images/Star2.png")} /></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word3LV")}}><StarViewImage source={require("../asset/images/Star3.png")} /></LevelBtn>
                        </MenuModal>
                    </MenuModalContainer>
                </MenuModalBg>
            )}
            </Shell>
        )
}
export default WordPlay;