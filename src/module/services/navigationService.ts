import { Injectable } from '@angular/core';
import { NavigationItem } from '../model/navigationItem';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class NavigationService {

    private _scopedNavigationItems: Map<string, NavigationItem[]> = new Map<string, NavigationItem[]>();
    private _itemCache: Map<string, ReplaySubject<NavigationItem[]>> =
            new Map<string, ReplaySubject<NavigationItem[]>>();

    public addNavigationItem(navigationItem: NavigationItem, scopeNames: string[]) {
        scopeNames.forEach(name => {
            const navigationItems = this.getNavigationItemScope(name);
            navigationItems.push(navigationItem);
            this.getScopedItemCache(name).next(this.getSorted(navigationItems));
        });
    }

    public navigationItems(scopeName: string): ReplaySubject<NavigationItem[]> {
        return this.getScopedItemCache(scopeName);
    }

    private getScopedItemCache(scopeName: string) {
        if (this._itemCache.get(scopeName) === undefined) {
            this._itemCache.set(scopeName, new ReplaySubject<NavigationItem[]>());
        }

        return this._itemCache.get(scopeName);
    }

    private getNavigationItemScope(scopeName: string) {

        if (this._scopedNavigationItems.get(scopeName) === undefined) {
            this._scopedNavigationItems.set(scopeName, new Array<NavigationItem>());
        }

        return this._scopedNavigationItems.get(scopeName);
    }

    private getSorted(navigationItems: NavigationItem[]): NavigationItem[] {
        return navigationItems.sort((left, right) => left.sortOrder - right.sortOrder);
    }

}
