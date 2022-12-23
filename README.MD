<p align="center"><img src="https://user-images.githubusercontent.com/36794920/209254022-f8958504-89df-42b0-9ad9-c485dd104b28.png" width="600px"/></p>

![Contributors][contributors-shield]
![Forks][forks-shield]
![Stargazers][stars-shield]
![Issues][issues-shield]
![MIT License][license-shield]

## 소셜로그인 + 일반로그인 + 투두리스트 React-Native, Nestjs Boilerplate
소셜로그인과 일반로그인, 투두리스트 기능이 구현되어있는 보일러플레이트입니다.

## 주요 기능

| 이름                      | 설명                                                                                                                                                                                                                                                  |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 카카오, 네이버로그인             | react-native-seoul 에서 제공하는 라이브러리를 사용하여 구현했습니다.<br/>  [react-native-kakao-login](https://github.com/react-native-seoul/react-native-kakao-login)<br/>[react-native-naver-login](https://github.com/react-native-seoul/react-native-naver-login)<br/> |
| 일반로그인                   | ID, Password로 회원가입 및 로그인을 할 수 있습니다.                                                                                                                                                                                                                 |
| TodoList                | 간단한 투두리스트 기능이 구현되어있습니다.                                                                                                                                                                                                                             | 
| 토스트 메시지                 | 서버에러 혹은 아이디,패스워드 불일치 시 토스트 메시지가 표시됩니다. <br/>아래 라이브러리를 사용하여 구현했습니다.<br/> [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)                                                                                      |
| JWT                     | AccessToken & Refresh Token 인증방식으로 로그인 기능을 구현했습니다.                                                                                                                                                                                                  |
| AuthGuard               | Nestjs에서 제공하는 AuthGuard 라이브러리로 토큰을 검증하여 유저정보를 가져옵니다.                                                                                                                                                                                                |
| RTK Query               | RTK Query 라이브러리를 사용하여 에러 핸들링 및 캐싱기능을 구현했으며<br/> 서버에 데이터를 요청할 때마다 아래의 검증 프로세스를 처리합니다. <br/><br/>1. 액세스 토큰이 만료되었을 경우 리프레시 토큰으로 액세스 토큰을 다시 생성한다.<br/>2. 리프레시 토큰이 만료되었을 경우 로그인 화면으로 강제이동 시킨다.                                                           |
| Cursor-based Pagination | 투두리스트 무한 스크롤을 구현하기 위해 커서 기반 페이지네이션 방법을 사용하였습니다.                                                                                                                                                                                                     |

## 로그인 프로세스

## DB 구조

## API KEY 설정
소셜로그인에 대한 API KEY 설정은 세팅 되어있지만\
여러분들의 API KEY로 변경하고 싶다면 아래 레포지토리에 있는 설명을 참고해주세요.  
참고로 네이버 로그인 API KEY에 대한 설정은 `/client/Properties.js`에서 관리하고 있습니다.\
[react-native-kakao-login](https://github.com/react-native-seoul/react-native-kakao-login)<br/>[react-native-naver-login](https://github.com/react-native-seoul/react-native-naver-login)

## 로드맵
- [ ] 화면 디자인
- [ ] `Tistory`에 프로젝트에 대한 아티클 작성
- [ ] API Swagger 사용하여 API 문서화


[contributors-shield]: https://img.shields.io/github/contributors/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[issues-shield]: https://img.shields.io/github/issues/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/EPguy/social-login-fullstack-boilerplate.svg?style=for-the-badge
