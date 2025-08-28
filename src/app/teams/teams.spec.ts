import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsComponent } from './teams';
import { F1ApiService } from '../services/f1-api';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, TeamOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ UserOutline, TeamOutline ];

class MockF1ApiService {
  getTeams() {
    return of({
      teams: [
        { teamId: 'red_bull', teamName: 'Red Bull Racing', teamNationality: 'Austrian', constructorsChampionships: 6, url: '' },
        { teamId: 'mercedes', teamName: 'Mercedes', teamNationality: 'German', constructorsChampionships: 8, url: '' },
      ]
    });
  }
}

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TeamsComponent,
        RouterTestingModule,
        NzListModule,
        NzCardModule,
        NzButtonModule,
        NzGridModule,
        NzIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: F1ApiService, useClass: MockF1ApiService },
        { provide: NZ_ICONS, useValue: icons }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Equipos de Fórmula 1');
  });
});
