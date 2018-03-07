import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { LanguageService } from './languageService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ConfigurationService } from './configurationService';

@Injectable()
export class MomentService {

    private _defaultDatePrintFormat = 'L';
    private _language: string;

    constructor(private _languageService: LanguageService,
                private _configurationService: ConfigurationService) {

        this._language = this._configurationService.getConfigValue('language.default');
        moment.locale(this._language);
        this._languageService
            .getCurrentLanguage()
            .do(language => this._language = language)
            .subscribe(language => moment.locale(language));
    }

    public moment(...args): moment.Moment {
        return moment(args);
    }

    public fromDate(date: Date): moment.Moment {
        return moment(date);
    }

    public duration(value: string): moment.Duration {
        return (moment.duration(value) as any).locale(this._language) as moment.Duration;
    }

    public isValidDateString(dateString: string): boolean {
        return moment(dateString, this._defaultDatePrintFormat, this._language, true).isValid();
    }

    public parseDateDefaultFormat(dateString: string): Date {
        return moment(dateString, this._defaultDatePrintFormat, this._language, true).toDate();
    }

    public isValidDate(date: Date|string) {
        return (date !== null && date !== undefined &&
            (date instanceof Date || moment(date, moment.ISO_8601, true).isValid()));
    }

    public getDefaultPrintFormat(): string {
        return this._defaultDatePrintFormat;
    }

    public getCurrentLocalePattern() {
        return moment.localeData().longDateFormat('L');
    }

    public formatDateDefault(value: Date|string) {
        return value &&
            moment(value, moment.ISO_8601, true)
                .format(this.getDefaultPrintFormat());
    }

    public formatTimespan(value: string): string {
        if (!value) {
            return '';
        }

        return this.duration(value).humanize();
    }

    public localeData(): any {
        return this.moment().localeData();
    }
}
