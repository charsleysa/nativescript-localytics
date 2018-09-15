import * as application from 'tns-core-modules/application';

import Log = android.util.Log;
import View = android.view.View;

import {
    Localytics as LocalyticsDef,
    plain,
    CircularRegion,
    Customer,
    InboxCampaign,
    AnalyticsListener,
    InAppCampaign,
    PushCampaign,
    PlacesCampaign,
    MessagingListener
} from '.';
import {
    toHashMap,
    toJsObject,
    toLocation,
    fromLocation,
    toInboxJSON,
    toCircularRegionJSON,
    JavaInboxCampaign,
    JavaInAppCampaign,
    JavaPushCampaign,
    JavaPlacesCampaign,
    JavaCircularRegion
} from './android/util';
import { MessagingListenerV2Impl } from './android/messagingListener';

const localyticsNamespace = (com as any).localytics.android;

// Java Classes
const JavaInboxRefreshListener = localyticsNamespace.InboxRefreshListener;
const Localytics = localyticsNamespace.Localytics;
const JavaRegion = localyticsNamespace.Region;

// Java Interfaces
const JavaAnalyticsListener = localyticsNamespace.AnalyticsListener;

class LocalyticsAndroid implements LocalyticsDef {
    private static readonly LOG_TAG: string = 'Localytics-NativeScript';

    private static readonly inboxCampaignCache = new Array<JavaInboxCampaign>();
    private static readonly inAppCampaignCache = new Array<JavaInAppCampaign>();
    private static readonly pushCampaignCache = new Array<JavaPushCampaign>();
    private static readonly placesCampaignCache = new Array<JavaPlacesCampaign>();

    private static analyticsListener: any /* com.localytics.android.AnalyticsListener */ | null = null;
    private static messagingListener: MessagingListenerV2Impl | null = null;

    /*******************
     * Integration
     ******************/

    public static integrate() {
        Localytics.integrate(application.android.context);
        Localytics.setInAppMessageDisplayActivity(application.android.foregroundActivity);
    }

    public static autoIntegrate() {
        Localytics.autoIntegrate(application.android.context);
        Localytics.setInAppMessageDisplayActivity(application.android.foregroundActivity);
    }

    public static upload() {
        Localytics.upload();
    }

    public static pauseDataUploading(pause: boolean) {
        Localytics.pauseDataUploading(pause);
    }

    public static openSession() {
        Localytics.openSession();
    }

    public static closeSession() {
        Localytics.closeSession();
    }

    /*******************
     * Analytics
     ******************/

    public static setOptedOut(enabled: boolean) {
        Localytics.setOptedOut(enabled);
    }

    public static isOptedOut(): boolean {
        return Localytics.isOptedOut();
    }

    public static setPrivacyOptedOut(enabled: boolean) {
        Localytics.setPrivacyOptedOut(enabled);
    }

    public static isPrivacyOptedOut(): boolean {
        return Localytics.isPrivacyOptedOut();
    }

    public static tagEvent(event: string, attributes?: plain, customerValueIncrease: number = 0) {
        Localytics.tagEvent(event, attributes ? toHashMap(attributes) : null, customerValueIncrease);
    }

    public static tagPurchased(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain) {
        Localytics.tagPurchased(itemName, itemId, itemType, itemPrice, attributes ? toHashMap(attributes) : null);
    }

    public static tagAddedToCart(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain) {
        Localytics.tagAddedToCart(itemName, itemId, itemType, itemPrice, attributes ? toHashMap(attributes) : null);
    }

    public static tagStartedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain) {
        Localytics.tagStartedCheckout(totalPrice, itemCount, attributes ? toHashMap(attributes) : null);
    }

    public static tagCompletedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain) {
        Localytics.tagCompletedCheckout(totalPrice, itemCount, attributes ? toHashMap(attributes) : null);
    }

    public static tagContentViewed(contentName?: string, contentId?: string, contentType?: string, attributes?: plain) {
        Localytics.tagContentViewed(contentName, contentId, contentType, attributes ? toHashMap(attributes) : null);
    }

    public static tagSearched(queryText?: string, contentType?: string, resultCount?: number, attributes?: plain) {
        Localytics.tagSearched(queryText, contentType, resultCount, attributes ? toHashMap(attributes) : null);
    }

    public static tagShared(contentName?: string, contentId?: string, contentType?: string, methodName?: string, attributes?: plain) {
        Localytics.tagShared(contentName, contentId, contentType, methodName, attributes ? toHashMap(attributes) : null);
    }

    public static tagContentRated(contentName?: string, contentId?: string, contentType?: string, rating?: string, attributes?: plain) {
        Localytics.tagContentRated(contentName, contentId, contentType, rating, attributes ? toHashMap(attributes) : null);
    }

    public static tagCustomerRegistered(customer?: Customer, methodName?: string, attributes?: plain) {
        Localytics.tagCustomerRegistered(customer, methodName, attributes ? toHashMap(attributes) : null);
    }

    public static tagCustomerLoggedIn(customer?: Customer, methodName?: string, attributes?: plain) {
        Localytics.tagCustomerLoggedIn(customer, methodName, attributes ? toHashMap(attributes) : null);
    }

    public static tagCustomerLoggedOut(attributes?: plain) {
        Localytics.tagCustomerLoggedOut(attributes ? toHashMap(attributes) : null);
    }

    public static tagInvited(methodName?: string, attributes?: plain) {
        Localytics.tagInvited(methodName, attributes ? toHashMap(attributes) : null);
    }

    public static tagInAppImpression(campaignId: number, action: 'click' | 'dismiss' | string) {
        const campaign: JavaInAppCampaign | undefined = LocalyticsAndroid.inAppCampaignCache[campaignId];
        if (campaign != null) {
            if (action === 'click') {
                Localytics.tagInAppImpression(campaign, Localytics.ImpressionType.CLICK);
            } else if (action === 'dismiss') {
                Localytics.tagInAppImpression(campaign, Localytics.ImpressionType.DISMISS);
            } else {
                Localytics.tagInAppImpression(campaign, action);
            }
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to tagInAppImpression failed; Campaign couldn't be found for campaign ID ${campaignId}`);
            throw new Error(`Campaign couldn't be found for campaign ID ${campaignId}`);
        }
    }

    public static tagInboxImpression(campaignId: number, action: 'click' | 'dismiss' | string) {
        const campaign: JavaInboxCampaign | undefined = LocalyticsAndroid.inboxCampaignCache[campaignId];
        if (campaign != null) {
            if (action === 'click') {
                Localytics.tagInboxImpression(campaign, Localytics.ImpressionType.CLICK);
            } else if (action === 'dismiss') {
                Localytics.tagInboxImpression(campaign, Localytics.ImpressionType.DISMISS);
            } else {
                Localytics.tagInboxImpression(campaign, action);
            }
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to tagInboxImpression failed; Campaign couldn't be found for campaign ID ${campaignId}`);
            throw new Error(`Campaign couldn't be found for campaign ID ${campaignId}`);
        }
    }

    public static tagPushToInboxImpression(campaignId: number, success: boolean) {
        const campaign: JavaInboxCampaign | undefined = LocalyticsAndroid.inboxCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.tagPushToInboxImpression(campaign);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to tagPushToInboxImpression failed; Campaign couldn't be found for campaign ID ${campaignId}`);
            throw new Error(`Campaign couldn't be found for campaign ID ${campaignId}`);
        }
    }

    public static tagPlacesPushReceived(campaignId: number) {
        const campaign: JavaPlacesCampaign | undefined = LocalyticsAndroid.placesCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.tagPlacesPushReceived(campaign);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to tagPlacesPushReceived failed; Campaign couldn't be found for campaign ID ${campaignId}`);
            throw new Error(`Campaign couldn't be found for campaign ID ${campaignId}`);
        }
    }

    public static tagPlacesPushOpened(campaignId: number, action?: string) {
        const campaign: JavaPlacesCampaign | undefined = LocalyticsAndroid.placesCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.tagPlacesPushOpened(campaign);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to tagPlacesPushOpened failed; Campaign couldn't be found for campaign ID ${campaignId}`);
            throw new Error(`Campaign couldn't be found for campaign ID ${campaignId}`);
        }
    }

    public static tagScreen(screen: string) {
        Localytics.tagScreen(screen);
    }

    public static setCustomDimension(index: number, value: string) {
        Localytics.setCustomDimension(index, value);
    }

    public static getCustomDimension(index: string): string {
        return Localytics.getCustomDimension(index);
    }

    public static setAnalyticsListener(listener: AnalyticsListener) {
        LocalyticsAndroid.analyticsListener = new JavaAnalyticsListener({
            localyticsSessionWillOpen: (isFirst: boolean, isUpgrade: boolean, isResume: boolean) => {
                listener.localyticsSessionWillOpen(isFirst, isUpgrade, isResume);
            },
            localyticsSessionDidOpen: (isFirst: boolean, isUpgrade: boolean, isResume: boolean) => {
                listener.localyticsSessionDidOpen(isFirst, isUpgrade, isResume);
            },
            localyticsSessionWillClose: () => {
                listener.localyticsSessionWillClose();
            },
            localyticsDidTagEvent: (eventName: string, attributes: java.util.Map<java.lang.String, java.lang.String>, customerValueIncrease: number) => {
                listener.localyticsDidTagEvent(eventName, toJsObject(attributes), customerValueIncrease);
            }
        });
        Localytics.setAnalyticsListener(LocalyticsAndroid.analyticsListener);
    }

    public static removeAnalyticsListener() {
        LocalyticsAndroid.analyticsListener = null;
        Localytics.setAnalyticsListener(null);
    }

    /*******************
     * Profiles
     ******************/

    public static setProfileAttribute(name: string, value: string, scope: 'app' | 'org') {
        Localytics.setProfileAttribute(name, value, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static addProfileAttributesToSet(name: string, value: string[], scope: 'app' | 'org') {
        Localytics.addProfileAttributesToSet(name, value, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static removeProfileAttributesFromSet(name: string, value: string[], scope: 'app' | 'org') {
        Localytics.removeProfileAttributesFromSet(name, value, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static incrementProfileAttribute(name: string, value: number, scope: 'app' | 'org') {
        Localytics.incrementProfileAttribute(name, value, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static decrementProfileAttribute(name: string, value: number, scope: 'app' | 'org') {
        Localytics.decrementProfileAttribute(name, value, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static deleteProfileAttribute(name: string, scope: string) {
        Localytics.deleteProfileAttribute(name, scope === 'org' ? Localytics.ProfileScope.ORGANIZATION : Localytics.ProfileScope.APPLICATION);
    }

    public static setCustomerEmail(email: string) {
        Localytics.setCustomerEmail(email);
    }

    public static setCustomerFirstName(firstName: string) {
        Localytics.setCustomerFirstName(firstName);
    }

    public static setCustomerLastName(lastName: string) {
        Localytics.setCustomerLastName(lastName);
    }

    public static setCustomerFullName(fullName: string) {
        Localytics.setCustomerFullName(fullName);
    }

    /*******************
     * User Information
     ******************/

    public static getIdentifier(key: string): string {
        return Localytics.getIdentifier(key);
    }

    public static setIdentifier(key: string, value: string) {
        Localytics.setIdentifier(key, value);
    }

    public static getCustomerId(): string {
        return Localytics.getCustomerId();
    }

    public static setCustomerId(id: string) {
        Localytics.setCustomerId(id);
    }

    public static setCustomerIdWithPrivacyOptedOut(id: string, enabled: boolean) {
        Localytics.setCustomerIdWithPrivacyOptedOut(id, enabled);
    }

    public static setLocation(latitude: number, longitude: number) {
        const location = new android.location.Location('');
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        Localytics.setLocation(location);
    }

    /*******************
     * Marketing
     ******************/

    public static registerPush() {
        Localytics.registerPush();
    }

    public static setPushToken(pushToken: string) {
        Localytics.setPushRegistrationId(pushToken);
    }

    public static getPushToken(): string {
        return Localytics.getPushRegistrationId();
    }

    public static setPushMessageConfiguration(config: plain) {
        if (LocalyticsAndroid.messagingListener != null) {
            LocalyticsAndroid.messagingListener.setPushConfiguration(config);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, 'Call to setPushMessagingConfiguration failed; Messaging Listener is null. Call setMessagingListener before setting configuration');
            throw new Error('Messaging Listener is null. Call setMessagingListener before setting configuration');
        }
    }

    public static setTestModeEnabled(enabled: boolean) {
        Localytics.setTestModeEnabled(enabled);
    }

    public static isTestModeEnabled(): boolean {
        return Localytics.isTestModeEnabled();
    }

    public static setInAppMessageDismissButtonImageWithName(imageName: string) {
        // No-op, iOS only
    }

    public static setInAppMessageDismissButtonHidden(hidden: boolean) {
        Localytics.setInAppMessageDismissButtonVisibility(hidden ? View.GONE : View.VISIBLE);
    }

    public static setInAppMessageDismissButtonLocation(buttonLocation: 'left' | 'right') {
        Localytics.setInAppMessageDismissButtonLocation(toLocation(buttonLocation));
    }

    public static getInAppMessageDismissButtonLocation(): 'left' | 'right' {
        return fromLocation(Localytics.getInAppMessageDismissButtonLocation());
    }

    public static triggerInAppMessage(triggerName: string, attributes: plain) {
        Localytics.triggerInAppMessage(triggerName, toHashMap(attributes));
    }

    public static triggerInAppMessagesForSessionStart() {
        Localytics.triggerInAppMessagesForSessionStart();
    }

    public static dismissCurrentInAppMessage() {
        Localytics.dismissCurrentInAppMessage();
    }

    public static setInAppMessageConfiguration(config: plain) {
        if (LocalyticsAndroid.messagingListener != null) {
            LocalyticsAndroid.messagingListener.setInAppConfiguration(config);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, 'Call to setInAppMessagingConfiguration failed; Messaging Listener is null. Call setMessagingListener before setting configuration');
            throw new Error('Messaging Listener is null. Call setMessagingListener before setting configuration');
        }
    }

    public static isInAppAdIdParameterEnabled(): boolean {
        return Localytics.isAdidAppendedToInAppUrls();
    }

    public static setInAppAdIdParameterEnabled(enabled: boolean) {
        Localytics.appendAdidToInAppUrls(enabled);
    }

    public static isInboxAdIdParameterEnabled(): boolean {
        return Localytics.isAdidAppendedToInboxUrls();
    }

    public static setInboxAdIdParameterEnabled(enabled: boolean) {
        Localytics.appendAdidToInboxUrls(enabled);
    }

    public static getDisplayableInboxCampaigns(): Array<InboxCampaign> {
        const campaigns: Array<JavaInboxCampaign> = Localytics.getDisplayableInboxCampaigns();
        const nsCampaigns: Array<InboxCampaign> = [];

        // Cache campaigns
        for (const campaign of campaigns) {
            LocalyticsAndroid.inboxCampaignCache[campaign.getCampaignId()] = campaign;
            nsCampaigns.push(toInboxJSON(campaign));
        }

        return nsCampaigns;
    }

    public static getAllInboxCampaigns(): Array<InboxCampaign> {
        const campaigns: Array<JavaInboxCampaign> = Localytics.getAllInboxCampaigns();
        const nsCampaigns: Array<InboxCampaign> = [];

        // Cache campaigns
        for (const campaign of campaigns) {
            LocalyticsAndroid.inboxCampaignCache[campaign.getCampaignId()] = campaign;
            nsCampaigns.push(toInboxJSON(campaign));
        }

        return nsCampaigns;
    }

    // Refresh all Inbox campaigns that can be displayed from the Localytics server
    public static refreshInboxCampaigns(): Promise<Array<InboxCampaign>> {
        throw new Error('Not yet implemented');
    } // TODO: implement

    // Refresh all Inbox campaigns from the Localytics server. The return value will include Inbox
    // campaigns with no listing title, and thus no visible UI element.
    public static refreshAllInboxCampaigns(): Promise<Array<InboxCampaign>> {
        throw new Error('Not yet implemented');
    } // TODO: implement

    public static setInboxCampaignRead(campaignId: number, read: boolean) {
        const campaign: JavaInboxCampaign = LocalyticsAndroid.inboxCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.setInboxCampaignRead(campaign, read);
            LocalyticsAndroid.updateInboxCampaignCache();
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to setInboxCampaignRead failed; Couldn't find Inbox campaign with ID ${campaignId}`);
            throw new Error(`Couldn't find Inbox campaign with ID ${campaignId}`);
        }
    }

    public static deleteInboxCampaign(campaignId: number) {
        const campaign: JavaInboxCampaign = LocalyticsAndroid.inboxCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.deleteInboxCampaign(campaign);
            LocalyticsAndroid.updateInboxCampaignCache();
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to deleteInboxCampaign failed; Couldn't find Inbox campaign with ID ${campaignId}`);
            throw new Error(`Couldn't find Inbox campaign with ID ${campaignId}`);
        }
    }

    public static getInboxCampaignsUnreadCount(): number {
        return Localytics.getInboxCampaignsUnreadCount();
    }

    public static inboxListItemTapped(campaignId: number) {
        const campaign: JavaInboxCampaign = LocalyticsAndroid.inboxCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.inboxListItemTapped(campaign);
            LocalyticsAndroid.updateInboxCampaignCache();
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to inboxListItemTapped failed; Couldn't find Inbox campaign with ID ${campaignId}`);
            throw new Error(`Couldn't find Inbox campaign with ID ${campaignId}`);
        }
    }

    public static triggerPlacesNotification(campaignId: number) {
        const campaign: JavaPlacesCampaign = LocalyticsAndroid.placesCampaignCache[campaignId];
        if (campaign != null) {
            Localytics.triggerPlacesNotification(campaign);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, `Call to triggerPlacesNotification failed; Couldn't find Places campaign with ID ${campaignId}`);
            throw new Error(`Couldn't find Inbox campaign with ID ${campaignId}`);
        }
    }

    public static setPlacesMessageConfiguration(config: plain) {
        if (LocalyticsAndroid.messagingListener != null) {
            LocalyticsAndroid.messagingListener.setPlacesConfiguration(config);
        } else {
            Log.i(LocalyticsAndroid.LOG_TAG, 'Call to setPlacesMessagingConfiguration failed; Messaging Listener is null. Call setMessagingListener before setting configuration');
            throw new Error('Messaging Listener is null. Call setMessagingListener before setting configuration');
        }
    }

    public static setMessagingListener(listener: MessagingListener) {
        LocalyticsAndroid.messagingListener = new MessagingListenerV2Impl(
            listener,
            LocalyticsAndroid.inAppCampaignCache,
            LocalyticsAndroid.pushCampaignCache,
            LocalyticsAndroid.placesCampaignCache
        );
        Localytics.setMessagingListener(LocalyticsAndroid.messagingListener);
    }

    public static removeMessagingListener() {
        LocalyticsAndroid.messagingListener = null;
        Localytics.setMessagingListener(null);
    }

    /*******************
     * Location
     ******************/

    public static setLocationMonitoringEnabled(enabled: boolean) {
        Localytics.setLocationMonitoringEnabled(enabled);
    }

    public static getGeofencesToMonitor(latitude: number, longitude: number): Array<CircularRegion> {
        const circularRegions: Array<JavaCircularRegion> = Localytics.getGeofencesToMonitor(latitude, longitude);
        const nsCircularRegions: CircularRegion[] = [];
        for (const circularRegion of circularRegions) {
            nsCircularRegions.push(toCircularRegionJSON(circularRegion));
        }
        return nsCircularRegions;
    }

    // Trigger a region with a certain event
    // region = The region that was triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegion(region: CircularRegion, event: 'enter' | 'exit', latitude: number, longitude: number) {
        throw new Error('Not yet implemented');
    } // TODO: implement

    // Trigger a list of regions with a certain event
    // regions = A list of regions that were triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegions(regions: Array<CircularRegion>, event: 'enter' | 'exit', latitude: number, longitude: number) {
        throw new Error('Not yet implemented');
    } // TODO: implement

    // Set a listener that will be notified of certain location callbacks:
    // listener = callback function for result
    public static setLocationListener(listener: any) {
        throw new Error('Not yet implemented');
    } // TODO: callback parameter type, implement

    // Remove the listener and no longer be notified of certain location callbacks:
    public static removeLocationListener() {
        throw new Error('Not yet implemented');
    } // TODO: implement

    // Set a listener that will be notified of certain location callbacks:
    // listener = object implementing listener interface
    public static setCallToActionListener(listener: any) {
        throw new Error('Not yet implemented');
    } // TODO: callback parameter type, implement

    // Set a listener that will be notified of certain location callbacks:
    public static removeCallToActionListener() {
        throw new Error('Not yet implemented');
    } // TODO: implement

    /*******************
     * Developer Options
     ******************/

    public static setLoggingEnabled(enabled: boolean) {
        Localytics.setLoggingEnabled(enabled);
    }

    public static isLoggingEnabled(): boolean {
        return Localytics.isLoggingEnabled();
    }

    public static setOptions(options: plain) {
        Localytics.setOptions(toHashMap(options));
    }

    public static setOption(key: string, value: string | null) {
        Localytics.setOption(key, value);
    }

    public static redirectLogsToDisk(writeExternally: boolean) {
        Localytics.redirectLogsToDisk(writeExternally, application.android.foregroundActivity);
    }

    public static getInstallId(): string {
        return Localytics.getInstallId();
    }

    public static getAppKey(): string {
        return Localytics.getAppKey();
    }

    public static getLibraryVersion(): string {
        return Localytics.getLibraryVersion();
    }

    /*******************
     * Private Methods
     ******************/

    private static updateInboxCampaignCache() {
        for (const campaign of Localytics.getAllInboxCampaigns()) {
            LocalyticsAndroid.inboxCampaignCache[campaign.getCampaignId()] = campaign;
        }
    }
}

export {
    LocalyticsAndroid as Localytics
};
