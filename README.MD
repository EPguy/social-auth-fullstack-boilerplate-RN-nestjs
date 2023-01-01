<p align="center"><img src="https://user-images.githubusercontent.com/36794920/209254022-f8958504-89df-42b0-9ad9-c485dd104b28.png" width="600px"/></p>

![Contributors][contributors-shield]
![Forks][forks-shield]
![Stargazers][stars-shield]
![Issues][issues-shield]
![MIT License][license-shield]

## 소셜로그인 + 일반로그인 React-Native, Nestjs Boilerplate
소셜로그인과 일반로그인 기능이 구현되어있는\
React-Native, Nestjs 풀스택 보일러플레이트입니다.

## 주요 기능

| 이름                      | 설명                                                                                                                                                                                                                                                  |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 카카오, 네이버로그인             | react-native-seoul 에서 제공하는 라이브러리를 사용하여 구현했습니다.<br/>  [react-native-kakao-login](https://github.com/react-native-seoul/react-native-kakao-login)<br/>[react-native-naver-login](https://github.com/react-native-seoul/react-native-naver-login)<br/> |
| 일반로그인                   | ID, Password로 회원가입 및 로그인을 할 수 있습니다.                                                                                                                                                                                                                 | 
| Toast Message                 | 서버에러 혹은 아이디,패스워드 불일치 시 토스트 메시지가 표시됩니다. <br/>아래 라이브러리를 사용하여 구현했습니다.<br/> [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)                                                                                      |
| JWT                     | AccessToken & Refresh Token 인증방식으로 로그인 기능을 구현했습니다.                                                                                                                                                                                                  |
| AuthGuard               | Nestjs에서 제공하는 AuthGuard 라이브러리로 토큰을 검증하여 유저정보를 가져옵니다.                                                                                                                                                                                                |
| RTK Query               | RTK Query 라이브러리를 사용하여 에러 핸들링 및 캐싱을 구현했으며<br/> 서버에 데이터를 요청할 때마다 아래 검증 프로세스를 처리합니다. <br/><br/>1. 액세스 토큰이 만료되었을 경우 리프레시 토큰으로 액세스 토큰을 다시 생성한다.<br/>2. 리프레시 토큰이 만료되었을 경우 로그인 화면으로 강제이동 시킨다.                |

## 로그인 프로세스
### 소셜 로그인 & 회원가입
<img src="https://user-images.githubusercontent.com/36794920/209276295-8ee91382-563d-4c34-826c-6470e1e6e142.png"/>

### 일반 로그인 & 회원가입
<img src="https://user-images.githubusercontent.com/36794920/209276494-f99f5bdf-5e40-48fd-9632-ef3a1d4bff5c.png"/>

## DB 구조
<img src="https://user-images.githubusercontent.com/36794920/209276600-edcb8269-6308-4afb-8605-379473ac0510.png"/>

## 실행방법
### Client
client 폴더로 경로 이동 합니다.\
`cd client`

아래 명령어로 패키지를 설치해주세요.\
`npm install`

Android는 아래 명령어로 실행합니다.\
`npm run android`

IOS는 아래 명령어로 실행합니다.(작업중)\
`bundle install`\
`npx pod-install`\
`npm run ios`

### Server
server 폴더로 경로 이동 합니다.\
`cd server`

아래 명령어로 서버를 실행합니다.\
`npm run start:dev`

## API KEY 설정
소셜 로그인 API KEY는 이미 프로젝트에 설정되어있지만\
여러분들의 API KEY로 변경하고 싶다면 아래 레포지토리에 있는 설명을 참고해주세요.  
참고로 네이버 로그인 API KEY에 대한 설정은 `/client/Properties.js`에서 관리하고 있습니다.\
[카카오 로그인 API 설정](https://github.com/react-native-seoul/react-native-kakao-login#post-installation)<br/>
[네이버 로그인 API 설정](https://github.com/react-native-seoul/react-native-naver-login#installation)

## 로드맵
- [x] Android 작동 테스트
- [ ] IOS 작동 테스트
- [ ] 화면 디자인
- [ ] `Tistory`에 클라이언트에 대한 아티클 작성
- [ ] `Tistory`에 서버에 대한 아티클 작성
- [ ] API Swagger 사용하여 API 문서화

## 프로젝트 기여
### 오류, 건의
오류나 건의사항이 있다면 [이슈트래커](https://github.com/EPguy/social-login-fullstack-boilerplate/issues)에 등록해주세요.
### 풀 리퀘스트
코드 수정이나 추가는 풀 리퀘스트(PR)를 보내주세요.

[contributors-shield]: https://img.shields.io/github/contributors/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[issues-shield]: https://img.shields.io/github/issues/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
