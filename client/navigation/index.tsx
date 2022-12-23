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
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen
            name="UpdateNicknameScreen"
            component={UpdateNicknameScreen}
          />
          <Stack.Screen name="MainScreen" component={MainScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}
