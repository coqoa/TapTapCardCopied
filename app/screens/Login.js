import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Login = ({navigation}) => {
    return(
    <View style={{flex: 1,alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuStack")} style={{width: 100, height: 100, backgroundColor:"beige", alignItems: "center", justifyContent:"center"}} >
            <Text>Login</Text>
        </TouchableOpacity>
        <View style={{width: 100, height: 100, backgroundColor:"tomato"}} >
            <Text onPress={() => navigation.navigate("Signup")}>Signup</Text>
        </View>
    </View>
    )
}
export default Login;