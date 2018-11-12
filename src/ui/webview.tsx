import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  WebView,
} from 'react-native';
import { BaseComponent, NavigationScreenProps, BaseComponentProps } from '@src/ui/base-component';
import { NavHeaderWithBack, backToNative } from '@src/ui/nav/header';
import Assets from '@src/main/assets';
import { autobind } from 'core-decorators';
import * as M from '@src/model';
import { Constants } from '@src/ui/nav/container';
import { inject } from 'mobx-react';

const { width, height } = Dimensions.get('window');

export interface WebViewProps {
  url: string;
  title: string;
}

@inject('appStore')
@autobind
export class WebViewScreen extends BaseComponent<WebViewProps, {}> {

  constructor(props: BaseComponentProps<WebViewProps>) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {

  }

  render() {
    return (<View style={styles.flex}>
      <NavHeaderWithBack
        backAction={() => this.props.navigation.goBack()}
        title={this.params.title}
        showTransparentBar={true}
      />
      <WebView
        source={{ uri: this.params.url }}
        style={styles.flex}
      />
    </View>);
  }

}


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
});