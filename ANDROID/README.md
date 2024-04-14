
1. download the file and add it inside android studio to C:\Users\user_name\Projects_Cocos\Your_project\native\engine\android\app\src\com\cocos\game
2. go to your menifest file inside your project
3. replace the second line with that:
<manifest xmlns:android="http://schemas.android.com/apk/res/android" android:installLocation="auto" xmlns:tools="http://schemas.android.com/tools" package="your.package.name">
4. go to build.gradle (Moudle: project-name))
5. add the following line at the end of the dependencies 
implementation 'com.appsflyer:af-android-sdk:6.13.0'
implementation 'androidx.annotation:annotation-jvm:1.7.1'
6. open the menu and click on sync project with gradle files
7. add the following lines in appActivity.java file at the end onStart method:
AppsFlyerCocos afc = new AppsFlyerCocos();
afc.start(this);
8. build the project in Android Studio
9. run the application
