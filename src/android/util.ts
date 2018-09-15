import {
    CircularRegion,
    InboxCampaign,
    InAppCampaign,
    PushCampaign,
    PlacesCampaign
} from '..';

const localyticsNamespace = (com as any).localytics.android;

const Localytics = localyticsNamespace.Localytics;
const JavaCircularRegion = localyticsNamespace.CircularRegion;
const JavaInAppCampaign = localyticsNamespace.InAppCampaign;
const JavaInboxCampaign = localyticsNamespace.InboxCampaign;
const JavaPlacesCampaign = localyticsNamespace.PlacesCampaign;
const JavaPushCampaign = localyticsNamespace.PushCampaign;
const JavaRegion = localyticsNamespace.Region;

type JavaCircularRegion = { [key: string]: any };
type JavaInboxCampaign = { [key: string]: any };
type JavaInAppCampaign = { [key: string]: any };
type JavaPlacesCampaign = { [key: string]: any };
type JavaPushCampaign = { [key: string]: any };

export {
    JavaCircularRegion,
    JavaInboxCampaign,
    JavaInAppCampaign,
    JavaPlacesCampaign,
    JavaPushCampaign
};

export function toHashMap(obj: { [key: string]: any }) {
    let node = new java.util.HashMap<java.lang.String, java.lang.Object>();
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (obj[property] != null) {
                switch (typeof obj[property]) {
                    case 'object':
                        node.put(property, toHashMap(obj[property]));
                        break;
                    case 'boolean':
                        node.put(property, java.lang.Boolean.valueOf(obj[property]));
                        break;
                    case 'number':
                        if (Number(obj[property]) === obj[property] && obj[property] % 1 === 0)
                            node.put(property, java.lang.Long.valueOf(obj[property]));
                        else
                            node.put(property, java.lang.Double.valueOf(obj[property]));
                        break;
                    case 'string':
                        node.put(property, java.lang.String.valueOf(obj[property]));
                        break;
                }
            }
        }
    }
    return node;
}

export function toJsObject(javaObj: java.util.Map<java.lang.String, java.lang.Object>) {
    let node: { [key: string]: any } = {};
    let iterator = javaObj.entrySet().iterator();
    while (iterator.hasNext()) {
        let item = iterator.next();
        switch (item.getClass().getName()) {
            case 'java.util.HashMap':
                node[item.getKey()] = toJsObject(item.getValue());
                break;
            case 'java.lang.String':
                node[item.getKey()] = String(item.getValue());
                break;
            case 'java.lang.Boolean':
                node[item.getKey()] = Boolean(String(item.getValue()));
                break;
            case 'java.lang.Long':
            case 'java.lang.Double':
                node[item.getKey()] = Number(String(item.getValue()));
                break;
        }
        node[item.getKey()] = item.getValue();
    }
    return node;
}

export function toCircularRegionJSON(region: JavaCircularRegion): CircularRegion {
    return {
        uniqueId: region.getUniqueId(),
        latitude: region.getLatitude(),
        longitude: region.getLongitude(),
        name: region.getName(),
        type: region.getType(),
        attributes: toJsObject(region.getAttributes())
    };
}

export function toInboxJSON(campaign: JavaInboxCampaign): InboxCampaign {
    const creativeFilePath: android.net.Uri = campaign.getCreativeFilePath();
    const thumbnailUri: android.net.Uri = campaign.getThumbnailUri();

    return {
        campaignId: campaign.getCampaignId(),
        name: campaign.getName(),
        attributes: toJsObject(campaign.getAttributes()),
        creativeFilePath: creativeFilePath != null ? creativeFilePath.toString() : '',
        read: campaign.isRead(),
        title: campaign.getTitle(),
        sortOrder: campaign.getSortOrder(),
        receivedDate: (campaign.getReceivedDate().getTime() / 1000),
        summary: campaign.getSummary(),
        thumbnailUrl: thumbnailUri != null ? thumbnailUri.toString() : '',
        hasCreative: campaign.hasCreative(),
        deeplink: campaign.getDeepLinkUrl(),
        isPushToInboxCampaign: campaign.isPushToInboxCampaign(),
        isVisible: campaign.isVisible(),
        deleted: campaign.isDeleted()
    };
}

export function toInAppJSON(campaign: JavaInAppCampaign): InAppCampaign {
    const creativeFilePath: android.net.Uri = campaign.getCreativeFilePath();

    return {
        campaignId: campaign.getCampaignId(),
        name: campaign.getName(),
        attributes: toJsObject(campaign.getAttributes()),
        creativeFilePath: creativeFilePath != null ? creativeFilePath.toString() : '',
        aspectRatio: campaign.getAspectRatio(),
        bannerOffsetDps: campaign.getOffset(),
        backgroundAlpha: campaign.getBackgroundAlpha(),
        displayLocation: campaign.getDisplayLocation(),
        dismissButtonHidden: campaign.isDismissButtonHidden(),
        dismissButtonLocation: Localytics.InAppMessageDismissButtonLocation.RIGHT.equals(campaign.getDismissButtonLocation()) ? 'right' : 'left',
        eventName: campaign.getEventName(),
        eventAttributes: toJsObject(campaign.getEventAttributes())
    };
}

export function toPushJSON(campaign: JavaPushCampaign): PushCampaign {
    return {
        campaignId: campaign.getCampaignId(),
        name: campaign.getName(),
        attributes: toJsObject(campaign.getAttributes()),
        creativeId: campaign.getCreativeId(),
        creativeType: campaign.getCreativeType(),
        message: campaign.getMessage(),
        title: campaign.getTitle(),
        soundFilename: campaign.getSoundFilename(),
        attachmentUrl: campaign.getAttachmentUrl()
    };
}

export function toPlacesJSON(campaign: JavaPlacesCampaign): PlacesCampaign {
    return {
        campaignId: campaign.getCampaignId(),
        name: campaign.getName(),
        attributes: toJsObject(campaign.getAttributes()),
        creativeId: campaign.getCreativeId(),
        creativeType: campaign.getCreativeType(),
        message: campaign.getMessage(),
        title: campaign.getTitle(),
        soundFilename: campaign.getSoundFilename(),
        attachmentUrl: campaign.getAttachmentUrl(),
        region: this.toCircularRegionJSON(campaign.getRegion()),
        triggerEvent: JavaRegion.Event.ENTER.equals(campaign.getTriggerEvent()) ? 'enter' : 'exit'
    };
}

export function toCircularRegion(circularRegion: CircularRegion): JavaCircularRegion {
    return new JavaCircularRegion.Builder()
        .setUniqueId(circularRegion.uniqueId)
        .build();
}

export function toEvent(event: string): any /* JavaRegion.Event */ {
    if (event === 'enter') {
        return JavaRegion.Event.ENTER;
    } else {
        return JavaRegion.Event.EXIT;
    }
}

export function toLocation(location: string): any /* Localytics.InAppMessageDismissButtonLocation */ {
    if (location === 'left') {
        return Localytics.InAppMessageDismissButtonLocation.LEFT;
    } else {
        return Localytics.InAppMessageDismissButtonLocation.RIGHT;
    }
}

export function fromLocation(location: any /* Localytics.InAppMessageDismissButtonLocation */): 'left' | 'right' {
    switch (location) {
        case Localytics.InAppMessageDismissButtonLocation.LEFT:
            return 'left';
        default:
            return 'right';
    }
}