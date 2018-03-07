import { URLSearchParams } from '@angular/http';

export class UrlSearchParamsBuilder {

    private _searchParams = new URLSearchParams();

    public static with(name: string, value: string): UrlSearchParamsBuilder {
        return new UrlSearchParamsBuilder().with(name, value);
    }

    public with(name: string, value: string): UrlSearchParamsBuilder {
        this._searchParams.set(name, value);
        return this;
    }

    public build(): URLSearchParams {
        return this._searchParams;
    }

}
