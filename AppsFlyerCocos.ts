import { Component, _decorator, native, sys } from 'cc';

interface CallBack {
    (obj:Object, ...args:any[]):any 
}

export const event_parameter = {
    PRICE : "af_price",
    CONTENT_ID:"af_content_id" 
}

export const events = {
    LEVEL_ACHIEVED: "af_level_achieved",
    PURCHASE : "af_purchase",
    ADD_TO_CART: "af_add_to_cart"
}

type onNative = "startSDK" | "sentEvents"



export class AppsFlyerCocos extends Component{

    private content: Object | null

    
    private convertJavaToObj(javaStr: string) {
       
        
        const keyValuePairs = javaStr.slice(1, -1).split(", ");
        const content: Record<string, string> = {};
    
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split("=");
            if (key && value) {
                content[key.trim()] = value.trim();
            }
        });
    
        return content;
    }
    
    
    
    private sendToNative(arg0: onNative, arg1: Object){
        return new native.bridge.sendToNative(arg0, JSON.stringify(arg1));
    }

    private nativeBridge(callBack?:(content: Record<string, string>) => void | null){
        try {
            native.bridge.onNative = (arg0: string, arg1: string): any => {
                console.log("ARG1 - "+ arg1);
                let content = {};
                if (sys.os === sys.OS.IOS) {
                    content = JSON.parse(arg1)
                }else content = this.convertJavaToObj(arg1);

                if (arg0 === 'send_data_to_script') {
                    if  (callBack) return callBack(content);
                }
                if (arg0 == 'end_event'){
                    return console.log(content)
                }
            };
        } catch (error) {
            console.error("Error from JS: ", error)
        }
    }

    ///////-SDK-/////////

    public  loadBridge(callBack?: CallBack | null): any{
        if (!sys.isNative) return;
        if (sys.os === sys.OS.IOS){
            native.reflection.callStaticMethod("AppsFlyerInit", "init");
        }else {
            native.reflection.callStaticMethod("com/cocos/game/AppsFlyerCocos", "bridge", "()V");
        } 
        this.nativeBridge(callBack);      
    }

    public startSdk(devKey:String, appleId:String|null,isDebug=false,): void {
        if (!sys.isNative) return;
        let config = {};
        if (sys.platform === sys.Platform.IOS) {
            config = {
                devKey,
                isDebug,
                appleId
            };
        } else if (sys.platform === sys.Platform.ANDROID) {
            config = {
                devKey,
                isDebug
            };
        }
        this.sendToNative( 'startSDK', config);
    }

    public logEvents(event: String ,event_parameters: Array<Object>): void{
        this.content =  {
            event,
            event_parameters
        }
        this.sendToNative('sentEvents', this.content);
    }

}