//maybe will nedd to change package
package com.cocos.game;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.appsflyer.AppsFlyerConversionListener;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.attribution.AppsFlyerRequestListener;
import com.cocos.lib.JsbBridge;
import com.cocos.lib.JsbBridgeWrapper;

import org.json.JSONObject;

import java.util.Map;

public class AppsFlyerCocos {
    public static final String LOG_TAG = "AppsFlyerOneLinkSimApp";

    //STARTING SDK
    public void start(Context context) {
        JsbBridge.setCallback(new JsbBridge.ICallback() {
            @Override
            public void onScript(String arg0, String arg1) {
                if (arg0.equals("startSDK")) {
                    try {
                        JSONObject jsonObj = new JSONObject(arg1);

                        String devKey = jsonObj.getString("devKey");
                        boolean isDebug = jsonObj.getBoolean("isDebug");
                        AppsFlyerLib AppsFlyerInst = AppsFlyerLib.getInstance();
                        AppsFlyerLib.getInstance().setDebugLog(isDebug);
                        AppsFlyerInst.init(devKey, getConversionData(), context);

                        AppsFlyerInst.start(context, null, new AppsFlyerRequestListener() {
                            @Override
                            public void onSuccess() {
                                Log.d(LOG_TAG, "Launch sent successfully, got 200 response code from server");
                                System.out.println("SUCCESS");
                            }

                            @Override
                            public void onError(int i, @NonNull String s) {
                                System.out.println("ERROR");
                                Log.d(LOG_TAG, "Launch failed to be sent:\n" + "Error code: " + i + "\n" + "Error description: " + s);
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    public AppsFlyerConversionListener getConversionData() {
        System.out.println("Initializing conversion data:");
        AppsFlyerConversionListener conversionListener = new AppsFlyerConversionListener() {
            @Override
            public void onConversionDataSuccess(Map<String, Object> map) {

                JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();
                jbw.addScriptEventListener("requestLabelContent", arg -> {
                    System.out.println("@JAVA: registered the callback" + arg);
                });
                String mapAsString = map.toString().substring(1, map.size() - 1);
                jbw.dispatchEventToScript("sendToJs", mapAsString);
            }

            @Override
            public void onConversionDataFail(String s) {
                Log.d(LOG_TAG, "error getting conversion data: " + s);
            }

            @Override
            public void onAppOpenAttribution(Map<String, String> map) {

            }

            @Override
            public void onAttributionFailure(String s) {
                Log.d(LOG_TAG, "error onAttributionFailure : " + s);
            }
        };
        return conversionListener;
    }
}
