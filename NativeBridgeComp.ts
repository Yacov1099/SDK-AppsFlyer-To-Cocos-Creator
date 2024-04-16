import { _decorator, Component, Label, native, Node, sys, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NativeBridge')
export class NativeBridge extends Component {
    public sendToJs(content: string): string {
        return content;
    }

    protected onLoad(): void {
        if (!sys.isNative) return;
        let JSObjct = {};
       
        if (sys.platform == sys.Platform.IOS){
            native.bridge.onNative = (arg0:string, arg1: string):void=>{
                if(arg0 == 'sendToJs'){
                    const str = this.sendToJs(arg1)
                    const obj = JSON.parse(str);
                    JSObjct = obj;
                    //Now we can use the conversion data here
                    
                }
                return;
            }
        }else if (sys.platform == sys.Platform.ANDROID){

            native.jsbBridgeWrapper.dispatchEventToNative("requestLabelContent");
            native.jsbBridgeWrapper.addNativeEventListener("sendToJs", (content: string) => {
            const objStr = this.sendToJs(content)
            const keyValuePairs = objStr.split(", ");
                const obj = {};
                keyValuePairs.forEach(pair => {
                    const [key, value] = pair.split("=");
                    obj[key.trim()] = value.trim();
                });
                JSObjct = obj; 
                //Now we can use the conversion data here

                // example for showing the data on the screen
                // const labelNode = find("Canvas/some-node/Label");
                /* labelNode.getComponent(Label).string = JSON.stringify(obj, null, 2)
                .substring(1, JSON.stringify(obj, null, 2).length - 1);
                */
            })
}
        
    }
    start() {
        if (!sys.isNative) return;
        const devKey = "YourDevKey";
        const isDebug = true; // choose your desire
        const appleId = "IDAPPLE"; // if you will use ios

        let obj = {};
        if (sys.platform == sys.Platform.IOS){
            const objIOS = {
                devKey,
                isDebug,
                appleId

            }
            obj = objIOS;
        }else if (sys.platform == sys.Platform.ANDROID){
            const objANDROID = {
                devKey,
                isDebug
            }
            obj = objANDROID
        }
    
        native.bridge.sendToNative('startSDK', JSON.stringify(obj));
    }
}
