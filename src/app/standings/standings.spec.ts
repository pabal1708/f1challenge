import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingsComponent } from './standings';
import { F1ApiService } from '../services/f1-api';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockF1ApiService {
  getDriverChampionshipStandings(year: number) {
    return of({ drivers_championship: [] });
  }

  getConstructorChampionshipStandings(year: number) {
    return of({ constructors_championship: [] });
  }
}

class MockActivatedRoute {
  private subject = new Subject<any>();

  push(params: any) {
    this.subject.next({ queryParamMap: new Map(Object.entries(params)) });
  }

  get queryParamMap() {
    return this.subject.asObservable();
  }
}

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;
  let activatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NzInputModule,
        NzGridModule,
        StandingsComponent,
        NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: F1ApiService, useClass: MockF1ApiService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute) as unknown as MockActivatedRoute;
    activatedRoute.push({}); // Simulate no query params
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title with current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear();
    expect(compiled.querySelector('h2')?.textContent).toContain(`Clasificaciones de la Temporada ${currentYear}`);
  });
});
