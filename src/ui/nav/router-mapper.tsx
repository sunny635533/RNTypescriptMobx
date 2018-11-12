import * as React from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { BaseComponent, BaseComponentProps, NavigationScreenProps } from '@src/ui/base-component';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';

/**
 * 原生项目侧边栏点击跳转，根据routeName来选择导航器
 */
@inject('appStore')
@autobind
export class RouterMapperScreen extends BaseComponent<{}, {}> {

  constructor(props: BaseComponentProps<{}>) {
    super(props);
    this.bootstrapAsync();
  }

  async bootstrapAsync() {
    this.props.navigation.navigate('MyRouteNavigator', {});
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});