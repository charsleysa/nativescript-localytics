import Notification = android.app.Notification;
import Location = android.location.Location;
import Uri = android.net.Uri;
import NotificationCompat = android.support.v4.app.NotificationCompat;
import View = android.view.View;

import { MessagingListener, plain } from '..';
import {
    toInAppJSON,
    toLocation,
    toPushJSON,
    toPlacesJSON,
    JavaInAppCampaign,
    JavaPushCampaign,
    JavaPlacesCampaign
} from './util';

@Interfaces([(com as any).localytics.android.MessagingListenerV2])
export class MessagingListenerV2Impl {
    private listener: MessagingListener;
    private inAppCampaignCache: Array<JavaInAppCampaign>;
    private pushCampaignCache: Array<JavaPushCampaign>;
    private placesCampaignCache: Array<JavaPlacesCampaign>;
    private inAppConfig?: any;
    private pushConfig?: any;
    private placesConfig?: any;
    constructor(
        listener: MessagingListener,
        inAppCampaignCache: Array<JavaInAppCampaign>,
        pushCampaignCache: Array<JavaPushCampaign>,
        placesCampaignCache: Array<JavaPlacesCampaign>
    ) {
        this.listener = listener;
        this.inAppCampaignCache = inAppCampaignCache;
        this.pushCampaignCache = pushCampaignCache;
        this.placesCampaignCache = placesCampaignCache;
    }
    public setInAppConfiguration(config: plain) {
        this.inAppConfig = config;
    }
    public setPushConfiguration(config: plain) {
        this.pushConfig = config;
    }
    public setPlacesConfiguration(config: plain) {
        this.placesConfig = config;
    }
    public localyticsShouldShowInAppMessage(campaign: JavaInAppCampaign): boolean {
        // Cache campaign
        this.inAppCampaignCache[campaign.getCampaignId()] = campaign;

        const nsCampaign = toInAppJSON(campaign);
        let shouldShow = true;

        if (this.inAppConfig != null) {
            // Global Suppression
            if (this.inAppConfig.hasOwnProperty('shouldShow')) {
                shouldShow = this.inAppConfig.shouldShow;
            }
            // DIY In-App. This callback will suppress the in-app and emit an event
            // for manually handling
            if (this.inAppConfig.hasOwnProperty.has("diy") && this.inAppConfig.diy) {
                this.listener.localyticsDiyInAppMessage(nsCampaign);
                return false;
            }
        }

        this.listener.localyticsShouldShowInAppMessage(nsCampaign, shouldShow);
        return shouldShow;
    }
    public localyticsShouldDeeplink(deeplink: String): Boolean {
        // Deprecated
        return true;
    }
    public localyticsWillDisplayInAppMessage(campaign: JavaInAppCampaign, configuration: any /*InAppConfiguration*/): any /*InAppConfiguration*/ {
        if (this.inAppConfig != null) {
            if (this.inAppConfig.hasOwnProperty('aspectRatio')) {
                configuration.setAspectRatio(this.inAppConfig.aspectRatio);
            }
            if (this.inAppConfig.hasOwnProperty('backgroundAlpha')) {
                configuration.setBackgroundAlpha(this.inAppConfig.backgroundAlpha);
            }
            if (this.inAppConfig.hasOwnProperty('bannerOffsetDps')) {
                configuration.setBannerOffsetDps(this.inAppConfig.bannerOffsetDps);
            }
            if (this.inAppConfig.hasOwnProperty('dismissButtonLocation')) {
                const location = this.inAppConfig.dismissButtonLocation;
                configuration.setDismissButtonLocation(toLocation(location));
            }
            if (this.inAppConfig.hasOwnProperty('dismissButtonHidden')) {
                const hidden = this.inAppConfig.dismissButtonHidden;
                configuration.setDismissButtonVisibility(hidden ? View.GONE : View.VISIBLE);
            }
        }

        this.listener.localyticsWillDisplayInAppMessage(toInAppJSON(campaign));
        return configuration;
    }
    public localyticsDidDisplayInAppMessage() {
        this.listener.localyticsDidDisplayInAppMessage();
    }
    public localyticsWillDismissInAppMessage() {
        this.listener.localyticsWillDismissInAppMessage();
    }
    public localyticsDidDismissInAppMessage() {
        this.listener.localyticsDidDismissInAppMessage();
    }
    public localyticsShouldDelaySessionStartInAppMessages(): boolean {
        let shouldDelay = false;
        if (this.inAppConfig != null && this.inAppConfig.hasOwnProperty('delaySessionStart')) {
            shouldDelay = this.inAppConfig.delaySessionStart;
        }
        this.listener.localyticsShouldDelaySessionStartInAppMessages(shouldDelay);
        return shouldDelay;
    }
    public localyticsShouldShowPushNotification(campaign: JavaPushCampaign): boolean {
        // Cache campaign
        this.pushCampaignCache[campaign.getCampaignId()] = campaign;

        let shouldShow = true;
        const nsCampaign = toPushJSON(campaign);

        if (this.pushConfig != null) {
            // Global Suppression
            if (this.pushConfig.hasOwnProperty('shouldShow')) {
                shouldShow = this.pushConfig.shouldShow;
            }
            // DIY Push. This callback will suppress the push and emit an event
            // for manually handling
            if (this.pushConfig.hasOwnProperty('diy') && this.pushConfig.diy) {
                this.listener.localyticsDiyPushNotification(nsCampaign);
                return false;
            }
        }

        this.listener.localyticsShouldShowPushNotification(nsCampaign, shouldShow);
        return shouldShow;
    }
    public localyticsWillShowPushNotification(builder: NotificationCompat.Builder, campaign: JavaPushCampaign): NotificationCompat.Builder {
        if (this.pushConfig != null) {
            this.updateNotification(builder, this.pushConfig);
        }
        this.listener.localyticsWillShowPushNotification(toPushJSON(campaign));
        return builder;
    }
    public localyticsShouldShowPlacesPushNotification(campaign: JavaPlacesCampaign): Boolean {
        // Cache campaign
        this.placesCampaignCache[campaign.getCampaignId()] = campaign;

        let shouldShow = true;
        const nsCampaign = toPlacesJSON(campaign);

        if (this.placesConfig != null) {
            // Global Suppression
            if (this.placesConfig.hasOwnProperty('shouldShow')) {
                shouldShow = this.placesConfig.shouldShow;
            }
            // DIY Places. This callback will suppress the push and emit an event
            // for manually handling
            if (this.placesConfig.hasOwnProperty('diy') && this.placesConfig.diy) {
                this.listener.localyticsDiyPlacesPushNotification(nsCampaign);
                return false;
            }
        }

        this.listener.localyticsShouldShowPlacesPushNotification(nsCampaign, shouldShow);
        return shouldShow;
    }
    public localyticsWillShowPlacesPushNotification(builder: NotificationCompat.Builder, campaign: JavaPlacesCampaign): NotificationCompat.Builder {
        if (this.placesConfig != null) {
            this.updateNotification(builder, this.placesConfig);
        }
        this.listener.localyticsWillShowPlacesPushNotification(toPlacesJSON(campaign));
        return builder;
    }
    private updateNotification(builder: NotificationCompat.Builder, config: any): NotificationCompat.Builder {
        if (config.hasOwnProperty('category')) {
            builder.setCategory(config.category);
        }
        if (config.hasOwnProperty('color')) {
            builder.setColor(config.color);
        }
        if (config.hasOwnProperty('contentInfo')) {
            builder.setContentInfo(config.contentInfo);
        }
        if (config.hasOwnProperty('contentTitle')) {
            builder.setContentTitle(config.contentTitle);
        }
        if (config.hasOwnProperty('defaults')) {
            const defaultsArray = config.defaults as string[];
            if (defaultsArray.indexOf('all') > -1) {
                builder.setDefaults(Notification.DEFAULT_ALL);
            }
            else {
                let defaults = 0;
                if (defaultsArray.indexOf('lights') > -1) {
                    defaults = defaults | Notification.DEFAULT_LIGHTS;
                }
                if (defaultsArray.indexOf('sound') > -1) {
                    defaults = defaults | Notification.DEFAULT_SOUND;
                }
                if (defaultsArray.indexOf('vibrate') > -1) {
                    defaults = defaults | Notification.DEFAULT_VIBRATE;
                }
                builder.setDefaults(defaults);
            }
        }
        if (config.hasOwnProperty('priority')) {
            builder.setPriority(config.priority);
        }
        if (config.hasOwnProperty('sound')) {
            builder.setSound(Uri.parse(config.sound));
        }
        if (config.hasOwnProperty('vibrate')) {
            builder.setVibrate(config.vibrate);
        }
        return builder;
    }
}