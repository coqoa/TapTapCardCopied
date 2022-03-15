import React,{useState, useEffect} from "react";
import * as Font from "expo-font"
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors } from "../component/color";
import WordPlay from "./WordPlay";

const Shell = styled.View`
    flex: 1;
    `
const BG = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
const MenuBoxShell = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* border:1px solid red; */
`
const MenuBox = styled.TouchableOpacity`
    background-color: white;
    width: 250px;
    height: 80px;
    margin: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2) ;
`
const MenuText = styled.Text`
    font-size: 35px;
    font-family: 'SDChild';
`

const WordSelectModalBG = styled.Pressable`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    /* background-color: rgba(0,0,0,0.1); */
`
const WordSelectContainer = styled.View`
    width: 250px;
    height: 270px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
    align-items: center;
    justify-content: center;
`
const WordKorBtn = styled.TouchableOpacity`
    width: 200px;
    height: 60px;
    border-radius: 20px;
    background-color: ${colors.BLUE};
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);

`
const WordEngBtn = styled(WordKorBtn)`
    background-color: ${colors.REDORANGE};
`
const WordSelectTitle = styled.View`
    width: 200px;
    height: 60px;
    align-items: center;
    justify-content: center;
    font-family: 'SDChild';
`
const WordSelectText = styled.Text`
    font-size: 25px;
    font-weight: 800;
    color: white;
    font-family: 'SDChild';
`
const WordSelectTitleText = styled(WordSelectText)`
    font-size: 40px;
    color: ${colors.DARKGRAY};
    margin-bottom: 10px;
`
// const WordModalShell = styled.View`
//     /* flex: 1; */
//     width: 250px;
//     height: 200px;
//     position: absolute ;
//     border:1px solid gray;
//     z-index:1000 ;
// `
// const WordModalBtn = styled.Pressable`
//     flex: 1;
//     border: 1px solid green;
// `
// const WordModalText = styled.Text`
//     flex: 1;
//     background-color:red ;

// `
const Menu = ({navigation}) => {
    const [wordSelectModal, setWordSelectModal] = useState(false)
    // useEffect(async() => {
    //     await Font.loadAsync({
    //         "SDChild": require("../asset/fonts/SDChildfundkorea.otf")
    //     })
    // }, [])

    // const [WordModalToggle, SetWordModalToggle] = useState(false);
    // const WordModalTogglePress = () =>{
    //     SetWordModalToggle(!WordModalToggle)
    // }
    
    const BtnClick = (e) => {
        setWordSelectModal(false)
        navigation.navigate('WordPlay',{type:e}) 
    }
    return(
    <Shell>
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBoxShell>
            <MenuBox onPress={()=>setWordSelectModal(true)}>
            {/* <MenuBox onPress={() => navigation.navigate('WordPlay')}> */}
            {/* <MenuBox onPress={() => WordModalTogglePress()}> */}
                <MenuText>단어 놀이</MenuText>
            </MenuBox>
            {/* {WordModalToggle ? (
            <WordModalShell>
                <WordModalBtn onPress={()=>WordModalTogglePress()}>
                    <WordModalText>Text말고 별이미지로 바꾸자</WordModalText>
                </WordModalBtn>
            </WordModalShell>
            ):null} */}
            <MenuBox>
                <MenuText>수학 놀이</MenuText>
            </MenuBox>
            
        </MenuBoxShell>
        {wordSelectModal && (
        <WordSelectModalBG onPress={()=>setWordSelectModal(false)}>
            <WordSelectContainer>
                <WordSelectTitle><WordSelectTitleText>단어놀이</WordSelectTitleText></WordSelectTitle>
                <WordKorBtn onPress={() => BtnClick("KOR")}><WordSelectText>한글</WordSelectText></WordKorBtn>
                <WordEngBtn onPress={() => BtnClick("ENG")}><WordSelectText>영어</WordSelectText></WordEngBtn>
            </WordSelectContainer>
        </WordSelectModalBG>
        )}
        
    </BG>
    </Shell>
    )
}
export default Menu;