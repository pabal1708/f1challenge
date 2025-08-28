import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DriverSearchComponent } from './driver-search';
import { F1ApiService } from '../services/f1-api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Driver, DriversApiResponse } from '../models/f1-data';

describe('DriverSearchComponent', () => {
  let component: DriverSearchComponent;
  let fixture: ComponentFixture<DriverSearchComponent>;
  let f1ApiService: jasmine.SpyObj<F1ApiService>;
  let messageService: jasmine.SpyObj<NzMessageService>;

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
      }
    ]
  };

  beforeEach(async () => {
    const f1Spy = jasmine.createSpyObj('F1ApiService', ['searchDrivers']);
    const msgSpy = jasmine.createSpyObj('NzMessageService', ['warning', 'info', 'error']);

    await TestBed.configureTestingModule({
      imports: [DriverSearchComponent, FormsModule],
      providers: [
        { provide: F1ApiService, useValue: f1Spy },
        { provide: NzMessageService, useValue: msgSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSearchComponent);
    component = fixture.componentInstance;
    f1ApiService = TestBed.inject(F1ApiService) as jasmine.SpyObj<F1ApiService>;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Buscador de Pilotos');
  });

  it('should initialize with empty drivers array and search term', () => {
    expect(component.drivers).toEqual([]);
    expect(component.searchTerm).toBe('');
  });

  it('should perform search when onManualSearch is called with valid term', () => {
    component.searchTerm = 'Hamilton';
    f1ApiService.searchDrivers.and.returnValue(of(mockDriversResponse));

    component.onManualSearch();

    expect(f1ApiService.searchDrivers).toHaveBeenCalledWith('Hamilton');
    expect(component.drivers.length).toBe(1);
    expect(component.drivers[0].name).toBe('Lewis');
  });

  it('should show warning when onManualSearch is called with empty term', () => {
    component.searchTerm = '';

    component.onManualSearch();

    expect(messageService.warning).toHaveBeenCalledWith('Por favor, ingresa un término de búsqueda.');
    expect(f1ApiService.searchDrivers).not.toHaveBeenCalled();
  });

  it('should handle search with debounced input change', fakeAsync(() => {
    f1ApiService.searchDrivers.and.returnValue(of(mockDriversResponse));
    
    component.ngOnInit();
    component.onInputChange('Hamilton');
    
    tick(500); // Wait for debounce
    
    expect(f1ApiService.searchDrivers).toHaveBeenCalledWith('Hamilton');
    expect(component.drivers.length).toBe(1);
  }));

  it('should clear drivers when search term is less than 4 characters', fakeAsync(() => {
    component.drivers = [mockDriversResponse.drivers[0]];
    
    component.ngOnInit();
    component.onInputChange('Ham');
    
    tick(500);
    
    expect(component.drivers).toEqual([]);
  }));

  it('should show error message when search fails', () => {
    component.searchTerm = 'Hamilton';
    f1ApiService.searchDrivers.and.returnValue(throwError(() => new Error('API Error')));

    component.onManualSearch();

    expect(messageService.error).toHaveBeenCalledWith('Ocurrió un error al buscar pilotos.');
  });

  it('should show info message when no drivers found', () => {
    component.searchTerm = 'Unknown';
    const emptyResponse: DriversApiResponse = { drivers: [] };
    f1ApiService.searchDrivers.and.returnValue(of(emptyResponse));

    component.onManualSearch();

    expect(messageService.info).toHaveBeenCalledWith('No se encontraron pilotos con el término de búsqueda.');
  });
});