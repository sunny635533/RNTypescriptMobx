import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageURISource,
  Alert,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import { BaseComponent, NavigationScreenProps, BaseComponentProps } from '@src/ui/base-component';
import { NavHeaderWithBack } from '@src/ui/nav/header';
import Assets from '@src/main/assets';
import { autobind } from 'core-decorators';
import { MyRouteServiceImpl } from '@src/services/my-route/impl';
import Picker from 'react-native-picker';
import * as M from '@src/model';
import { isEmptyString } from '@src/util';
import { UpdateRoutesListener } from '@src/ui/my-route/my-route';
import { Constants } from '@src/ui/nav/container';
import { BlockingAnimationKind } from '@src/services/interaction/types';
import { inject } from 'mobx-react';

interface CityArray {
  [name: string]: string[];
}
interface ProvinceArray {
  [name: string]: CityArray[];
}

interface AddRouteScreenState {
  startCity: string;
  endCity: string;
  goodType: string;
}

interface AddRouteScreenProps {
  listener: UpdateRoutesListener;
}

@inject('appStore')
@autobind
export class AddRouteScreen extends BaseComponent<AddRouteScreenProps, AddRouteScreenState> {
  private myRouteService: MyRouteServiceImpl;
  private areaData: ProvinceArray[] = [];
  private goodTypesData: M.GoodTypes[] = [];
  private startCity: string;
  private endCity: string;

  constructor(props: BaseComponentProps<AddRouteScreenProps>) {
    super(props);
    this.myRouteService = new MyRouteServiceImpl(
      this.props.appStore.app.webService,
      this.props.appStore.app.userRole,
      this.props.appStore.app.env);

    this.state = {
      startCity: '选择运输出发地',
      endCity: '选择运输目的地',
      goodType: '不限'
    };
  }

  componentDidMount() {
    this.getCityData();
    this.getGoodTyps();
    console.warn('lang:' + this.props.appStore.states.storage.language +
    '  ,' + this.props.appStore.localStrings.lbl_force_upgrade);
  }

  componentWillUnmount() {
    Picker.hide();
  }

  async getCityData() {
    const result = await this.props.appStore.app.interaction.blockAndWaitFor(
      this.myRouteService.getCityInfoList(),
      { kind: BlockingAnimationKind.None });
    let pArr: ProvinceArray[] = [];
    if (result.success) {
      const provinceList = result.body.filter(c => c.level === 1);
      const cityList = result.body.filter(c => c.level === 2);
      const areaList = result.body.filter(c => c.level === 3);
      provinceList.map(item => {
        let cArr: CityArray[] = [];
        let _data = {};

        cityList.map(c => {
          let _city = {};
          if (c.parentId === item.id) {
            let aArr: string[] = [];
            areaList.map(a => {
              if (a.parentId === c.id) {
                aArr.push(a.name);
              }
            });
            _city = { [c.name]: aArr };
            cArr.push(_city);
          }
        });

        _data = { [item.name]: cArr };
        pArr.push(_data);
      });
    }

    this.areaData = pArr;
  }

  async getGoodTyps() {
    const result = await this.props.appStore.app.interaction.blockAndWaitFor(
      this.myRouteService.getGoodTypesList(),
      { kind: BlockingAnimationKind.None });
    if (result.success) {
      this.goodTypesData = result.body;
    }
  }

  async addRoute() {
    if (isEmptyString(this.startCity) || isEmptyString(this.endCity)) {
      Alert.alert('', '请填写完整的地址信息哦', [{ text: '确定' }]);
      return;
    }
    const goods = this.goodTypesData.find(x => x.value === this.state.goodType);
    const goodsType = goods ? goods.key : -1;
    const params = {
      senderArea: this.startCity,
      recipientArea: this.endCity,
      goodsType: String(goodsType)
    };
    const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.addRoute(params));
    if (result.success) {
      DeviceEventEmitter.emit('showToast', '添加路线成功');
      this.props.navigation.navigate(Constants.ROUTE_MY_ROUTE);
      this.params.listener.getRouteList();
    }
    //  else {
    //   if (Platform.OS === 'ios') {
    //     DeviceEventEmitter.emit('showToast', result.errMsg);
    //   }
    // }
  }

  render() {
    return (
      <View style={styles.flex}>
        <NavHeaderWithBack
          backAction={() => this.props.navigation.goBack()}
          title={'我的路线'} />
        <AddRouteItem
          imageUri={Assets.chezhu.start_city}
          title={'出发地'}
          description={this.state.startCity}
          action={() => this.showPicker(0)} />
        <AddRouteItem
          imageUri={Assets.chezhu.end_city}
          title={'目的地'}
          description={this.state.endCity}
          action={() => this.showPicker(1)} />
        <AddRouteItem
          imageUri={Assets.chezhu.common_goods}
          title={'常运货品'}
          description={this.state.goodType}
          action={() => this.showPicker(2)} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.addRoute}
          style={styles.okButton}>
          <Text style={styles.ok}>确定</Text>
        </TouchableOpacity>
      </View>
    );
  }

  showPicker(kind: number) { // kind:0=>出发地选择，kind:1=>目的地选择，kind:2=>常运货品选择
    let data = [];
    if (kind < 2) {
      data = this.areaData;
    } else {
      data = this.goodTypesData.map(x => x.value);
    }
    if (data.length <= 0) {
      DeviceEventEmitter.emit('showToast', '无相关数据，请检查网络是否正常');
      return;
    }

    Picker.init({
      pickerData: data,
      pickerBg: [255, 255, 255, 1],
      pickerRowHeight: 50,
      pickerCancelBtnText: '取消',
      pickerConfirmBtnText: '确定',
      pickerTitleText: '',
      pickerToolBarBg: [255, 255, 255, 1],
      onPickerConfirm: pickedValue => {
        const value = pickedValue.toString().replace(',', '').replace(',', '');
        switch (kind) {
          case 0:
            this.setState({ startCity: value });
            this.startCity = pickedValue.toString().replace(',', '-').replace(',', '-');
            break;
          case 1:
            this.setState({ endCity: value });
            this.endCity = pickedValue.toString().replace(',', '-').replace(',', '-');
            break;
          case 2: this.setState({ goodType: value }); break;
        }
      },
      onPickerCancel: pickedValue => {
        console.log('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
        console.log('area', pickedValue);
      }
    });
    Picker.show();
  }

}


export interface AddRouteItemProps {
  imageUri: ImageURISource;
  title: string;
  description: string;
  action(): void;
}
export function AddRouteItem(props: AddRouteItemProps): JSX.Element {
  return (<TouchableOpacity
    style={styles.addRouteItem}
    activeOpacity={0.7}
    onPress={props.action}>
    <Image source={props.imageUri} style={styles.image} />
    <Text style={styles.title}>{props.title}</Text>
    <Text style={[styles.description, styles.flex]} lineBreakMode={'tail'} numberOfLines={1}>{props.description}</Text>
    <Image source={Assets.chezhu.item_right_arrow} style={styles.image} />
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  addRouteItem: {
    flexDirection: 'row',
    height: 53,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  image: {
    height: 33,
    resizeMode: 'contain',
  },
  title: {
    marginLeft: 6,
    fontSize: 16,
    color: '#444444'
  },
  description: {
    marginLeft: 6,
    fontSize: 16,
    color: '#aaaaaa'
  },
  ok: {
    fontSize: 20,
    paddingVertical: 11,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#e23f42',
    borderRadius: 5,
    width: 300,
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
  }
});
