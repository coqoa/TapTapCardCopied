import React from 'react';
import Lottie from 'lottie-react-native';

const Greeting = () => {
    return <Lottie source={require("../asset/lottie/greeting3.json")} autoPlay loop />
};

export default Greeting;