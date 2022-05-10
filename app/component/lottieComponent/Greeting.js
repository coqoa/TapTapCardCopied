import React from 'react';
import Lottie from 'lottie-react-native';

// 로그인 화면 상단 로띠
const Greeting = () => {
    return <Lottie source={require("../../asset/lottie/greeting.json")} autoPlay loop />
};
export default Greeting;