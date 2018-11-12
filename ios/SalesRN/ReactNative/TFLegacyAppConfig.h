//
//  TFLegacyAppConfig.h
//  Staging
//
//  Created by BigDear on 2018/8/13.
//  Copyright © 2018年 admin. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TFLegacyAppConfig : NSObject
@property (strong, nonatomic) NSString *language;
-(NSDictionary*)toJson;
+(id)fromUserDefaults:(NSUserDefaults*)uds;
@end
