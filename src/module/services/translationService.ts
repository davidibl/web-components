import { KeyValuePairString } from './../model/keyValuePairString';
import { ConfigurationService } from './configurationService';
import { Injectable } from '@angular/core';
import { LanguageService } from './languageService';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { COMMON_TRANSLATIONS } from '../translations/de';
import { TokenTransformationService } from './tokenTransformationService';

const REGEX_TOKEN = /{(.+?)}/g;

@Injectable()
export class TranslationService {

    private _registeredTranslations = new Map<string, string>();
    private _registeredTranslationsSubject = new ReplaySubject<Map<string, string>>(1);

    public constructor(private _languageService: LanguageService,
        private _configurationService: ConfigurationService,
        private _http: HttpClient,
        private _tokenTransformation: TokenTransformationService) { }

    public initStartupTranslation() {
        this._languageService
            .getCurrentLanguage()
            .pipe(
                switchMap(language => this.queryCurrentTranslations(language))
            )
            .subscribe(translations => this.setupTranslations(null, ...translations));
    }

    public translateDefault(key: string, defaultValue?: string, tokens?: Object): Observable<string> {
        return this._registeredTranslationsSubject
            .asObservable()
            .pipe(
                map(trans => {
                    return trans[key] ? trans[key] : defaultValue;
                }),
                map(trans => this._tokenTransformation.replaceTokens(trans, tokens))
            );
    }

    private setupTranslations(prefix?: string, ...translationObjects: Object[]) {
        this._registeredTranslations = new Map<string, string>();
        this.addTranslations(COMMON_TRANSLATIONS, null);
        translationObjects.forEach(translationObject => this.addTranslations(translationObject, prefix));
        this._registeredTranslationsSubject.next(this._registeredTranslations);
    }

    private addTranslations(translationObject: Object, prefix?: string) {
        prefix = (prefix) ? prefix : '';
        this.addTranslationValue(this._registeredTranslations, translationObject, prefix);
    }

    private addTranslationValue(translations: Map<string, string>, translationObject: Object, prefix: string) {
        for (const key in translationObject) {
            if (translationObject.hasOwnProperty(key)) {
                const value = translationObject[key];
                if (typeof value === 'string') {
                    translations[prefix + key] = value;
                } else {
                    this.addTranslationValue(translations, value, prefix + key + '.');
                }
            }
        }
    }

    private queryCurrentTranslations(currentLanguage: string): Observable<Object[]> {

        const translationEndpoints = this._configurationService.getConfigValue<any[]>('translationEndpoints');
        if (!translationEndpoints) {
            return zip(
                this._http.get<Object>(`translations/${currentLanguage.toLowerCase()}.json`));
        }
        const translationQueries = translationEndpoints
            .map(endpoint => this
                .queryAdditionalTranslation(endpoint.url, endpoint.key));
        return zip(
            ...translationQueries,
            this._http
                .get<Object>(`translations/${currentLanguage.toLowerCase()}.json`)
        );
    }

    private queryAdditionalTranslation(endpoint: string, key: string): Observable<Object> {
        return Observable.create(observer => {
            this._http
                .get<KeyValuePairString[]>(endpoint)
                .subscribe(response => observer.next(response));
        })
        .map(result => this.fromKeyValuePair(result, key));
    }

    private fromKeyValuePair(translations: KeyValuePairString[], key: string) {
        const newTranslation = {
            'ENUMS': {},
        };
        newTranslation.ENUMS[key] = {};
        translations.forEach(keyValue => {
            newTranslation.ENUMS[key][keyValue.key] = keyValue.value;
        });
        return newTranslation;
    }

}
