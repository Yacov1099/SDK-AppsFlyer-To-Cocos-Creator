# AppsFlyer SDK Integration Guide

Welcome to the AppsFlyer SDK integration guide! Follow these steps to integrate the AppsFlyer SDK into your iOS project.

## Before You Start

Before proceeding, ensure you have CocoaPods installed. Follow the tutorial [Install SDK Appsflyer](https://dev.appsflyer.com/hc/docs/install-ios-sdk) for guidance.

## Installation Steps

1. **Download Files:**
   - Download the files `AppsFlyerCocos.h` and `AppsFlyerCocos.mm`.

2. **Integrate with Xcode:**
   - In Xcode, move the file `.mm` inside `Source Files` and the file `.h` inside `Header Files` within your project folder.

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

By following these steps, you'll integrate AppsFlyer SDK seamlessly into your iOS project.

