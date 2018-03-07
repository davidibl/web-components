import { ReplaySubject } from 'rxjs/ReplaySubject';

export class GenericCache<T> {
    [name: string]: ReplaySubject<T>;
}
