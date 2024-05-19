## Before You Start

- Make sure you have CocoaPods installed.

## Installation Steps

1. **Download Files:**
   - Download [`AppsFlyerCocos.h`](AppsFlyerCocos.h),[`AppsFlyerCocos.mm`](AppsFlyerCocos.mm),[`AppsFlyerInit.mm`](AppsFlyerInit.mm) and [`AppsFlyerInit.h`](AppsFlyerInit.h).

2. **Move Files:**
   - Move `.mm` and `.h` files to `/Your_project/native/engine/ios/` directory.

3. **Update and Open Project:**
   - Navigate to `/Your_project/build/ios/proj/`.
   - Create a `Podfile` in this directory and add `pod 'AppsFlyerFramework'`.
   - In Terminal, navigate to `/Your_project/build/ios/proj/` and run `pod install`.
   - This will create a `.xworkspace` project. Open it.

4. **Update Your Project:**
   - In `.xworkspace`, find the "Your_project-mobile" directory.
   - Inside "Source Files" and "Header Files", right-click and select "Add files 'Your_project'".
   - Add `.mm` files to "Source Files" and `.h` files to "Header Files".
   
5. **Build and Run:**
   - Build and run your project.
