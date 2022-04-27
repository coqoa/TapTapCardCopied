import React, { useState, useRef } from 'react';
import { colors } from '../component/Color';
import styled from "styled-components/native";
import auth from '@react-native-firebase/auth';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  Switch,
  Text,
} from 'native-base';
import Picker from '../component/paymentComponent/Pickers';
import { PGS, TIER_CODES } from '../component/paymentComponent/constants';
import { getMethods, getQuotas } from '../component/paymentComponent/utils';
// import { IMPConst } from 'lib/module';
import { IMPConst } from 'iamport-react-native';

export default function PaymentTest({ navigation }) {
  const [pg, setPg] = useState('html5_inicis');
  const [tierCode, setTierCode] = useState(undefined);
  const [method, setMethod] = useState('card');
  const [cardQuota, setCardQuota] = useState(0);
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [name, setName] = useState('아임포트 결제데이터분석');
  const [amount, setAmount] = useState('1000');
  const [buyerName, setBuyerName] = useState('');
  const [buyerTel, setBuyerTel] = useState("");
  const [buyerEmail, setBuyerEmail] = useState(auth()._user.email);
  const [vbankDue, setVbankDue] = useState('');
  const [bizNum, setBizNum] = useState('');
  const [escrow, setEscrow] = useState(false);
  const [digital, setDigital] = useState(false);

  const [validationCheck, setValidationCheck] = useState("")
  const TextArea = styled.Text`
    padding: 6px;
    border-radius: 3px;
    /* margin: 10px 15px; */
    /* margin-left: 15px; */
    color:${colors.GRAY};
    border: 1px solid lightgray;
  `
  const Validation = styled.Text`
  margin-top: 10px;
    text-align: center;
    color:${colors.TOMATO};
  `

  const buyerEmailRef = useRef();
  const buyerTelRef = useRef();
  
  return (
    <ScrollView >
      <FormControl style={{paddingTop:30, paddingLeft:60, paddingRight:60}}>
        <Stack>
          <FormControl.Label>결제 대행사</FormControl.Label>
          <Picker
            
            data={PGS}
            selectedValue={pg}
            onValueChange={(value) => {
              setPg(value);
              const methods = getMethods(value);
              setMethod(methods[0].value);
            }}
          />
        </Stack>
        {/* <Stack>
          <FormControl.Label>티어 코드</FormControl.Label>
          <Picker
            data={TIER_CODES}
            selectedValue={tierCode}
            onValueChange={(value) => setTierCode(value)}
          />
        </Stack> */}
        <Stack>
          <FormControl.Label>결제수단</FormControl.Label>
          <Picker
            data={getMethods(pg)}
            selectedValue={method}
            onValueChange={(value) => setMethod(value)}
          />
        </Stack>
        {/* {method === 'card' && (
          <Stack>
            <FormControl.Label>할부개월수</FormControl.Label>
            <Picker
              data={getQuotas(pg)}
              selectedValue={cardQuota}
              onValueChange={(value) => setCardQuota(parseInt(value, 10))}
            />
          </Stack>
        )}
        {method === 'vbank' && (
          <Stack>
            <FormControl.Label>입금기한</FormControl.Label>
            <Input
              value={vbankDue}
              onChangeText={(value) => setVbankDue(value)}
            />
          </Stack>
        )}
        {method === 'vbank' && pg === 'danal_tpay' && (
          <Stack>
            <FormControl.Label>사업자번호</FormControl.Label>
            <Input
              value={bizNum}
              keyboardType="number-pad"
              onChangeText={(value) => setBizNum(value)}
            />
          </Stack>
        )}
        {method === 'phone' && (
          <Stack>
            <FormControl.Label>실물컨텐츠</FormControl.Label>
            <Switch
              value={digital}
              onValueChange={(value) => setDigital(value)}
            />
          </Stack>
        )}
        <Stack>
          <FormControl.Label>에스크로</FormControl.Label>
          <Switch value={escrow} onValueChange={(value) => setEscrow(value)} />
        </Stack>
        <Stack>
          <FormControl.Label>주문명</FormControl.Label>
          <Input value={name} onChangeText={(value) => setName(value)} />
        </Stack> */}
        <Stack>
          <FormControl.Label>결제금액</FormControl.Label>
          <TextArea>{amount+"원"}</TextArea>
        </Stack>
        {/* <Stack>
          <FormControl.Label>이메일</FormControl.Label>
          <Input
            value={buyerEmail}
            onChangeText={(value) => setBuyerEmail(value)}
          />
        </Stack> */}
        <Stack>
          <FormControl.Label>이름</FormControl.Label>
          {/* <TextArea>{buyerName}</TextArea> */}
          <Input
            ref={buyerEmailRef}
            value={buyerName}
            autoCorrect={false}
            autoComplete="off"
            onChangeText={(value) => setBuyerName(value)}
          />
        </Stack>
        <Stack>
          <FormControl.Label>전화번호</FormControl.Label>
          {/* <TextArea>{buyerTel}</TextArea> */}
          <Input
            ref={buyerTelRef}
            value={buyerTel}
            type="tel"
            placeholder="숫자 11자리"
            keyboardType="number-pad"
            onChangeText={(value) => setBuyerTel(value)}
          />
        </Stack>
        <Validation>{validationCheck}</Validation>
        <Button
        style={{marginTop:10, backgroundColor:colors.WhaleBG}}
          onPress={() => {
            const data = {
              params: {
                pg,
                pay_method: method,
                currency: undefined,
                notice_url: undefined,
                display: undefined,
                merchant_uid: merchantUid,
                name,
                amount,
                app_scheme: 'exampleformanagedexpo',
                tax_free: undefined,
                buyer_name: buyerName,
                buyer_tel: buyerTel,
                buyer_email: buyerEmail,
                buyer_addr: undefined,
                buyer_postcode: undefined,
                custom_data: undefined,
                vbank_due: undefined,
                popup: undefined,
                digital: undefined,
                language: undefined,
                biz_num: undefined,
                customer_uid: undefined,
                naverPopupMode: undefined,
                naverUseCfm: undefined,
                naverProducts: undefined,
                m_redirect_url: IMPConst.M_REDIRECT_URL,
                escrow,
              },
              tierCode,
            };

            // 신용카드의 경우, 할부기한 추가
            if (method === 'card' && cardQuota !== 0) {
              data.params.display = {
                card_quota: cardQuota === 1 ? [] : [cardQuota],
              };
            }

            // 가상계좌의 경우, 입금기한 추가
            if (method === 'vbank' && vbankDue) {
              data.params.vbank_due = vbankDue;
            }

            // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
            if (method === 'vbank' && pg === 'danal_tpay') {
              data.params.biz_num = bizNum;
            }

            // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
            if (method === 'phone') {
              data.params.digital = digital;
            }

            // 정기결제의 경우, customer_uid 추가
            if (pg === 'kcp_billing') {
              data.params.customer_uid = `cuid_${new Date().getTime()}`;
            }

            if (pg === 'naverpay') {
              const today = new Date();
              const oneMonthLater = new Date(
                today.setMonth(today.getMonth() + 1)
              );
              const dd = String(oneMonthLater.getDate()).padStart(2, '0');
              const mm = String(oneMonthLater.getMonth() + 1).padStart(2, '0'); // January is 0!
              const yyyy = oneMonthLater.getFullYear();

              data.params.naverPopupMode = false;
              data.params.naverUseCfm = `${yyyy}${mm}${dd}`;
              data.params.naverProducts = [
                {
                  categoryType: 'BOOK',
                  categoryId: 'GENERAL',
                  uid: '107922211',
                  name: '한국사',
                  payReferrer: 'NAVER_BOOK',
                  count: 10,
                },
              ];
            }
            {buyerName.length > 1 && buyerTel.length > 7 &&(
              navigation.navigate('Payment', data)
            )}
            {buyerName.length < 2 && (
              setValidationCheck("이름을 정확히 입력해주세요"),
              buyerEmailRef.current.focus()
            )}
            {buyerTel.length < 8 &&(
              setValidationCheck("전화번호를 정확히 입력해주세요"),
              buyerTelRef.current.focus()
          )}
          }}
        >
          <Text style={{fontSize:16, color:colors.BEIGE}}>결제하기</Text>
        </Button>
      </FormControl>
    </ScrollView>
  );
}
