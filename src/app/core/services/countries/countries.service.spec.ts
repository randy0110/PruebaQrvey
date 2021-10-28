import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { countriesList } from '@app/core/interfaces/countries-list';

import { CountriesService } from './countries.service';

import { environment } from '@environments/environment';


describe('CountriesService', () => {
  let service: CountriesService;
  let http: HttpTestingController;
  let expectedURL: string;
  let expectedResponse: countriesList[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountriesService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    expectedURL = `${environment.baseApiUrl}`;
    expectedResponse = [] as countriesList[];
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make http request to get counties list ', (done) => {
    service.get().subscribe((data) => {
        expect(data).toEqual(expectedResponse);
        done();
    });

    http.expectOne(`${expectedURL}/v3/all`).flush(expectedResponse);
});
});
