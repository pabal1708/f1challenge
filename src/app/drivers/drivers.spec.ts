import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversComponent } from './drivers';
import { F1ApiService } from '../services/f1-api';
import { of } from 'rxjs';
import { Driver, DriversApiResponse } from '../models/f1-data';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;
  let f1ApiService: jasmine.SpyObj<F1ApiService>;

  const mockDriversResponse: DriversApiResponse = {
    drivers: [
      {
        id: 1,
        name: 'Lewis',
        surname: 'Hamilton',
        nationality: 'British',
        birthday: '1985-01-07',
        url: 'http://test.com',
        number: 44,
        shortName: 'HAM'
      },
      {
        id: 2,
        name: 'Max',
        surname: 'Verstappen',
        nationality: 'Dutch',
        birthday: '1997-09-30',
        url: 'http://test2.com',
        number: 1,
        shortName: 'VER'
      }
    ]
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('F1ApiService', ['getDrivers']);

    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers: [
        { provide: F1ApiService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    f1ApiService = TestBed.inject(F1ApiService) as jasmine.SpyObj<F1ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    f1ApiService.getDrivers.and.returnValue(of(mockDriversResponse));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Listado Completo de Pilotos');
  });

  it('should load drivers on init', () => {
    f1ApiService.getDrivers.and.returnValue(of(mockDriversResponse));
    
    component.ngOnInit();
    
    expect(f1ApiService.getDrivers).toHaveBeenCalled();
    expect(component.drivers.length).toBe(2);
    expect(component.drivers[0].name).toBe('Lewis');
    expect(component.drivers[1].name).toBe('Max');
  });

  it('should initialize with empty drivers array', () => {
    expect(component.drivers).toEqual([]);
  });
});