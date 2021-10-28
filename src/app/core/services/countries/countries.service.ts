import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
    ) { }

    get(): Observable<any> {
      return this.httpClient.get(`${environment.baseApiUrl}/v3/all`);
  }
}
