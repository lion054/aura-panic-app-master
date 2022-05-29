import { Platform, StyleSheet } from 'react-native';

export const displayFontStyles = StyleSheet.create({
  light: Platform.select({
    ios: {
      fontFamily: 'SFUIDisplay-Light',
      fontWeight: '300'
    },
    android: {
      fontFamily: 'SF-UI-Display-Light'
    }
  }),
  regular: Platform.select({
    ios: {
      fontFamily: 'SFUIDisplay-Regular',
      fontWeight: '400'
    },
    android: {
      fontFamily: 'SF-UI-Display-Regular'
    }
  }),
  medium: Platform.select({
    ios: {
      fontFamily: 'SFUIDisplay-Medium',
      fontWeight: '500'
    },
    android: {
      fontFamily: 'SF-UI-Display-Medium'
    }
  }),
  semibold: Platform.select({
    ios: {
      fontFamily: 'SFUIDisplay-Semibold',
      fontWeight: '600'
    },
    android: {
      fontFamily: 'SF-UI-Display-Semibold'
    }
  })
});

export const textFontStyles = StyleSheet.create({
  light: Platform.select({
    ios: {
      fontFamily: 'SFUIText-Light',
      fontWeight: '300'
    },
    android: {
      fontFamily: 'SF-UI-Text-Light'
    }
  }),
  regular: Platform.select({
    ios: {
      fontFamily: 'SFUIText-Regular',
      fontWeight: '400'
    },
    android: {
      fontFamily: 'SF-UI-Text-Regular'
    }
  }),
  medium: Platform.select({
    ios: {
      fontFamily: 'SFUIText-Medium',
      fontWeight: '500'
    },
    android: {
      fontFamily: 'SF-UI-Text-Medium'
    }
  }),
  semibold: Platform.select({
    ios: {
      fontFamily: 'SFUIText-Semibold',
      fontWeight: '600'
    },
    android: {
      fontFamily: 'SF-UI-Text-Semibold'
    }
  })
});
