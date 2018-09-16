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

declare const Localytics: any;

class LocalyticsIOS implements LocalyticsDef {

    /*******************
     * Integration
     ******************/

    public static integrate() {
        const appKey = NSBundle.mainBundle.objectForInfoDictionaryKey('LocalyticsAppKey');
        Localytics.integrate(appKey);
    }

    public static autoIntegrate() {
        const appKey = NSBundle.mainBundle.objectForInfoDictionaryKey('LocalyticsAppKey');
        Localytics.autoIntegrate(appKey);
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

    public static tagEvent(event: string, attributes?: plain, customerValueIncrease?: number) {
        const attr = attributes ? NSDictionary.dictionaryWithDictionary(attributes as any) : null;
        Localytics.tagEventWithEventNameAttributesCustomerValueIncrease(event, attr, customerValueIncrease);
    }

    public static tagPurchased(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain) {
        const attr = attributes ? NSDictionary.dictionaryWithDictionary(attributes as any) : null;
        Localytics.tagPurchasedItemIdItemTypeItemPriceAttributes(itemName, itemId, itemType, itemPrice, attr);
    }

    // A standard event to tag the addition of a single item to a cart (after the action has occurred)
    // itemName = The name of the item purchased (optional, can be null)
    // itemId = A unique identifier of the item being purchased, such as a SKU (optional, can be null)
    // itemType = The type of item (optional, can be null)
    // itemPrice = The price of the item (optional, can be null). Will be added to customer lifetime value. Try to use lowest possible unit, such as cents for US currency.
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagAddedToCart(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the start of the checkout process (after the action has occurred)
    // totalPrice = The total price of all the items in the cart (optional, can be null). Will NOT be added to customer lifetime value.
    // itemCount = Total count of items in the cart (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagStartedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the conclusions of the checkout process (after the action has occurred)
    // totalPrice = The total price of all the items in the cart (optional, can be null). Will be added to customer lifetime value. Try to use lowest possible unit, such as cents for US currency.
    // itemCount = Total count of items in the cart (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCompletedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain) { throw new Error('Not yet implemented'); }

    public static tagContentViewed(contentName?: string, contentId?: string, contentType?: string, attributes?: plain) {
        const attr = attributes ? NSDictionary.dictionaryWithDictionary(attributes as any) : null;
        Localytics.tagContentViewedContentIdContentTypeAttributes(contentName, contentId, contentType, attr);
    }

    // A standard event to tag a search event (after the action has occurred)
    // queryText = The query user for the search (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // resultCount = The number of results returned by the query (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagSearched(queryText?: string, contentType?: string, resultCount?: number, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag a share event (after the action has occurred)
    // contentName = The name of the content being viewed (such as article name) (optional, can be null)
    // contentId = A unique identifier of the content being viewed (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // methodName = The method by which the content was shared such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagShared(contentName?: string, contentId?: string, contentType?: string, methodName?: string, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the rating of content (after the action has occurred)
    // contentName = The name of the content being viewed (such as article name) (optional, can be null)
    // contentId = A unique identifier of the content being viewed (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // rating = A rating of the content (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagContentRated(contentName?: string, contentId?: string, contentType?: string, rating?: string, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the registration of a user (after the action has occurred)
    // customer = An object providing information about the customer that registered (optional, can be null)
    // methodName = The method by which the user was registered such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerRegistered(customer?: Customer, methodName?: string, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the logging in of a user (after the action has occurred)
    // customer = An object providing information about the customer that registered (optional, can be null)
    // methodName = The method by which the user was registered such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerLoggedIn(customer?: Customer, methodName?: string, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the logging out of a user (after the action has occurred)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerLoggedOut(attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag the invitation of a user (after the action has occured)
    // methodName = The method by which the user was invited such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagInvited(methodName?: string, attributes?: plain) { throw new Error('Not yet implemented'); }

    // A standard event to tag an In-App impression
    // campaignId = The In-App campaign ID for which to tag an impression
    // impressionType = "click", "dismiss", or a custom action
    public static tagInAppImpression(campaignId: number, action: 'click' | 'dismiss' | string) { throw new Error('Not yet implemented'); }

    // A standard event to tag an Inbox impression
    // campaignId = The Inbox campaign ID for which to tag an impression
    // impressionType = "click", "dismiss", or a custom action
    public static tagInboxImpression(campaignId: number, action: 'click' | 'dismiss' | string) { throw new Error('Not yet implemented'); }

    // A standard event to tag a Push to Inbox impression
    // campaignId = The Inbox campaign ID for which to tag an impression
    // success = Whether or not the deep link was successful (iOS only)
    public static tagPushToInboxImpression(campaignId: number, success: boolean) { throw new Error('Not yet implemented'); }

    // A standard event to tag a Places Push Received
    // campaignId = The Places campaign ID for which to tag an event
    public static tagPlacesPushReceived(campaignId: number) { throw new Error('Not yet implemented'); }

    // A standard event to tag a Places Push Opened
    // campaignId = The Places campaign ID for which to tag an event
    // action = The title of the button that was pressed. This property will be passed
    // as the value of the 'Action' attribute ('Click' will be used if null).
    public static tagPlacesPushOpened(campaignId: number, action?: string) { throw new Error('Not yet implemented'); }

    public static tagScreen(screen: string) {
        Localytics.tagScreen(screen);
    }

    // Sets a custom dimension
    // index = dimension index as an int
    // value = dimension value as a string
    public static setCustomDimension(index: number, value: string) { throw new Error('Not yet implemented'); }

    // Gets a custom dimension
    // index = dimension index as an int
    public static getCustomDimension(index: string): string { throw new Error('Not yet implemented'); }

    // Set a listener that will be notified of certain analytics callbacks:
    // listener = object implementing listener interface
    public static setAnalyticsListener(listener: AnalyticsListener) { throw new Error('Not yet implemented'); }

    // Remove the listener and no longer be notified of certain analytics callbacks:
    public static removeAnalyticsListener() { throw new Error('Not yet implemented'); }

    /*******************
     * Profiles
     ******************/

    // Set a customer profile attribute
    // name = The attribute name
    // value = The attribute value (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static setProfileAttribute(name: string, value: string, scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

    // Add a set of values to a customer profile attribute
    // name = The attribute name
    // value = The attribute value array (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static addProfileAttributesToSet(name: string, value: string[], scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

    // Remove a set of values to a customer profile attribute
    // name = The attribute name
    // value = The attribute value array (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static removeProfileAttributesFromSet(name: string, value: string[], scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

    // Increment the value of a customer profile attribute by a specified amount
    // name = The attribute name
    // value = The amount by which to increment the value
    // scope = The scope of the attribute (app or org)
    public static incrementProfileAttribute(name: string, value: number, scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

    // Decrement the value of a customer profile attribute by a specified amount
    // name = The attribute name
    // value = The amount by which to decrement the value
    // scope = The scope of the attribute (app or org)
    public static decrementProfileAttribute(name: string, value: number, scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

    // Delete a customer profile attribute
    // name = The attribute name
    // scope = The scope of the attribute (app or org)
    public static deleteProfileAttribute(name: string, scope: 'app' | 'org') { throw new Error('Not yet implemented'); }

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
        return Localytics.valueForIdentifier(key);
    }

    public static setIdentifier(key: string, value: string) {
        Localytics.setValueForIdentifier(value, key);
    }

    public static getCustomerId(): string {
        return Localytics.customerId();
    }

    public static setCustomerId(id: string) {
        Localytics.setCustomerId(id);
    }

    public static setCustomerIdWithPrivacyOptedOut(id: string, enabled: boolean) {
        Localytics.setCustomerIdPrivacyOptedOut(id, enabled);
    }

    public static setLocation(latitude: number, longitude: number) {
        const location = new CLLocationCoordinate2D();
        location.latitude = latitude;
        location.longitude = longitude;
        Localytics.setLocation(location);
    }

    /*******************
     * Marketing
     ******************/

    // Registers for push notifications
    public static registerPush() { throw new Error('Not yet implemented'); }

    // Sets the push token
    // pushToken = push token as a string
    public static setPushToken(pushToken: string) { throw new Error('Not yet implemented'); }

    // Gets the push token
    public static getPushToken(): string { throw new Error('Not yet implemented'); }

    // Set a configuration object for push message display
    // config = The JSON config object
    public static setPushMessageConfiguration(config: plain) { throw new Error('Not yet implemented'); }

    // Enables or disables Localytics test mode (disabled by default)
    // enabled = boolean
    public static setTestModeEnabled(enabled: boolean) { throw new Error('Not yet implemented'); }

    // Gets test mode status
    public static isTestModeEnabled(): boolean { throw new Error('Not yet implemented'); }

    // iOS only: Set the image name to use for the In-App dismiss button
    // imageName = The named of the image in your app's Bundle
    public static setInAppMessageDismissButtonImageWithName(imageName: string) { throw new Error('Not yet implemented'); }

    // Set the visibility of the dismiss button
    // hidden = This visibility state of the dimiss button
    public static setInAppMessageDismissButtonHidden(hidden: boolean) { throw new Error('Not yet implemented'); }

    // Set the relative position of the in-app message dismiss button
    // buttonLocation = The button location ("left" or "right")
    public static setInAppMessageDismissButtonLocation(buttonLocation: 'left' | 'right') { throw new Error('Not yet implemented'); }

    // Get the relative position of the in-app message dismiss button
    public static getInAppMessageDismissButtonLocation(): 'left' | 'right' { throw new Error('Not yet implemented'); }

    // Trigger an in-app message
    // triggerName = The name of the in-app message trigger
    // attributes = The attributes associated with the in-app triggering event
    public static triggerInAppMessage(triggerName: string, attributes: plain) { throw new Error('Not yet implemented'); }

    // Trigger campaigns as if a Session Start event had just occurred.
    public static triggerInAppMessagesForSessionStart() { throw new Error('Not yet implemented'); }

    // If an in-app message is currently displayed, dismiss it. Is a no-op otherwise
    public static dismissCurrentInAppMessage() { throw new Error('Not yet implemented'); }

    // Set a configuration object for in-app message display
    // config = The JSON config object
    public static setInAppMessageConfiguration(config: plain) { throw new Error('Not yet implemented'); }

    // Returns whether the ADID parameter is added to In-App call to action URLs
    public static isInAppAdIdParameterEnabled(): boolean { throw new Error('Not yet implemented'); }

    // Set whether ADID parameter is added to In-App call to action URLs. By default
    // the ADID parameter will be added to call to action URLs.
    // enabled = true to enable the ADID parameter or false to disable it
    public static setInAppAdIdParameterEnabled(enabled: boolean) { throw new Error('Not yet implemented'); }

    // Returns whether the ADID parameter is added to Inbox call to action URLs
    public static isInboxAdIdParameterEnabled(): boolean { throw new Error('Not yet implemented'); }

    // Set whether ADID parameter is added to Inbox call to action URLs. By default
    // the ADID parameter will be added to call to action URLs.
    // enabled = true to enable the ADID parameter or false to disable it
    public static setInboxAdIdParameterEnabled(enabled: boolean) { throw new Error('Not yet implemented'); }

    // Get all Inbox campaigns that can be displayed
    public static getDisplayableInboxCampaigns(): Array<InboxCampaign> { throw new Error('Not yet implemented'); }

    // Get all Inbox campaigns. The return value will include Inbox campaigns with no listing title,
    // and thus no visible UI element.
    public static getAllInboxCampaigns(): Array<InboxCampaign> { throw new Error('Not yet implemented'); }

    // Refresh all Inbox campaigns that can be displayed from the Localytics server
    public static refreshInboxCampaigns(): Promise<Array<InboxCampaign>> { throw new Error('Not yet implemented'); }

    // Refresh all Inbox campaigns from the Localytics server. The return value will include Inbox
    // campaigns with no listing title, and thus no visible UI element.
    public static refreshAllInboxCampaigns(): Promise<Array<InboxCampaign>> { throw new Error('Not yet implemented'); }

    // Set an inbox campaign as read. Read state can be used to display opened inbox campaigns
    // campaigns differently (e.g. an unread indicator). Not guaranteed to work with push to inbox
    // campaigns.
    // campaignId = the campaign Id of the Inbox campaign
    // read = true to mark the campaign as read, false to mark it as unread
    public static setInboxCampaignRead(campaignId: number, read: boolean) { throw new Error('Not yet implemented'); }

    // Delete an Inbox Campaign.
    // campaignId = the campaign Id of the Inbox campaign
    public static deleteInboxCampaign(campaignId: number) { throw new Error('Not yet implemented'); }

    // Get the count of unread inbox messages
    public static getInboxCampaignsUnreadCount(): number { throw new Error('Not yet implemented'); }

    // Tell the Localytics SDK that an Inbox campaign was tapped in the list view
    // campaignId = the campaign Id of the Inbox campaign
    public static inboxListItemTapped(campaignId: number) { throw new Error('Not yet implemented'); }

    // Trigger a places notification for the given campaign
    // campaignId = the Places campaign ID for which to trigger a notification
    public static triggerPlacesNotification(campaignId: number) { throw new Error('Not yet implemented'); }

    // Set a configuration object for places push message display
    // config = The JSON config object
    public static setPlacesMessageConfiguration(config: plain) { throw new Error('Not yet implemented'); }

    // Set a listener that will be notified of certain messaging callbacks:
    // listener = object implementing listener interface
    public static setMessagingListener(listener: MessagingListener) { throw new Error('Not yet implemented'); }

    // Remove the listener and no longer be notified of certain location callbacks:
    public static removeMessagingListener() { throw new Error('Not yet implemented'); }

    /*******************
     * Location
     ******************/

    // Enable or disable location monitoring for geofence monitoring
    // enabled = Flag to indicate whether the monitoring should be enabled or disabled
    public static setLocationMonitoringEnabled(enabled: boolean) { throw new Error('Not yet implemented'); }

    // Get a list of geofences to monitor for enter/exit events
    // latitude = The user's current location latitude value
    // longitude = The user's current location longitude value
    // successCallback = callback function for result
    public static getGeofencesToMonitor(latitude: number, longitude: number): Array<any> { throw new Error('Not yet implemented'); } // TODO: return type

    // Trigger a region with a certain event
    // region = The region that was triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegion(region: CircularRegion, event: 'enter' | 'exit', latitude: number, longitude: number) { throw new Error('Not yet implemented'); } // TODO: region parameter type

    // Trigger a list of regions with a certain event
    // regions = A list of regions that were triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegions(regions: Array<CircularRegion>, event: 'enter' | 'exit', latitude: number, longitude: number) { throw new Error('Not yet implemented'); } // TODO: regions parameter type

    // Set a listener that will be notified of certain location callbacks:
    // listener = object implementing listener interface
    public static setLocationListener(listener: any) { throw new Error('Not yet implemented'); } // TODO: callback parameter type

    // Remove the listener and no longer be notified of certain location callbacks:
    public static removeLocationListener() { throw new Error('Not yet implemented'); }

    // Set a listener that will be notified of certain location callbacks:
    // listener = object implementing listener interface
    public static setCallToActionListener(listener: any) { throw new Error('Not yet implemented'); } // TODO: callback parameter type

    // Set a listener that will be notified of certain location callbacks
    public static removeCallToActionListener() { throw new Error('Not yet implemented'); }

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
        Localytics.setOptions(NSDictionary.dictionaryWithDictionary(options as any));
    }

    public static setOption(key: string, value: string | null) {
        Localytics.setOptions(NSDictionary.dictionaryWithDictionary({ [key]: value } as any));
    }

    public static redirectLogsToDisk(writeExternally: boolean) {
        Localytics.redirectLoggingToDisk();
    }

    public static getInstallId(): string {
        return Localytics.installId();
    }

    public static getAppKey(): string {
        return Localytics.appKey();
    }

    public static getLibraryVersion(): string {
        return Localytics.libraryVersion();
    }
}

export {
    LocalyticsIOS as Localytics
};
