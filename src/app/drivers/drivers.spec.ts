import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversComponent } from './drivers';
import { F1ApiService } from '../services/f1-api';
import { of } from 'rxjs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

class MockF1ApiService {
  getDrivers() {
    return of({
      drivers: [
        { driverId: 'alonso', name: 'Fernando', surname: 'Alonso', nationality: 'Spanish', birthday: '1981-07-29', url: '' },
      ]
    });
  }
}

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DriversComponent,
        NzListModule,
        NzCardModule,
        NzGridModule,
      ],
      providers: [
        { provide: F1ApiService, useClass: MockF1ApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Listado Completo de Pilotos');
  });
});
