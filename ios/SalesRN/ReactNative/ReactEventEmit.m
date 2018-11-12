//
//  ReactEventEmit.m
//  HSProject
//
//  Created by sunny on 2018/8/21.
//  Copyright © 2018年 admin. All rights reserved.
//

#import "ReactEventEmit.h"

@implementation ReactEventEmit

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(ReactEventEmit);

+ (id)allocWithZone:(NSZone *)zone {
    static ReactEventEmit *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}


-(NSArray<NSString *> *)supportedEvents{
    return @[@"goToCashier"];
}

-(void)goToCashier:(NSString*) result
{
    NSLog(@"======== cashierSuccess ========== %@",result);
    [self sendEventWithName:@"goToCashier" body:@{@"result": result}];
}

@end
