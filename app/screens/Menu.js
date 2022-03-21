import React,{ useState } from "react";
import styled from "styled-components";
import { Audio } from 'expo-av';
import { colors } from "../component/color";

// const Shell = styled.View`
//     flex: 1;
// `
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
`
    const MenuBox = styled.Pressable`
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
const WordSelectTitle = styled.View`
    width: 200px;
    height: 60px;
    align-items: center;
    justify-content: center;
    font-family: 'SDChild';
`
const WordKorBtn = styled.Pressable`
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
const WordSelectText = styled.Text`
    font-size: 32px;
    font-weight: 800;
    color: white;
    font-family: 'SDChild';
`
const WordSelectTitleText = styled(WordSelectText)`
    font-size: 40px;
    color: ${colors.REALDARKGRAY};
    margin-bottom: 10px;
`

// -------------------------------------------------------------------------------------------------

const Menu = ({navigation}) => {
    const [wordSelectModal, setWordSelectModal] = useState(false)
    
    const BtnClick = (e) => {
        setWordSelectModal(false)
        navigation.navigate('WordPlay',{type:e}) 
    }
    const playBtnSound = async(e) => {
        const sound = new Audio.Sound();
      try {    
      	// 저장한 path로 음원 파일 불러오기 
        await sound.loadAsync(e);
        // 음원 재생하기 
        await sound.playAsync();
      } catch (error) {
     }
    }
    const ClickSound = async() => {
        const sound = new Audio.Sound();
      try {    
        await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
        await sound.playAsync();
      } catch (error) {
     }
    }

    //Btn Animation
    //단어놀이버튼
    const [wordPlayBtnAnimation, setWordPlayBtnAnimation] = useState(1)
    const wordPlayScaleToggle = (e) =>{setWordPlayBtnAnimation(e)}
    // 한글버튼
    const [KorBtnAnimation, setKorBtnAnimation] = useState(1)
    const KorScaleToggle = (e) =>{setKorBtnAnimation(e)}
    // 영어버튼
    const [EngBtnAnimation, setEngBtnAnimation] = useState(1)
    const EngScaleToggle = (e) =>{setEngBtnAnimation(e)}

    return(
    // <Shell>
    <BG source={require("../asset/images/loginBg.png")} resizeMode="stretch">
        <MenuBoxShell>
            <MenuBox 
                style={{transform: [{scale:wordPlayBtnAnimation}]}}
                onPressIn={() => {ClickSound(), wordPlayScaleToggle(0.8)}}
                onPressOut={() => (setWordSelectModal(true),wordPlayScaleToggle(1))}
            >
                <MenuText>단어 놀이</MenuText>
            </MenuBox>
            <MenuBox>
                <MenuText>수학 놀이</MenuText>
            </MenuBox>
            
        </MenuBoxShell>
        {/* Menu터치시 출력될 모달 */}
        {wordSelectModal && (
        // 모달컨테이너를 제외한 전체화면 : 터치시 모달 닫기위해 구현
        <WordSelectModalBG onPress={()=>setWordSelectModal(false)}>
            <WordSelectContainer>
                <WordSelectTitle><WordSelectTitleText>단어놀이</WordSelectTitleText></WordSelectTitle>
                <WordKorBtn 
                    style={{transform: [{scale:KorBtnAnimation}]}}
                    onPressIn={() => (ClickSound(), KorScaleToggle(0.8))}
                    onPressOut={() => {BtnClick("nameKOR"),KorScaleToggle(1)}}
                >
                    <WordSelectText>한글</WordSelectText>
                </WordKorBtn>
                <WordEngBtn 
                style={{transform: [{scale:EngBtnAnimation}]}}
                onPressIn={() => {ClickSound(),EngScaleToggle(0.8)}}
                onPressOut={() => {BtnClick("ENG"),EngScaleToggle(1)}}
                >
                    <WordSelectText>영어</WordSelectText>
                </WordEngBtn>
            </WordSelectContainer>
        </WordSelectModalBG>
        )}
    </BG>
    // </Shell>
    )
}
export default Menu;