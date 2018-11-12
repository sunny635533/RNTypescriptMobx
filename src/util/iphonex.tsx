import {
    Dimensions,
    Platform,
  } from 'react-native';
const { width, height } = Dimensions.get('window');

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function isIphoneX() {
    return (
      Platform.OS === 'ios' &&
      ((height === X_HEIGHT && width === X_WIDTH) ||
        (height === X_WIDTH && width === X_HEIGHT))
    );
  }