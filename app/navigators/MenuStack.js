import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Menu from "../screens/Menu";
import WordPlay from "../screens/WordPlay";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
import PaymentTest from "../screens/PaymentTest";

const NativeStack = createNativeStackNavigator();

//  Menu와 WordPlay를 Screen으로 가진다, MathPlay 추가할예정
const MenuStack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Menu" component={Menu} />
        <NativeStack.Screen name="WordPlay" component={WordPlay} />
        
        <NativeStack.Screen name="PaymentTest" component={PaymentTest} />
        <NativeStack.Screen name="Payment" component={Payment} />
        <NativeStack.Screen name="PaymentResult" component={PaymentResult} />
    </NativeStack.Navigator>
    )
}
export default MenuStack;