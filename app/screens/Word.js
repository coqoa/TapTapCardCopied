import React, {useState, useEffect} from "react";
import { Text, View, ActivityIndicator, FlatList, ScrollView,Dimensions } from "react-native";
import styled from "styled-components";
import { SafeAreaView } from 'react-native-safe-area-context';
import { wordCard } from "../asset/data/wordCard";
import { colors } from "../component/color";
import { WordCardDefault1, WordCardDefault2 } from "../component/wordCardDefault";


const Shell = styled.View`
    flex: 1;
    background-color: white;
    align-items: center;
`
const Top = styled.View`
    height: 60px;
    flex-direction: row;
`
const GoBack = styled.View`
    flex: 1;
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
    flex: 3;
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
    width: 70px;
    height: 70px;
`


const Menu = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const MenuBtn = styled.Pressable`
    width: 60px;
    height: 60px;
`
const MenuBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`


const HeartRecord = styled.View`
    flex-direction: row;
    flex:1;
    justify-content: flex-end;
    align-items: center;
`
const HeartRecordImage = styled.ImageBackground`
    width: 22px;
    height: 22px;
    bottom: 1px;
`
const HeartRecordText = styled.Text`
    color: red;
    font-size: 17px;
    margin-left: 5px;
    margin-right: 5px;
`
// const Record = styled.View`
//     height: 30px;
//     flex-direction: row;
// `
// const CheckRecord = styled.View`
//     flex:1;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
// `
// const CheckRecordImage = styled.ImageBackground`
//     width: 24px;
//     height: 24px;
//     width: 40px;
//     `
// const CheckRecordText = styled.Text`
//     color: green;
//     font-size: 17px;
//     bottom: 1px;
// `

const Main = styled.View`
    flex: 5;
    flex-direction: row;
`
const LeftBtn = styled.Pressable`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const LeftBtnImage = styled.ImageBackground`
    width: 50px;
    height: 50px;
`

const RightBtn = styled.Pressable`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const RightBtnImage = styled.ImageBackground`
    width: 50px;
    height: 50px;
`

// wordCardDefault 컴포넌트화 하면서 옮김
// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const CardSection = styled.View`
// //Diemension쓰기위해 인라인 style 적용
// `
// const Card = styled.View`
//     flex: 1;
//     align-items: center;
//     justify-content: center;
//     margin:30px;
//     border: 1px solid black;
//     border-radius: 15px;
//     box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
// `

// const CardImgShell = styled.View`
//     flex: 3;
//     align-items: center;
//     width: 70%;
// `
// const CardImg = styled.Image`
//     flex: 1;
//     width: 100%;
// `
// const CardContents = styled.Pressable`
//     flex: 1;
// `
// const CardName = styled.View`
//     flex:1;
//     align-items: center;
// `
// const CardNameText = styled.Text`
//     font-size: 65px;
//     font-weight: 900;
//     color: ${colors.REALDARKGRAY};
// `
const CardBtn = styled.View`
    height: 60px;
    width: 100%;
`
const HeartBtn = styled.Pressable`
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
`
const HeartBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const CheckBtn = styled.Pressable`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 40px;
    height: 40px;
`
const CheckBtnImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Word = ({navigation}) => {
    const [loading, setLoading] = useState(true);

    // const [wordData, setWordData] = useState(wordCard);

    useEffect(() => {
    }, []);
    return( 
    //     loading ? (
    //     <Loader>
    //       <ActivityIndicator />
    //     </Loader>
    // ) : (
        
        
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
        {/* <Record>
            <CheckRecord>
                <CheckRecordImage source={require("../asset/images/Check.png")} resizeMode="contain"></CheckRecordImage>
                <CheckRecordText>80 / 80</CheckRecordText>
            </CheckRecord>
        </Record> */}
        <Main>
            {/* <ScrollView
            horizontal
            pagingEnabled
            >
            {wordData.map((item, index)=>{
                console.log("item = ",item.image)
                return(
                    <CardSection style={{width:SCREEN_WIDTH}}> 
                    <Card>
                        <CheckBtn onPress={() => console.log('채크버튼')}>
                            <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                        </CheckBtn>
                        <CardImgShell>
                            <CardImg source={require("../asset/images/Lion1.png")} resizeMode="contain"></CardImg>
                        </CardImgShell>
                        <CardContents onPress={() => console.log(item.name)}>
                            <CardName>
                                <CardNameText>{item.name}</CardNameText>
                            </CardName>
                        </CardContents>
                    </Card>
                </CardSection>
                )
            })}
            </ScrollView> */}
            <WordCardDefault1 />
            {/* <WordCardDefault2 /> */}
            {/* <FlatList
            horizontal
            pagingEnabled
            data={wordCard}
            renderItem = {({item})=>(
                <CardSection style={{width:SCREEN_WIDTH}}> 
                    <Card style={{backgroundColor : item.bgColor}}>
                        <CheckBtn onPress={() => console.log(item.id)}>
                            <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
                        </CheckBtn>
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
            /> */}

            {/* // <LeftBtn onPress={() => console.log('왼쪽')}>
            //     <LeftBtnImage source={require("../asset/images/LeftArrow.png")}></LeftBtnImage>
            // </LeftBtn>
            // <CardSection> 
            //     <CheckBtn onPress={() => console.log('채크버튼')}>
            //         <CheckBtnImage source={require("../asset/images/EmptyCheck.png")}></CheckBtnImage>
            //     </CheckBtn>
            //     <CardImgShell>
            //         <CardImg source={require("../asset/images/Lion1.png")} resizeMode="contain"></CardImg>
            //     </CardImgShell>
            //     <CardContents onPress={() => console.log('사자')}>
            //         <CardName>
            //             <CardNameText>사자</CardNameText>
            //         </CardName>
            //     </CardContents>
            // </CardSection>
            // <RightBtn onPress={() => console.log('오른쪽')}>
            //     <RightBtnImage source={require("../asset/images/RightArrow.png")}></RightBtnImage>
            // </RightBtn> */}
        </Main>
    </Shell>
    )
    // )
}
export default Word;