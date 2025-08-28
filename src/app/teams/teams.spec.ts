import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsComponent } from './teams';
import { F1ApiService } from '../services/f1-api';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Team, TeamsApiResponse } from '../models/f1-data';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let f1ApiService: jasmine.SpyObj<F1ApiService>;

  const mockTeamsResponse: TeamsApiResponse = {
    teams: [
      {
        id: 1,
        name: 'Mercedes',
        nationality: 'German',
        url: 'http://mercedes.com'
      },
      {
        id: 2,
        name: 'Red Bull Racing',
        nationality: 'Austrian',
        url: 'http://redbull.com'
      }
    ]
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('F1ApiService', ['getTeams']);

    await TestBed.configureTestingModule({
      imports: [TeamsComponent, RouterTestingModule],
      providers: [
        { provide: F1ApiService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    f1ApiService = TestBed.inject(F1ApiService) as jasmine.SpyObj<F1ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    f1ApiService.getTeams.and.returnValue(of(mockTeamsResponse));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Equipos de Fórmula 1');
  });

  it('should load teams on init', () => {
    f1ApiService.getTeams.and.returnValue(of(mockTeamsResponse));
    
    component.ngOnInit();
    
    expect(f1ApiService.getTeams).toHaveBeenCalled();
    expect(component.teams.length).toBe(2);
    expect(component.teams[0].name).toBe('Mercedes');
    expect(component.teams[1].name).toBe('Red Bull Racing');
  });

  it('should initialize with empty teams array', () => {
    expect(component.teams).toEqual([]);
  });
});