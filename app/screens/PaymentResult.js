import {React, useState, useEffect} from 'react';
import styled from "styled-components/native";
import { colors } from '../component/Color';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PaymentSuccess from '../component/lottieComponent/PaymentSuccess';
import PaymentFailed from '../component/lottieComponent/PaymentFailed';
import axios from 'axios';

const Container = styled.View`
  flex:1;
  padding: 50px;
  align-items: center;
  justify-content: center;
`
const TextSection = styled.View`
  top: 10%;
`
const ResultText = styled.Text`
  top: 2px;
  font-family: "SDChild";
  font-size: 30px;
`
const LottieSection = styled.View`
  flex:5;
  width: 100%;
`
const GoBackBtn = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  bottom: 10%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`
const GoBackText = styled.Text`
  top: 2px;
  font-family: "SDChild";
  font-size: 27px;
  color:white;
`
export default function PaymentResult({ route, navigation }) {
  const imp_success = route.params.imp_success;
  const success = route.params.success;
  const imp_uid = route.params.imp_uid;
  const merchant_uid = route.params.merchant_uid;
  const error_msg = route.params.error_msg;

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  // const isSuccess = !(
  //   imp_success === 'false' ||
  //   imp_success === false ||
  //   success === 'false' ||
  //   success === false
  // )
  const [isSuccess, setIsSuccess] = useState(false)
  const PaymentUserCollection = firestore().collection('PaymentUsers');
  const [userEmail, setUserEmail] = useState(auth()._user.email); 
  const createDB = async() =>{
    (await PaymentUserCollection.get()).forEach(value => value.data().email == userEmail ? (
        null
    ) : (
        PaymentUserCollection.doc(userEmail).set({email:userEmail,})
    ))
  }
  
  const [defaultAmount, setDefaultAmount] = useState('')
  const dbAmount = firestore().collection('Amount');
  useEffect(()=>{
    dbAmount.get().then((res)=>{
      res.forEach((doc)=>{
        const resAmount = doc.data().amount
        setDefaultAmount(resAmount)
        console.log(doc.data().amount)
      })
    })
  },[])

  const [accessToken, setAccessToken] = useState() 

  useEffect(()=>{
    const getToken = axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "2668275073975872", // REST API 키
        imp_secret: "0343b85a6733d45467d158d1e7043a6ca33510a1c863e8fc7d255e83afd0bf20414845deac13a5fc" // REST API Secret
      }
    })
    .then(function(res) {
        // console.log(response.data.response);
        const { access_token } = res.data.response; // 인증 토큰
        setAccessToken(access_token)
        console.log("getToken 성공", access_token);
        // console.log('access_token = ',access_token)
    })
    .catch(function(error) {
        console.log("getToken 실패");
    });
  },[])
  
  useEffect(()=>{
    console.log('accessToken',accessToken)
    const getPaymentData = axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: "get", // GET method
      headers: { "Authorization": "Bearer "+accessToken } // 인증 토큰 Authorization header에 추가
    })
    .then(function(res) {
        const paymentData = res.data.response;
        // console.log('조회한 결제 정보(내가입력한주문서) paymentData =', paymentData);
        const {amount, status} = paymentData;
        // console.log(typeof(amount))
        // console.log(typeof(parseInt(defaultAmount)))
        if(amount === parseInt(defaultAmount)){
          createDB()
          setIsSuccess(true)
          console.log(" getPaymentData 성공");
        }
    })
    .catch(function(error) {
        console.log(" getPaymentData 실패", error);
    });
  },[accessToken])

  return (
    <Container>
      <TextSection>
        <ResultText>{`결제에 ${isSuccess ? '성공' : '실패'}했습니다`}</ResultText>
      </TextSection>
      <LottieSection>
      {isSuccess ? (
        <PaymentSuccess />
      ) : (
        <PaymentFailed />
      )}
      </LottieSection>
      <GoBackBtn 
        onPress={() => navigation.navigate('Menu')} 
        style={{backgroundColor:(isSuccess ? ("tomato") : ("darkgray"))}}
      >
        <GoBackText>{`${isSuccess ? '시작하기' : '돌아가기'}`}</GoBackText>
      </GoBackBtn>
    </Container>
  );
}
