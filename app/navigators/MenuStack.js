import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Menu from "../screens/Menu";
import CardShell from "../screens/CardShell";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
import PaymentTest from "../screens/PaymentTest";

const NativeStack = createNativeStackNavigator();

//  메뉴와 카드본문, 결제관련 스크린을 가진다
const MenuStack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Menu" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Menu" component={Menu} />
        <NativeStack.Screen name="WordPlay" component={CardShell} />
        
        <NativeStack.Screen name="PaymentTest" component={PaymentTest} />
        <NativeStack.Screen name="Payment" component={Payment} />
        <NativeStack.Screen name="PaymentResult" component={PaymentResult} />
    </NativeStack.Navigator>
    )
}
export default MenuStack;