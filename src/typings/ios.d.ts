
declare const enum CampaignType {

	InApp = 0,

	Push = 1,

	Inbox = 2,

	Places = 3
}

interface LLAnalyticsDelegate extends JSExport, NSObjectProtocol {

	localyticsDidTagEventAttributesCustomerValueIncrease?(eventName: string, attributes: NSDictionary<string, string>, customerValueIncrease: number): void;

	localyticsSessionDidOpenIsUpgradeIsResume?(isFirst: boolean, isUpgrade: boolean, isResume: boolean): void;

	localyticsSessionWillClose?(): void;

	localyticsSessionWillOpenIsUpgradeIsResume?(isFirst: boolean, isUpgrade: boolean, isResume: boolean): void;
}
declare var LLAnalyticsDelegate: {

	prototype: LLAnalyticsDelegate;
};

interface LLCallToActionDelegate extends NSObjectProtocol {

	localyticsDidOptOutCampaign?(optedOut: boolean, campaign: LLCampaignBase): void;

	localyticsDidPrivacyOptOutCampaign?(privacyOptedOut: boolean, campaign: LLCampaignBase): void;

	localyticsShouldDeeplinkCampaign?(url: NSURL, campaign: LLCampaignBase): boolean;

	localyticsShouldPromptForLocationAlwaysPermissions?(campaign: LLCampaignBase): boolean;

	localyticsShouldPromptForLocationWhenInUsePermissions?(campaign: LLCampaignBase): boolean;

	localyticsShouldPromptForNotificationPermissions?(campaign: LLCampaignBase): boolean;
}
declare var LLCallToActionDelegate: {

	prototype: LLCallToActionDelegate;
};

declare class LLCampaignBase extends NSObject {

	static alloc(): LLCampaignBase; // inherited from NSObject

	static new(): LLCampaignBase; // inherited from NSObject

	readonly attributes: NSDictionary<string, string>;

	readonly campaignId: number;

	readonly name: string;
}

declare class LLCustomer extends NSObject {

	static alloc(): LLCustomer; // inherited from NSObject

	static customerWithBlock(block: (p1: LLCustomerBuilder) => void): LLCustomer;

	static new(): LLCustomer; // inherited from NSObject

	readonly customerId: string;

	readonly emailAddress: string;

	readonly firstName: string;

	readonly fullName: string;

	readonly lastName: string;
}

declare class LLCustomerBuilder extends NSObject {

	static alloc(): LLCustomerBuilder; // inherited from NSObject

	static new(): LLCustomerBuilder; // inherited from NSObject

	customerId: string;

	emailAddress: string;

	firstName: string;

	fullName: string;

	lastName: string;
}

declare class LLGeofence extends LLRegion {

	static alloc(): LLGeofence; // inherited from NSObject

	static new(): LLGeofence; // inherited from NSObject

	readonly region: CLCircularRegion;
}

declare const enum LLImpressionType {

	Click = 0,

	Dismiss = 1
}

declare class LLInAppCampaign extends LLWebViewCampaign {

	static alloc(): LLInAppCampaign; // inherited from NSObject

	static new(): LLInAppCampaign; // inherited from NSObject

	readonly aspectRatio: number;

	readonly backgroundAlpha: number;

	readonly dismissButtonHidden: boolean;

	readonly dismissButtonLocation: LLInAppMessageDismissButtonLocation;

	readonly eventAttributes: NSDictionary<any, any>;

	readonly eventName: string;

	readonly isResponsive: boolean;

	readonly offset: number;

	readonly type: LLInAppMessageType;
}

declare class LLInAppConfiguration extends NSObject {

	static alloc(): LLInAppConfiguration; // inherited from NSObject

	static new(): LLInAppConfiguration; // inherited from NSObject

	aspectRatio: number;

	backgroundAlpha: number;

	dismissButtonHidden: boolean;

	dismissButtonImage: UIImage;

	dismissButtonLocation: LLInAppMessageDismissButtonLocation;

	offset: number;

	isBottomBannerCampaign(): boolean;

	isCenterCampaign(): boolean;

	isFullScreenCampaign(): boolean;

	isTopBannerCampaign(): boolean;

	setDismissButtonImageWithName(imageName: string): void;
}

declare const enum LLInAppMessageDismissButtonLocation {

	Left = 0,

	Right = 1
}

declare const enum LLInAppMessageType {

	Top = 0,

	Bottom = 1,

	Center = 2,

	Full = 3
}

declare class LLInboxCampaign extends LLWebViewCampaign {

	static alloc(): LLInboxCampaign; // inherited from NSObject

	static new(): LLInboxCampaign; // inherited from NSObject

	readonly deepLinkURL: NSURL;

	readonly deleted: boolean;

	readonly hasCreative: boolean;

	readonly isPushToInboxCampaign: boolean;

	read: boolean;

	readonly receivedDate: number;

	readonly sortOrder: number;

	readonly summaryText: string;

	readonly thumbnailUrl: NSURL;

	readonly titleText: string;

	delete(): void;
}

interface LLInboxCampaignsRefreshingDelegate extends NSObjectProtocol {

	localyticsDidBeginRefreshingInboxCampaigns?(): void;

	localyticsDidFinishRefreshingInboxCampaigns?(): void;
}
declare var LLInboxCampaignsRefreshingDelegate: {

	prototype: LLInboxCampaignsRefreshingDelegate;
};

declare class LLInboxDetailViewController extends UIViewController {

	static alloc(): LLInboxDetailViewController; // inherited from NSObject

	static new(): LLInboxDetailViewController; // inherited from NSObject

	readonly campaign: LLInboxCampaign;

	creativeLoadErrorView: UIView;

	deleteInNavBar: boolean;
}

declare class LLInboxViewController extends UIViewController implements LLInboxCampaignsRefreshingDelegate, UITableViewDataSource, UITableViewDelegate {

	static alloc(): LLInboxViewController; // inherited from NSObject

	static new(): LLInboxViewController; // inherited from NSObject

	cellBackgroundColor: UIColor;

	creativeLoadErrorView: UIView;

	detailTextLabelColor: UIColor;

	detailTextLabelFont: UIFont;

	downloadsThumbnails: boolean;

	emptyCampaignsView: UIView;

	enableDetailViewDelete: boolean;

	enableSwipeDelete: boolean;

	showsActivityIndicatorView: boolean;

	tableData: NSArray<any>;

	tableView: UITableView;

	textLabelColor: UIColor;

	textLabelFont: UIFont;

	timeTextLabelColor: UIColor;

	timeTextLabelFont: UIFont;

	unreadIndicatorColor: UIColor;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	campaignForRowAtIndexPath(indexPath: NSIndexPath): LLInboxCampaign;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	indexPathForPreferredFocusedViewInTableView(tableView: UITableView): NSIndexPath;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	localyticsDidBeginRefreshingInboxCampaigns(): void;

	localyticsDidFinishRefreshingInboxCampaigns(): void;

	numberOfSectionsInTableView(tableView: UITableView): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidChangeAdjustedContentInset(scrollView: UIScrollView): void;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	sectionIndexTitlesForTableView(tableView: UITableView): NSArray<string>;

	self(): this;

	tableViewAccessoryButtonTappedForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewAccessoryTypeForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellAccessoryType;

	tableViewCanEditRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanFocusRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanMoveRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): boolean;

	tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCell;

	tableViewCommitEditingStyleForRowAtIndexPath(tableView: UITableView, editingStyle: UITableViewCellEditingStyle, indexPath: NSIndexPath): void;

	tableViewDidDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndDisplayingHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUnhighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUpdateFocusInContextWithAnimationCoordinator(tableView: UITableView, context: UITableViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void;

	tableViewEditActionsForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSArray<UITableViewRowAction>;

	tableViewEditingStyleForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellEditingStyle;

	tableViewEstimatedHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewIndentationLevelForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewLeadingSwipeActionsConfigurationForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UISwipeActionsConfiguration;

	tableViewMoveRowAtIndexPathToIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, destinationIndexPath: NSIndexPath): void;

	tableViewNumberOfRowsInSection(tableView: UITableView, section: number): number;

	tableViewPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): void;

	tableViewSectionForSectionIndexTitleAtIndex(tableView: UITableView, title: string, index: number): number;

	tableViewShouldHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldIndentWhileEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldShowMenuForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldSpringLoadRowAtIndexPathWithContext(tableView: UITableView, indexPath: NSIndexPath, context: UISpringLoadedInteractionContext): boolean;

	tableViewShouldUpdateFocusInContext(tableView: UITableView, context: UITableViewFocusUpdateContext): boolean;

	tableViewTargetIndexPathForMoveFromRowAtIndexPathToProposedIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, proposedDestinationIndexPath: NSIndexPath): NSIndexPath;

	tableViewTitleForDeleteConfirmationButtonForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): string;

	tableViewTitleForFooterInSection(tableView: UITableView, section: number): string;

	tableViewTitleForHeaderInSection(tableView: UITableView, section: number): string;

	tableViewTrailingSwipeActionsConfigurationForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UISwipeActionsConfiguration;

	tableViewViewForFooterInSection(tableView: UITableView, section: number): UIView;

	tableViewViewForHeaderInSection(tableView: UITableView, section: number): UIView;

	tableViewWillBeginEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewWillDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

interface LLLocationDelegate extends NSObjectProtocol {

	localyticsDidTriggerRegionsWithEvent?(regions: NSArray<LLRegion>, event: LLRegionEvent): void;

	localyticsDidUpdateLocation?(location: CLLocation): void;

	localyticsDidUpdateMonitoredRegionsRemoveRegions?(addedRegions: NSArray<LLRegion>, removedRegions: NSArray<LLRegion>): void;
}
declare var LLLocationDelegate: {

	prototype: LLLocationDelegate;
};

interface LLMessagingDelegate extends NSObjectProtocol {

	localyticsDidDismissInAppMessage?(): void;

	localyticsDidDismissInboxDetailViewController?(): void;

	localyticsDidDisplayInAppMessage?(): void;

	localyticsDidDisplayInboxDetailViewController?(): void;

	localyticsShouldDeeplink?(url: NSURL): boolean;

	localyticsShouldDelaySessionStartInAppMessages?(): boolean;

	localyticsShouldDisplayPlacesCampaign?(campaign: LLPlacesCampaign): boolean;

	localyticsShouldShowInAppMessage?(campaign: LLInAppCampaign): boolean;

	localyticsWillDismissInAppMessage?(): void;

	localyticsWillDismissInboxDetailViewController?(): void;

	localyticsWillDisplayInAppMessageWithConfiguration?(campaign: LLInAppCampaign, configuration: LLInAppConfiguration): LLInAppConfiguration;

	localyticsWillDisplayInboxDetailViewController?(): void;

	localyticsWillDisplayNotificationContentForPlacesCampaign?(notification: UNMutableNotificationContent, campaign: LLPlacesCampaign): UNMutableNotificationContent;

	localyticsWillDisplayNotificationForPlacesCampaign?(notification: UILocalNotification, campaign: LLPlacesCampaign): UILocalNotification;
}
declare var LLMessagingDelegate: {

	prototype: LLMessagingDelegate;
};

declare class LLPlacesCampaign extends LLCampaignBase {

	static alloc(): LLPlacesCampaign; // inherited from NSObject

	static new(): LLPlacesCampaign; // inherited from NSObject

	readonly attachmentType: string;

	readonly attachmentURL: string;

	readonly category: string;

	readonly event: LLRegionEvent;

	readonly message: string;

	readonly region: LLRegion;

	readonly soundFilename: string;
}

declare const enum LLProfileScope {

	Application = 0,

	Organization = 1
}

declare class LLRegion extends NSObject {

	static alloc(): LLRegion; // inherited from NSObject

	static new(): LLRegion; // inherited from NSObject

	readonly attributes: NSDictionary<string, string>;

	readonly name: string;

	readonly region: CLRegion;
}

declare const enum LLRegionEvent {

	Enter = 0,

	Exit = 1
}

declare class LLWebViewCampaign extends LLCampaignBase {

	static alloc(): LLWebViewCampaign; // inherited from NSObject

	static new(): LLWebViewCampaign; // inherited from NSObject

	readonly creativeFilePath: string;
}

declare class Localytics extends NSObject implements LocalyticsProtocol {

	static addValuesToSetForProfileAttribute(values: NSArray<any>, attribute: string): void;

	static addValuesToSetForProfileAttributeWithScope(values: NSArray<any>, attribute: string, scope: LLProfileScope): void;

	static allInboxCampaigns(): NSArray<LLInboxCampaign>;

	static alloc(): Localytics; // inherited from NSObject

	static appKey(): string;

	static autoIntegrateWithLocalyticsOptionsLaunchOptions(appKey: string, localyticsOptions: NSDictionary<any, any>, launchOptions: NSDictionary<any, any>): void;

	static closeSession(): void;

	static customerId(): string;

	static decrementValueByForProfileAttribute(value: number, attribute: string): void;

	static decrementValueByForProfileAttributeWithScope(value: number, attribute: string, scope: LLProfileScope): void;

	static deleteInboxCampaign(campaign: LLInboxCampaign): void;

	static deleteProfileAttribute(attribute: string): void;

	static deleteProfileAttributeWithScope(attribute: string, scope: LLProfileScope): void;

	static didReceiveNotificationResponseWithUserInfo(userInfo: NSDictionary<any, any>): void;

	static didReceiveNotificationResponseWithUserInfoAndActionIdentifier(userInfo: NSDictionary<any, any>, identifier: string): void;

	static didRegisterUserNotificationSettings(): void;

	static didRequestUserNotificationAuthorizationWithOptionsGranted(options: number, granted: boolean): void;

	static dismissCurrentInAppMessage(): void;

	static displayableInboxCampaigns(): NSArray<LLInboxCampaign>;

	static geofencesToMonitor(currentCoordinate: CLLocationCoordinate2D): NSArray<LLRegion>;

	static handleNotification(notificationInfo: NSDictionary<any, any>): void;

	static handleNotificationWithActionIdentifier(notificationInfo: NSDictionary<any, any>, identifier: string): void;

	static handleTestModeURL(url: NSURL): boolean;

	static inAppMessageDismissButtonLocation(): LLInAppMessageDismissButtonLocation;

	static inboxCampaigns(): NSArray<LLInboxCampaign>;

	static inboxCampaignsUnreadCount(): number;

	static inboxDetailViewControllerForCampaign(campaign: LLInboxCampaign): LLInboxDetailViewController;

	static inboxListItemTapped(campaign: LLInboxCampaign): void;

	static incrementValueByForProfileAttribute(value: number, attribute: string): void;

	static incrementValueByForProfileAttributeWithScope(value: number, attribute: string, scope: LLProfileScope): void;

	static installId(): string;

	static integrateWithLocalyticsOptions(appKey: string, localyticsOptions: NSDictionary<any, any>): void;

	static isInAppAdIdParameterEnabled(): boolean;

	static isInboxAdIdParameterEnabled(): boolean;

	static isLoggingEnabled(): boolean;

	static isOptedOut(): boolean;

	static isPrivacyOptedOut(): boolean;

	static isTestModeEnabled(): boolean;

	static libraryVersion(): string;

	static new(): Localytics; // inherited from NSObject

	static openSession(): void;

	static pauseDataUploading(pause: boolean): void;

	static pushToken(): string;

	static redirectLoggingToDisk(): void;

	static refreshAllInboxCampaigns(completionBlock: (p1: NSArray<LLInboxCampaign>) => void): void;

	static refreshInboxCampaigns(completionBlock: (p1: NSArray<LLInboxCampaign>) => void): void;

	static removeValuesFromSetForProfileAttribute(values: NSArray<any>, attribute: string): void;

	static removeValuesFromSetForProfileAttributeWithScope(values: NSArray<any>, attribute: string, scope: LLProfileScope): void;

	static setAnalyticsDelegate(delegate: LLAnalyticsDelegate): void;

	static setCallToActionDelegate(delegate: LLCallToActionDelegate): void;

	static setCustomerEmail(email: string): void;

	static setCustomerFirstName(firstName: string): void;

	static setCustomerFullName(fullName: string): void;

	static setCustomerId(customerId: string): void;

	static setCustomerIdPrivacyOptedOut(customerId: string, optedOut: boolean): void;

	static setCustomerLastName(lastName: string): void;

	static setInAppAdIdParameterEnabled(enabled: boolean): void;

	static setInAppMessageDismissButtonHidden(hidden: boolean): void;

	static setInAppMessageDismissButtonImage(image: UIImage): void;

	static setInAppMessageDismissButtonImageWithName(imageName: string): void;

	static setInAppMessageDismissButtonLocation(location: LLInAppMessageDismissButtonLocation): void;

	static setInboxAdIdParameterEnabled(enabled: boolean): void;

	static setInboxCampaignAsRead(campaign: LLInboxCampaign, read: boolean): void;

	static setLocation(location: CLLocationCoordinate2D): void;

	static setLocationDelegate(delegate: LLLocationDelegate): void;

	static setLocationMonitoringEnabled(enabled: boolean): void;

	static setLoggingEnabled(loggingEnabled: boolean): void;

	static setMessagingDelegate(delegate: LLMessagingDelegate): void;

	static setOptedOut(optedOut: boolean): void;

	static setOptions(options: NSDictionary<string, NSObject>): void;

	static setPrivacyOptedOut(optedOut: boolean): void;

	static setPushToken(pushToken: NSData): void;

	static setTestModeEnabled(enabled: boolean): void;

	static setValueForCustomDimension(value: string, dimension: number): void;

	static setValueForIdentifier(value: string, identifier: string): void;

	static setValueForProfileAttribute(value: any, attribute: string): void;

	static setValueForProfileAttributeWithScope(value: any, attribute: string, scope: LLProfileScope): void;

	static tagAddedToCartItemIdItemTypeItemPriceAttributes(itemName: string, itemId: string, itemType: string, itemPrice: number, attributes: NSDictionary<string, string>): void;

	static tagCompletedCheckoutItemCountAttributes(totalPrice: number, itemCount: number, attributes: NSDictionary<string, string>): void;

	static tagContentRatedContentIdContentTypeRatingAttributes(contentName: string, contentId: string, contentType: string, rating: number, attributes: NSDictionary<string, string>): void;

	static tagContentViewedContentIdContentTypeAttributes(contentName: string, contentId: string, contentType: string, attributes: NSDictionary<string, string>): void;

	static tagCustomerLoggedInMethodNameAttributes(customer: LLCustomer, methodName: string, attributes: NSDictionary<string, string>): void;

	static tagCustomerLoggedOut(attributes: NSDictionary<string, string>): void;

	static tagCustomerRegisteredMethodNameAttributes(customer: LLCustomer, methodName: string, attributes: NSDictionary<string, string>): void;

	static tagEvent(eventName: string): void;

	static tagEventAttributes(eventName: string, attributes: NSDictionary<string, string>): void;

	static tagEventAttributesCustomerValueIncrease(eventName: string, attributes: NSDictionary<string, string>, customerValueIncrease: number): void;

	static tagImpressionForInAppCampaignWithCustomAction(campaign: LLInAppCampaign, customAction: string): void;

	static tagImpressionForInAppCampaignWithType(campaign: LLInAppCampaign, impressionType: LLImpressionType): void;

	static tagImpressionForInboxCampaignWithCustomAction(campaign: LLInboxCampaign, customAction: string): void;

	static tagImpressionForInboxCampaignWithType(campaign: LLInboxCampaign, impressionType: LLImpressionType): void;

	static tagImpressionForPushToInboxCampaignSuccess(campaign: LLInboxCampaign, success: boolean): void;

	static tagInvitedAttributes(methodName: string, attributes: NSDictionary<string, string>): void;

	static tagPlacesPushOpened(campaign: LLPlacesCampaign): void;

	static tagPlacesPushOpenedWithActionIdentifier(campaign: LLPlacesCampaign, identifier: string): void;

	static tagPlacesPushReceived(campaign: LLPlacesCampaign): void;

	static tagPurchasedItemIdItemTypeItemPriceAttributes(itemName: string, itemId: string, itemType: string, itemPrice: number, attributes: NSDictionary<string, string>): void;

	static tagScreen(screenName: string): void;

	static tagSearchedContentTypeResultCountAttributes(queryText: string, contentType: string, resultCount: number, attributes: NSDictionary<string, string>): void;

	static tagSharedContentIdContentTypeMethodNameAttributes(contentName: string, contentId: string, contentType: string, methodName: string, attributes: NSDictionary<string, string>): void;

	static tagStartedCheckoutItemCountAttributes(totalPrice: number, itemCount: number, attributes: NSDictionary<string, string>): void;

	static triggerInAppMessage(triggerName: string): void;

	static triggerInAppMessageWithAttributes(triggerName: string, attributes: NSDictionary<string, string>): void;

	static triggerInAppMessagesForSessionStart(): void;

	static triggerPlacesNotificationForCampaign(campaign: LLPlacesCampaign): void;

	static triggerPlacesNotificationForCampaignIdRegionIdentifier(campaignId: number, regionId: string): void;

	static triggerRegionWithEventAtLocation(region: CLRegion, event: LLRegionEvent, location: CLLocation): void;

	static triggerRegionsWithEventAtLocation(regions: NSArray<CLRegion>, event: LLRegionEvent, location: CLLocation): void;

	static upload(): void;

	static valueForCustomDimension(dimension: number): string;

	static valueForIdentifier(identifier: string): string;
}

interface LocalyticsProtocol extends JSExport {
}
declare var LocalyticsProtocol: {

	prototype: LocalyticsProtocol;

	addValuesToSetForProfileAttribute(values: NSArray<any>, attribute: string): void;

	addValuesToSetForProfileAttributeWithScope(values: NSArray<any>, attribute: string, scope: LLProfileScope): void;

	allInboxCampaigns(): NSArray<LLInboxCampaign>;

	appKey(): string;

	autoIntegrateWithLocalyticsOptionsLaunchOptions(appKey: string, localyticsOptions: NSDictionary<any, any>, launchOptions: NSDictionary<any, any>): void;

	closeSession(): void;

	customerId(): string;

	decrementValueByForProfileAttribute(value: number, attribute: string): void;

	decrementValueByForProfileAttributeWithScope(value: number, attribute: string, scope: LLProfileScope): void;

	deleteInboxCampaign(campaign: LLInboxCampaign): void;

	deleteProfileAttribute(attribute: string): void;

	deleteProfileAttributeWithScope(attribute: string, scope: LLProfileScope): void;

	didReceiveNotificationResponseWithUserInfo(userInfo: NSDictionary<any, any>): void;

	didReceiveNotificationResponseWithUserInfoAndActionIdentifier(userInfo: NSDictionary<any, any>, identifier: string): void;

	didRegisterUserNotificationSettings(): void;

	didRequestUserNotificationAuthorizationWithOptionsGranted(options: number, granted: boolean): void;

	dismissCurrentInAppMessage(): void;

	displayableInboxCampaigns(): NSArray<LLInboxCampaign>;

	geofencesToMonitor(currentCoordinate: CLLocationCoordinate2D): NSArray<LLRegion>;

	handleNotification(notificationInfo: NSDictionary<any, any>): void;

	handleNotificationWithActionIdentifier(notificationInfo: NSDictionary<any, any>, identifier: string): void;

	handleTestModeURL(url: NSURL): boolean;

	inAppMessageDismissButtonLocation(): LLInAppMessageDismissButtonLocation;

	inboxCampaigns(): NSArray<LLInboxCampaign>;

	inboxCampaignsUnreadCount(): number;

	inboxDetailViewControllerForCampaign(campaign: LLInboxCampaign): LLInboxDetailViewController;

	inboxListItemTapped(campaign: LLInboxCampaign): void;

	incrementValueByForProfileAttribute(value: number, attribute: string): void;

	incrementValueByForProfileAttributeWithScope(value: number, attribute: string, scope: LLProfileScope): void;

	installId(): string;

	integrateWithLocalyticsOptions(appKey: string, localyticsOptions: NSDictionary<any, any>): void;

	isInAppAdIdParameterEnabled(): boolean;

	isInboxAdIdParameterEnabled(): boolean;

	isLoggingEnabled(): boolean;

	isOptedOut(): boolean;

	isPrivacyOptedOut(): boolean;

	isTestModeEnabled(): boolean;

	libraryVersion(): string;

	openSession(): void;

	pauseDataUploading(pause: boolean): void;

	pushToken(): string;

	redirectLoggingToDisk(): void;

	refreshAllInboxCampaigns(completionBlock: (p1: NSArray<LLInboxCampaign>) => void): void;

	refreshInboxCampaigns(completionBlock: (p1: NSArray<LLInboxCampaign>) => void): void;

	removeValuesFromSetForProfileAttribute(values: NSArray<any>, attribute: string): void;

	removeValuesFromSetForProfileAttributeWithScope(values: NSArray<any>, attribute: string, scope: LLProfileScope): void;

	setAnalyticsDelegate(delegate: LLAnalyticsDelegate): void;

	setCallToActionDelegate(delegate: LLCallToActionDelegate): void;

	setCustomerEmail(email: string): void;

	setCustomerFirstName(firstName: string): void;

	setCustomerFullName(fullName: string): void;

	setCustomerId(customerId: string): void;

	setCustomerIdPrivacyOptedOut(customerId: string, optedOut: boolean): void;

	setCustomerLastName(lastName: string): void;

	setInAppAdIdParameterEnabled(enabled: boolean): void;

	setInAppMessageDismissButtonHidden(hidden: boolean): void;

	setInAppMessageDismissButtonImage(image: UIImage): void;

	setInAppMessageDismissButtonImageWithName(imageName: string): void;

	setInAppMessageDismissButtonLocation(location: LLInAppMessageDismissButtonLocation): void;

	setInboxAdIdParameterEnabled(enabled: boolean): void;

	setInboxCampaignAsRead(campaign: LLInboxCampaign, read: boolean): void;

	setLocation(location: CLLocationCoordinate2D): void;

	setLocationDelegate(delegate: LLLocationDelegate): void;

	setLocationMonitoringEnabled(enabled: boolean): void;

	setLoggingEnabled(loggingEnabled: boolean): void;

	setMessagingDelegate(delegate: LLMessagingDelegate): void;

	setOptedOut(optedOut: boolean): void;

	setOptions(options: NSDictionary<string, NSObject>): void;

	setPrivacyOptedOut(optedOut: boolean): void;

	setPushToken(pushToken: NSData): void;

	setTestModeEnabled(enabled: boolean): void;

	setValueForCustomDimension(value: string, dimension: number): void;

	setValueForIdentifier(value: string, identifier: string): void;

	setValueForProfileAttribute(value: any, attribute: string): void;

	setValueForProfileAttributeWithScope(value: any, attribute: string, scope: LLProfileScope): void;

	tagAddedToCartItemIdItemTypeItemPriceAttributes(itemName: string, itemId: string, itemType: string, itemPrice: number, attributes: NSDictionary<string, string>): void;

	tagCompletedCheckoutItemCountAttributes(totalPrice: number, itemCount: number, attributes: NSDictionary<string, string>): void;

	tagContentRatedContentIdContentTypeRatingAttributes(contentName: string, contentId: string, contentType: string, rating: number, attributes: NSDictionary<string, string>): void;

	tagContentViewedContentIdContentTypeAttributes(contentName: string, contentId: string, contentType: string, attributes: NSDictionary<string, string>): void;

	tagCustomerLoggedInMethodNameAttributes(customer: LLCustomer, methodName: string, attributes: NSDictionary<string, string>): void;

	tagCustomerLoggedOut(attributes: NSDictionary<string, string>): void;

	tagCustomerRegisteredMethodNameAttributes(customer: LLCustomer, methodName: string, attributes: NSDictionary<string, string>): void;

	tagEvent(eventName: string): void;

	tagEventAttributes(eventName: string, attributes: NSDictionary<string, string>): void;

	tagEventAttributesCustomerValueIncrease(eventName: string, attributes: NSDictionary<string, string>, customerValueIncrease: number): void;

	tagImpressionForInAppCampaignWithCustomAction(campaign: LLInAppCampaign, customAction: string): void;

	tagImpressionForInAppCampaignWithType(campaign: LLInAppCampaign, impressionType: LLImpressionType): void;

	tagImpressionForInboxCampaignWithCustomAction(campaign: LLInboxCampaign, customAction: string): void;

	tagImpressionForInboxCampaignWithType(campaign: LLInboxCampaign, impressionType: LLImpressionType): void;

	tagImpressionForPushToInboxCampaignSuccess(campaign: LLInboxCampaign, success: boolean): void;

	tagInvitedAttributes(methodName: string, attributes: NSDictionary<string, string>): void;

	tagPlacesPushOpened(campaign: LLPlacesCampaign): void;

	tagPlacesPushOpenedWithActionIdentifier(campaign: LLPlacesCampaign, identifier: string): void;

	tagPlacesPushReceived(campaign: LLPlacesCampaign): void;

	tagPurchasedItemIdItemTypeItemPriceAttributes(itemName: string, itemId: string, itemType: string, itemPrice: number, attributes: NSDictionary<string, string>): void;

	tagScreen(screenName: string): void;

	tagSearchedContentTypeResultCountAttributes(queryText: string, contentType: string, resultCount: number, attributes: NSDictionary<string, string>): void;

	tagSharedContentIdContentTypeMethodNameAttributes(contentName: string, contentId: string, contentType: string, methodName: string, attributes: NSDictionary<string, string>): void;

	tagStartedCheckoutItemCountAttributes(totalPrice: number, itemCount: number, attributes: NSDictionary<string, string>): void;

	triggerInAppMessage(triggerName: string): void;

	triggerInAppMessageWithAttributes(triggerName: string, attributes: NSDictionary<string, string>): void;

	triggerInAppMessagesForSessionStart(): void;

	triggerPlacesNotificationForCampaign(campaign: LLPlacesCampaign): void;

	triggerPlacesNotificationForCampaignIdRegionIdentifier(campaignId: number, regionId: string): void;

	triggerRegionWithEventAtLocation(region: CLRegion, event: LLRegionEvent, location: CLLocation): void;

	triggerRegionsWithEventAtLocation(regions: NSArray<CLRegion>, event: LLRegionEvent, location: CLLocation): void;

	upload(): void;

	valueForCustomDimension(dimension: number): string;

	valueForIdentifier(identifier: string): string;
};

declare var LocalyticsVersionNumber: number;

declare var LocalyticsVersionString: interop.Reference<number>;
