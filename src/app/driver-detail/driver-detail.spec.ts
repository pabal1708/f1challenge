import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverDetailComponent } from './driver-detail';
import { ActivatedRoute } from '@angular/router';
import { F1ApiService } from '../services/f1-api';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterTestingModule } from '@angular/router/testing';

class MockF1ApiService {
  getDrivers() {
    return of({
      drivers: [
        { driverId: 'driver1', name: 'Lewis', surname: 'Hamilton', nationality: 'British', birthday: '1985-01-07', url: '', teamId: 'mercedes' },
      ]
    });
  }
}

describe('DriverDetailComponent', () => {
  let component: DriverDetailComponent;
  let fixture: ComponentFixture<DriverDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NzListModule,
        NzCardModule,
        NzGridModule,
        DriverDetailComponent,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['constructorId', 'mercedes']])) } },
        { provide: F1ApiService, useClass: MockF1ApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title with constructorId', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Pilotos del Equipo: mercedes');
  });
});
