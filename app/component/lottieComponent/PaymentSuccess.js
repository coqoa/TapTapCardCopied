import React from 'react';
import {View} from "react-native";
import Lottie from 'lottie-react-native';

const PaymentSuccess = () => {
    return (
    <View style={{flex:1, transform:[{scale:1.2}]}}>
        <Lottie source={require("../../asset/lottie/paymentSuccess.json")} autoPlay loop />
    </View>
    )
};
export default PaymentSuccess;