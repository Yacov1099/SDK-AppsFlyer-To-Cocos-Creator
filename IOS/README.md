## Before You Start

- Before proceeding, ensure you have CocoaPods installed.

## Installation Steps

1. **Download Files:**
   - Download the files `AppsFlyerCocos.h` and `AppsFlyerCocos.mm`.

2. **Move to files .mm and h.**
   - Move files `.mm` and `.h` inside the directory /Your_project/native/engine/ios/.

3.**Update and open project**
   - Go to Your_project/build/ios/proj/ and create Podfile file and set pod 'AppsFlyerFramework' (or dowload our Podfile and change project       name, that maybe also ended with "-mobile").
   - In Terminal, go to your Your_project/build/ios/proj/ and make "pod install". If you sucessed, will create .xworkspace project. Open it.
     
4.  **Update your project:**
   - Inside of .xworspace, in "Your_project-mobile" directory, has directory Source Files and Header files. If you do right click one of them, wiil shows option "Add files 'Your_project'". Make this with `.mm` file in Source Files and `.h` in Header Files.
   - In AppDelegate.mm, import `AppsFlyerCocos.h` by adding `#import "AppsFlyerCocos.h"` at the top.
   - Still in AppDelegate.mm, within the `application` method, before the `return` statement, add the following lines:
     ```objective-c
     AppsFlyerCocos *appsFlyer = [[AppsFlyerCocos alloc] init];
     [appsFlyer start];
     ```

5. **Build and Run:**
   - Build your project and run it.

By following these steps, you'll seamlessly integrate the AppsFlyer SDK into your Cocos project.
