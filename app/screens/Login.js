import React, {useState, useRef} from "react";
import { Text, View, Alert, ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const TextArea = styled.TextInput``
const Btn = styled.TouchableOpacity``
const BtnText = styled.Text``

const SignupBtn = styled.TouchableOpacity``
const SignupBtnText = styled.Text``

const Login = ({navigation}) => {
    const passwordInput = useRef()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    }
    const onSubmitPasswordEditing = async() => {
        if(loading){
            return;
        }
        setLoading(true)
        try{
            if(email !=="" && password !==""){
                await auth().signInWithEmailAndPassword(email, password)
                // const userCredential = await auth().signInWithEmailAndPassword(email, password)
                // console.log("userCredential = ", userCredential)
            }else{
                setLoading(false)
                Alert.alert('칸을 채워주세요')
            }
        }catch(e){
            setLoading(false)
            switch(e.code){
                case "auth/invalid-email" : {
                    return Alert.alert('이메일을 입력해주세요')
                }
                case "user-disabled" : {
                    return Alert.alert('user-disabled')
                }
                case "auth/user-not-found" : {
                    return Alert.alert('존재하지 않는 이메일 입니다')
                }
                case "auth/wrong-password" : {
                    return Alert.alert('비밀번호가 일치하지 않습니다')
                }
                case "auth/operation-not-allowed" : {
                    return Alert.alert('auth/operation-not-allowed \n관리자에게 문의하세요')
                }
            }
            console.log("error = ", e.code)
        }
    }

    return(
    <KeyboardAwareScrollView
    extraHeight={300}
    enableOnAndroid={true}
    enableAutomaticScroll={Platform.OS === 'ios'}
    contentContainerStyle={{ height: -30 }}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
    >
    {/* <View style={{flex: 1,alignItems:"center", justifyContent:"center"}}>
            <Text>Login</Text>
    </View> */}
    <View style={{flex:1, backgroundColor:"beige"}} >
        <TextArea 
            placeholder="Email" 
            value={email} 
            returnKeyType="next"
            keyboardType = "email-address" 
            autoCapitalize="none" 
            autoCorrect={false} 
            onChangeText = {(text) => setEmail(text)} 
            onSubmitEditing = {onSubmitEmailEditing}
        />

        <TextArea 
            ref={passwordInput}
            placeholder="Password" 
            value={password}  
            returnKeyType="done"
            secureTextEntry 
            onChangeText = {(text) => setPassword(text)} 
            onSubmitEditing = {onSubmitPasswordEditing}
        />
        <Btn onPress = {onSubmitPasswordEditing}>
            {loading ? <ActivityIndicator color="black"/> : <BtnText>로그인</BtnText>}
        </Btn>




        <SignupBtn style={{width: 100,flex:1, backgroundColor:"tomato"}} onPress={() => navigation.navigate("Signup")} >
            <SignupBtnText>가입</SignupBtnText>
        </SignupBtn>
    </View>
    </KeyboardAwareScrollView>
    )
}
export default Login;