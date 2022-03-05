import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Signup = ({navigation}) => {
    return(
    <View style={{flex:1, backgroundColor:"beige"}} >
        <Text onPress={() => navigation.goBack()}>back</Text>
    </View>
    )
}
export default Signup;