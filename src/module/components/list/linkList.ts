import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'xn-list',
    templateUrl: 'linkList.html',
    styleUrls: ['linkList.scss'],
})
export class LinkListComponent {

    @HostBinding('class.striped')
    @Input()
    public striped = false;

}
