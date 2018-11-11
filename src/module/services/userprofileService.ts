import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserprofileService {

    public getUserprofile(): Observable<any> {
        return of(null);
    }
}
