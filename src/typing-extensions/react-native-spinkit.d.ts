// This is a pre-es6 style module. See README.md for more details.
declare module 'react-native-spinkit' {
    import {
      ComponentClass,
      Component,
    } from 'react';
    import * as React from 'react-native';
  
    // Supported by both platforms.
    type SpinnerType
      = 'ThreeBounce'
      | 'Wave'
      | '9CubeGrid'
      | 'FadingCircleAlt'
      | 'CircleFlip'
      | 'Bounce'
      | 'WanderingCubes'
      | 'Pulse'
      | 'ChasingDots'
      | 'Circle'
      | 'WordPress'
      | 'FadingCircle'
      | 'Arc'
      | 'ArcAlt';
  
  
    interface SpinnerProps {
      type: SpinnerType;
      color?: string;
      size?: number;
      isVisible?: boolean;
    }
  
    interface Spinner extends ComponentClass<SpinnerProps> {
    }
  
    const Spinner: Spinner;
  
    export = Spinner;
  }
  