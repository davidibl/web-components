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
        this._tabs.changes.subscribe(changes => {
            this.tabsArray = this._tabs.toArray();
            if (!this.tabsArray.find(tab => tab.active)) {
                this.selectTab(this.tabsArray[0]);
            }
        });
        this.tabsArray = this._tabs.toArray();
        this.selectTab(this.tabsArray[0]);
    }

    public selectTabById(id: string) {
        if (!this.tabsArray) { return; }
        this.selectTab(this.tabsArray.find(tab => tab.id === id));
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
