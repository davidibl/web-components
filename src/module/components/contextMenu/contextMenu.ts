import {
    Component,
    Output,
    EventEmitter,
    HostBinding,
    ContentChildren,
    QueryList,
    AfterContentInit,
    HostListener,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { ContextMenuCommand } from '../../model/contextMenuCommand';
import { ContextMenuItemComponent } from './contextMenuItem';

@Component({
    selector: 'xn-context-menu',
    templateUrl: 'contextMenu.html',
    styleUrls: ['contextMenu.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements AfterContentInit {

    @ContentChildren(ContextMenuItemComponent)
    private items: QueryList<ContextMenuItemComponent>;

    private context: any;

    @HostBinding('style.left')
    private xPosition: string;
    @HostBinding('style.top')
    private yPosition: string;

    @HostBinding('style.display')
    public display = 'none';

    @Output()
    public buttonClick = new EventEmitter<ContextMenuCommand>();

    constructor(private _elementRef: ElementRef) {
    }

    public ngAfterContentInit(): void {
        this.items.changes.subscribe(_ => {
            this.items
                .toArray()
                .forEach(item => item.itemClick.subscribe(command => this.emitCommand(command)));
        });

        this.items
            .toArray()
            .forEach(item => item.itemClick.subscribe(command => this.emitCommand(command)));
    }

    public setContext(context: any) {
        this.context = context;
    }

    public show(xPosition: number, yPosition: number, context: any) {
        this.xPosition = xPosition + 'px';
        this.yPosition = yPosition + 'px';
        this.context = context;
        this.display = 'block';
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.close();
        }
    }

    private close() {
        this.display = 'none';
    }

    private emitCommand(command: string) {
        this.buttonClick.emit(new ContextMenuCommand(command, this.context));
        this.close();
    }

}
