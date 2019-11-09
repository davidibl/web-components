import { Observable, ReplaySubject, combineLatest, merge, zip, of } from 'rxjs';
import { distinctUntilChanged, shareReplay, catchError, filter, switchMap, tap} from 'rxjs/operators';

export enum CombinationMode {
    ZIP,
    COMBINE_LATEST,
}

export class GenericCache2<F> {

    private _sourceObservables: Observable<any>[] = [];
    private _targetObservableFunction: (...param: any[]) => Observable<any>;
    private _resultSelector = (result) => result;
    private _combinationMode = CombinationMode.COMBINE_LATEST;

    private _refresher: () => void;

    private _cache: Observable<F>;
    private _errorCache = new ReplaySubject<any>(1);

    public static create<F>(): GenericCache2<F> {
        return new GenericCache2<F>();
    }

    public basedOn<T>(sourceObservable: Observable<T>): GenericCache2<F> {
        this._sourceObservables.push(sourceObservable);
        return this;
    }

    public zip(): GenericCache2<F> {
        this._combinationMode = CombinationMode.ZIP;
        return this;
    }

    public combineLatest(): GenericCache2<F> {
        this._combinationMode = CombinationMode.COMBINE_LATEST;
        return this;
    }

    public switchTo(
        observableFunction: (...param: any[]) => Observable<any|F>,
        resultSelector?: (...param) => F
    ): GenericCache2<F> {
        this._targetObservableFunction = observableFunction;
        if (!!resultSelector) {
            this._resultSelector = resultSelector;
        }
        return this;
    }

    public initialize(): GenericCache2<F> {

        if (this._sourceObservables.length < 1) {
            this._cache = this._targetObservableFunction()
                .pipe(
                    distinctUntilChanged(),
                    catchError(error => this.handleError(error))
                );
            return this;
        }

        const baseObservable =
            this._sourceObservables.length < 2 ? this._sourceObservables[0] :
            this._combinationMode === CombinationMode.COMBINE_LATEST ? this.getCombined() :
            this.getZipped();

        const baseObservableDistinct = baseObservable
            .pipe(distinctUntilChanged(this.isContentEqual));

        const nullEmitter = baseObservableDistinct
            .pipe(filter(result => !this.isNotNull(result)));

        const emitter = baseObservableDistinct
            .pipe(
                distinctUntilChanged(this.isContentEqual),
                switchMap(result => Observable.create((observer) => {
                        this._refresher = () => observer.next(result);
                        this._refresher();
                    })),
                filter(result => this.isNotNull(result)),
                switchMap((params: any[] | any) => this._targetObservableFunction(params)
                                                    .pipe(catchError(error => this.handleError(error))), this._resultSelector),
                catchError(error => this.handleError(error))
            );

        this._cache = merge(nullEmitter, emitter)
            .pipe(
                tap(_ => this._errorCache.next(null)),
                shareReplay(1)
            );

        return this;
    }

    public getCache(): Observable<F> {
        return this._cache;
    }

    public getErrorCache(): Observable<any> {
        return this._errorCache;
    }

    public refresh() {
        this._refresher();
    }

    private handleError(error: any): Observable<F> {
        this._errorCache.next(error);
        return of(null);
    }

    private isNotNull(value: any|any[]): boolean {
        if (this.isNullOrUndefined(value)) { return false; }
        if (Array.isArray(value) && (value as Array<any>).filter(val => this.isNullOrUndefined(val)).length > 0) { return false; }
        return true;
    }

    private isNullOrUndefined(value) {
        return value === null || value === undefined;
    }

    private getZipped() {
        return zip(this._sourceObservables);
    }

    private getCombined() {
        return combineLatest(this._sourceObservables);
    }

    private isContentEqual<T>(prev: T, curr: T) {
        return JSON.stringify(prev) === JSON.stringify(curr);
    }

}
