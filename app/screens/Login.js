import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions, Pressable} from "react-native";
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

const TextBox = styled.TextInput`
    width: 100px;
    height: 50px;
    border: 1px solid black;
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
    enableAutomaticScroll={true}
    >
    <View style={{flex: 1,alignItems:"center", justifyContent:"center"}}>

        <TouchableOpacity onPress={() => navigation.navigate("MenuStack")} style={{flex:1, backgroundColor:"beige", alignItems: "center", justifyContent:"center"}} >
            <Text>Login</Text>
        </TouchableOpacity>


        <View style={{width: 100,flex:1, backgroundColor:"tomato"}} >
            <Text onPress={() => navigation.navigate("Signup")}>Signup</Text>
        </View>
        <View style={{flex:1}}>
            <TextContainer>
       
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                <TextBox placeholder={'asd'} />
                
        
            </TextContainer>
        </View>
        
    </View>
    </KeyboardAwareScrollView>
    )
}
export default Login;