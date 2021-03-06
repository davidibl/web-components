import { RestTemplate } from './../model/network/restTemplate';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataServiceCache } from '../model/dataServiceCache';
import { LanguageService } from './languageService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ContentService {

    private _cache: DataServiceCache<string> = new DataServiceCache<string>();

    public constructor(private _http: HttpClient,
                       private _languageService: LanguageService,
                       private _router: Router) { }

    public getContent(path: string): ReplaySubject<string> {
        let subject = this._cache.getCache(path);

        if (!subject) {
            subject = this._cache.addCache(path);

            this._languageService
                .getCurrentLanguage()
                .pipe(
                    switchMap(language => this.queryContent(path, language.toLowerCase())),
                    catchError((error, source) => {
                        this._router.navigateByUrl('404');
                        return source;
                    })
                )
                .subscribe(result => subject.next(result));
        }
        return subject;
    }

    private queryContent(path: string, language: string): Observable<string> {
        const url = RestTemplate.create('/')
            .withPathParameter('content')
            .withPathParameter(language)
            .withPathParameter(path)
            .build();

        return this._http
            .get(url, {responseType: 'text'});
    }
}
