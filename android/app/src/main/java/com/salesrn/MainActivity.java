package com.salesrn;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Main";
    }


    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new MyReactDelegate(this,getMainComponentName());
    }


    class  MyReactDelegate extends ReactActivityDelegate {

        public MyReactDelegate(Activity activity, @javax.annotation.Nullable String mainComponentName) {
            super(activity, mainComponentName);
        }

        @javax.annotation.Nullable
        @Override
        protected Bundle getLaunchOptions() {
            //获取传入的参数
            Bundle bundle = new Bundle();
            bundle.putString("envName", BuildConfig.FLAVOR);
            return bundle;
        }
    }


}
