import React from 'react';
import { Provider } from 'react-redux';
import store from './store/config';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const toastConfig = {};
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Navigation />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
