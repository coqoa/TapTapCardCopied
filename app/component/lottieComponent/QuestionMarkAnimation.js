import React from 'react';
import Lottie from 'lottie-react-native';

// 동물카드 2단계 물음표 로띠
const QuestionMark = () => {
    return <Lottie source={require("../../asset/lottie/questionMark.json")} autoPlay loop />
};

export default QuestionMark;