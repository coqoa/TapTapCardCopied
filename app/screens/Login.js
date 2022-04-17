import React, {useState, useRef} from "react";
import { Text, View, Alert, ActivityIndicator, Dimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import styled from "styled-components/native";
import {colors} from "../component/Color"
import { Audio } from 'expo-av';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Greeting from "../component/lottieComponent/Greeting";
import Welcome from "../component/lottieComponent/Welcome";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Container = styled.View`
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
    flex: 1;
    /* background-color: blue; */
`

const GreetingShell = styled.View`
    /* position: absolute;s */
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
    /* border: 1px solid gray; */
`
const Empty = styled.View`
    width: 100%;
    height: 45%;
    /* align-items: center; */
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
    width: 70%;
    height: 35px;
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
    // const userRef = fstore.collection('TAPTAP')
    const firestoreUserColl = firestore().collection('TAPTAPUSER');
    // console.log("여기부터임 = ",usersCollection)


    const onSubmitLoginEmailEditing = () => {
        loginPasswordInput.current.focus();
    }
    const onSubmitLoginPasswordEditing = async() => {
        if(loading){
            return;
        }
        playSound(require("../asset/audio/btnClickSound.mp3"))

        setLoading(true)
        try{
            if(loginEmail !=="" && loginPassword !==""){
                await auth().signInWithEmailAndPassword(loginEmail, loginPassword)
                // const userCredential = await auth().signInWithEmailAndPassword(loginEmail, loginPassword)
                // console.log("userCredential = ", userCredential.user)
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
        if(loading){
            return;
        }
        playSound(require("../asset/audio/btnClickSound.mp3"))

        setLoading(true)
        try{
            if(signupEmail !=="" && signupPassword !=="" && signupName !== "" && signupNumver !== ""){
                await auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
                // console.log("userCredential = ", userCredential)
                await firestoreUserColl.doc(signupEmail).set({
                    name:signupName,
                    email:signupEmail,
                    number:signupNumber,
                })
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
        console.log('Playing '+sound);
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                console.log('Unloading '+sound);
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
                    <Btn onPress = {onSubmitLoginPasswordEditing} style={{backgroundColor : navCheck == "Login" ? "#EC705E" : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>로그인</BtnText>}
                    </Btn>
                    <ValidationText style={{color:colors.WhaleBG}}>{validation}</ValidationText>
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
                    <TextArea 
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
                    />
                    <Btn onPress = {onSubmitSignupNumberEditing} style={{backgroundColor : navCheck == "Signup" ? colors.WhaleBG : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>회원가입</BtnText>}
                    </Btn>
                    <ValidationText style={{color: "#EC705E"}}>{validation}</ValidationText>
                    </>
                )}
            </Main>
        </Contents>
        {navCheck == "Signup" && (
        <Empty style={{transform:[{scale:1}]}}>
            <Welcome />
        </Empty>
        )}
    </Container>

    )
}
export default Login;