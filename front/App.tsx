import React from 'react';
import { Provider } from 'react-redux';
import store from './store/config';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  const toastConfig = {};
  return (
    <Provider store={store}>
      <Navigation />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
