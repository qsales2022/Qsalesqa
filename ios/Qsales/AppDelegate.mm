
#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBAEMKit/FBAEMKit-Swift.h>
#import <React/RCTLinkingManager.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdSupport/AdSupport.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Configure Firebase
  [FIRApp configure];

  // Set the module name for React Native
  self.moduleName = @"Qsales";

  // Set initial props if needed
  self.initialProps = @{};

  // Initialize Facebook SDK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];

  // Request tracking authorization for iOS 14+
  if (@available(iOS 14, *)) {
    [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
      // Handle tracking authorization status if needed
    }];
  }

  // Call the superclass's implementation
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// - (BOOL)application:(UIApplication *)application
//             openURL:(NSURL *)url
//             options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   // Configure and enable Facebook AEM Reporter
//   [FBAEMReporter configureWithNetworker:nil appID:@"1282934382523657" reporter:nil];
//   [FBAEMReporter enable];
//   [FBAEMReporter handle:url];
  
//   // Check if the Facebook SDK can handle the URL
//   if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
//     return YES;
//   }

//   // Check if the URL is a deep link handled by React Native
//   if ([RCTLinkingManager application:application openURL:url options:options]) {
//     return YES;
//   }

//   // Fallback to React Native deep linking manager
//   return [RCTLinkingManager application:application openURL:url options:options];
// }
  - (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [[FBSDKApplicationDelegate sharedInstance]application:app
                                                      openURL:url
                                                      options:options];
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application 
continueUserActivity:(nonnull NSUserActivity *)userActivity
restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}



- (BOOL)concurrentRootEnabled
{
  return true;
}

@end