import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import MenuStack from "./MenuStack";

const NativeStack = createNativeStackNavigator();

// 스택네비게이터 (Login, Signup, MenuStack을 Screen으로 가진다)
const Stack = () => {
    return(
    <NativeStack.Navigator screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="MenuStack" component={MenuStack} />
    </NativeStack.Navigator>
    );
}
export default Stack;