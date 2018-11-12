import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Assets from '@src/main/assets';

export function EmptyRouteView(props: { addRoute: () => void }): JSX.Element {
  return (<View style={styles.emptyContainer}>
    <Image source={Assets.chezhu.empty} style={styles.empytImage} />
    <Text style={styles.emptyTitle}>暂无路线消息</Text>
    <Text style={styles.emptyDescription}>添加路线，将有更多运输机会哦</Text>
    <TouchableOpacity onPress={props.addRoute} style={styles.addRouteButton}>
      <Text style={styles.emptyAddRoute}>添加路线</Text>
    </TouchableOpacity>
  </View>);
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  empytImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    marginTop: 50,
    marginBottom: 20
  },
  emptyTitle: {
    fontSize: 20,
  },
  emptyDescription: {
    color: '#999999',
    marginTop: 12,
    marginBottom: 25
  },
  addRouteButton: {
    borderRadius: 5,
    backgroundColor: '#e23f42',
    width: 300,
  },
  emptyAddRoute: {
    fontSize: 20,
    paddingVertical: 11,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});