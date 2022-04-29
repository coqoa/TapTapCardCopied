import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from "react-native";
import styled from "styled-components";
import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BannerShell = styled.View`
    position: absolute;
    width:100%;
    height: 100%;
`
// {console.log("OS = ",Platform.OS, "test id = ",TestIds)}

export const BannerAds = () =>{
    const [showBanner, setShowBanner] = useState(false);
    // {console.log(Platform.OS)}
    useEffect(()=>{
        mobileAds()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,

                // An array of test device IDs to allow.
                testDeviceIdentifiers: ['EMULATOR'],
            })
            .then(() => {
                setShowBanner(true)
                // Request config successfully set!
            });
    },[])
    
    // console.log('TestIds = ',TestIds)
    // console.log('BannerAdSize = ',BannerAdSize)
    return(
    <>
        {showBanner && (
            <BannerShell>
                <BannerAd
                    unitId={TestIds.BANNER}
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
// export default BannerAd;