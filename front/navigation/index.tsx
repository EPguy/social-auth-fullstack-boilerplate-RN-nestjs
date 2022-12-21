import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import UpdateNicknameScreen from '../screens/UpdateNicknameScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
