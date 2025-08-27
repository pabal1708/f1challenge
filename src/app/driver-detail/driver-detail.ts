import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { F1ApiService } from '../services/f1-api';
import { Driver } from '../models/f1-data';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule, NzListModule, NzCardModule, NzGridModule],
  template: `
    <h2>Pilotos del Equipo: {{ constructorId }}</h2>

    <div *ngIf="filteredDrivers.length === 0; else driversList" style="text-align: center; padding: 20px;">
      <p>Cargando pilotos o no se encontraron pilotos para este equipo...</p>
    </div>

    <ng-template #driversList>
      <nz-list nzGrid>
        <div nz-row [nzGutter]="[16, 16]">
          <div nz-col [nzXs]="24" [nzSm]="12" [nzMd]="8" [nzLg]="6" *ngFor="let driver of filteredDrivers">
            <nz-card [nzTitle]="driver.name + ' ' + driver.surname">
              <p>Nacionalidad: {{ driver.nationality }}</p>
              <p *ngIf="driver.number">Número: {{ driver.number }}</p>
              <p *ngIf="driver.shortName">Nombre corto: {{ driver.shortName }}</p>
              <p>Cumpleaños: {{ driver.birthday }}</p>
              <a *ngIf="driver.url" [href]="driver.url" target="_blank">Más información</a>
            </nz-card>
          </div>
        </div>
      </nz-list>
    </ng-template>
  `,
  styles: [`
    /* Puedes añadir estilos CSS específicos aquí si es necesario */
  `]
})
export class DriverDetailComponent implements OnInit {
  constructorId: string | null = null;
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];

  constructor(private route: ActivatedRoute, private f1ApiService: F1ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.constructorId = params.get('constructorId');
      this.loadDrivers();
    });
  }

  loadDrivers(): void {
    if (this.constructorId) {
      this.f1ApiService.getDrivers().subscribe({
        next: (response) => {
          this.drivers = response.drivers;
          this.filteredDrivers = this.drivers.filter(driver => driver.teamId === this.constructorId);
        },
        error: (err) => {
          console.error('Error fetching drivers:', err);
        }
      });
    }
  }
}
