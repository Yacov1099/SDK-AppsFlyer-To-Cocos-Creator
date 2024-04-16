//
//  AppsFlyerCocos.h
//  testing_game
//
//  Created by Israel1 on 14/04/2024.
//

#import <AppsFlyerLib/AppsFlyerLib.h>
#import "cocos.h"
#include "platform/apple/JsbBridge.h"
#import <Foundation/Foundation.h>

#ifndef AppsFlyerCocos_h
#define AppsFlyerCocos_h

@interface AppsFlyerCocos : NSObject <AppsFlyerLibDelegate>

- (void)start;
- (void)onConversionDataSuccess:(NSDictionary*)installData;

#endif /* AppsFlyerCocos_h */
@end
