import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoadingIndicatorEvent } from '../model/loadingIndicatorEvent';

@Injectable()
export class LoadingIndicatorService {

    private loadingIndicatorEventStream: ReplaySubject<LoadingIndicatorEvent> =
        new ReplaySubject<LoadingIndicatorEvent>(1);

    public getLoadingIndicatorEvents(): ReplaySubject<LoadingIndicatorEvent> {
        return this.loadingIndicatorEventStream;
    }

    public onShowLoadingIndicator(message: string): void {
        const event = new LoadingIndicatorEvent(message, true);
        this.loadingIndicatorEventStream.next(event);
    }

    public onCloseLoadingIndicator(): void {
        const event = new LoadingIndicatorEvent(null, false);
        this.loadingIndicatorEventStream.next(event);
    }
}
