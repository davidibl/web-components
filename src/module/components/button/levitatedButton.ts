import {
    Component,
    HostBinding,
    ContentChildren,
    Input,
    HostListener,
    ElementRef,
    QueryList,
} from '@angular/core';
import { query, state, style, animate, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
    selector: 'xn-levitated-button',
    templateUrl: 'levitatedButton.html',
    styleUrls: ['levitatedButton.scss'],
    animations: [
        trigger('expanded', [
            state('false', style({ 'border-radius': '50%',
                                    width: '50px',
                                    height: 50,
                                    'margin-bottom': '10px',
                                    'margin-right': '10px' })),
            state('true' , style({ 'border-radius': '2px',
                                    width: '250px',
                                    height: '*',
                                    'margin-bottom': 0,
                                    'margin-right': 0 })),
            transition('* => *', animate('150ms')),
        ]),
        trigger('showIcon', [
            state('void', style({ opacity: 0.1 })),
            state('*', style({ opacity: 1 })),
            transition('* => void', animate(100)),
            transition('void => *', animate(100)),
        ]),
        trigger('showMenuItem', [
            state('void', style({ opacity: 0.1 })),
            state('*', style({ opacity: 1 })),
            transition('* => void', animate(10)),
            transition('void => *', animate(100)),
        ]),
    ],
})
export class LevitatedButtonComponent {

    private _showSpinner = false;
    private _forceKeepOpen = false;
    private _hovered = false;

    @Input()
    public bgColorClass: string;

    @HostBinding('class.default')
    @Input()
    public default: boolean;

    @HostBinding('class.expanded')
    public expanded = false;
    public showIcon = true;
    public showMenuItem = false;

    @Input()
    @HostBinding('class.disabled')
    public disabled = false;

    @HostListener('mouseenter')
    public onMouseOver($event) {
        this.show();
        this._hovered = true;
    }

    @HostListener('mouseleave')
    public onMouseOut($event) {
        this._hovered = false;
        if (this.forceKeepOpen) { return; }
        this.close();
    }

    @Input()
    @HostBinding('class.spinning')
    public set showSpinner(showSpinner: boolean) {
        this._showSpinner = showSpinner;
        this.disabled = showSpinner;
    }

    public get showSpinner() {
        return this._showSpinner;
    }

    @Input()
    public set forceKeepOpen(forceKeepOpen: boolean) {
        this._forceKeepOpen = forceKeepOpen;
        if (!forceKeepOpen) {
            if (!this._hovered) {
                this.close();
            }
        }
    }

    public get forceKeepOpen() {
        return this._forceKeepOpen;
    }

    public openMenu($event) {
        if (this.expanded) {
            this.showMenuItem = true;
        }
    }

    constructor(private _elementRef: ElementRef) { }

    @HostListener('click')
    public onClick() {
        this._elementRef.nativeElement.blur();
    }

    public show() {
        this.expanded = true;
        this.showIcon = false;
    }

    private close() {
        this.showMenuItem = false;
        of(null).pipe(timeout(100)).subscribe(() => {
            this.expanded = false;
            this.showIcon = true;
        });
    }

}
