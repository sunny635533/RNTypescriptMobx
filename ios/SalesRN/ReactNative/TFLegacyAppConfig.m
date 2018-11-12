//
//  TFLegacyAppConfig.m
//  Staging
//
//  Created by BigDear on 2018/8/13.
//  Copyright © 2018年 admin. All rights reserved.
//

#import "TFLegacyAppConfig.h"

@implementation TFLegacyAppConfig
-(instancetype)initWithLang:(NSString*)lang{
    if ([super init]) {
        self.language = lang;
    }
    return self;
}

-(NSDictionary*)toJson{
    return @{
             @"language":_language,
             @"notificationEnabled":@0
             };
}
+(id)fromUserDefaults:(NSUserDefaults *)uds{
    NSString*lang = [uds objectForKey:@"languageKey"] ? [uds objectForKey:@"languageKey"]:@"cn";
    TFLegacyAppConfig*tflegacyAppConfig = [[TFLegacyAppConfig alloc]initWithLang:lang];
    return tflegacyAppConfig;
}
@end
