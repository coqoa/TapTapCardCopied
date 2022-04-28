import React, {useState, useRef} from "react";
import {ActivityIndicator,Platform} from "react-native";
import styled from "styled-components/native";
import {colors} from "../component/Color"
import { Audio } from 'expo-av';

import auth from '@react-native-firebase/auth';
import AppleLogin from "../component/firebaseComponent/AppleLogin";
// import GoogleLogin from "../component/firebaseComponent/GoogleLogin";

import Greeting from "../component/lottieComponent/Greeting";
import Welcome from "../component/lottieComponent/Welcome";
import GreetingNavy from '../component/lottieComponent/GreetingNavy';


const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`
const GreetingShell = styled.View`
    width: 100%;
    height: 25%;
`
const Contents = styled.View`
    flex: 1;
    width: 80%;
    top: 10px;
    border-radius: 15px;
`
const Nav = styled.View`
    flex-direction: row;
    justify-content: center;
    
`
const NavBtn = styled.TouchableOpacity`
    width: 40%;
    height: 40px;
    justify-content: center;
    /* border: 1px solid red; */
`
const NavBtnText = styled.Text`
    text-align: center;
    font-family: "SDChild";
    font-size: 25px;
`
const Main = styled.ScrollView`
    flex: 1;
    top: 0px;
`
const Empty = styled.View`
    width: 100%;
    padding: 0px;
    height: 30%;
    /* border: 1px solid red; */
`
const TextArea = styled.TextInput`
    width: 90%;
    height: 40px;
    margin: 10px 0px;
    padding: 0px 10px;
    border-radius: 15px;
    border: 2px solid lightgray;
    font-size: 23px;
    font-family: "SDChild";
`
const Btn = styled.TouchableOpacity`
    flex-direction: row;
    width: 70%;
    height: 45px;
    margin: 10px 0px;
    border-radius: 15px;
    /* background-color: #EC705E; */
    align-items: center;
    justify-content: center;
`
const BtnText = styled.Text`
    color: white;
    font-size: 23px;
    font-family: "SDChild";
`
const ValidationShell = styled.View`
    width: 70%;
    height: 18px;
    align-items: center;
    justify-content: center;
`
const ValidationText = styled.Text`
    font-size: 18px;
    font-family: "SDChild";
`
// ------------------------------------------------------------------
const Login = ({navigation}) => {
    const PasswordInput = useRef()
    const [navCheck, setNavCheck] = useState("Login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState("")

    //  이메일입력 후 키보드에 next를 탭하면 password로 포커스를 이동
    const onSubmitEmail = () => {
        PasswordInput.current.focus();
    }

    // 로그인을 진행하는 함수
    const loginEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        //ActivityIndicator컴포넌트 출력
        setLoading(true)
        // 두번눌리는걸 방지
        if(loading){
            return;
        }
        try{
            if(email !=="" && password !==""){
                // 입력값이 공백이 아니면 로그인
                await auth().signInWithEmailAndPassword(email, password)
            }else{
                // 입력값이 공백이라면 유효성 체크 메시지 출력
                setLoading(false)
                setValidation('칸을 채워주세요')
            }
        }catch(e){
            // 에러 발생시 에러이유를 유효성 체크 메시지로 출력
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
        }
    }

// 회원가입 버튼
    const signupEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        setLoading(true)
        if(loading){
            return;
        }
        try{
            if(email !=="" && password !==""){
                await auth().createUserWithEmailAndPassword(email, password)
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
            console.log("error1 = ", e.code)
        }
    }
    //Login인지 Signup인지 확인 후 버튼에 쓰이는 함수를 나눠줌 
    const btnAlloter = () => {
        if(navCheck == "Login"){
            return loginEditing
        }else{
            return signupEditing
        }
    }
    // 오디오출력 관련 함수
    function playSound(sound){
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((error)=>{});
    }

    

    return(
    <Container>
        <GreetingShell style={{transform:[{scale:3}]}}>
            {/* 로그인/회원가입 TextInput 상단 LottieAnimation */}
            {navCheck == "Login" ? (<Greeting />):(<GreetingNavy />)}
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

            <Main contentContainerStyle={{alignItems:"center"}}>
                <TextArea 
                    placeholder="이메일" 
                    value={email} 
                    returnKeyType="next"
                    keyboardType = "email-address" 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    onChangeText = {(text) => setEmail(text)} 
                    onSubmitEditing = {onSubmitEmail}
                />
    
                <TextArea 
                    ref={PasswordInput}
                    placeholder="비밀번호" 
                    value={password}  
                    returnKeyType="done"
                    secureTextEntry 
                    onChangeText = {(text) => setPassword(text)} 
                    onSubmitEditing = {btnAlloter()}
                />

                <ValidationShell>
                    <ValidationText style={{color:colors.DARKGRAY}}>{validation}</ValidationText>
                </ValidationShell>

                {navCheck=="Login" ? (
                    // 로그인 관련 버튼
                <>
                    <Btn onPress = {loginEditing} style={{backgroundColor : navCheck == "Login" ? "#EC705E" : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>로그인</BtnText>}
                    </Btn>
                    {/* <GoogleLogin /> */}
                    {Platform.OS == "ios" && (
                        <AppleLogin />
                    )}
                </>
                ):(
                    // 회원가입 관련 버튼
                    <Btn onPress = {signupEditing} style={{backgroundColor : navCheck == "Signup" ? colors.NAVY : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>회원가입</BtnText>}
                    </Btn>
                )}
            </Main>
        </Contents>

        {navCheck == "Signup" ? (
            <Empty style={{transform:[{scale:1}]}}>
                <Welcome />
            </Empty>
        ):(null)}
    </Container>
    )
}
export default Login;