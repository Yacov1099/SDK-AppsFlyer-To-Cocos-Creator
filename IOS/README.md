## Before You Start

1. Before proceeding, ensure you have CocoaPods installed.
2. Follow the [Install SDK Appsflyer](https://dev.appsflyer.com/hc/docs/install-ios-sdk) tutorial to install the AppsFlyer SDK.

## Installation Steps

1. **Download Files:**
   - Download the files `AppsFlyerCocos.h` and `AppsFlyerCocos.mm`.

2. **Integrate with Xcode:**
   - In Xcode, move the file `.mm` inside the `Source Files` directory and the file `.h` inside the `Header Files` directory within your project folder.

3. **Update AppDelegate:**
   - Open `AppDelegate` in your project folder.
   - Import `AppsFlyerCocos.h` by adding `#import "AppsFlyerCocos.h"` at the top.
   - Within the `application` method, before the `return` statement, add the following lines:
     ```objective-c
     AppsFlyerCocos *appsFlyer = [[AppsFlyerCocos alloc] init];
     [appsFlyer start];
     ```

4. **Build and Run:**
   - Build your project and run it.

By following these steps, you'll seamlessly integrate the AppsFlyer SDK into your Cocos project.
