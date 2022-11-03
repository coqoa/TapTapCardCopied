import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from "react-native";
import styled from "styled-components";
import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BannerShell = styled.View`
    position: absolute;
    width:100%;
    height: 100%;
`
export const BannerAds = () =>{
    const [showBanner, setShowBanner] = useState(false);
    const [bannerId, setBannerId] = useState('')

    const platformSelect = () =>{        
        // 개발중이라면 test ID 켜야함
        // admob test ID
        setBannerId(TestIds.BANNER)

        //실제 admob ID
        // if(Platform.OS == 'ios'){
        //     setBannerId('ca-app-pub-2348793730555023/6387698778')
        // }else if(Platform.OS == 'android'){
        //     setBannerId('ca-app-pub-2348793730555023/1584898425')
        // }

    }
    // console.log(typeof(bannerId),bannerId)
    useEffect(()=>{
        platformSelect()
        mobileAds()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.G,
                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,
                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,
                // An array of test device IDs to allow.
                testDeviceIdentifiers: ['EMULATOR'],
            })
            .then(() => {
                // Request config successfully set!
                setShowBanner(true)
            });
        mobileAds()
            .initialize()
            .then(adapterStatuses => {
              // Initialization complete!
            });
    },[])
    // console.log('Platform = ',Platform.OS)
    // console.log('TestIds = ',typeof(TestIds.BANNER), TestIds.BANNER)
    // console.log('BannerAdSize = ',BannerAdSize)
    return(
    <>
        {showBanner && (
            <BannerShell>
                <BannerAd
                    unitId={bannerId}
                    size={BannerAdSize.ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </BannerShell>    
        )}
    </>
    )
}