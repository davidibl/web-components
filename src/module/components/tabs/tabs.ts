import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
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

    @Output()
    public selectedTabChange = new EventEmitter<string>();

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
        this.selectedTabChange.emit(selectedTab.id);
        selectedTab.active = true;
    }
}
