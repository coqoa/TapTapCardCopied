import React, {useState, useEffect} from "react";
import { Text, View, ActivityIndicator, FlatList, ScrollView,Dimensions,Pressable } from "react-native";
import styled from "styled-components";
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "../component/color";
import { WordCard1LV, WordCard2LV, WordCard3LV } from "../component/CardDefault";
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
    /* border: 1px solid red; */
    background-color: transparent;
    z-index: 30;
`
const GoBack = styled.View`
    position: absolute;
    width: 65px;
    height: 65px;
    /* top: 8px; */
    align-items: center;
    justify-content: center;
    /* border: 1px solid red ; */
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
    /* top: 8px; */
    right: 0px;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red ; */
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
const Main = styled.View`
    flex: 5;
    flex-direction: row;
    /* border: 1px solid red ; */
    z-index: 10;
`


// const WordPlay = (props,{navigation}) => {
const WordPlay = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    
    const [cardSelector, setCardSelector] = useState("word1LV");
    const [modalToggle, setModalToggle] = useState(false);
    const [mainScreenRender, setMainScreenRender] = useState(true)
    
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

    const modalTogglePress = () => setModalToggle(!modalToggle)
    // useEffect(() => {
    //     // ((cardSelector == undefined) ? setCardSelector("word1LV") :null)
    //     if(cardSelector == undefined) {
    //         // setCardSelector("word1LV")
    //         setCardSelector("word1LV")
    //     } 
    //     setLoading(false)
    // }, []);

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
                        {/* <GoBackBtnImage source={require("../asset/images/goBackShadow.png")}></GoBackBtnImage> */}
                        <GoBackBtnImage source={require("../asset/images/goBack1.png")}></GoBackBtnImage>
                    </GoBackBtn>
                </GoBack>
                <Menu>
                    <MenuBtn onPress={() => modalTogglePress()}>
                        <MenuBtnImage source={require("../asset/images/MenuBar.png")}></MenuBtnImage>
                    </MenuBtn>
                </Menu>

            </Top>
            {mainScreenRender && (
            <Main>
                {(()=>{
                    return (
                    <WordCardLevel level={cardSelector} getData={getData} type={type} />
                    )
                })()}
                {/* <Pressable style={{hei}} onPress={()=>{cardCheck("word2LV")}}><Text>123</Text></Pressable> */}
            </Main>
            )}
            {modalToggle == true ? (
                <MenuModalBg 
                style={{position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT, backgroundColor:"rgba(0,0,0,0)"}} 
                onPress={()=>{
                    modalTogglePress()
                }}>
                    <MenuModalContainer>
                        <MenuModal>
                            <LevelBtn onPress={()=>{cardCheck("word1LV")}}><Text>1레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word2LV")}}><Text>2레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word3LV")}}><Text>3레벨</Text></LevelBtn>
                        </MenuModal>
                    </MenuModalContainer>
                </MenuModalBg>
            ) : null
            }
            </Shell>
        )
    // )
}
export default WordPlay;