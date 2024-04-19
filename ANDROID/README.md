## Integration Steps for Android (Cocos Project)

Follow these steps to integrate the AppsFlyer SDK into your Cocos game for Android devices:

1. **Download and Add File:**
   - Download the file and add it inside Android Studio to `yourProjectName\native\engine\android\app\src\com\cocos\game`.

2. **Update Manifest File:**
   - Go to your `AndroidManifest.xml` file inside your project.
   - Replace the second line with:
     ```xml
     <manifest xmlns:android="http://schemas.android.com/apk/res/android" android:installLocation="auto" xmlns:tools="http://schemas.android.com/tools" package="your.package.name">
     ```

3. **Update build.gradle:**
   - Open `build.gradle` (Module: `project-name`) file.
   - Add the following line at the end of the `dependencies` block:
     ```gradle
     implementation 'com.appsflyer:af-android-sdk:6.13.0' //or latest version
     implementation 'androidx.annotation:annotation-jvm:1.7.1'
     ```

4. **Sync Project with Gradle Files:**
   - Open Android Studio.
   - Click on "Sync Project with Gradle Files" in the toolbar.

5. **Update appActivity.java:**
   - Add the following lines in `appActivity.java` file at the end of `onStart` method:
     ```java
     AppsFlyerCocos afc = new AppsFlyerCocos();
     afc.start(this);
     ```

6. **Build and Run:**
   - Build the project in Android Studio.
   - Run the application.

