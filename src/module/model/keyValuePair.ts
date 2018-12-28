import { IKeyValuePair } from './keyValuePairInterface';

export class KeyValuePair<T, F> implements IKeyValuePair<T, F> {

    public constructor(public key: T, public value: F) {}
}
