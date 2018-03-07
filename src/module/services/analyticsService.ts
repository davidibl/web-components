import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

declare interface IPageViewEvent {
    url: string;
}

@Injectable()
export class AnalyticsService {

    public constructor() {
        window.dataLayer = window.dataLayer || [];
    }

    public trackPageView(pageView: IPageViewEvent) {
        window.dataLayer.push({
            'event': 'pageview',
            ...pageView,
        });
    }

    public trackClickEvent(category: string, action: string, value?: string) {
        const dataObject = {
            'event': 'click',
            'category': category,
            'action': action,
        };

        if (value) {
            dataObject['value'] = value;
        }

        window.dataLayer.push(dataObject);
    }

}
