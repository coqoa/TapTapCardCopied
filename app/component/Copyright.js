import React from 'react';
import {View, TouchableOpacity, Text} from "react-native";
import { colors } from './Color';
import styled from "styled-components";

const CopyrightShell = styled.ScrollView`
    position: absolute;
    /* right: 10px; */
    /* bottom: 10px; */
    width: 100%;
    height: 100%;
    /* background-color: white; */
    /* border: 1px solid red; */
`

const List = styled.View`
    /* width:100%; */
    /* height: 20%; */
    flex-direction: row;
    margin: 5px;
    padding: 1px;
    /* border: 1px solid blue; */
    align-items: center;
`
const Title = styled.Text`
    font-size: 16px;
    margin-right: 10px;
    color: ${colors.DARKGRAY};
`
const Contents = styled.Text`
    font-size: 14px;
    color: ${colors.LIGHTGRAY};
`


export const Copyright = () =>{
    return(
        <CopyrightShell>
            <List><Title></Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
            <List><Title>타이틀</Title><Contents>컨텐츠</Contents></List>
        </CopyrightShell>
    )
}
// export default InterstitialAd;
