import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import Login from "../screens/Login";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Login" component={Login} />
    </NativeStack.Navigator>
    );
}
export default Stack;