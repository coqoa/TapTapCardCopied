import React from 'react';
import {View, TouchableOpacity, Text} from "react-native";
import styled from "styled-components";

const InterstitialShell = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
`

const BannerShell = styled.View`
    position: absolute;
    width:100%;
    height: 100%;
    /* border: 1px solid blue; */
`

export const InterstitialAd = () =>{
    return(
        <InterstitialShell>

        </InterstitialShell>
    )
}
// export default InterstitialAd;

export const BannerAd = () =>{
    return(
        <BannerShell>

        </BannerShell>    
    )
    }
// export default BannerAd;