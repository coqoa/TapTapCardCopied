import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from "react-native";
import styled from "styled-components";
// import {BannerAd, BannerAdSize, useInterstitialAd, TestIds} from '@react-native-admob/admob';

const BannerShell = styled.View`
    position: absolute;
    width:100%;
    height: 100%;
    /* border: 1px solid blue; */
`
// {console.log("OS = ",Platform.OS, "test id = ",TestIds)}

export const BannerAds = () =>{
    // {console.log(Platform.OS)}
    return(
        <BannerShell>
            {/* <BannerAd size={BannerAdSize.ADAPTIVE_BANNER} unitId={TestIds.BANNER}  /> */}
        </BannerShell>    
    )
}
// export default BannerAd;