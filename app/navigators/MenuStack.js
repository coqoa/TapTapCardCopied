import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

// import Login from "../screens/Login";
// import Signup from "../screens/Signup";
import Menu from "../screens/Menu";
import WordPlay from "../screens/WordPlay";

const NativeStack = createNativeStackNavigator();


const MenuStack = () => {
    return(
    // <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
    <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
        {/* <NativeStack.Screen name="Login" component={Login} />
        <NativeStack.Screen name="Signup" component={Signup} /> */}
        <NativeStack.Screen name="Menu" component={Menu} />
        <NativeStack.Screen name="WordPlay" component={WordPlay} />
    </NativeStack.Navigator>
    );
}
export default MenuStack;