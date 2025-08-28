import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverSearchComponent } from './driver-search';
import { F1ApiService } from '../services/f1-api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockF1ApiService {
  getDriversByYear(year: number) {
    return of({ drivers: [] });
  }
}

class MockNzMessageService {
  info(message: string) {}
  error(message: string) {}
}

describe('DriverSearchComponent', () => {
  let component: DriverSearchComponent;
  let fixture: ComponentFixture<DriverSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NzInputModule,
        NzButtonModule,
        NzListModule,
        NzCardModule,
        NzGridModule,
        DriverSearchComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: F1ApiService, useClass: MockF1ApiService },
        { provide: NzMessageService, useClass: MockNzMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Buscador de Pilotos');
  });
});
