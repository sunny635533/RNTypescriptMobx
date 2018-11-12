import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Modal,
  StyleProp,
  TextStyle,
} from 'react-native';
import { BaseComponent, BaseComponentProps, NavigationScreenProps } from '@src/ui/base-component';
import { NavHeaderWithBack, backToNative } from '@src/ui/nav/header';
import { Constants } from '@src/ui/nav/container';
import { MyRouteServiceImpl } from '@src/services/my-route/impl';
import * as M from '@src/model';
import { ThemeRed } from '@src/ui/colors';
import { autobind } from 'core-decorators';
import { EmptyRouteView } from '@src/ui/my-route/components';
import { BlockingAnimationKind } from '@src/services/interaction/types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import AppStore from '@src/mobx/app-context';

interface MyRouteScreenProps {
}

// interface MyRouteScreenState {
//   routeList: M.MyRoute[];
//   showDeleteModal: boolean;
// }

export interface UpdateRoutesListener {
  getRouteList(): void;
}

@inject('appStore')
@observer
@autobind
export class MyRouteScreen extends BaseComponent<MyRouteScreenProps> implements UpdateRoutesListener {
  private myRouteService: MyRouteServiceImpl;
  private deleteRouteId: string = ''; // 保存要将删除的id

  @observable routeList: M.MyRoute[] = [];
  @observable showDeleteModal: boolean = false;

  get routList() {
    return this.routeList;
  }

  set routList(list: M.MyRoute[]) {
    this.routeList = list;
  }

  get getShowDeleteModal() {
    return this.showDeleteModal;
  }

  set setShowDeleteModal(visible: boolean) {
    this.showDeleteModal = visible;
  }


  constructor(props: BaseComponentProps<MyRouteScreenProps>) {
    super(props);
    // this.myRouteService = new MyRouteServiceImpl(
    //   this.appContext.app.webService,
    //   this.appContext.app.userRole,
    //   this.appContext.app.env);
    // this.state = {
    //   routeList: [],
    //   showDeleteModal: false,
    // };

    this.myRouteService = new MyRouteServiceImpl(
      AppStore.app.webService,
      AppStore.app.userRole,
      AppStore.app.env);
  }

  async componentDidMount() {
    console.warn('lang:' + this.props.appStore.states.storage.language +
      '  ,' + this.props.appStore.localStrings.lbl_force_upgrade);
    await this.props.appStore.changedStoreLang('cn');
    this.getRouteList();
  }

  @action
  async getRouteList() {
    const result = await this.props.appStore.app.interaction.blockAndWaitFor(
      this.myRouteService.getRouteList(),
      { kind: BlockingAnimationKind.None });
    if (result.success) {
      const myRouteList = result.body;
      if (myRouteList && myRouteList.length > 0) {
        // this.setState({
        //   routeList: myRouteList,
        // });
        this.routeList = myRouteList;
      }
    }
  }

  @action
  async deleteRoute(id: string) {
    const result = await this.props.appStore.app.interaction.blockAndWaitFor(
      this.myRouteService.deleteRoute({ id }),
      { kind: BlockingAnimationKind.Spinner });
    if (result.success) {
      const delteRouteIndex = this.routeList.findIndex(r => r.id === id);
      this.routeList.splice(delteRouteIndex, 1);
      if (this.routeList.length <= 0) {
        this.routeList = [];
      }

      // const delteRouteIndex = this.state.routeList.findIndex(r => r.id === id);
      // this.state.routeList.splice(delteRouteIndex, 1);
      // if (this.state.routeList.length <= 0) {
      //   this.setState({
      //     routeList: []
      //   });
      // }
    }
    // this.setState({ showDeleteModal: false });

    this.showDeleteModal = false;
  }


  render() {
    return (
      <View style={styles.flex}>
        <NavHeaderWithBack
          backAction={backToNative}
          title={'我的路线'}
          rightButtons={[{
            action: () => this.props.navigation.navigate(Constants.ROUTE_ADD_ROUTE, { listener: this }),
            title: '添加'
          }]}
        />
        {this.getRouteListView()}
        {this.deleteModal()}
      </View>
    );


  }

  getRouteListView() {
    if (this.routeList.length <= 0) {
      return <EmptyRouteView addRoute={() => { this.props.navigation.navigate(Constants.ROUTE_ADD_ROUTE, { listener: this }); }} />;
    } else {
      return <FlatList
        style={{ flex: 1, paddingTop: 10 }}
        contentContainerStyle={{}}
        data={this.routeList}
        renderItem={this.renderItem}
        keyExtractor={(item: M.MyRoute) => item.id}
        horizontal={false}
      />;
    }
  }

  renderItem(info: ListRenderItemInfo<M.MyRoute>) {
    const route = info.item;
    return (<TouchableOpacity
      key={route.id}
      style={styles.renderRow}
      activeOpacity={0.7}
      onLongPress={() => {
        // this.setState({
        //   showDeleteModal: true
        // });
        this.showDeleteModal = true;
        this.deleteRouteId = route.id;
      }
      }>
      <View style={styles.greenLine} />
      {this.renderAdddress(route.senderCity, route.senderDistrict)}
      <View style={styles.grayLineContainer}>
        <View style={styles.grayLine} />
      </View>
      {this.renderAdddress(route.recipientCity, route.recipientDistrict)}
      <Text style={styles.goodsName}>{route.goodsTypeName}</Text>
    </TouchableOpacity >);
  }

  renderAdddress(city: string, district: string): JSX.Element {
    return (<View >
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.district}>{district}</Text>
    </View>);
  }

  deleteModal(): JSX.Element {
    return <Modal
      transparent={true}
      visible={this.showDeleteModal}
      onRequestClose={() => { }}>
      <TouchableOpacity
        style={styles.modalBg}
        onPress={() => {
          // this.setState({ showDeleteModal: false });
          this.showDeleteModal = false;
        }}>
        <View >
          {this.renderDeleteItem('确定要删除路线吗？', undefined, { fontSize: 16 }, { marginBottom: 1 })}
          {this.renderDeleteItem('确定', () => { this.deleteRoute(this.deleteRouteId); }, { color: 'black' }, { marginBottom: 5 })}
          {this.renderDeleteItem('取消', () => {
            // this.setState({ showDeleteModal: false });
            this.showDeleteModal = false;
          }, { color: 'red' })}
        </View>
      </TouchableOpacity>
    </Modal>;
  }

  renderDeleteItem(title: string, action?: () => void, titleStyle?: StyleProp<TextStyle>, touchStyle?: StyleProp<TextStyle>): JSX.Element {
    return (<TouchableOpacity style={[styles.deleteItem, touchStyle]} onPress={action} >
      <Text style={[styles.deleteItemText, titleStyle]}>{title}</Text>
    </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  renderRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  greenLine: {
    width: 4,
    height: 55,
    backgroundColor: ThemeRed.GLightGreen,
    marginRight: 10,
  },
  city: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center'
  },
  district: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center'
  },
  grayLineContainer: {
    flex: 1,
    alignItems: 'center'
  },
  grayLine: {
    width: 30,
    height: 1,
    backgroundColor: '#aaaaaa'
  },
  goodsName: {
    flex: 2,
    fontSize: 18,
    color: '#333333',
    textAlign: 'center'
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end'
  },
  deleteItem: {
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteItemText: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

});
