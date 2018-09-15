export type plain = { [key: string]: string };

export declare interface CircularRegion {
    uniqueId: string;
    latitude: number;
    longitude: number;
    name: string;
    type: string;
    attributes: plain;
}

export declare interface Customer {
    customerId?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    emailAddress?: string;
}

export declare interface Campaign {
    campaignId: number;
    name: string;
    attributes: plain;

}

export declare interface InboxCampaign extends Campaign {
    creativeFilePath: string;
    read: boolean;
    title: string;
    sortOrder: number;
    receivedDate: number;
    summary: string;
    thumbnailUrl: string;
    hasCreative: boolean;
    deeplink: string;
    isPushToInboxCampaign: boolean;
    isVisible: boolean;
    deleted: boolean;
}

export declare interface InAppCampaign extends Campaign {
    creativeFilePath: string;
    aspectRatio: number;
    bannerOffsetDps: number;
    backgroundAlpha: number;
    displayLocation: string;
    dismissButtonHidden: boolean;
    dismissButtonLocation: 'left' | 'right';
    eventName: string;
    eventAttributes: plain;
}

export declare interface PushCampaign extends Campaign {
    creativeId: number;
    creativeType: string;
    message: string;
    title: string;
    soundFilename: string;
    attachmentUrl: string;
}

export declare interface PlacesCampaign extends Campaign {
    creativeId: number;
    creativeType: string;
    message: string;
    title: string;
    soundFilename: string;
    attachmentUrl: string;
    region: CircularRegion;
    triggerEvent: 'enter' | 'exit';
}

export declare interface AnalyticsListener {
    localyticsSessionWillOpen(isFirst: boolean, isUpgrade: boolean, isResume: boolean);
    localyticsSessionDidOpen(isFirst: boolean, isUpgrade: boolean, isResume: boolean);
    localyticsSessionWillClose();
    localyticsDidTagEvent(eventName: string, attributes: plain, customerValueIncrease: number);
}

export declare interface MessagingListener {
    localyticsShouldShowInAppMessage(campaign: InAppCampaign, shouldShow: boolean);
    localyticsDiyInAppMessage(campaign: InAppCampaign);
    localyticsWillDisplayInAppMessage(campaign: InAppCampaign);
    localyticsDidDisplayInAppMessage();
    localyticsWillDismissInAppMessage();
    localyticsDidDismissInAppMessage();
    localyticsShouldDelaySessionStartInAppMessages(shouldDelay: boolean);
    localyticsShouldShowPushNotification(campaign: PushCampaign, shouldShow: boolean);
    localyticsDiyPushNotification(campaign: PushCampaign);
    localyticsWillShowPushNotification(campaign: PushCampaign);
    localyticsShouldShowPlacesPushNotification(campaign: PlacesCampaign, shouldShow: boolean);
    localyticsDiyPlacesPushNotification(campaign: PlacesCampaign);
    localyticsWillShowPlacesPushNotification(campaign: PlacesCampaign);
}

export declare class Localytics {

    /*******************
     * Integration
     ******************/

    // Initializes Localytics without opening a session
    public static integrate();

    // Initializes Localytics by hooking into the activity lifecycle events of the app
    public static autoIntegrate();

    // Initiates an upload
    // This should typically be called on deviceready, resume, and pause events
    public static upload();

    // Halts uploads to the Localytics backend (while still allowing Localytics to collect data.)
    // pause = a Boolean indicating wether to pause or resume uploading
    public static pauseDataUploading(pause: boolean);

    // Opens a session
    // This should typically be called on deviceready and resume events
    public static openSession();

    // Closes a session
    // This should typically be called on pause events
    public static closeSession();

    /*******************
     * Analytics
     ******************/

    // Sets opted out
    // enabled = boolean
    public static setOptedOut(enabled: boolean);

    // Gets opted out status
    public static isOptedOut(): boolean;

    // Sets opted out
    // enabled = boolean
    public static setPrivacyOptedOut(enabled: boolean);

    // Gets opted out status
    public static isPrivacyOptedOut(): boolean;

    // Tags an event
    // event = Name of the event
    // attributes = a hash of key/value pairs containing the event attributes
    // customerValueIncrease = customer value increase as an int
    public static tagEvent(event: string, attributes?: plain, customerValueIncrease?: number);

    // A standard event to tag a single item purchase event (after the action has occurred)
    // itemName = The name of the item purchased (optional, can be null)
    // itemId = A unique identifier of the item being purchased, such as a SKU (optional, can be null)
    // itemType = The type of item (optional, can be null)
    // itemPrice = The price of the item (optional, can be null). Will be added to customer lifetime value. Try to use lowest possible unit, such as cents for US currency.
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagPurchased(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain);

    // A standard event to tag the addition of a single item to a cart (after the action has occurred)
    // itemName = The name of the item purchased (optional, can be null)
    // itemId = A unique identifier of the item being purchased, such as a SKU (optional, can be null)
    // itemType = The type of item (optional, can be null)
    // itemPrice = The price of the item (optional, can be null). Will be added to customer lifetime value. Try to use lowest possible unit, such as cents for US currency.
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagAddedToCart(itemName?: string, itemId?: string, itemType?: string, itemPrice?: number, attributes?: plain);

    // A standard event to tag the start of the checkout process (after the action has occurred)
    // totalPrice = The total price of all the items in the cart (optional, can be null). Will NOT be added to customer lifetime value.
    // itemCount = Total count of items in the cart (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagStartedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain);

    // A standard event to tag the conclusions of the checkout process (after the action has occurred)
    // totalPrice = The total price of all the items in the cart (optional, can be null). Will be added to customer lifetime value. Try to use lowest possible unit, such as cents for US currency.
    // itemCount = Total count of items in the cart (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCompletedCheckout(totalPrice?: number, itemCount?: number, attributes?: plain);

    // A standard event to tag the viewing of content (after the action has occurred)
    // contentName = The name of the content being viewed (such as article name) (optional, can be null)
    // contentId = A unique identifier of the content being viewed (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagContentViewed(contentName?: string, contentId?: string, contentType?: string, attributes?: plain);

    // A standard event to tag a search event (after the action has occurred)
    // queryText = The query user for the search (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // resultCount = The number of results returned by the query (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagSearched(queryText?: string, contentType?: string, resultCount?: number, attributes?: plain);

    // A standard event to tag a share event (after the action has occurred)
    // contentName = The name of the content being viewed (such as article name) (optional, can be null)
    // contentId = A unique identifier of the content being viewed (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // methodName = The method by which the content was shared such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagShared(contentName?: string, contentId?: string, contentType?: string, methodName?: string, attributes?: plain);

    // A standard event to tag the rating of content (after the action has occurred)
    // contentName = The name of the content being viewed (such as article name) (optional, can be null)
    // contentId = A unique identifier of the content being viewed (optional, can be null)
    // contentType = The type of content (optional, can be null)
    // rating = A rating of the content (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagContentRated(contentName?: string, contentId?: string, contentType?: string, rating?: string, attributes?: plain);

    // A standard event to tag the registration of a user (after the action has occurred)
    // customer = An object providing information about the customer that registered (optional, can be null)
    // methodName = The method by which the user was registered such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerRegistered(customer?: Customer, methodName?: string, attributes?: plain);

    // A standard event to tag the logging in of a user (after the action has occurred)
    // customer = An object providing information about the customer that registered (optional, can be null)
    // methodName = The method by which the user was registered such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerLoggedIn(customer?: Customer, methodName?: string, attributes?: plain);

    // A standard event to tag the logging out of a user (after the action has occurred)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagCustomerLoggedOut(attributes?: plain);

    // A standard event to tag the invitation of a user (after the action has occured)
    // methodName = The method by which the user was invited such as Twitter, Facebook, Native (optional, can be null)
    // attributes = Any additional attributes to attach to this event (optional, can be null)
    public static tagInvited(methodName?: string, attributes?: plain);

    // A standard event to tag an In-App impression
    // campaignId = The In-App campaign ID for which to tag an impression
    // impressionType = "click", "dismiss", or a custom action
    public static tagInAppImpression(campaignId: number, action: 'click' | 'dismiss' | string);

    // A standard event to tag an Inbox impression
    // campaignId = The Inbox campaign ID for which to tag an impression
    // impressionType = "click", "dismiss", or a custom action
    public static tagInboxImpression(campaignId: number, action: 'click' | 'dismiss' | string);

    // A standard event to tag a Push to Inbox impression
    // campaignId = The Inbox campaign ID for which to tag an impression
    // success = Whether or not the deep link was successful (iOS only)
    public static tagPushToInboxImpression(campaignId: number, success: boolean);

    // A standard event to tag a Places Push Received
    // campaignId = The Places campaign ID for which to tag an event
    public static tagPlacesPushReceived(campaignId: number);

    // A standard event to tag a Places Push Opened
    // campaignId = The Places campaign ID for which to tag an event
    // action = The title of the button that was pressed. This property will be passed
    // as the value of the 'Action' attribute ('Click' will be used if null).
    public static tagPlacesPushOpened(campaignId: number, action?: string);

    // Tags a screen
    // Call this when a screen is displayed
    // screen = screen name as a string
    public static tagScreen(screen: string);

    // Sets a custom dimension
    // index = dimension index as an int
    // value = dimension value as a string
    public static setCustomDimension(index: number, value: string);

    // Gets a custom dimension
    // index = dimension index as an int
    public static getCustomDimension(index: string): string;

    // Set a listener that will be notified of certain analytics callbacks:
    // listener = object implementing listener interface
    public static setAnalyticsListener(listener: AnalyticsListener);

    // Remove the listener and no longer be notified of certain analytics callbacks:
    public static removeAnalyticsListener();

    /*******************
     * Profiles
     ******************/

    // Set a customer profile attribute
    // name = The attribute name
    // value = The attribute value (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static setProfileAttribute(name: string, value: string, scope: 'app' | 'org');

    // Add a set of values to a customer profile attribute
    // name = The attribute name
    // value = The attribute value array (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static addProfileAttributesToSet(name: string, value: string[], scope: 'app' | 'org');

    // Remove a set of values to a customer profile attribute
    // name = The attribute name
    // value = The attribute value array (cannot be null)
    // scope = The scope of the attribute (app or org)
    public static removeProfileAttributesFromSet(name: string, value: string[], scope: 'app' | 'org');

    // Increment the value of a customer profile attribute by a specified amount
    // name = The attribute name
    // value = The amount by which to increment the value
    // scope = The scope of the attribute (app or org)
    public static incrementProfileAttribute(name: string, value: number, scope: 'app' | 'org');

    // Decrement the value of a customer profile attribute by a specified amount
    // name = The attribute name
    // value = The amount by which to decrement the value
    // scope = The scope of the attribute (app or org)
    public static decrementProfileAttribute(name: string, value: number, scope: 'app' | 'org');

    // Delete a customer profile attribute
    // name = The attribute name
    // scope = The scope of the attribute (app or org)
    public static deleteProfileAttribute(name: string, scope: 'app' | 'org');

    // Set customer email address
    // email = customer email as a string (ie, "johndoe@company.com")
    public static setCustomerEmail(email: string);

    // Set customer first name
    // firstName = customer first name as a string (ie, "John")
    public static setCustomerFirstName(firstName: string);

    // Set customer last name
    // lastName = customer last name as a string (ie, "Doe")
    public static setCustomerLastName(lastName: string);

    // Set customer full name
    // fullName = customer full name as a string (ie, "John Doe")
    public static setCustomerFullName(fullName: string);

    /*******************
     * User Information
     ******************/

    // Gets a custom idenitifer
    // key = identifier name as a string
    // value = identifier value as a string
    // successCallback = callback function for result
    public static getIdentifier(key: string): string;

    // Sets a custom idenitifer
    // key = identifier name as a string
    // value = identifier value as a string
    public static setIdentifier(key: string, value: string);

    // Get customer ID
    // successCallback = callback function for result
    public static getCustomerId(): string;

    // Set customer ID
    // id = unique customer id as a string (ie, "12345")
    public static setCustomerId(id: string);

    // Set customer ID and opted out status
    // id = unique customer id as a string (ie, "12345")
    // enabled = Privacy opt out state of user
    public static setCustomerIdWithPrivacyOptedOut(id: string, enabled: boolean);

    // Set a user's location
    // latitude = The latitude value
    // longitude = The longitude value
    public static setLocation(latitude: number, longitude: number);

    /*******************
     * Marketing
     ******************/

    // Registers for push notifications
    public static registerPush();

    // Sets the push token
    // pushToken = push token as a string
    public static setPushToken(pushToken: string);

    // Gets the push token
    public static getPushToken(): string;

    // Set a configuration object for push message display
    // config = The JSON config object
    public static setPushMessageConfiguration(config: plain);

    // Enables or disables Localytics test mode (disabled by default)
    // enabled = boolean
    public static setTestModeEnabled(enabled: boolean);

    // Gets test mode status
    public static isTestModeEnabled(): boolean;

    // iOS only: Set the image name to use for the In-App dismiss button
    // imageName = The named of the image in your app's Bundle
    public static setInAppMessageDismissButtonImageWithName(imageName: string);

    // Set the visibility of the dismiss button
    // hidden = This visibility state of the dimiss button
    public static setInAppMessageDismissButtonHidden(hidden: boolean);

    // Set the relative position of the in-app message dismiss button
    // buttonLocation = The button location ("left" or "right")
    public static setInAppMessageDismissButtonLocation(buttonLocation: 'left' | 'right');

    // Get the relative position of the in-app message dismiss button
    public static getInAppMessageDismissButtonLocation(): 'left' | 'right';

    // Trigger an in-app message
    // triggerName = The name of the in-app message trigger
    // attributes = The attributes associated with the in-app triggering event
    public static triggerInAppMessage(triggerName: string, attributes: plain);

    // Trigger campaigns as if a Session Start event had just occurred.
    public static triggerInAppMessagesForSessionStart();

    // If an in-app message is currently displayed, dismiss it. Is a no-op otherwise
    public static dismissCurrentInAppMessage();

    // Set a configuration object for in-app message display
    // config = The JSON config object
    public static setInAppMessageConfiguration(config: plain);

    // Returns whether the ADID parameter is added to In-App call to action URLs
    public static isInAppAdIdParameterEnabled(): boolean;

    // Set whether ADID parameter is added to In-App call to action URLs. By default
    // the ADID parameter will be added to call to action URLs.
    // enabled = true to enable the ADID parameter or false to disable it
    public static setInAppAdIdParameterEnabled(enabled: boolean);

    // Returns whether the ADID parameter is added to Inbox call to action URLs
    public static isInboxAdIdParameterEnabled(): boolean;

    // Set whether ADID parameter is added to Inbox call to action URLs. By default
    // the ADID parameter will be added to call to action URLs.
    // enabled = true to enable the ADID parameter or false to disable it
    public static setInboxAdIdParameterEnabled(enabled: boolean);

    // Get all Inbox campaigns that can be displayed
    public static getDisplayableInboxCampaigns(): Array<InboxCampaign>;

    // Get all Inbox campaigns. The return value will include Inbox campaigns with no listing title,
    // and thus no visible UI element.
    public static getAllInboxCampaigns(): Array<InboxCampaign>;

    // Refresh all Inbox campaigns that can be displayed from the Localytics server
    public static refreshInboxCampaigns(): Promise<Array<InboxCampaign>>;

    // Refresh all Inbox campaigns from the Localytics server. The return value will include Inbox
    // campaigns with no listing title, and thus no visible UI element.
    public static refreshAllInboxCampaigns(): Promise<Array<InboxCampaign>>;

    // Set an inbox campaign as read. Read state can be used to display opened inbox campaigns
    // campaigns differently (e.g. an unread indicator). Not guaranteed to work with push to inbox
    // campaigns.
    // campaignId = the campaign Id of the Inbox campaign
    // read = true to mark the campaign as read, false to mark it as unread
    public static setInboxCampaignRead(campaignId: number, read: boolean);

    // Delete an Inbox Campaign.
    // campaignId = the campaign Id of the Inbox campaign
    public static deleteInboxCampaign(campaignId: number);

    // Get the count of unread inbox messages
    public static getInboxCampaignsUnreadCount(): number;

    // Tell the Localytics SDK that an Inbox campaign was tapped in the list view
    // campaignId = the campaign Id of the Inbox campaign
    public static inboxListItemTapped(campaignId: number);

    // Trigger a places notification for the given campaign
    // campaignId = the Places campaign ID for which to trigger a notification
    public static triggerPlacesNotification(campaignId: number);

    // Set a configuration object for places push message display
    // config = The JSON config object
    public static setPlacesMessageConfiguration(config: plain);

    // Set a listener that will be notified of certain messaging callbacks:
    // listener = object implementing listener interface
    public static setMessagingListener(listener: MessagingListener);

    // Remove the listener and no longer be notified of certain location callbacks:
    public static removeMessagingListener();

    /*******************
     * Location
     ******************/

    // Enable or disable location monitoring for geofence monitoring
    // enabled = Flag to indicate whether the monitoring should be enabled or disabled
    public static setLocationMonitoringEnabled(enabled: boolean);

    // Get a list of geofences to monitor for enter/exit events
    // latitude = The user's current location latitude value
    // longitude = The user's current location longitude value
    // successCallback = callback function for result
    public static getGeofencesToMonitor(latitude: number, longitude: number): Array<any>; // TODO: return type

    // Trigger a region with a certain event
    // region = The region that was triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegion(region: CircularRegion, event: 'enter' | 'exit', latitude: number, longitude: number); // TODO: region parameter type

    // Trigger a list of regions with a certain event
    // regions = A list of regions that were triggered
    // event = The event that triggered the region ("enter" or "exit")
    // latitude = The latitude where the region was triggered
    // longitude = The longitude where the region was triggered
    public static triggerRegions(regions: Array<CircularRegion>, event: 'enter' | 'exit', latitude: number, longitude: number); // TODO: regions parameter type

    // Set a listener that will be notified of certain location callbacks:
    // listener = object implementing listener interface
    public static setLocationListener(listener: any); // TODO: callback parameter type

    // Remove the listener and no longer be notified of certain location callbacks:
    public static removeLocationListener();

    // Set a listener that will be notified of certain location callbacks:
    // listener = object implementing listener interface
    public static setCallToActionListener(listener: any); // TODO: callback parameter type

    // Set a listener that will be notified of certain location callbacks
    public static removeCallToActionListener();

    /*******************
     * Developer Options
     ******************/

    // Enables or disables Localytics logging (disabled by default)
    // enabled = boolean
    public static setLoggingEnabled(enabled: boolean);

    // Gets logging status
    public static isLoggingEnabled(): boolean;

    // Customize the behavior of the SDK by setting custom values for various options.
    // In each entry, the key specifies the option to modify, and the value specifies what value
    // to set the option to. Options can be restored to default by passing in a value of null,
    // or an empty string for values with type String.
    // options = The object of options and values to modify
    public static setOptions(options: plain);

    // Customize the behavior of the SDK by setting custom values for various options.
    // In each entry, the key specifies the option to modify, and the value specifies what value
    // to set the option to. Options can be restored to default by passing in a value of null,
    // or an empty string for values with type String.
    // key = The key of the option
    // value = The value of the option or null to restore the default
    public static setOption(key: string, value: string | null);

    // No production builds should call this method.
    // Enable/Disable log rerouting to a file on disk.  Calling this method will allow logs to be
    // copied later. The method allows two options:
    //   * writeExternally set to true will write the logs to files/console.log within the app's directory
    //   * writeExternally set to false will write the logs to console.log in the app's external
    //     storage directory. This option requires requesting WRITE_EXTERNAL_STORAGE permissions from
    //     the user. On Android less than 2.3 this additionally requires requesting the READ_LOGS
    //     permission.
    // writeExternally (Android only) = a boolean value to indicate where to write the logs.
    public static redirectLogsToDisk(writeExternally: boolean);

    // Gets install id
    public static getInstallId(): string;

    // Gets app key
    public static getAppKey(): string;

    // Gets library version
    public static getLibraryVersion(): string;
}
