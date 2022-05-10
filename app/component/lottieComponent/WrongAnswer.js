import React from 'react';
import Lottie from 'lottie-react-native';

// 오답 로띠
const WrongAnswer = () => {
    return <Lottie source={require("../../asset/lottie/wrong.json")} autoPlay loop />
};
export default WrongAnswer;