import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const Shell = styled.View`
    flex: 1;
    background-color: white;
    `

const Top = styled.View`
    flex: 1;
    flex-direction: row;
`
const GoBack = styled.View`
    flex: 1;
    /* background-color: lightskyblue; */
    align-items: center;
    justify-content: center;
`
const GoBackBtn = styled.Pressable`
    /* border: 1px solid gray; */
    width: 60px;
    height: 60px;
`
const GoBackBtnImage = styled.ImageBackground`
    /* flex: 1; */
    width: 100%;
    height: 100%;
`

const Star = styled.View`
    flex: 3;
    /* background-color: lightcyan; */
    align-items: center;
    justify-content: center;
`
const StarView = styled.View`
    /* border: 1px solid gray; */
    width: 170px;
    height: 60px;
    align-items: center;
    justify-content: center;
`
const StarViewImage = styled.ImageBackground`
    /* flex: 1; */
    width: 70px;
    height: 70px;
`


const Menu = styled.View`
    flex: 1;
    /* background-color: lightpink; */
    align-items: center;
    justify-content: center;
`
const MenuBtn = styled.Pressable`
    /* border: 1px solid gray; */
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
`
const MenuBtnImage = styled.ImageBackground`
    /* flex: 1; */
    width: 100%;
    height: 100%;
`



const Main = styled.View`
    flex: 5;
    flex-direction: row;
`
const LeftBtn = styled.Pressable`
    flex: 1;
    /* background-color: beige; */
    align-items: center;
    justify-content: center;
`
const LeftBtnImage = styled.ImageBackground`
    /* border: 1px solid gray; */
    width: 50px;
    height: 50px;
`

const RightBtn = styled.Pressable`
    flex: 1;
    /* background-color: beige; */
    align-items: center;
    justify-content: center;
`
const RightBtnImage = styled.ImageBackground`
    /* border: 1px solid gray; */
    width: 50px;
    height: 50px;
`
const CardSection = styled.View`
    flex: 5;
    background-color: #FED784;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    margin: 10px;
`
// const Record = styled.View`
//     /* background-color: red; */
//     height: 30px;
//     `
// const HeartRecord = styled.View``
// const CheckRecord = styled.View``
const CardImgShell = styled.View`
    flex: 2;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
    width: 200px;
`
const CardImg = styled.ImageBackground`
    flex: 1;
    width: 200px;
    /* height: 250px; */

`
const CardContents = styled.Pressable`
    /* background-color: green; */
    flex: 1;
`
const CardName = styled.View`
    flex:2;
    align-items: center;
    justify-content: center;
    
`
const CardNameText = styled.Text`
    font-size: 45px;
    font-weight: 900;
    color: #585858;
`
const CardSpeaker = styled.View`
    flex: 1;
    align-items: center;
    margin: 10px;
`
const CardSpeakerImage = styled.ImageBackground`
    flex: 1;
    width: 50px;
    height: 50px;
`




const Bottom = styled.View`
    flex: 1;
    flex-direction: row;
`
const Heart = styled.View`
    flex: 1;
    /* background-color: black; */
    align-items: center;
    justify-content: center;
`
const HeartBtn = styled.Pressable`
    /* flex: 1; */
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    /* border: 1px solid red; */
    background-color: #F4CEC9;
    box-shadow: 0px 5px 10px #F4CEC9;
    border-radius: 50px;
`
const HeartBtnImage = styled.ImageBackground`
    /* border: 1px solid gray; */
    width: 50px;
    height: 50px;
`
const Check = styled.View`
    flex: 2;
    /* background-color: white; */
    align-items: center;
    justify-content: center;
`
const CheckBtn = styled.Pressable`
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 70px;
    /* border: 1px solid red; */
    background-color: #D3FAC7;
    box-shadow: 0px 5px 10px #D3FAC7;
    border-radius: 50px;

`
const CheckBtnImage = styled.ImageBackground`
    /* border: 1px solid gray; */
    width: 60px;
    height: 60px;
`


const Random = styled.View`
    flex: 1;
    /* background-color: gray; */
    align-items: center;
    justify-content: center;
    `
const RandomBtn = styled.Pressable`
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    /* border: 1px solid red; */
    background-color: #BADAFF;
    box-shadow: 0px 5px 10px #BADAFF;
    border-radius: 50px;

`
const RandomBtnImage = styled.ImageBackground`
    /* border: 1px solid black; */
    width: 50px;
    height: 50px;
`

const Word = ({navigation}) => {
    return(
    <Shell>
        <Top>
            <GoBack>
                <GoBackBtn onPress={() => navigation.goBack()}>
                    <GoBackBtnImage source={require("../asset/images/goBack1.png")}></GoBackBtnImage>
                </GoBackBtn>
            </GoBack>
            <Star>
                <StarView>
                    <StarViewImage source={require("../asset/images/Star.png")}></StarViewImage>
                </StarView>
            </Star>
            <Menu>
                <MenuBtn onPress={() => console.log('메뉴버튼')}>
                    <MenuBtnImage source={require("../asset/images/MenuBar.png")}></MenuBtnImage>
                </MenuBtn>
            </Menu>
        </Top>

        <Main>
            <LeftBtn onPress={() => console.log('왼쪽')}>
                <LeftBtnImage source={require("../asset/images/LeftArrow.png")}></LeftBtnImage>
            </LeftBtn>

            <CardSection>
                {/* <Record>
                    <HeartRecord></HeartRecord>
                    <CheckRecord></CheckRecord>
                </Record> */}
                <CardImgShell>
                    <CardImg source={require("../asset/images/Lion1.png")} resizeMode="contain"></CardImg>
                </CardImgShell>
                <CardContents onPress={() => console.log('사자')}>
                    <CardName>
                        <CardNameText>사자</CardNameText>
                    </CardName>
                    <CardSpeaker>
                        <CardSpeakerImage source={require("../asset/images/Speaker.png")} resizeMode="contain" />
                    </CardSpeaker>
                </CardContents>
            </CardSection>

            <RightBtn onPress={() => console.log('오른쪽')}>
                <RightBtnImage source={require("../asset/images/RightArrow.png")}></RightBtnImage>
            </RightBtn>
        </Main>

        <Bottom>
            <Heart>
                <HeartBtn onPress={() => console.log('하트버튼')}>
                    <HeartBtnImage source={require("../asset/images/EmptyHeart.png")}></HeartBtnImage>
                </HeartBtn>
            </Heart>
            <Check>
                <CheckBtn onPress={() => console.log('채크버튼')}>
                    <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                </CheckBtn>
            </Check>
            <Random>
                <RandomBtn onPress={() => console.log('랜덤버튼')}>
                    <RandomBtnImage source={require("../asset/images/EmptyRandom.png")}></RandomBtnImage>
                </RandomBtn>
            </Random>
        </Bottom>
    </Shell>
    )
}
export default Word;