import * as React from 'react';
import {
  Text,
  TextStyle,
  TextProperties
} from 'react-native';

export interface ScaleTextProps {
  text: String | undefined;
  style?: TextStyle | TextStyle[];
  textProps?: TextProperties;
  onPress?: () => void;
}

export function ScaleText(ps: ScaleTextProps): JSX.Element {
  return (
    <Text style={ps.style} allowFontScaling={false} onPress={ps.onPress} {...ps.textProps}>
      {ps.text ? ps.text : ''}
    </Text >
  );
}