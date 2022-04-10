import React, {useState, useRef} from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import auth from '@react-native-firebase/auth';


const TextArea = styled.TextInput``
const Btn = styled.TouchableOpacity``
const BtnText = styled.Text``

const Signup = ({navigation}) => {
    const passwordInput = useRef()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    }
    const onSubmitPasswordEditing = async() => {
        // if(email === "" || password === ""){
        //     Alert.alert('칸을 모두 채워주세요')
        // }
        if(loading){
            return;
        }
        setLoading(true)
        try{
            if(email !=="" && password !==""){
                const userCredential = await auth().createUserWithEmailAndPassword(email, password)
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
            {loading ? <ActivityIndicator color="black"/> : <BtnText>가입하기</BtnText>}
        </Btn>
        
    </View>
    )
}
export default Signup;