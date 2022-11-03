import {React, useState, useEffect} from 'react';
import styled from "styled-components/native";

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
  // const imp_success = route.params.imp_success;
  // const success = route.params.success;
  const imp_uid = route.params.imp_uid;
  // const merchant_uid = route.params.merchant_uid;
  // const error_msg = route.params.error_msg;
  
  //결제 성공 / 실패 state
  const [isSuccess, setIsSuccess] = useState(false)

  // 서버에 결제가 완료될 경유 데이터 등록하는 코드
  const PaymentUserCollection = firestore().collection('PaymentUsers');
  const [userEmail, setUserEmail] = useState(auth()._user.email); 
  const createDB = async() =>{
    (await PaymentUserCollection.get()).forEach(value => value.data().email == userEmail ? (
        null
    ) : (
        PaymentUserCollection.doc(userEmail).set({email:userEmail,})
    ))
  }
  // 서버에 저장되어있는 가격
  const [defaultAmount, setDefaultAmount] = useState('')

  // 결제금액 위변조를 방지하기 위해 firestore에 저장된 금액과 결제금액이 일치하는지 대조하기 위해 defaultAmount state를 사용한다
  const dbAmount = firestore().collection('Amount');
  useEffect(()=>{
    dbAmount.get().then((res)=>{
      res.forEach((doc)=>{
        const resAmount = doc.data().amount
        setDefaultAmount(resAmount)
      })
    })
  },[accessToken])

  //아임포트의 getToken api를 통해 accessToken을 얻는다
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
      const { access_token } = res.data.response; // 인증 토큰
      const { now } = res.data.response; // 현재 시간
      const { expired_at } = res.data.response; // 인증 시간
      setAccessToken(access_token)
      console.log('access_token = ',access_token)
      console.log('    now      = ', now)
      console.log(' expired_at  = ',expired_at)
    })
    .catch(function(error) {
      console.log("getToken 실패", error);
    });
  },[])
  
  useEffect(()=>{
    const getPaymentData = axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid(결제금액) 전달
      method: "get", // GET method
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken 
      } // 인증 토큰 Authorization header에 추가
    })
    .then(function(res) {
        const paymentData = res.data.response;
        // = 조회한 결제 정보 (내가입력한주문서)
        const {amount, status} = paymentData;
        // console.log('결제액 일치 확인 (일치하지않아서 거래취소됨, 새로고침하면 됐다고 뜸..) : ',amount === parseInt(defaultAmount))
        // 해결책 : amount값을 string으로 변환해서 새로운 state에 넣은 뒤 서버의 값과 비교

        // 결제금약와 firestore의 금액이 일치하는지 대조
        if(status == "paid"){
          if(String(amount) === defaultAmount){
            createDB(),
            setIsSuccess(true),
            console.log("결제성공")
          }else{
              console.log("결제실패(금액불일치)")
          }
        }else{
          console.log('결제실패 : 잘못된 값 = ', status)
        }
        
    })
    .catch(function(error) {
        console.log(" getPaymentData 실패", error);
        return
    });
  },[defaultAmount])

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
