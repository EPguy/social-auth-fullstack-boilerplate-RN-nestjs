import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  text: string;
  disabled: boolean;
  onPress: () => void;
  style?: {};
}

export function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={
        props.disabled
          ? { ...props.style, ...styles.button, ...styles.buttonDisabled }
          : { ...props.style, ...styles.button, ...styles.buttonEnabled }
      }
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <Text style={props.disabled ? styles.textDisabled : styles.textEnabled}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    height: 46,
  },
  buttonEnabled: {
    backgroundColor: '#2670F6',
  },
  buttonDisabled: {
    backgroundColor: '#EEEEEE',
  },
  textEnabled: {
    color: '#ffffff',
  },
  textDisabled: {
    color: '#D2D2D2',
  },
});
