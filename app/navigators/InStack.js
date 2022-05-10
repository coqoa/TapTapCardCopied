import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import MenuStack from "./MenuStack";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return(
    <NativeStack.Navigator screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="MenuStack" component={MenuStack} />
    </NativeStack.Navigator>
    );
}
export default Stack;