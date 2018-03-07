import { ReplaySubject } from 'rxjs/ReplaySubject';
import { isNull } from '../functions/checks';

export class DataServiceCache<T> {

    private _cache: Map<string, ReplaySubject<T>> = new Map<string, ReplaySubject<T>>();

    public constructor(private _cacheSize: number = 1) { }

    public getCache(path: string): ReplaySubject<T> {
        return this._cache.get(path);
    }

    public addCache(path: string): ReplaySubject<T> {
        const subject: ReplaySubject<T> = new ReplaySubject<T>(1);
        this._cache.set(path, subject);
        return subject;
    }

    public getOrAddCache(path: string): ReplaySubject<T> {
        const subject = this.getCache(path);
        if (isNull(subject)) {
            return this.addCache(path);
        }
        return subject;
    }
}
