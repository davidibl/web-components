import {
    Component,
    Input,
    HostBinding,
    HostListener,
    ElementRef,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'xn-button',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

    private _showSpinner = false;

    @HostBinding('class.button')
    public isButton = true;

    @HostBinding('class.default')
    @Input()
    public default: boolean;

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
    @HostBinding('class.disabled')
    public disabled = false;

    @Input()
    @HostBinding('class.selected')
    public selected = false;

    @Output('clicked')
    public clicked = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef) { }

    @HostListener('click')
    public onClick() {
        this._elementRef.nativeElement.blur();
        this.clicked.emit();
    }

}
