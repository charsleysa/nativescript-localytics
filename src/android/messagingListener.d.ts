import NotificationCompat = android.support.v4.app.NotificationCompat;
import { MessagingListener, plain } from '..';
import { JavaInAppCampaign, JavaPushCampaign, JavaPlacesCampaign } from './util';
export declare class MessagingListenerV2Impl {
    private listener;
    private inAppCampaignCache;
    private pushCampaignCache;
    private placesCampaignCache;
    private inAppConfig?;
    private pushConfig?;
    private placesConfig?;
    constructor(listener: MessagingListener, inAppCampaignCache: Array<JavaInAppCampaign>, pushCampaignCache: Array<JavaPushCampaign>, placesCampaignCache: Array<JavaPlacesCampaign>);
    setInAppConfiguration(config: plain): void;
    setPushConfiguration(config: plain): void;
    setPlacesConfiguration(config: plain): void;
    localyticsShouldShowInAppMessage(campaign: JavaInAppCampaign): boolean;
    localyticsShouldDeeplink(deeplink: String): Boolean;
    localyticsWillDisplayInAppMessage(campaign: JavaInAppCampaign, configuration: any): any;
    localyticsDidDisplayInAppMessage(): void;
    localyticsWillDismissInAppMessage(): void;
    localyticsDidDismissInAppMessage(): void;
    localyticsShouldDelaySessionStartInAppMessages(): boolean;
    localyticsShouldShowPushNotification(campaign: JavaPushCampaign): boolean;
    localyticsWillShowPushNotification(builder: NotificationCompat.Builder, campaign: JavaPushCampaign): NotificationCompat.Builder;
    localyticsShouldShowPlacesPushNotification(campaign: JavaPlacesCampaign): Boolean;
    localyticsWillShowPlacesPushNotification(builder: NotificationCompat.Builder, campaign: JavaPlacesCampaign): NotificationCompat.Builder;
    private updateNotification(builder, config);
}
