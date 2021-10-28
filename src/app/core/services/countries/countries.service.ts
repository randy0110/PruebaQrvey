import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
    ) { }

    get() {
      
      return this.httpClient.get(`${environment.baseApiUrl}/v3/all`);
  }
}
