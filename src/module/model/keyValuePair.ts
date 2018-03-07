import { IKeyValuePair } from './keyValuePairInterface';

export class KeyValuePair implements IKeyValuePair {

    public key: string;
    public value: string;

    public constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
