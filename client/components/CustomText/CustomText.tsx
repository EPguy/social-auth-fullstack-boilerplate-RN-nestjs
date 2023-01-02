import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function CustomText(props: any) {
  return (
    <Text style={[styles.defaultFontText, props.style]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  defaultFontText: {
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    includeFontPadding: false,
  },
});
