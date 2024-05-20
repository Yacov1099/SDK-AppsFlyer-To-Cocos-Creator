## Example of component CallAppsFlyer:

```typescript
import { _decorator, Component, find, Label } from 'cc';
import { AppsFlyerCocos } from './AppsFlyerCocos';
import { MY_APPLE_ID, MY_DEVKEY } from './contants';
const { ccclass ,property} = _decorator;

@ccclass('CallAppsFlyer')
export class CallAppsFlyer extends Component {

    private obj: Object;
    private apc: AppsFlyerCocos = new AppsFlyerCocos();

    protected onLoad(): void {
        
        const setLabel = (obj:Object | undefined ) => {
            let labelNode = find("Canvas/conversion-bg/Label");
            labelNode.getComponent(Label).string = JSON.stringify(obj);
        }

        //loadBridge(callback?) -> Can or not receive Callback, but need receive obj as parameter, because the obj is data-conversion.
        this.apc.loadBridge(setLabel);
        const devKey = MY_DEVKEY;
        const appleId = MY_APPLE_ID;
        //startSdk(devKey, appleId=null, isDebug=true)
        this.apc.startSdk(devKey, appleId, true);
    
    }
}

```
## How to Integrate:

1. **Download TypeScript File:**
   - Download the TypeScript file named "AppsFlyerCocos.ts" and add it to your project's assets folder.

2. **Create you component:**
   - Create a component with the example above and attach in your scene (We attached in Canvas, for example).

3. **Build Your Cocos Creator App:**
      - *Only IOS:* Make option "Skip the update of Xcode project"
      - Buid your project. 

After build, you need fold platform-specific instructions:

- For Android, refer to the [README file for Android](ANDROID/README.md).
- For iOS, refer to the [README file for iOS](IOS/README.md).

## Example of use logEvents (alpha)
```typescript
import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { AppsFlyerCocos, event_parameter,  event} from './AppsFlyerCocos';
@ccclass('Btn')
export class Btn extends Component {
    private apc: AppsFlyerCocos = new AppsFlyerCocos();
    @property(Button)
    button: Button | null = null;
    onLoad () {
        this.button.node.on(Button.EventType.CLICK, this.callback, this);
    }
   
    callback (button: Button) {
        const e = [
            {
                key: event_parameter.CONTENT_ID,
                value: "Banana" 
            }
        ]
            this.apc.logEvents( event.ADD_TO_CART, e);
        }

    }

```
