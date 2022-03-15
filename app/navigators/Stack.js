import React, {useEffect} from "react";
import * as Font from "expo-font"
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MenuStack from "./MenuStack";

const NativeStack = createNativeStackNavigator();


const Stack = () => {
    useEffect(async() => {
        await Font.loadAsync({
            "SDChild": require("../asset/fonts/SDChildfundkorea.otf")
        })
    }, [])
    return(
    <NativeStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Login" component={Login} />
        <NativeStack.Screen name="Signup" component={Signup} />
        <NativeStack.Screen name="MenuStack" component={MenuStack} />
    </NativeStack.Navigator>
    );
}
export default Stack;