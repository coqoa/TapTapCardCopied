import React from 'react';
import { Audio } from 'expo-av';
import Lottie from 'lottie-react-native';
import styled from "styled-components"
import { colors } from "./Color";

const ClearModal = (props) => {

    const ClearModalShell = styled.View`
    position: absolute;
    
    width: 300px;
    height: 300px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    `
    const RepeatLevel = styled.TouchableOpacity`
        width: 200px;
        height: 60px;
        border-radius: 15px;
        margin: 5px;
        align-items: center;
        justify-content: center;
        background-color: rgba(255,255,255,0.8);
    `
    const NextLevel = styled(RepeatLevel)`
    `
    const RepeatLevelText = styled.Text`
        font-size: 30px;
        color: white;
        color: ${colors.DARKNAVY};
        font-family: 'SDChild';
    `
    const NextLevelText = styled(RepeatLevelText)`
        color: ${colors.CUSTOMPINK};
    `

    const ClickSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            await sound.playAsync();
        } catch (error) {
        }
    }

    return (
        <>
        <Lottie source={require("../asset/lottie/last1.json")} style={{position:"absolute", width: 450}} autoPlay loop />
        <Lottie source={require("../asset/lottie/last.json")} style={{width: 500}} autoPlay loop />
        <ClearModalShell>
            <RepeatLevel
                onPressIn={() => ClickSound()}
                onPressOut={() => {props.restartLevelBtn()}}
            >

                {props.type !== "AnimalENG" ? (
                    <RepeatLevelText>다시하기 !</RepeatLevelText>
                ):(
                    <RepeatLevelText>Again !</RepeatLevelText>
                )}
                {/* {props.type !== "AnimalENG" && (<RepeatLevelText>다시하기 !</RepeatLevelText>)}
                {props.type == "AnimalENG" && (<RepeatLevelText>Again !</RepeatLevelText>)} */}
                
            </RepeatLevel>

            { props.level == "word1LV" && (
                <NextLevel 
                    onPressIn={()=> ClickSound()}
                    onPressOut={()=> props.nextLevelBtn(props.level)}
                >
                    {props.type == "AnimalKOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                    {props.type == "AnimalENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                </NextLevel>
            )}
            { props.level == "word2LV" && (
                <NextLevel 
                    onPressIn={()=> ClickSound()}
                    onPressOut={()=> props.nextLevelBtn(props.level)}
                >
                    {props.type == "AnimalKOR" && (<NextLevelText>다음레벨 도전 !</NextLevelText>)}
                    {props.type == "AnimalENG" && (<NextLevelText>Next Level !</NextLevelText>)}
                </NextLevel>
            )}
            {props.type=="Number" &&  props.level !== "All" && props.level !=="91~100" && (
                <NextLevel 
                onPressIn={()=> ClickSound()}
                onPressOut={()=> props.nextLevelBtn(props.level)}>
                    <NextLevelText>다음레벨 도전 !</NextLevelText>
                </NextLevel>
            )}
        </ClearModalShell>
        </>
    )
};
export default ClearModal;