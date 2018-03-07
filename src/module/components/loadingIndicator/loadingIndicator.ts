import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { LoadingIndicatorService } from '../../services/loadingIndicatorService';
import { LoadingIndicatorEvent } from '../../model/loadingIndicatorEvent';

@Component({
    moduleId: module.id,
    selector: 'loading-indicator',
    templateUrl: 'loadingIndicator.html',
})
export class LoadingIndicatorComponent implements OnInit {

    public message: string;

    @HostBinding('class.open')
    @Input()
    public open = false;

    public constructor(private _loadingIndicatorService: LoadingIndicatorService) { }

    public ngOnInit(): void {
        this._loadingIndicatorService.getLoadingIndicatorEvents()
            .subscribe(event => this.setLoadingIndicatorState(event));
    }

    private setLoadingIndicatorState(event: LoadingIndicatorEvent): void {
        this.message = event.message;
        this.open = event.open;
    }

}
