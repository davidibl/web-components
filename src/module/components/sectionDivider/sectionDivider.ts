import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-section-divider',
    templateUrl: 'sectionDivider.html',
    styleUrls: ['sectionDivider.scss'],
})
export class SectionDividerComponent {

    @Input()
    public label: string;

    @Input()
    @HostBinding('class.line-only')
    public lineOnly = false;
}
