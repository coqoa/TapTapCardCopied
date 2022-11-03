import React from 'react';
import { colors } from './Color';
import styled from "styled-components";

const CopyrightShell = styled.ScrollView`
    position: absolute;
    width: 100%;
    height: 100%;
`
const Index = styled.Text`
    font-size: 20px;
`
const List = styled.View`
    margin: 5px;
    padding: 1px;
`
const Title = styled.Text`
    font-size: 14px;
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

// 저작권 관련 모달창
export const Copyright = () =>{
    return(
        <CopyrightShell>
            <Index>사업자 등록 정보</Index>
            <Title/>
            <List><Contents>모바일 앱에서 구매한 유료 서비스의 환불 정책은 각 스토어 이용 약관을 따르며, 환불 역시 각 스토어에서 직접 관리합니다.</Contents></List>
            <List><Contents>인앱 구매 관련 모든 문의 사항은 구글 플레이스토어 또는 애플 앱스토어의 고객 지원 채널에 문의하시기 바랍니다.</Contents></List>
            <List><Contents> 관련 내용 : https://coqoa.tistory.com/74</Contents></List>
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
                    <ContetsTitle>chick</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=DZM8ilNBNAw</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>chicken</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=Fs5v0aZNkTk&list=PLRhErp0LSEI9veX5jACIYJn4jSbJ3ReWL&index=37</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>cow</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=17d_GFdNyKw</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>crab</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=UwOVyBfupys</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>deer</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=Lpe0TcRh96M</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>dog</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=b-DJ1z8UYuc</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>dolphin</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=AZuzadlAGL0</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>duck</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=3tF9bMysInc</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>eagle</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=3fVnSyoyXag</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>elephant</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=7lAh_sM6cjQ</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>flamingo</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=rLQ8pp6CyVY</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>fox</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=_R4yaizKbNU</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>frog</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=0OTzBx2lOVY</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>girafe</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=p6T0isg7oA4</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>hamster</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=z0mGbPZx-AM</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>horse</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=QpOhiuRvzAE</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>lion</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=BGBf6v2Bwpw</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>monkey</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=iu_DJdU_ivQ</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>mouse</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=VAEAUYxG3kM</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>owl</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=2r9nPVmG9Ds</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>panda</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=dSCQmAAfsOI</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>parrot</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=M41nKJFeB-w</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>penguin</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=53O4a0UJEPE</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>pig</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=474azcMLLIE</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>seagull</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=j2IzFwEh6l0</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>sheep</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=B_6JtjtyW6k</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>squirrel</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=uwmO7-wQjkw</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>tiger</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=vtD6E78F4Lg</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>tucan</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=ZFysojVThio</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>turtle</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=8CTPhm2BJv8</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>wolf</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=tfRf34G_s20&list=PLRhErp0LSEI9veX5jACIYJn4jSbJ3ReWL&index=10</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>woodpecker</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=qjSktAL0Fts</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>donkey</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=EHVNQek_IpI&list=PLRhErp0LSEI9veX5jACIYJn4jSbJ3ReWL&index=2</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>bear</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=pz6eZbESlU8&list=PLRhErp0LSEI9veX5jACIYJn4jSbJ3ReWL&index=13</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>rabbit</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=GbJqUPvZRLk</Contents>
                </ContentsShell>
                <ContentsShell>
                    <ContetsTitle>pigeon</ContetsTitle>
                    <Contents>https://www.youtube.com/watch?v=qFc4a9XN6Fg</Contents>
                </ContentsShell>
            </List>
        </CopyrightShell>
    )
}
