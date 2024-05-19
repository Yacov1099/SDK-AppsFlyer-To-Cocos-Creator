package com.cocos.game;

import static com.cocos.lib.GlobalObject.getContext;
import android.annotation.SuppressLint;
import android.util.Log;
import androidx.annotation.NonNull;

import com.appsflyer.AppsFlyerConversionListener;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.attribution.AppsFlyerRequestListener;
import com.cocos.lib.CocosActivity;
import com.cocos.lib.JsbBridge;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AppsFlyerCocos extends CocosActivity {
    public static final String LOG_TAG = "AppsFlyerOneLinkSimApp";
    @SuppressLint("StaticFieldLeak")

    public interface CallbackBool {
        void onComplete(boolean success);
    }

    public static void bridge() {
        JsbBridge.setCallback((arg0, arg1) -> {
            if (arg0.equals("startSDK")) {
                start(arg1);
            }
            if (arg0.equals("sentEvents")) {
                setEvents(arg1);
            }
        });
    }

    // STARTING SDK
    public static void start(String arg1) {
        try {
            Log.d(LOG_TAG, "Starting SDK with args: " + arg1);
            JSONObject jsonObj = new JSONObject(arg1);
            String devKey = jsonObj.getString("devKey");
            boolean isDebug = jsonObj.getBoolean("isDebug");
            AppsFlyerLib AppsFlyerInst = AppsFlyerLib.getInstance();
            AppsFlyerLib.getInstance().setDebugLog(isDebug);
            AppsFlyerInst.init(devKey, getConversionData(), getContext());
            AppsFlyerInst.start(getContext(), null, new AppsFlyerRequestListener() {
                @Override
                public void onSuccess() {
                    Log.d(LOG_TAG, "Launch sent successfully, got 200 response code from server");
                }

                @Override
                public void onError(int i, @NonNull String s) {
                    Log.d(LOG_TAG, "Launch failed to be sent:\n" +
                            "Error code: " + i + "\n" +
                            "Error description: " + s);
                }
            });
        } catch (JSONException e) {
            Log.e(LOG_TAG, "JSON Parsing error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static AppsFlyerConversionListener getConversionData() {
        return new AppsFlyerConversionListener() {
            @Override
            public void onConversionDataSuccess(Map<String, Object> map) {
                String mapAsString = map.toString().substring(1, map.toString().length() - 1);
                JsbBridge.sendToScript("send_data_to_script", mapAsString);
            }

            @Override
            public void onConversionDataFail(String s) {
                Log.d(LOG_TAG, "error getting conversion data: " + s);
            }

            @Override
            public void onAppOpenAttribution(Map<String, String> map) {}

            @Override
            public void onAttributionFailure(String s) {
                Log.d(LOG_TAG, "error onAttributionFailure : " + s);
            }
        };
    }

    public static void setEvents(String arg1) {
        try {
            Log.d(LOG_TAG, "Setting events with args: " + arg1);
            JSONObject jsonObj = new JSONObject(arg1);
            String event = jsonObj.getString("event");
            JSONArray event_parameters = jsonObj.getJSONArray("event_parameters");
            setLogEvent(event, event_parameters);
        } catch (JSONException e) {
            Log.e(LOG_TAG, "JSON Parsing error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void setLogEvent(String event_name, JSONArray event_parameters) {
        try {
            Map<String, Object> eventValues = new HashMap<>();
            for (int i = 0; i < event_parameters.length(); i++) {
                JSONObject parameterObj = event_parameters.getJSONObject(i);
                String key = parameterObj.getString("key");
                String value = parameterObj.getString("value");
                eventValues.put(key, value);
            }
            AppsFlyerLib.getInstance().logEvent(getContext(), event_name, eventValues, new AppsFlyerRequestListener() {
                @Override
                public void onSuccess() {
                    Log.d(LOG_TAG, "EVENT " + event_name + " SENT SUCCESS");
                }

                @Override
                public void onError(int i, @NonNull String s) {
                    Log.d(LOG_TAG, "Event failed to be sent:\n" +
                            "Error code: " + i + "\n" +
                            "Error description: " + s);
                }
            });
        } catch (JSONException e) {
            Log.e(LOG_TAG, "JSON Parsing error: " + e.getMessage());
        }
    }
}
