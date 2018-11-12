package com.salesrn.react.bridge;

import android.app.Activity;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


/**
 * Created by user on 2017/2/22.
 */
public class NativeBridgeModule extends ReactContextBaseJavaModule {

    private static final String TAG = NativeBridgeModule.class.getName();
    public static final String PREFERENCE_KEY = "config";

    public NativeBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TFNativeBridge";
    }

    @ReactMethod
    public void readLegacyAppStorage(Promise p) {
        try {
            WritableMap m = Arguments.createMap();
            LegacyAppConfig conf = LegacyAppConfig.load(getReactApplicationContext());
            m.putMap("appConfig", conf == null ? null : conf.toReactFFI());
            p.resolve(m);
        } catch (Throwable e) {
            // XXX: What to do?
            Log.w(TAG, "readLegacyAppStorage", e);
            p.resolve(null);
        }
    }

//    @ReactMethod
//    public void updateSessionId(String sessionId,Promise p){
//        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(
//                PREFERENCE_KEY, Activity.MODE_PRIVATE);
//        SharedPreferences.Editor edit = sp.edit();
//        if(!TextUtils.isEmpty(sessionId)){
//            edit.putString("session_id", sessionId);
//            edit.commit();
//            LogUtil.i(TAG, "update SessionId success!  sessionId is " + sessionId);
//            p.resolve(sessionId);
//        }else{
//            LogUtil.i(TAG, "update SessionId fail ! sessionId is  " + sessionId);
//            p.resolve(sessionId);
//        }
//    }
//
//    @ReactMethod
//    public void processResponseError(ReadableMap map, Promise p) {
//        try {
//            JSONObject jsonObject = new JSONObject(map.toHashMap());
//            if (jsonObject != null) {
//                    String errMsg = jsonObject.getString("errMsg");
//                    String errCode = jsonObject.getString("errCode");
//                    boolean errSerious = jsonObject.getBoolean("errSerious");
//                    if(errSerious){
//                        //要弹出错误框
//                        if(mErrorDialog == null){
//                            mErrorDialog = new ErrorDialog(getCurrentActivity(), R.style.data_filling_dialog,errMsg);
//                        }
//                        if(!mErrorDialog.isShowing()){
//                            mErrorDialog.show();
//                        }
//                    }else{
//                        //特殊处理错误框
//                        ErrorCodeUtil.errorCode(errCode, getCurrentActivity(), errMsg);
//                        if(errCode.equals("060017")){
//                            Toast.makeText(getCurrentActivity(),errMsg, Toast.LENGTH_SHORT).show();
//                        }
//                    }
//
//                 LogUtil.i(TAG,"processResponseError, json is "+jsonObject.toString());
//
//                }
//            p.resolve("success");
//        }catch (Exception e){
//            e.printStackTrace();
//            p.resolve("fail");
//        }
//    }
//
//    @ReactMethod
//    public void getLocation(Promise p){
//        String lat = String.valueOf(CacheManage.getInstance().getLat());
//        String lng = String.valueOf(CacheManage.getInstance().getLng());
//        try{
//            WritableMap map = Arguments.createMap();
//            map.putString("lat",lat);
//            map.putString("lng",lng);
//            map.putString("address",CacheManage.getInstance().getCurrentAddr());
//            p.resolve(map);
//        }catch (Exception ex){
//            ex.printStackTrace();
//        }
//    }
//
//    @ReactMethod
//    public void navigateToMap(Double lat, Double lng,String address){
//        LogUtil.i(TAG,"navigateToMap, json is address: "+address+ " ,lat:"+lat+" ,lng:"+lng);
//
//        MapUtils.goToNavi(getCurrentActivity(), address, lat, lng);
//    }
//
//    @ReactMethod
//    public void goToCashier(String data, final Promise promise){
//        LogUtil.i(TAG,"goToCashier, data is "+data);
//
//        try{
//            Cashier.getCashier(getCurrentActivity()).showCashierActivity(data, new CashierCallBack() {
//                @Override
//                public void success() {
//                    super.success();
//                    promise.resolve("success");
//                }
//
//                @Override
//                public void failed() {
//                    super.failed();
////                promise.reject("fail");
//                }
//            });
//        }catch (Exception e){
//            e.printStackTrace();
//            promise.reject("fail");
//        }
//
//    }


}
