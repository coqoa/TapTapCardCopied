import React, {useState, useEffect} from "react";
import { Text, View, ActivityIndicator, FlatList, ScrollView,Dimensions } from "react-native";
import styled from "styled-components";
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordCardArray } from "../asset/data/WordCardArray";
import { colors } from "../component/color";
import { WordCard1LV, WordCard2LV, WordCard3LV } from "../component/CardDefault";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

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
    height: 80px;
    flex-direction: row;
`
const GoBack = styled.View`
    width: 60px;
    align-items: center;
    justify-content: center;
`
const GoBackBtn = styled.Pressable`
    width: 60px;
    height: 60px;
`
const GoBackBtnImage = styled.Image`
    width: 100%;
    height: 100%;
`
const Star = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
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
const Menu = styled.View`
    width: 60px;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red ; */
`
const MenuBtn = styled.Pressable`
    top: 5px;
    width: 65px;
    height: 65px;
`
const MenuBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const MenuModalBg = styled.Pressable``

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
`


const WordPlay = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    
    const [cardSelector, setCardSelector] = useState();
    const [modalToggle, setModalToggle] = useState(false);
    
    const cardCheck = (e) => {
        setCardSelector(e);
        setModalToggle(!modalToggle);
        console.log(e);
    }

    const modalTogglePress = () => setModalToggle(!modalToggle)
    useEffect(() => {
        // ((cardSelector == undefined) ? setCardSelector("word1LV") :null)
        if(cardSelector == undefined) {
            // setCardSelector("word1LV")
            setCardSelector("word2LV")
        } 
        setLoading(false)
    }, []);
    // console.log(cardSelector) // word1LV

    // function CardFunction() {

    //     return{
    //         if(cardSelector=="word1LV"){
    //             <WordCard1LV />
    //         }else if(cardSelector=="word2LV"){
    //             <WordCard2LV />
    //         }else if(cardSelector=="word3LV"){
    //             <WordCard3LV />
    //         }else{
    //             <WordCard1LV />
    //         }
    //     }
        
    // }
    return( 
        loading ? (
            <Loader>
                <ActivityIndicator />
            </Loader>
        ) : (
            <Shell>
            <Top>
                <GoBack>
                    <GoBackBtn onPress={() => navigation.goBack()}>
                        <GoBackBtnImage source={require("../asset/images/goBack1.png")}></GoBackBtnImage>
                    </GoBackBtn>
                </GoBack>
                <Star>
                    <StarView>
                        {(()=>{
                            if(cardSelector === "word1LV") return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>;
                            else if(cardSelector=="word2LV") return <StarViewImage source={require("../asset/images/Star2.png")}></StarViewImage>;
                            else if(cardSelector=="word3LV") return <StarViewImage source={require("../asset/images/Star3.png")}></StarViewImage>;
                            else return <StarViewImage source={require("../asset/images/Star1.png")}></StarViewImage>
                        })()}
                        {/* <StarViewImage source={require("../asset/images/Star.png")}></StarViewImage> */}
                    </StarView>
                </Star>
                <Menu>
                    <MenuBtn onPress={() => modalTogglePress()}>
                        <MenuBtnImage source={require("../asset/images/MenuBar.png")}></MenuBtnImage>
                    </MenuBtn>
                </Menu>

            </Top>
            <Main>
                {/* {CardFunction()} */}
                {(()=>{
                    if(cardSelector === "word1LV") return <WordCard1LV />;
                    else if(cardSelector=="word2LV") return <WordCard2LV />;
                    else if(cardSelector=="word3LV") return <WordCard3LV />;
                    else return <WordCard1LV />
                    // return <WordCard1LV />
                })()}
                {/* {cardSelector=="word1LV" ? <WordCard1LV /> : null}
                {cardSelector=="word2LV" ? <WordCard2LV /> : null}
                {cardSelector=="word3LV" ? <WordCard3LV /> : null} */}
            </Main>
            {/* 모달창 178~180라인 왜 안되는지 확인... > 해결 */}
            {modalToggle == true ? (
                <MenuModalBg 
                style={{position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT, backgroundColor:"rgba(0,0,0,0)"}} 
                onPress={()=>{
                    modalTogglePress()
                }}>
                    <MenuModalContainer>
                        <MenuModal>
                            {/* <LevelBtn onPress={()=>{setCardSelector("word1Lv")}}><Text>1레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{setCardSelector("word2Lv")}}><Text>2레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{setCardSelector("word3Lv")}}><Text>3레벨</Text></LevelBtn> */}
                            <LevelBtn onPress={()=>{cardCheck("word1LV")}}><Text>1레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word2LV")}}><Text>2레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>{cardCheck("word3LV")}}><Text>3레벨</Text></LevelBtn>
                            {/* <LevelBtn onPress={()=>console.log('1레벨')}><Text>1레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>console.log('2레벨')}><Text>2레벨</Text></LevelBtn>
                            <LevelBtn onPress={()=>console.log('3레벨')}><Text>3레벨</Text></LevelBtn> */}
                        </MenuModal>
                    </MenuModalContainer>
                </MenuModalBg>
            ) : null
            }
            </Shell>
        )
    )
}
export default WordPlay;