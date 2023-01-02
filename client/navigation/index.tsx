import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import UpdateNicknameScreen from '../screens/UpdateNicknameScreen';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/config';
import CookieManager from '@react-native-cookies/cookies';
import { Properties } from '../Properties';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigation = useNavigation();
  const { refreshTokenExpired } = useAppSelector((state) => state.auth);

  useEffect(() => {
    CookieManager.get(Properties.AUTH_COOKIE_DOMAIN).then((cookies) => {
      if (cookies.refresh_token) {
        setIsLogged(true);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refreshTokenExpired) {
      navigation.navigate('SigninScreen' as never);
    }
  }, [navigation, refreshTokenExpired]);
  return (
    <>
      {!loading && (
        <Stack.Navigator
          initialRouteName={isLogged ? 'MainScreen' : 'SigninScreen'}
          screenOptions={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSansKR-Regular',
              fontSize: 15,
            },
          }}
        >
          <Stack.Screen
            name="SigninScreen"
            options={{ headerShown: false }}
            component={SigninScreen}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ title: '회원가입' }}
          />
          <Stack.Screen
            name="UpdateNicknameScreen"
            component={UpdateNicknameScreen}
            options={{ title: '닉네임 설정' }}
          />
          <Stack.Screen
            name="MainScreen"
            options={{ headerShown: false }}
            component={MainScreen}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
