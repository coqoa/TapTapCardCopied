import React from 'react';
import axios from 'axios';
import { View } from 'react-native';

function AxiosApi() {
    
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
        console.log('access_token = ',access_token)
    })
    .catch(function(error) {
        console.log("실패");
    });


    const getPaymentData = axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: "get", // GET method
        headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
    })
    .then(function(res) {
        const paymentData = res.data.response;
        console.log('paymentData =', paymentData);
    })
    .catch(function(error) {
        console.log("실패");
    });

    // 조회 데이터 존재할 경우
    return (
        photos.map(photo => (
            (photo.id < 10) ? (
                <View>
                </View>
            )
            : null
        ))
    );
}
export default AxiosApi;