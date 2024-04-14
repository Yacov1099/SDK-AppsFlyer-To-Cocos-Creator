
Before you start:
-You will need Cocoaspods and folow only tutorial Install SDK Appsflyer in link (https://dev.appsflyer.com/hc/docs/install-ios-sdk)

1. Download the files AppsFlyerCocos.h and AppsFlyerCocos.mm
2. In Xcode, move the file .mm inside Source Files and file .h inside Header Files in your folder project
3. In AppDelegate (in your folder project):
   - Make #import "AppsFlyerCocos.h"
   - In application method, before return, add lines:
        AppsFlyerCocos *appsFlyer = [[AppsFlyerCocos alloc] init];
        [appsFlyer start];
  4. Build your project and run.
