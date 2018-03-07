import { Component, Input } from '@angular/core';

@Component({
    selector: 'xn-section-divider',
    templateUrl: 'sectionDivider.html',
    styleUrls: ['sectionDivider.scss'],
})
export class SectionDividerComponent {

    @Input()
    public label: string;
}
