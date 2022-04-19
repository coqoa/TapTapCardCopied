import React, {useState, useRef, useEffect} from "react";
import { Text, View, Alert, ActivityIndicator, Dimensions, KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import styled from "styled-components/native";
import {colors} from "../component/Color"
import { Audio } from 'expo-av';
import {Ionicons} from "@expo/vector-icons";

import Greeting from "../component/lottieComponent/Greeting";
import Welcome from "../component/lottieComponent/Welcome";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import AppleLogin from "../component/firebaseComponent/AppleLogin";
import GoogleLogin from "../component/firebaseComponent/GoogleLogin";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

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
    top: 20px;
    border-radius: 15px;
`
const Nav = styled.View`
    flex-direction: row;
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
const Main = styled.ScrollView`
    flex: 1;
    top: 20px;
`
const Empty = styled.View`
    width: 100%;
    height: 40%;
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
const SocialSign = styled(Btn)``
const SocialText = styled(BtnText)`
    font-size: 20px;
    padding: 0px 10px ;
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

const Login = ({navigation}) => {
    const loginPasswordInput = useRef()
    const [navCheck, setNavCheck] = useState("Login")
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState("")

    // //애플소셜로그인
    // async function onAppleButtonPress() {
    //     // 1). 로그인 요청 수행
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //     });
    //     // 2).요청이 성공하면 토큰과 nonce를 추출
    //     const { identityToken, nonce } = appleAuthRequestResponse;
    //     if (identityToken) {
    //         // 3).Firebase `AppleAuthProvider` credential 생성
    //         const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        
    //         // 4). 생성된 `AppleAuthProvider` credential을 사용해서 Firebase인증 요청을 시작한다,
    //         //     이 예제에서는 `signInWithCredential`이 사용되지만, 기존 사용자와 연결하려면 `linkWithCredential`를 호출할 수 있다
    //         const userCredential = await auth().signInWithCredential(appleCredential);
        
    //         // 사용자가 로그인되면 모든Firebase의 `onAuthStateChanged` 리스너가 트리거된다 
    //         console.log(`Login.js 애플을 통해 인증된 파이어베이스, 유저아이디: ${userCredential.user.uid}`);
    //       } else {
    //         // 재시도하기 위한 처리부분
    //       }
    // }
    
    //구글소셜로그인
    // const onGoogleButtonPress = async () => { 
    //     const { idToken } = await GoogleSignin.signIn(); 
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken); 
    //     return auth().signInWithCredential(googleCredential); 
    // }
//  로그인 버튼
    const onSubmitLoginEmailEditing = () => {
        loginPasswordInput.current.focus();
    }
    const onSubmitLoginPasswordEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        setLoading(true)
        if(loading){
            return;
        }
        try{
            if(loginEmail !=="" && loginPassword !==""){
                await auth().signInWithEmailAndPassword(loginEmail, loginPassword)
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
            console.log("error =3 ", e.code)
        }
    }

    const signupPasswordInput = useRef()
    const signupNameInput = useRef()
    const signupNumberInput = useRef()

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupNumber, setSignupNumber] = useState("");
// 회원가입 버튼
    const onSubmitSignupEmailEditing = () => {
        signupPasswordInput.current.focus();
    }
    const onSubmitSignupPasswordEditing = () => {
        signupNameInput.current.focus();
    }
    const onSubmitSignupNameEditing = () => {
        signupNumberInput.current.focus();
    }
    const onSubmitSignupNumberEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        setLoading(true)
        if(loading){
            return;
        }
        try{
            if(signupEmail !=="" && signupPassword !=="" && signupName !== "" && signupNumver !== ""){
                await auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
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

    function playSound(sound){
        // console.log('Playing '+sound);
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                // console.log('Unloading '+sound);
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((error)=>{});
    }
    return(
    <Container>
        {navCheck == "Login" && (
        <GreetingShell style={{transform:[{scale:3}]}}>
            <Greeting />
        </GreetingShell>
        )}
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
                    <ValidationShell><ValidationText style={{color:colors.DARKGRAY}}>{validation}</ValidationText></ValidationShell>
                    <Btn onPress = {onSubmitLoginPasswordEditing} style={{backgroundColor : navCheck == "Login" ? "#EC705E" : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>로그인</BtnText>}
                    </Btn>
                    <GoogleLogin />
                    {Platform.OS == "ios" && (
                        <AppleLogin />
                    )}
                    </>
                ):(
                    <>
                    <TextArea 
                        autoFocus={true}
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
                        returnKeyType="next"
                        secureTextEntry 
                        onChangeText = {(text) => setSignupPassword(text)} 
                        onSubmitEditing = {onSubmitSignupPasswordEditing}
                        />
                    {/* <TextArea 
                        ref={signupNameInput}
                        placeholder="이름" 
                        value={signupName}  
                        returnKeyType="next" 
                        keyboardType = "email-address" 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        onChangeText = {(text) => setSignupName(text)} 
                        onSubmitEditing = {onSubmitSignupNameEditing}
                    />
                    <TextArea 
                        ref={signupNumberInput}
                        placeholder="전화번호" 
                        value={signupNumber}  
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        keyboardType = "number-pad" 
                        returnKeyType="done"
                        onChangeText = {(text) => setSignupNumber(text)} 
                        onSubmitEditing = {onSubmitSignupNumberEditing}
                    /> */}
                    <ValidationShell><ValidationText style={{color: "#EC705E"}}>{validation}</ValidationText></ValidationShell>
                    <Btn onPress = {onSubmitSignupNumberEditing} style={{backgroundColor : navCheck == "Signup" ? colors.NAVY : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>회원가입</BtnText>}
                    </Btn>
                    </>
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