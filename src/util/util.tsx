import { Linking, ImageURISource, DeviceEventEmitter } from 'react-native';
import Assets from '@src/main/assets';

export function isEmptyString(s: string | undefined | null): boolean {
  if (typeof s === 'string') {
    if (s.trim().length > 0) {
      return false;
    }
  }
  return true;
}

export function getDefaultString(s: string | undefined | null): string {
  if (s !== undefined && s !== null && !isEmptyString(s)) {
    return s;
  } else {
    return '';
  }
}

export function transformDistance(distance: number): string {
  if (distance >= 1000) {
    return (distance / 1000).toFixed(1) + 'km';
  }
  return distance + 'm';
}

export async function outOfAppLink(uri: string) {

  if (await Linking.canOpenURL(uri)) {
    Linking.openURL(uri);
  } else {
    console.warn(`Linking: failed to open ${uri}`);
  }
}

export async function telephoneLink(phone: string) {
  if (!isEmptyString(phone)) {
    outOfAppLink('tel:' + phone);
  } else {
    DeviceEventEmitter.emit('showToast', '电话是空号');
    console.warn(`Linking tel is null: ${phone}`);
  }
}

export function defaultHttpImage(imageUrl: string, defaultImage?: ImageURISource): ImageURISource {
  if (isEmptyString(imageUrl)) {
    return defaultImage ? defaultImage : Assets.chezhu.oil;
  }
  return { uri: imageUrl };
}

export function getHttpImageWithSize(imageUrl: string, width: number = 350, height: number = 350, defaultImage?: ImageURISource, ): ImageURISource {
  if (width !== 0 && height !== 0) {
    imageUrl = `${imageUrl}.${width}X${height}`;
  }
  return defaultHttpImage(imageUrl, defaultImage);
}