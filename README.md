 # 탭탭카드놀이
<br/>
<details> 
	<summary> 탭탭카드놀이 개발 정보 </summary>   

##   개발 기간   
22.02.26 ~ (22.05.19 현재 스토어 배포 심사 중)
<br /><br />

## 기술 스택  
- React Native (Expo Bare Workflow)
- Firebase (Auth, Firestore, Social Authentication)
- Github
<br /><br />

## 그 외
- 인앱 결제 모듈 : [아임 포트](https://github.com/iamport/iamport-react-native)   
- 광고 : [Admob](https://www.npmjs.com/package/react-native-google-mobile-ads) 
- 디자인 툴 : AdobeXD
<br /><br />

## 개발이유  
사용자의 즉각적인 **피드백**이 중요하기 때문에 실제 유저가 주변에 있는 서비스를 만들고자 했습니다  
`프로토타입`을 빠르게 만들어서 지인들의 피드백을 들을 수도 있고, 이 결과물이 가치를 제공할 수 있다고 생각합니다.
<br /><br />

## 개발 목표
- Android / iOS 모바일 앱의 `기획`, `설계`, `디자인`, `개발`, `배포`, `유지 보수` 등의 모든 과정을 혼자 완성하기
- 모바일 데이터베이스 다뤄보기
- 소셜 로그인 구현하기
- 광고와 인앱 결제 구현하기
<br /><br />

## 발생한 이슈 및 해결
- [How to fix SSRProvider warning ??](https://coqoa.tistory.com/146?category=952814)
- [안드로이드 상태 바 가림 이슈](https://coqoa.tistory.com/155?category=952814)
- [Git 대용량 파일 커밋이 안된다? : Git LFS 사용하기](https://coqoa.tistory.com/158?category=952814)
- [Expo-av 여러 번 클릭 시 소리 멈추는 이슈](https://coqoa.tistory.com/163)
- [아임포트 결제 검증 로직 추가하기](https://coqoa.tistory.com/164)
<br /><br />

## 아쉬운 점
- 기본 모달창이 맘에 안들지만 네이티브단에서 구현해야 하는 부분이라 손을 데지 못한 것
- 개발 초반에 컴포넌트에 대한 이해가 부족해서 하나의 컴포넌트에 여러 가지 작업을 한 것
- 주기적인 리팩토링을 하지 않아서 막바지에 많은 시간을 할애한 것
- 라이브러리를 정확하게 이해하지 못하고 사용한 것
- 기능 구현 위주로 하드 코딩을 한 후 수정하지 못한 것
 <br /><br />

### 개선사항  
- `앱 이용 안내 스크린` 만들어서 첫 화면으로 제공하기
- `태블릿`에서도 사용할 수 있는 앱으로 확장하기
- `리팩토링`하기
- 기능별로 `컴포넌트화`하기  
- `성능 개선`하기
정확히 어느 부분에서 발생하는 문제인지 몰라서 해결하지 못한 부분이 많습니다.   
네이티브단에서 성능을 개선할 수 있는 부분들은 공부를 통해 해결할 예정이고    
콘텐츠 파일의 프레임 문제는 아래에 설명할 협업을 통해 더 좋은 퀄리티의 콘텐츠를 사용할 것입니다  

- `다양한 언어`로 콘텐츠를 제공하기  
현재는 한글 / 영어 두 가지 언어로 제작된 콘텐츠를 제공하고 있습니다
추후에는 일본어, 중국어, 스페인어 등 다양한 언어로도 제공할 예정입니다

- 동물 콘텐츠 늘리기  
Lottie 애니메이션을 무료 버전만 사용했기에 디자인 통일성도 없고 동물의 종류도 부족합니다  
디자이너와의 협업을 통한 콘텐츠의 양과 질을 향상, 전문 성우와의 협업을 통한 오디오 품질 향상이 가능합니다  
광고와 결제를 붙여서 수익화 관련 공부도 하면서 수익이 생기면 콘텐츠 부족 문제를 해결하는 데 많은 도움이 될 것이라 판단했고, 이를 통해 더 내실 있는 앱으로 만들고 싶습니다


### 개발하면서 공부한 것
- [네비게이터](https://coqoa.tistory.com/130?category=952814)
- [FlatList에서 JS 객체 배열 사용하기(문자열, 로컬 이미지)](https://coqoa.tistory.com/133?category=952814)
- [자식 컴포넌트에서 부모 컴포넌트의 state 변경하기](https://coqoa.tistory.com/132?category=952814)
- [screen component에서 navigation과 props 같이 주고받기](https://coqoa.tistory.com/134?category=952814)
- [React Native 폰트 적용하기](https://coqoa.tistory.com/135?category=952814)
- [useEffect, setTimeout, clearTimeout 사용하기](https://coqoa.tistory.com/136?category=952814)
- [Lottie files 적용하기](https://coqoa.tistory.com/143?category=952814)
- [아임 포트 결제 모듈 이용해서 Expo 인앱결제 구현하기](https://coqoa.tistory.com/145?category=952814)
- [Firebase, Auth, E-Mail 회원가입 및 로그인](https://coqoa.tistory.com/154?category=952814)
- [앱 아이콘 변경하기](https://coqoa.tistory.com/156?category=952814)
- [파이어베이스 소셜로그인 (Google)](https://coqoa.tistory.com/160?category=952814)
- [파이어베이스 소셜로그인 (Apple)](https://coqoa.tistory.com/161)
- [안드로이드배포] - 배포 완료 후 작성 예정
- [ios배포] - 배포 완료 후 작성 예정
</details>

--- 
<br/>

#### 탭탭 카드놀이는 유아 단어 학습을 위한 카드놀이 모바일 앱입니다   
![Main1](https://user-images.githubusercontent.com/81023768/169139195-ae30ef6d-9a03-4494-b394-cf7c822f1b51.png)
![Main2](https://user-images.githubusercontent.com/81023768/169139249-268aa124-b75f-4d3d-b0b1-8e10e0e404ca.png)

 <br/><br/>

## 탭탭카드놀이의 기능  
<br/>

    1. 한글 낱자 카드놀이  
<br/>  

![Ganada](https://user-images.githubusercontent.com/81023768/169139388-bbc80c83-f96a-45cd-b274-c198b2841fb8.gif)

자음과 모음을 한눈에 볼 수 있는 카드놀이입니다   
탭을 통해 오디오를 재생할 수 있고 스와이프나 상단 메뉴바를 통해 낱자를 변경할 수 있습니다. 
<br/><br/>

2. 알파벳 카드놀이  
<br/>  

![Alphabet](https://user-images.githubusercontent.com/81023768/169139459-a939dec4-bcc9-4986-a56a-eec468560a45.gif)

알파벳을 한눈에 볼 수 있는 카드놀이입니다.  
탭을 통해 오디오를 재생할 수 있고 스와이프나 상단 메뉴바를 통해 낱자를 변경할 수 있습니다.  
<br/><br/>

3. 숫자 카드놀이  
<br/>  

![Number](https://user-images.githubusercontent.com/81023768/169139508-3702a7e3-5c61-420e-9460-ea8a0fedf9cb.gif)

숫자 1~100까지를 한눈에 볼 수 있는 카드놀이입니다.   
기호에 따라 10의 단위로 볼 수 있습니다.  
탭을 통해 오디오를 재생할 수 있고 스와이프나 상단 메뉴바를 통해 낱자를 변경할 수 있습니다.  
<br/><br/>

4. 동물 카드놀이  
<br/>  

  ![May-19-2022 04-23-13](https://user-images.githubusercontent.com/81023768/169139987-746de901-0093-4e6b-9c93-e678217de3b1.gif)
  ![Animal2](https://user-images.githubusercontent.com/81023768/169139622-78aec275-7c9f-48e0-8b35-a9b964f442b8.gif)
  ![Animal3](https://user-images.githubusercontent.com/81023768/169139652-cd4c5985-510d-4dcd-a6f6-2b9dfdeebfe6.gif)

동물을 볼 수 있는 카드놀이입니다    
동물은 애니메이션으로 볼 수 있고 탭을 통해 동물의 소리를 들을 수 있습니다    
하단 텍스트를 통해서 텍스트 오디오를 들을 수 있고 우측 상단 사진 버튼을 통해 실제 동물의 사진을 볼 수 있습니다    
한글과 영어 두 가지 버전으로 제공됩니다    
<br/><br/>

<br/>  

![LastListModal](https://user-images.githubusercontent.com/81023768/169139725-3bcec28e-d7f4-43c6-a755-937c7733176e.gif)
<br/>

스테이지가 끝나면 한 번 더 할지 다음 단계로 넘어갈지 자연스럽게 선택할 수 있는 모달창이 뜹니다

## 다운로드할 수 있는 곳   
- 배포 심사 중  
[ios]  
[android]  
