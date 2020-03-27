import { HttpParams } from '@angular/common/http';

export class UrlSearchParamsBuilder {

    private _searchParams = new HttpParams();

    public static with(name: string, value: string): UrlSearchParamsBuilder {
        return new UrlSearchParamsBuilder().with(name, value);
    }

    public with(name: string, value: string): UrlSearchParamsBuilder {
        this._searchParams.set(name, value);
        return this;
    }

    public build(): HttpParams {
        return this._searchParams;
    }

}
