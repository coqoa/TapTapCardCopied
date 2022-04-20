import {React, useState} from 'react';
import {
  ArrowBackIcon,
  CheckCircleIcon,
  IconButton,
  List,
  Text,
  View,
  WarningIcon,
} from 'native-base';
import { useEffect } from 'react';
import styled from "styled-components/native";
import { colors } from '../component/Color';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PaymentSuccess from '../component/lottieComponent/PaymentSuccess';
import PaymentFailed from '../component/lottieComponent/PaymentFailed';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex:1;
  padding: 50px;
  align-items: center;
  justify-content: center;
`
const TextSection = styled.View`
  top: 10%;
  /* flex:1; */
  /* width: 100%; */
  /* height: 10%; */
  /* border: 1px solid red; */
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
  /* border: 1px solid red; */
  /* background-color: darkgray; */

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
  const isSuccess = !(
    imp_success === 'false' ||
    imp_success === false ||
    success === 'false' ||
    success === false
  )

  const PaymentUserCollection = firestore().collection('PaymentUsers');
  const [userEmail, setUserEmail] = useState(auth()._user.email); 
  const createDB = async() =>{
    (await PaymentUserCollection.get()).forEach(value => value.data().email == userEmail ? (
        null
    ) : (
        PaymentUserCollection.doc(userEmail).set({email:userEmail,})
    ))
}
useEffect(()=>{
  {isSuccess && createDB()}
},[])

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
      {/* <List>
        <List.Item>
          <Text>아임포트 번호 : </Text>
          <Text>{imp_uid}</Text>
        </List.Item>
        {isSuccess ? (
          <List.Item>
            <Text>주문번호 : </Text>
            <Text>{merchant_uid}</Text>
          </List.Item>
        ) : (
          <List.Item>
            <Text>에러메시지 : </Text>
            <Text>{error_msg}</Text>
          </List.Item>
        )}
      </List> */}
      {/* <IconButton
        icon={<ArrowBackIcon />}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text>돌아가기</Text>
      </IconButton> */}
    </Container>
  );
}
