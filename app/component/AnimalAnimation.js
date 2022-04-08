import React from 'react';
import Lottie from 'lottie-react-native';
import { AnimalCardArray } from "../asset/data/AnimalCardArray";

const AnimalAnimation = (props) => {

    return <Lottie source={AnimalCardArray[props.id].image} style={{width: AnimalCardArray[props.id].size}} autoPlay loop />;
};

export default AnimalAnimation;