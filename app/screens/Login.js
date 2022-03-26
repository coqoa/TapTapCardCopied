import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions, Pressable, ScrollView} from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const TextContainer = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    /* background-color: blue; */
`

const ExamBox = styled.ScrollView`
    border: 1px solid black;
`
const ExamView = styled.View`
    background-color: white;
    margin: 10px;
`
const Login = ({navigation}) => {
    return(
    <KeyboardAwareScrollView
    extraHeight={300}
    enableOnAndroid={true}
    enableAutomaticScroll={Platform.OS === 'ios'}
    contentContainerStyle={{ height: -30 }}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
    >
    <View style={{flex: 1,alignItems:"center", justifyContent:"center"}}>

        <TouchableOpacity onPress={() => navigation.navigate("MenuStack")} style={{flex:1, backgroundColor:"beige", alignItems: "center", justifyContent:"center"}} >
            <Text>Login</Text>
        </TouchableOpacity>


        <View style={{width: 100,flex:1, backgroundColor:"tomato"}} >
            <Text onPress={() => navigation.navigate("Signup")}>Signup</Text>
        </View>
        <ExamBox styled={{width:SCREEN_WIDTH, height:500}} >
            <ExamView style={{width:SCREEN_WIDTH, height:30}}><Text>123123</Text></ExamView>
            <ExamView style={{width:SCREEN_WIDTH, height:30}}><Text>123123</Text></ExamView>
            <ExamView style={{width:SCREEN_WIDTH, height:30}}><Text>123123</Text></ExamView>
            <ExamView style={{width:SCREEN_WIDTH, height:30}}><Text>123123</Text></ExamView>
            <ExamView style={{width:SCREEN_WIDTH, height:30}}><Text>123123</Text></ExamView>
        </ExamBox>
        
    </View>
    </KeyboardAwareScrollView>
    )
}
export default Login;