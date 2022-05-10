import React from 'react';
import {View} from "react-native";
import Lottie from 'lottie-react-native';

// 결제 실패 로띠
const PaymentFailed = () => {
    return (
        <View style={{flex:1}}>
            <Lottie source={require("../../asset/lottie/paymentFailed.json")} autoPlay loop />
        </View>
    )
};
export default PaymentFailed;