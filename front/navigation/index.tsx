import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import UpdateNicknameScreen from '../screens/UpdateNicknameScreen';
import { useEffect } from 'react';
import { useAppSelector } from '../store/config';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const navigation = useNavigation();
  const { refreshTokenExpired } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (refreshTokenExpired) {
      navigation.navigate('SigninScreen' as never);
    }
  }, [navigation, refreshTokenExpired]);
  return (
    <>
      <Stack.Navigator
        initialRouteName="SigninScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen
          name="UpdateNicknameScreen"
          component={UpdateNicknameScreen}
        />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      </Stack.Navigator>
    </>
  );
}
