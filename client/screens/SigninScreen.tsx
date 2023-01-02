import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../components/CustomText/CustomText';
import { CustomButton } from '../components/CustomButton/CustomButton';
import { CustomTextInput } from '../components/CustomTextInput/CustomTextInput';
import * as kakao from '@react-native-seoul/kakao-login';
import { NaverLoginResponse } from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { Properties } from '../Properties';
import { SafeAreaView } from 'react-native-safe-area-context';

const SigninScreen = ({ navigation }: any) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { getUserInfo } = useUser();
  const { localSignIn, socialSignIn } = useAuth();

  const loginWithLocal = async () => {
    const success = await localSignIn({
      id,
      password,
    });
    if (success) {
      await moveToLoggedScreen();
    }
  };

  const loginWithKakao = async () => {
    const { accessToken }: kakao.KakaoOAuthToken = await kakao.login();
    const success = await socialSignIn({ accessToken, platform: 'kakao' });
    if (success) {
      await moveToLoggedScreen();
    }
  };

  const loginWithNaver = async () => {
    const naverLoginResponse: NaverLoginResponse = await NaverLogin.login({
      appName: Properties.NAVER_APP_NAME,
      consumerKey: Properties.NAVER_CONSUMER_KEY,
      consumerSecret: Properties.NAVER_CONSUMER_SECRET,
      serviceUrlScheme: Properties.NAVER_URL_SCHEME,
    });

    if (naverLoginResponse.isSuccess) {
      const success = await socialSignIn({
        accessToken: naverLoginResponse.successResponse!.accessToken,
        platform: 'naver',
      });
      if (success) {
        await moveToLoggedScreen();
      }
    }
  };

  const moveToLoggedScreen = async () => {
    const user = await getUserInfo().unwrap();
    console.log(user);
    if (user.nickname) {
      navigation.reset({
        routes: [{ name: 'MainScreen' }],
      });
    } else {
      navigation.navigate('UpdateNicknameScreen');
    }
  };

  const moveToSignupScreen = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <View>
        <CustomText style={styles.title}>로그인</CustomText>
        <CustomTextInput
          onChangeText={(text) => setId(text)}
          value={id}
          placeholder="아이디를 입력해주세요."
          textLabel="아이디"
          style={{ marginBottom: 40 }}
        />

        <CustomTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          isPassword={true}
          placeholder="비밀번호를 입력해주세요."
          textLabel="비밀번호"
        />

        <CustomButton
          text="로그인"
          disabled={id.trim() === '' || password.trim() === ''}
          style={{ marginTop: 20 }}
          onPress={() => loginWithLocal()}
        />

        <Text style={styles.signUpText} onPress={() => moveToSignupScreen()}>
          회원가입
        </Text>
      </View>

      <View>
        <View style={styles.socialDescriptionContainer}>
          <View style={styles.socialDescriptionLine} />
          <Text style={styles.socialDescriptionText}>간편 로그인</Text>
          <View style={styles.socialDescriptionLine} />
        </View>

        <TouchableOpacity
          style={{
            ...styles.socialLoginButton,
            backgroundColor: '#FEEB00',
            marginTop: 21,
          }}
          onPress={() => loginWithKakao()}
        >
          <Image
            style={styles.socialLogo}
            source={require('../assets/images/kakaoLogo.png')}
          />
          <Text style={{ ...styles.socialText, color: '#381E1F' }}>
            카카오로 로그인
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.socialLoginButton,
            backgroundColor: '#1EC800',
            marginTop: 14,
          }}
          onPress={() => loginWithNaver()}
        >
          <Image
            style={styles.socialLogo}
            source={require('../assets/images/naverLogo.png')}
          />
          <Text style={{ ...styles.socialText, color: '#ffffff' }}>
            네이버로 로그인
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 38,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 71,
  },
  title: {
    fontSize: 19,
    paddingBottom: 56,
  },
  signUpText: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    marginTop: 14,
    fontSize: 13,
    textAlign: 'center',
    color: '#898888',
  },
  socialDescriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialDescriptionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  socialDescriptionText: {
    paddingLeft: 10,
    paddingRight: 10,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#D2D2D2',
    fontSize: 13,
  },
  socialLoginButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  socialLogo: {
    width: 19,
    height: 19,
  },
  socialText: {
    paddingLeft: 10,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
  },
});

export default SigninScreen;
