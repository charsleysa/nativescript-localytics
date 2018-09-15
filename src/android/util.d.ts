import { CircularRegion, InboxCampaign, InAppCampaign, PushCampaign, PlacesCampaign } from '..';
declare const JavaCircularRegion: any;
declare const JavaInAppCampaign: any;
declare const JavaInboxCampaign: any;
declare const JavaPlacesCampaign: any;
declare const JavaPushCampaign: any;
declare type JavaCircularRegion = {
    [key: string]: any;
};
declare type JavaInboxCampaign = {
    [key: string]: any;
};
declare type JavaInAppCampaign = {
    [key: string]: any;
};
declare type JavaPlacesCampaign = {
    [key: string]: any;
};
declare type JavaPushCampaign = {
    [key: string]: any;
};
export { JavaCircularRegion, JavaInboxCampaign, JavaInAppCampaign, JavaPlacesCampaign, JavaPushCampaign };
export declare function toHashMap(obj: {
    [key: string]: any;
}): java.util.HashMap<java.lang.String, java.lang.Object>;
export declare function toJsObject(javaObj: java.util.Map<java.lang.String, java.lang.Object>): {
    [key: string]: any;
};
export declare function toCircularRegionJSON(region: JavaCircularRegion): CircularRegion;
export declare function toInboxJSON(campaign: JavaInboxCampaign): InboxCampaign;
export declare function toInAppJSON(campaign: JavaInAppCampaign): InAppCampaign;
export declare function toPushJSON(campaign: JavaPushCampaign): PushCampaign;
export declare function toPlacesJSON(campaign: JavaPlacesCampaign): PlacesCampaign;
export declare function toCircularRegion(circularRegion: CircularRegion): JavaCircularRegion;
export declare function toEvent(event: string): any;
export declare function toLocation(location: string): any;
export declare function fromLocation(location: any): 'left' | 'right';
