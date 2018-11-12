//
//  TFNativeBridge.m
//  ReactNativeSeed
//
//  Created by user on 2017/2/22.
//  Copyright © 2017年 Example. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>
#import "React/RCTConvert.h"
#import "TFLegacyAppConfig.h"

@interface TFNativeBridge: NSObject <RCTBridgeModule>
@end

@implementation TFNativeBridge

RCT_REMAP_METHOD(readLegacyAppStorage,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSUserDefaults *uds = [NSUserDefaults standardUserDefaults];
    TFLegacyAppConfig *appConfig = [TFLegacyAppConfig fromUserDefaults:uds];
    resolve(@{@"appConfig": appConfig ? [appConfig toJson] : [NSNull null]});
}


RCT_EXPORT_METHOD(comeBackNativeController)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:@"comeBackNativeController" object:nil];
    });
}

//RCT_EXPORT_METHOD(goToCashier:(NSString *)payParams resolver:(RCTPromiseResolveBlock)resolve
//                 rejecter:(RCTPromiseRejectBlock)reject){
//    NSLog(@"======== goToCashier ======params:%@",payParams);
//    dispatch_async(dispatch_get_main_queue(), ^{
//        [[NSNotificationCenter defaultCenter] postNotificationName:@"comeToPayTypeView" object:payParams];
//    });
//    resolve(@"");
//}

//RCT_EXPORT_METHOD(updateSessionId:(NSString *)sessionId resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject){
//
//    NSString * old_seesion = [UserDefault objectForKey:SessionId];
//
//    if ([sessionId checkNonempty]) {
//        [UserDefault setObject:sessionId forKey:SessionId];
//        [UserDefault synchronize];
//        NSLog(@"=== updateSessionId success! ,new_sessionId is %@，old_sessionId is %@",[UserDefault objectForKey:SessionId],old_seesion);
//    }else{
//        NSLog(@"=== updateSessionId fail!,sessionId is %@",sessionId);
//    }
//    resolve(sessionId);
//}

//RCT_EXPORT_METHOD(processResponseError:(NSDictionary *)responseObject resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject){
//    NSLog(@"processResponseError responseObject: %@", responseObject);
//    @try {
//        dispatch_async(dispatch_get_main_queue(), ^{
//            if ([[responseObject objectForKey:@"errSerious"] boolValue] == 1 && [[responseObject objectForKey:@"success"] boolValue] == 0) {
//                [[BadMessageObject shareInstance] showBadMessage:responseObject];
//            } else {
//                [[GH_HttpClient shareClient] checkSessionIdWhetherExistsAndSetIt:responseObject fireLog:nil];
//            }
//            resolve(@"success");
//        });
//    }
//    @catch (NSException * e) {
//        NSLog(@"processResponseError Exception: %@", e);
//        reject(@"fail",@"",nil);
//    }
//}
//
///**
// * 根据经纬度跳转到地图
// */
//RCT_EXPORT_METHOD(navigateToMap:(double)latitude withLongitude:(double)longitude withAddress:(NSString*)address){
//    NSLog(@"======= navigateToMap ===== latitude:%f,longitude:%f,address:%@",latitude,longitude,address);
//    [gh_Helper gotoMapWithLatitude:latitude withLongitude:longitude withAddress:address];
//}
//
///**
// * 获取经纬度
// */
//RCT_REMAP_METHOD(getLocation, latLngResolver:(RCTPromiseResolveBlock)resolve latLngrejecter:(RCTPromiseRejectBlock)reject)
//{
//    @try{
//        NSString *lat = [NSString stringWithFormat:@"%f",[Gh_LocationManager shareInstance].ghLatitude];
//        NSString *lng = [NSString stringWithFormat:@"%f",[Gh_LocationManager shareInstance].ghLongTitude];
//        // @"address":[Gh_LocationManager shareInstance].detailAddrStoreess
//        NSDictionary * dic= @{@"lat":lat,@"lng":lng};
//        resolve(dic);
//    }@catch(NSException * e) {
//        NSLog(@"getLatAndLng Exception: %@", e);
//        reject(@"fail",@"",nil);
//    }
//}


RCT_EXPORT_MODULE();

@end
