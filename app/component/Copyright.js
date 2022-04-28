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
const Index = styled.Text`
    font-size: 20px;
`
const List = styled.View`
    /* width:100%; */
    /* height: 20%; */
    /* flex-direction: row; */
    margin: 5px;
    padding: 1px;
    /* border: 1px solid blue; */
    /* align-items: center; */
`
const Title = styled.Text`
    font-size: 14px;
    /* margin-right: 10px; */
    color: ${colors.DARKGRAY};
`
const ContentsShell = styled.View`
    flex-direction: row;
`
const ContetsTitle = styled(Title)`
    margin-top:10px;
    margin-left:10px;
`
const Contents = styled.Text`
    font-size: 14px;
    margin-top:5px;
    margin-left:10px;
    color: ${colors.LIGHTGRAY};
`


export const Copyright = () =>{
    return(
        <CopyrightShell>
            <Index>사업자 등록 정보</Index>
            <Title/>
            <List><Title>상호명</Title><Contents>탭탭카드놀이</Contents></List>
            <List><Title>대표자 이름</Title><Contents>최병민</Contents></List>
            <List><Title>연락처</Title><Contents>010-3907-2354</Contents></List>
            <List><Title>사업장 주소</Title><Contents>서울 강동구 둔촌동 77-83 101호</Contents></List>
            <List><Title>사업자 등록 번호</Title><Contents>738-04-02362</Contents></List>
            <List><Title>통신판매업 신고 번호</Title><Contents>2022-서울강동-0781</Contents></List>
            <Title></Title>
            <Index>저작권 정보</Index>
            <Title></Title>
            <List><Title>폰트</Title><Contents>초록나무어린이체</Contents></List>
            <List><Title>효과음</Title><Contents>https://soundeffect-lab.info/</Contents></List>
            <List><Title>동물 사진 이미지</Title>
                <Contents>https://unsplash.com/</Contents> 
                <Contents>https://www.pexels.com/ko-kr/</Contents>
            </List>
            <List><Title>동물 애니메이션</Title><Contents>https://lottiefiles.com/</Contents></List>
            <List><Title>동물 오디오</Title>
                <ContentsShell>
                    <ContetsTitle>bat</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=lykJMlUja9c</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>cat</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=GsFfdL7K35M</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle></ContetsTitle>
                    <Contents></Contents>
                </ContentsShell>
            </List>
        </CopyrightShell>
    )
}
// export default InterstitialAd;
