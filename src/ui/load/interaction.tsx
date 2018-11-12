import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import{ThemeRed} from '@src/ui/colors';
import { BlockingAnimationKind, BlockingAnimationOptions } from '@src/services/interaction/types';
import { FullscreenLoadingView } from '@src/ui/load/loading';

export interface BosImmutableProps {
  opts?: BlockingAnimationOptions;
  // Something like 0.5 - 0.7 is good.
  darkenOverlayOpacity?: number;
}

export class BlockerOverlayLoading extends React.Component<BosImmutableProps, {}> {
  render() {
    let { opts, darkenOverlayOpacity } = this.props;

    // TODO: Option handling is a bit messy.
    opts = opts || {};
    let { text, kind } = opts;
    // | Note that we can't simply use || here since BlockingAnimationKind.None is falsy.
    kind = kind === undefined ? BlockingAnimationKind.DarkenAndSpinner : kind;

    let content: JSX.Element[] = [];
    if (kind & BlockingAnimationKind.Darken) {
      content.push(
        <View
          key='darken'
          style={[styles.overlay, styles.darkBackground, { opacity: darkenOverlayOpacity || 0.3 }]}
        />
      );
    }
    if (kind & BlockingAnimationKind.Spinner) {
      content.push(
        <FullscreenLoadingView key='spinner'>
          {text && <Text style={styles.text}>{text}</Text>}
        </FullscreenLoadingView>
      );
    }
    return (
      <View style={[styles.overlay, { opacity: darkenOverlayOpacity }]}>
        {content}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'white',
  },
});
