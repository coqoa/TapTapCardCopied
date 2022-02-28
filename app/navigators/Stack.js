import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Menu from "../screens/Menu";
import Word from "../screens/Word";

const NativeStack = createNativeStackNavigator();


const Stack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Login" component={Login} />
        <NativeStack.Screen name="Signup" component={Signup} />
        <NativeStack.Screen name="Menu" component={Menu} />
        <NativeStack.Screen name="Word" component={Word} />
    </NativeStack.Navigator>
    );
}
export default Stack;