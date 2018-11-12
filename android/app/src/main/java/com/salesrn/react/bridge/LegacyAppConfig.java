package com.salesrn.react.bridge;


import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import javax.annotation.Nullable;

/**
 * Created by user on 2017/2/22.
 */

public class LegacyAppConfig {
    private final static String kLangauge = "language_id"; //名字跟原生language id的要一样
    private final static String kNotificationEnabled = "enable_push_notification";

    public final String language;
    public final boolean notificationEnabled;

    public LegacyAppConfig(boolean notificationEnabled,String language) {
        this.language = language;
        this.notificationEnabled = notificationEnabled;
    }

    public WritableMap toReactFFI() {
        WritableMap m = Arguments.createMap();
        m.putString("language", language);
        m.putBoolean("notificationEnabled", notificationEnabled);
        return m;
    }

    public static @Nullable
    LegacyAppConfig load(Context ctx) {
        SharedPreferences pref = ctx.getSharedPreferences(NativeBridgeModule.PREFERENCE_KEY, Context.MODE_PRIVATE);
        return new LegacyAppConfig(
                pref.getBoolean(kNotificationEnabled, true),
                pref.getString(kLangauge, "cn"));
    }



}
