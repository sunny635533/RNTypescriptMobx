import * as React from 'react';
import {
  NavigationScreenProps
} from 'react-navigation';
import { autobind } from 'core-decorators';
// import { AppContext } from '@src/main/app';
import { LocalizedStrings } from '@src/services/app/types';

import AppStore, { AppContext } from '@src/mobx/app-context';
import { observable } from 'mobx';

export {
  NavigationScreenProps,
  AppStore
};


export interface AppSoterProp {
  appStore: AppContext;
}

export type BaseComponentProps<P> = NavigationScreenProps<P> & AppSoterProp;

@autobind
export class BaseComponent<P = {}, S = {}> extends React.Component<BaseComponentProps<P>, S> {
  @observable
  public strings: LocalizedStrings;
  // public appContext: AppContext;
  public params: P;

  constructor(props: BaseComponentProps<P>) {
    super(props);
    this.strings = AppStore.app.localizedStrings;
    this.params = this.getNavigationParams();
  }

  getNavigationParams() {
    if (this.props.navigation.state.params) {
      return this.props.navigation.state.params;
    }
    const msg = `absurd: BaseComponent navigation.state.params is ${this.props.navigation.state.params}`;
    // console.log(msg);
    return Object.assign({});
  }

}
