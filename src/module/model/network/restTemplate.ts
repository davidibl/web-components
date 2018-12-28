import { KeyValuePairString } from '../keyValuePairString';
import { concatPaths } from '../../functions/io';

export class RestTemplate {

    private queryParameter: KeyValuePairString[] = new Array();
    private pathParameter: string[] = new Array();

    public static create(baseUrl: string): RestTemplate {
        return new RestTemplate(baseUrl);
    }

    private constructor(private baseurl: string) {}

    public withPathParameter(parameter: string): RestTemplate {
        this.pathParameter.push(parameter);
        return this;
    }

    public withQueryParameter(key: string, value: string): RestTemplate {
        this.queryParameter.push(new KeyValuePairString(key, value));
        return this;
    }

    public withQueryParameters(parameters: Object) {
        Object.keys(parameters)
            .filter(key => parameters.hasOwnProperty(key))
            .map(key => new KeyValuePairString(key, parameters[key]))
            .forEach(queryParameter => this.queryParameter.push(queryParameter));
    }

    public build(): string {

        let url = concatPaths(this.baseurl, ...this.pathParameter);

        const queryParameter = (this.queryParameter.length < 1) ? null :
            this.queryParameter
                .map((param) => `${param.key}=${param.value}`)
                .reduce((left, right) => `${left}&${right}`);

        if (queryParameter && queryParameter.length > 0) {
            url += '?' + queryParameter;
        }

        return url;
    }

}
