//
//  ReactEventEmit.h
//  HSProject
//
//  Created by sunny on 2018/8/21.
//  Copyright © 2018年 admin. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


@interface ReactEventEmit : RCTEventEmitter<RCTBridgeModule>
-(void)goToCashier:(NSString*) result;
@end
