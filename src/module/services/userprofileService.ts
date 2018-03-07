import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Injectable()
export class UserprofileService {

    public getUserprofile(): Observable<any> {
        return Observable.of(null);
    }
}
