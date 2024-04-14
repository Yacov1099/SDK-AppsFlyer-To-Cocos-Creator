//
//  AppsFlyerCocos.m
//  testing_game-mobile
//
//  Created by Israel1 on 14/04/2024.
//




#import "AppsFlyerCocos.h"




@implementation AppsFlyerCocos

- (void)start {
    [AppsFlyerLib shared].delegate = self;
    
    static ICallback cb = ^void (NSString* _arg0, NSString* _arg1){
        if ([_arg0 isEqual:@"startSDK"]){
            @autoreleasepool {
                NSString *jsonString = _arg1;
                NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
                NSError *error = nil;
                id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&error];
                if (error) {
                    NSLog(@"Error parsing JSON: %@", error);
                } else {
                    if ([jsonObject isKindOfClass:[NSArray class]]) {
                        // The JSON is an array, so we cast jsonObject to an NSArray
                        NSArray *jsonArray = (NSArray *)jsonObject;
                        BOOL debugValue = [jsonArray[1] isEqualToNumber:@1];
                        [AppsFlyerLib shared].isDebug = debugValue;
                        [[AppsFlyerLib shared] setAppsFlyerDevKey:jsonArray[0]];
                        [[AppsFlyerLib shared] setAppleAppID:jsonArray[2]];
                        [[AppsFlyerLib shared] start];
                    } else {
                        // If jsonObject is not an NSArray, handle the error or unexpected type
                        NSLog(@"Expected a JSON array but received a different type.");
                    }
                }
            }
        }
    };
    
   // CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
        JsbBridge* a = [JsbBridge sharedInstance];
        [a setCallback:cb];
   // });
}

- (void)onConversionDataSuccess:(NSDictionary*)installData {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:installData options:NSJSONWritingPrettyPrinted error:&error];
    
    if (!jsonData) {
        NSLog(@"Error converting NSDictionary to JSON: %@", error.localizedDescription);
        return;
    }
    
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    JsbBridge* m = [JsbBridge sharedInstance];
    [m sendToScript:@"sendToJs" arg1:jsonString];
}

-(void)onConversionDataFail:(NSError *) error {
    NSLog(@"%@",error);
}

@end
