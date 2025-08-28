import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from '../app.routes';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, TeamOutline, SearchOutline, BarChartOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ UserOutline, TeamOutline, SearchOutline, BarChartOutline ];

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: NZ_ICONS, useValue: icons }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Equipos" menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li[routerlink="/teams"] span')?.textContent).toContain('Equipos');
  });

  it('should display "Pilotos" menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li[routerlink="/drivers"] span')?.textContent).toContain('Pilotos');
  });

  it('should display "Buscar Pilotos" menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li[routerlink="/drivers/search"] span')?.textContent).toContain('Buscar Pilotos');
  });

  it('should display "Clasificación" menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li[routerlink="/standings"] span')?.textContent).toContain('Clasificación');
  });
});
