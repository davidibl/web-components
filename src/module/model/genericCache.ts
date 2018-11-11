import { ReplaySubject } from 'rxjs';

export class GenericCache<T> {
    [name: string]: ReplaySubject<T>;
}
