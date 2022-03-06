import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Menu from "../screens/Menu";
import WordPlay from "../screens/WordPlay";

const NativeStack = createNativeStackNavigator();


const MenuStack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Menu" component={Menu} />
        <NativeStack.Screen name="WordPlay" component={WordPlay} />
    </NativeStack.Navigator>
    );
}
export default MenuStack;