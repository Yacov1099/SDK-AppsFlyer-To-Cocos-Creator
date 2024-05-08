import { _decorator, native, sys } from 'cc';

type CallBack = (obj: Object, ...args: any[]) => any;

export class AppsFlyerCocos{
    
    private sendToJs(content: string): string {
        return content;
    }

    private setupIOSNativeBridge(callBack: CallBack): any {
        try {
            native.bridge.onNative = (arg0: string, arg1: string): any => {
                if (arg0 === 'sendToJs') {
                    const str = this.sendToJs(arg1);
                    const obj = JSON.parse(str);
                    return callBack(obj)
                }
            };
        } catch (error) {
            console.error("Error from JS: ", error)
        }
    }

    private setupAndroidNativeBridge(callBack: CallBack): any {
        native.jsbBridgeWrapper.dispatchEventToNative("requestContent");
        native.jsbBridgeWrapper.addNativeEventListener("sendToJs", (content: string) => {
            const objStr = this.sendToJs(content);
            // Converts the received string to proper JSON format
            const keyValuePairs = objStr.split(", ");
            const obj = {};
            keyValuePairs.forEach(pair => {
                const [key, value] = pair.split("=");
                obj[key.trim()] = value.trim();
            });
            return callBack(obj)
        });
    }

    public loadBridge(callBack: CallBack): any {
        if (!sys.isNative) return;
        if (sys.platform === sys.Platform.IOS) {
            return this.setupIOSNativeBridge(callBack);
           
        } else if (sys.platform === sys.Platform.ANDROID) {
            return this.setupAndroidNativeBridge(callBack);   
        }        
    }

    public startSdk(devKey:String, appleId:String|null,isDebug=false,): void {
        if (!sys.isNative) return;
        let obj = obj = {
                    devKey,
                    isDebug
                 };
        if (sys.platform === sys.Platform.IOS) {
            obj.appleId = appleId;
        }
        native.bridge.sendToNative('startSDK', JSON.stringify(obj));
    }
}
