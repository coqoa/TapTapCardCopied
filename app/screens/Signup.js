import React, {useState, useRef} from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import auth from '@react-native-firebase/auth';


const TextArea = styled.TextInput``
const Btn = styled.TouchableOpacity``
const BtnText = styled.Text``

const Signup = ({navigation}) => {
    const signupPasswordInput = useRef()
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitSignupEmailEditing = () => {
        signupPasswordInput.current.focus();
    }
    const onSubmitSignupPasswordEditing = async() => {
        // if(email === "" || password === ""){
        //     Alert.alert('칸을 모두 채워주세요')
        // }
        if(loading){
            return;
        }
        setLoading(true)
        try{
            if(signupEmail !=="" && signupPassword !==""){
                const userCredential = await auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
                // console.log("userCredential = ", userCredential)
            }else{
                setLoading(false)
                Alert.alert('칸을 채워주세요')
            }
        }catch(e){
            setLoading(false)
            switch(e.code){
                case "auth/email-already-in-use" : {
                     return Alert.alert('이미 사용중인 이메일입니다.')
                }
                case "auth/auth/invalid-email" : {
                    return Alert.alert('이메일을 입력해주세요')
                }
                case "auth/weak-password" : {
                     return Alert.alert('안전하지 않은 비밀번호입니다.\n다른 비밀번호를 사용해 주세요.')
                }
                case "auth/operation-not-allowed" : {
                    return Alert.alert('operation-not-allowed \n관리자에게 문의하세요 ')
                }
            }
            console.log("error = ", e)
        }
    }
    
    return(
    <View style={{flex:1, backgroundColor:"beige"}} >
        <Text onPress={() => navigation.goBack()}>back</Text>
        <TextArea 
            placeholder="Email" 
            value={signupEmail} 
            returnKeyType="next"
            keyboardType = "email-address" 
            autoCapitalize="none" 
            autoCorrect={false} 
            onChangeText = {(text) => setSignupEmail(text)} 
            onSubmitEditing = {onSubmitSignupEmailEditing}
        />

        <TextArea 
            ref={signupPasswordInput}
            placeholder="Password" 
            value={signupPassword}  
            returnKeyType="done"
            secureTextEntry 
            onChangeText = {(text) => setSignupPassword(text)} 
            onSubmitEditing = {onSubmitSignupPasswordEditing}
        />
        <Btn onPress = {onSubmitSignupPasswordEditing}>
            {loading ? <ActivityIndicator color="black"/> : <BtnText>가입하기</BtnText>}
        </Btn>
        
    </View>
    )
}
export default Signup;