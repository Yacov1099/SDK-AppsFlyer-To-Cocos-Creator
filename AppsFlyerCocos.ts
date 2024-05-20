import { Component, _decorator, native, sys } from 'cc';

interface CallBack {
    (obj:Object, ...args:any[]):any 
}

export const event_parameter = {
    PRICE : "af_price",
    CONTENT_ID:"af_content_id" ,
    CONTENT:"af_content",
    ACHIEVEMENT_ID:"af_achievement_id",
    LEVEL:"af_level",
    SCORE:"af_score",
    SUCCESS:"af_success",
    CONTENT_TYPE:"af_content_type",
    CONTENT_LIST:"af_content_list",
    CURRENCY:"af_currency",
    QUANTITY:"af_quantity",
    REGISTRATION_METHOD:"af_registration_method",
    PAYMENT_INFO_AVAILABLE:"af_payment_info_available",
    MAX_RATING_VALUE:"af_max_rating_value",
    RATING_VALUE:"af_rating_value",
    SEARCH_STRING:"af_search_string",
    DATE_A:"af_date_a",
    DATE_B:"af_date_b",
    DESTINATION_A:"af_destination_a",
    DESTINATION_B:"af_destination_b",
    DESCRIPTION:"af_description",
    CLASS:"af_class",
    EVENT_START:"af_event_start",
    EVENT_END:"af_event_end",
    LAT:"af_lat",
    LONG:"af_long",
    CUSTOMER_USER_ID:"af_customer_user_id",
    VALIDATED:"af_validated",
    REVENUE:"af_revenue",
    PROJECTED_REVENUE:"af_projected_revenue",
    RECEIPT_ID:"af_receipt_id",
    TUTORIAL_ID:"af_tutorial_id",
    VIRTUAL_CURRENCY_NAME:"af_virtual_currency_name",
    DEEP_LINK:"af_deep_link",	
    OLD_VERSION:"af_old_version",
    NEW_VERSION:"af_new_version",
    REVIEW_TEXT:"af_review_text",
    COUPON_CODE:"af_coupon_code",
    ORDER_ID:"af_order_id",
    PARAM_1:"af_param_1",
    PARAM_2:"af_param_2",
    PARAM_3:"af_param_3",
    PARAM_4:"af_param_4",
    PARAM_5:"af_param_5",
    PARAM_6:"af_param_6",
    PARAM_7:"af_param_7",
    PARAM_8:"af_param_8",
    PARAM_9:"af_param_9",
    PARAM_10:"af_param_10",
    DEPARTING_DEPARTURE_DATE:"af_departing_departure_date",
    RETURNING_DEPARTURE_DATE:"af_returning_departure_date",
    DESTINATION_LIST:"af_destination_list",
    CITY:"af_city",
    REGION:"af_region",
    COUNTRY:"af_country",
    DEPARTING_ARRIVAL_DATE:"af_departing_arrival_date",
    RETURNING_ARRIVAL_DATE:"af_returning_arrival_date",
    SUGGESTED_DESTINATIONS:"af_suggested_destinations",
    TRAVEL_START:"af_travel_start",
    TRAVEL_END:"af_travel_end",
    NUM_ADULTS:"af_num_adults",
    NUM_CHILDREN:"af_num_children",
    NUM_INFANTS:"af_num_infants",
    SUGGESTED_HOTELS:"af_suggested_hotels",
    USER_SCORE:"af_user_score",
    HOTEL_SCORE:"af_hotel_score",
    PURCHASE_CURRENCY:"af_purchase_currency",
    PREFERRED_NEIGHBORHOODS:"af_preferred_neighborhoods",
    PREFERRED_NUM_STOPS:"af_preferred_num_stops",
    AD_REVENUE_AD_TYPE:"af_adrev_ad_type",	
    AD_REVENUE_NETWORK_NAME:"af_adrev_network_name",
    AD_REVENUE_PLACEMENT_ID:"af_adrev_placement_id",
    AD_REVENUE_AD_SIZE:"af_adrev_ad_size",
    AD_REVENUE_MEDIATED_NETWORK_NAME:"af_adrev_mediated_network_name",
    PREFERRED_PRICE_RANGE:"af_preferred_price_range",
    PREFERRED_STAR_RATINGS:"af_preferred_star_ratings",	
}

export const event = {
    LEVEL_ACHIEVED: "af_level_achieved",
    PURCHASE : "af_purchase",
    ADD_TO_CART: "af_add_to_cart",
    ADD_TO_WISHLIST: "af_add_to_wishlist"	,
    COMPLETE_REGISTRATION: "af_complete_registration"	,
    TUTORIAL_COMPLETION: "af_tutorial_completion"	,
    INITIATED_CHECKOUT: "af_initiated_checkout"	,
    RATE: "af_rate"	,
    SEARCH: "af_search"	,
    SPENT_CREDITS: "af_spent_credits"	,
    ACHIEVEMENT_UNLOCKED: "af_achievement_unlocked"	,
    CONTENT_VIEW: "af_content_view"	,
    LIST_VIEW: "af_list_view"	,
    TRAVEL_BOOKING: "af_travel_booking"	,
    SHARE: "af_share"	,
    INVITE: "af_invite"	,
    ADD_PAYMENT_INFO: "af_login"	,
    RE_ENGAGE: "af_re_engage"	,
    UPDATE: "af_update"	,
    LOCATION_COORDINATES: "af_location_coordinates"	,
    CUSTOMER_SEGMENT: "af_customer_segment"	,
    SUBSCRIBE: "af_subscribe"	,
    START_TRIAL: "af_start_trial"	,
    AD_CLICK: "af_ad_click"	,
    AD_VIEW: "af_ad_view"	,
    OPENED_FROM_PUSH_NOTIFICATION: "af_opened_from_push_notification"	,
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