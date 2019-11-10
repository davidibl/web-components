import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: 'xn-icon',
    templateUrl: 'icon.html',
    styleUrls: ['icon.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

    @Input()
    public iconClass: string;
}
