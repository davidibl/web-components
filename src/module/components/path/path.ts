import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { NavigationItem } from '../../model/navigationItem';
import { isStringNullOrEmpty } from '../../functions/stringUtils';
import 'rxjs/add/operator/filter';

@Component({
    moduleId: module.id,
    selector: 'path',
    templateUrl: 'path.html',
})
export class PathComponent implements OnInit {

    public navigationItems: NavigationItem[];

    public constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

    public ngOnInit() {
        this._router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                this.navigationItems = null;
                const root = this._activatedRoute.root;
                this.navigationItems = this.extractBreadcrumps(root);
            });
    }

    private extractBreadcrumps(route: ActivatedRoute, url: string = '',
                               breadcrumps: NavigationItem[] = []): NavigationItem[] {

        const children: ActivatedRoute[] = route.children;
        if (children.length === 0) {
            return breadcrumps;
        }

        for (const child of children) {
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            url += `/${routeURL}`;

            if (!isStringNullOrEmpty(routeURL)) {
                breadcrumps.push(this.createNavigationItem(routeURL, url));
            }

            return this.extractBreadcrumps(child, url, breadcrumps);
        }
    }

    private createNavigationItem(name: string, link: string): NavigationItem {
        return {
            name: name,
            routerLink: link
        };
    }

}
