import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesService } from '@app/core/services/countries/countries.service';
import { ModalService } from '@app/core/services/modal/modal.service';

import { countriesServiceMock } from '@helpers/countries.service.helper';
import { modalServiceMock } from '@helpers/modal.service.helper';

import { of, throwError } from 'rxjs';

import { CountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let countriesService: CountriesService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesComponent ],
      providers: [
        { provide: CountriesService, useValue: countriesServiceMock() },
        { provide: ModalService, useValue: modalServiceMock }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    countriesService = TestBed.inject(CountriesService);
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get countries', () => {
      (countriesService as jasmine.SpyObj<CountriesService>).get.and.returnValue(
          of([])
      );

      component.ngOnInit();

      expect(countriesService.get).toHaveBeenCalled();
  });

});
