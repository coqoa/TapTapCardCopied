import React,{useState} from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
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

    // const [WordModalToggle, SetWordModalToggle] = useState(false);
    // const WordModalTogglePress = () =>{
    //     SetWordModalToggle(!WordModalToggle)
    // }
    return(
    <Shell>
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBoxShell>
            <MenuBox onPress={() => navigation.navigate('WordPlay')}>
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
    </BG>
    </Shell>
    )
}
export default Menu;