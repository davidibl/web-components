import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab';

@Component({
    selector: 'xn-tabs',
    templateUrl: 'tabs.html',
    styleUrls: ['tabs.scss'],
})
export class TabsComponent implements AfterContentInit {

    @ContentChildren(TabComponent)
    private _tabs: QueryList<TabComponent>;

    public tabsArray: TabComponent[];

    public ngAfterContentInit() {
        if (!this._tabs) {
            return;
        }
        this.tabsArray = this._tabs.toArray();
        this.selectTab(this.tabsArray[0]);
    }

    private selectTab(selectedTab: TabComponent) {
        if (!selectedTab) {
            return;
        }
        this.tabsArray.forEach(tab => tab.active = false);
        selectedTab.active = true;
    }
}
