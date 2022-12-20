import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './store/config';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <LoginScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
