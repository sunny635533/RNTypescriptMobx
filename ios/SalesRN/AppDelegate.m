/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  NSString *host = [[NSString alloc] init];
#if TARGET_IPHONE_SIMULATOR
  host = @"localhost";
#else
  host = @"192.168.174.252";
#endif
  NSString *url = [@"http://localhost:8081/index.bundle?platform=ios" stringByReplacingOccurrencesOfString:@"localhost" withString:host];
#ifdef DEBUG
  jsCodeLocation = [NSURL URLWithString:url];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
   NSString *targetName = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleExecutableKey];//获取target名称
  NSDictionary *initProps = @{@"envName" :targetName};
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Main"
                                               initialProperties:initProps
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
