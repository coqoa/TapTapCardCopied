import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import Word from "./Word";

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
const Menu = ({navigation}) => {
    return(
    <Shell>
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBox onPress={() => navigation.navigate(Word)}>
            <MenuText>단어 놀이</MenuText>
        </MenuBox>
        <MenuBox>
            <MenuText>수학 놀이</MenuText>
        </MenuBox>
    </BG>
    </Shell>
    )
}
export default Menu;