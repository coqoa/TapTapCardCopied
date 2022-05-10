import React from 'react';
import Lottie from 'lottie-react-native';

// 정답 로띠
const CorrectAnswer = () => {
    return <Lottie source={require("../../asset/lottie/check.json")} autoPlay loop />
};
export default CorrectAnswer;