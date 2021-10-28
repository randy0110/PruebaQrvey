import { of } from 'rxjs';

export function countriesServiceMock(): jasmine.SpyObj<any> {
    return {
        get: jasmine.createSpy('get').and.returnValue(of())
    };
}
