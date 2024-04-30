# AppsFlyerCocos

## Example:

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
            return obj
        }

        const devKey = MY_DEVKEY;
        const appleId = MY_APPLE_ID;
        this.apc.startSdk(devKey, appleId, true);
    
    }
}

```
## How to Integrate:

1. **Download TypeScript File:**
   - Download the TypeScript file named "AppsFlyerCocos.ts" and add it to your project's assets folder.

2. **Link Script to Canvas:**
   - Link the script to the Canvas in your Cocos Creator game.

3. **Update Configuration:**
   - Change the development key, app ID (for iOS app), and debug preferences to match yours.

4. **Build Your Cocos Creator App:**
      - *Only IOS:* Make option "Skip the update of Xcode project"
      - Buid your project. 

After build, you need fold platform-specific instructions:

- For Android, refer to the [README file for Android](ANDROID/README.md).
- For iOS, refer to the [README file for iOS](IOS/README.md).
