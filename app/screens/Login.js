import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Login = ({navigation}) => {
    return(
    <View style={{flex: 1}}>
        <View style={{flex:1, backgroundColor:"beige"}} >
            <Text onPress={() => navigation.navigate("MenuStack")}>Login</Text>
        </View>
        <View style={{flex:1, backgroundColor:"tomato"}} >
            <Text onPress={() => navigation.navigate("Signup")}>Signup</Text>
        </View>
    </View>
    )
}
export default Login;