
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
                    }else if ([jsonObject isKindOfClass:[NSDictionary class]]) {
                        // Handle JSON dictionary
                        NSDictionary *jsonDictionary = (NSDictionary *)jsonObject;
                        
                        NSString *devKey = jsonDictionary[@"devKey"];
                        NSString *appleId = jsonDictionary[@"appleId"];
                        NSNumber *debugValueNumber = jsonDictionary[@"isDebug"];
                        BOOL debugValue = [debugValueNumber isEqualToNumber:@1];
                        
                        [AppsFlyerLib shared].isDebug = debugValue;
                        [[AppsFlyerLib shared] setAppsFlyerDevKey:devKey];
                        [[AppsFlyerLib shared] setAppleAppID:appleId];
                        [[AppsFlyerLib shared] start];
                    } else {
                        // If jsonObject is not an NSArray, handle the error or unexpected type
                        NSLog(@"Expected a JSON array or map but received a different type.");
                    }
                }
            }
        }
        if ([_arg0 isEqual:@"sentEvents"]){
            NSString *jsonString = _arg1;
            NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
            NSError *error = nil;
            
            id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&error];
            
            if (error) {
                NSLog(@"Error parsing JSON: %@", error);
            } else {
                if ([jsonObject isKindOfClass:[NSArray class]]) {
                    NSArray *jsonArray = (NSArray *)jsonObject;
                    NSArray *event_parameters = jsonArray[1];
                    NSString *event = jsonArray[0];
                    NSMutableDictionary *eventValues = [NSMutableDictionary dictionary];
                        
                    for (NSDictionary *parameter in event_parameters) {
                        NSString *key = parameter[@"key"];
                        id value = parameter[@"value"];
                        if (key && value) {
                            eventValues[key] = value;
                        }
                    }
                    [[AppsFlyerLib shared] logEventWithEventName:event
                            eventValues: eventValues
                            completionHandler:^(NSDictionary<NSString *,id> * _Nullable dictionary, NSError * _Nullable error){
                                if(dictionary != nil) {
                                    NSLog(@"In app callback success:");
                                    for(id key in dictionary){
                                        NSLog(@"Callback response: key=%@ value=%@", key, [dictionary objectForKey:key]);
                                    }
                                }
                                if(error != nil) {
                                    NSLog(@"In app callback error:", error);
                                }
                        }];
                }else if ([jsonObject isKindOfClass:[NSDictionary class]]) {
                    NSDictionary *jsonDictionary = (NSDictionary *)jsonObject;
                    NSArray *event_parameters = jsonDictionary[@"event_parameters"];
                    NSString *event = jsonDictionary[@"event"];
                    NSMutableDictionary *eventValues = [NSMutableDictionary dictionary];
                        
                    for (NSDictionary *parameter in event_parameters) {
                        NSString *key = parameter[@"key"];
                        id value = parameter[@"value"];
                        if (key && value) {
                            eventValues[key] = value;
                        }
                    }
                    [[AppsFlyerLib shared] logEventWithEventName:event
                            eventValues: eventValues
                            completionHandler:^(NSDictionary<NSString *,id> * _Nullable dictionary, NSError * _Nullable error){
                                if(dictionary == nil || error!=nil) {
                                    NSLog(@"In app callback error:", error);

                                }else{
                                    NSLog(@"Event callback succsess", dictionary);
                                    
                                }
                        }];
        
                }else {
                    // If jsonObject is not an NSArray, handle the error or unexpected type
                    NSLog(@"Expected a JSON array or map but received a different type.");
                }
            }
        }
    };
    JsbBridge* a = [JsbBridge sharedInstance];
    [a setCallback:cb];
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
    [m sendToScript:@"send_data_to_script" arg1:jsonString];
}

-(void)onConversionDataFail:(NSError *) error {
    NSLog(@"%@",error);
}




@end
