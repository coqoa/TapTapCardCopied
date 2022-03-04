import React from "react"
import {View, Dimensions, FlatList } from "react-native";
import styled from "styled-components"
import { wordCard } from "../asset/data/wordCard";
import { colors } from "./color";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CardSection = styled.View`
//Diemension쓰기위해 인라인 style 적용
`
const Card = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin:30px;
    /* border: 1px solid black; */
    border-radius: 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
`
const CardImgShell = styled.View`
    flex: 3;
    align-items: center;
    width: 70%;
`
const CardImg = styled.Image`
    flex: 1;
    width: 100%;
`
const CardContents = styled.Pressable`
    flex: 1;
`
const CardName = styled.View`
    flex:1;
    align-items: center;
`
const CardNameText = styled.Text`
    font-size: 65px;
    font-weight: 900;
    color: ${colors.REALDARKGRAY};
`

export const WordCardDefault1 = () => {

    return(
    <FlatList
        horizontal
        pagingEnabled
        data={wordCard}
        renderItem = {({item})=>(
            <CardSection style={{width:SCREEN_WIDTH}}> 
                <Card style={{backgroundColor : item.bgColor}}>
                    {/* <CheckBtn onPress={() => console.log(item.id)}>
                        <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                    </CheckBtn> */}
                    <CardImgShell>
                        <CardImg source={item.image} resizeMode="contain"></CardImg>
                    </CardImgShell>
                    <CardContents onPress={() => console.log(item.name)}>
                        <CardName>
                            <CardNameText>{item.name}</CardNameText>
                        </CardName>
                    </CardContents>
                </Card>
            </CardSection>
        )}
    />
    )
}
const Record = styled.View`
    height: 30px;
    flex-direction: row;
`
const CheckRecord = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const CheckRecordImage = styled.ImageBackground`
    width: 24px;
    height: 24px;
    width: 40px;
    `
const CheckRecordText = styled.Text`
    color: green;
    font-size: 17px;
    bottom: 1px;
`

//레벨2 레벨3은 이런식으로 작성하면 될것같음
export const WordCardDefault2 = () => {

    return(
    <View>
        <Record>
            <CheckRecord>
                <CheckRecordImage source={require("../asset/images/Check.png")} resizeMode="contain"></CheckRecordImage>
                <CheckRecordText>80 / 80</CheckRecordText>
            </CheckRecord>
        </Record>

        <FlatList
            horizontal
            pagingEnabled
            data={wordCard}
            renderItem = {({item})=>(
                <CardSection style={{width:SCREEN_WIDTH}}> 
                    <Card>
                        {/* <CheckBtn onPress={() => console.log(item.id)}>
                            <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                        </CheckBtn> */}
                        <CardImgShell>
                            <CardImg source={item.image} resizeMode="contain"></CardImg>
                        </CardImgShell>
                        <CardContents onPress={() => console.log(item.name)}>
                            <CardName>
                                <CardNameText>{item.name}</CardNameText>
                            </CardName>
                        </CardContents>
                    </Card>
                </CardSection>
            )}
        />
    </View>
    )
}
