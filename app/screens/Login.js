import React, {useState, useRef} from "react";
import { Text, View, Alert, ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import auth from '@react-native-firebase/auth';
import {colors} from "../component/Color"
import { Audio } from 'expo-av';
import Greeting from "../component/Greeting";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Container = styled.View`
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
    flex: 1;
`

const GreetingShell = styled.View`
    width: 100%;
    height: 25%;
    /* background-color: blue; */
`
const Contents = styled.View`
    flex: 1;
    width: 80%;
    border-radius: 15px;
    /* border: 2px solid gray; */
    /* padding: 10px; */
`
const Nav = styled.View`
    flex-direction: row;
    /* padding: 10px; */
    /* background-color: red; */
    justify-content: center;
    
`
const NavBtn = styled.TouchableOpacity`
    width: 50%;
    height: 40px;
    justify-content: center;
`
const NavBtnText = styled.Text`
    text-align: center;
    font-family: "SDChild";
    font-size: 25px;
`

const Main = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 15px;
`
const TextArea = styled.TextInput`
    width: 90%;
    height: 10%;
    margin: 10px 0px;
    padding: 0px 10px;
    border-radius: 15px;
    border: 2px solid lightgray;
    font-size: 23px;
    font-family: "SDChild";
`
const Btn = styled.TouchableOpacity`
    width: 70%;
    height: 10%;
    margin: 10px 0px;
    border-radius: 15px;
    /* background-color: #EC705E; */
    align-items: center;
    justify-content: center;
`
const BtnText = styled.Text`
    top: 2px;
    color: white;
    font-size: 25px;
    font-family: "SDChild";
`
const ValidationText = styled.Text`
    font-size: 22px;
    font-family: "SDChild";
`

const Login = ({navigation}) => {
    const loginPasswordInput = useRef()
    const [navCheck, setNavCheck] = useState("Login")
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState("")

    const onSubmitLoginEmailEditing = () => {
        loginPasswordInput.current.focus();
    }
    const onSubmitLoginPasswordEditing = async() => {
        if(loading){
            return;
        }
        playSound()

        setLoading(true)
        try{
            if(loginEmail !=="" && loginPassword !==""){
                await auth().signInWithEmailAndPassword(loginEmail, loginPassword)
                // const userCredential = await auth().signInWithEmailAndPassword(email, password)
                // console.log("userCredential = ", userCredential)
            }else{
                setLoading(false)
                setValidation('칸을 채워주세요')
            }
        }catch(e){
            setLoading(false)
            switch(e.code){
                case "auth/invalid-email" : {
                    return setValidation("이메일을 입력해주세요")
                }
                case "auth/user-disabled" : {
                    return setValidation('user-disabled')
                }
                case "auth/user-not-found" : {
                    return setValidation('존재하지 않는 이메일 입니다')
                }
                case "auth/wrong-password" : {
                    return setValidation('비밀번호가 일치하지 않습니다')
                }
                case "auth/operation-not-allowed" : {
                    return setValidation('auth/operation-not-allowed \n관리자에게 문의하세요')
                }
            }
            console.log("error = ", e.code)
        }
    }

    const signupPasswordInput = useRef()
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const onSubmitSignupEmailEditing = () => {
        signupPasswordInput.current.focus();
    }
    const onSubmitSignupPasswordEditing = async() => {
        if(loading){
            return;
        }
        playSound()

        setLoading(true)
        try{
            if(signupEmail !=="" && signupPassword !==""){
                await auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
                // console.log("userCredential = ", userCredential)
            }else{
                setLoading(false)
                setValidation('칸을 채워주세요')
            }
        }catch(e){
            setLoading(false)
            switch(e.code){
                case "auth/email-already-in-use" : {
                     return setValidation('이미 사용중인 이메일입니다.')
                }
                case "auth/invalid-email" : {
                    return setValidation('이메일을 입력해주세요')
                }
                case "auth/weak-password" : {
                     return setValidation('안전하지 않은 비밀번호입니다.\n다른 비밀번호를 사용해 주세요.')
                }
                case "auth/operation-not-allowed" : {
                    return setValidation('operation-not-allowed \n관리자에게 문의하세요 ')
                }
            }
            console.log("error = ", e.code)
        }
    }

    const playSound = async() => {
        const sound = new Audio.Sound();
        try {    
            await sound.loadAsync(require("../asset/audio/btnClickSound.mp3"));
            const status = await sound.playAsync();
            setTimeout(()=>{
                sound.unloadAsync();
            },status.playableDurationMillis + 1000) 
        } catch (e) {
            console.log('Login.js playSound error = ', e)
        }
    }
    return(
    <Container>
        <GreetingShell style={{transform:[{scale:3}]}}>
            <Greeting />
        </GreetingShell>
        <Contents>
            <Nav>
                <NavBtn onPress={() => {setNavCheck("Login"), setValidation("")}}>
                    <NavBtnText style={{color : navCheck == "Login" ? "black" : "lightgray"}}>로그인</NavBtnText>
                </NavBtn>
                <NavBtn onPress={() => {setNavCheck("Signup"), setValidation("")}} >
                    <NavBtnText  style={{color : navCheck == "Signup" ? "black" : "lightgray"}}>회원가입</NavBtnText>
                </NavBtn>
            </Nav>

            <Main>
                {navCheck == "Login" ? (
                    <>
                    <TextArea 
                        placeholder="이메일" 
                        value={loginEmail} 
                        returnKeyType="next"
                        keyboardType = "email-address" 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        onChangeText = {(text) => setLoginEmail(text)} 
                        onSubmitEditing = {onSubmitLoginEmailEditing}
                    />
    
                    <TextArea 
                        ref={loginPasswordInput}
                        placeholder="비밀번호" 
                        value={loginPassword}  
                        returnKeyType="done"
                        secureTextEntry 
                        onChangeText = {(text) => setLoginPassword(text)} 
                        onSubmitEditing = {onSubmitLoginPasswordEditing}
                    />
                    <Btn onPress = {onSubmitLoginPasswordEditing} style={{backgroundColor : navCheck == "Login" ? "#EC705E" : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>로그인</BtnText>}
                    </Btn>
                    <ValidationText style={{color:colors.WhaleBG}}>{validation}</ValidationText>
                    </>
                ):(
                    <>
                    <TextArea 
                        placeholder="이메일" 
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
                        placeholder="비밀번호" 
                        value={signupPassword}  
                        returnKeyType="done"
                        secureTextEntry 
                        onChangeText = {(text) => setSignupPassword(text)} 
                        onSubmitEditing = {onSubmitSignupPasswordEditing}
                    />
                    <Btn onPress = {onSubmitSignupPasswordEditing} style={{backgroundColor : navCheck == "Signup" ? colors.WhaleBG : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>회원가입</BtnText>}
                    </Btn>
                    <ValidationText style={{color: "#EC705E"}}>{validation}</ValidationText>
                    </>
                )}
            </Main>

        </Contents>
    </Container>

    )
}
export default Login;