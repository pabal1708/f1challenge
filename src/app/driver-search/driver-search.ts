import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { F1ApiService } from '../services/f1-api';
import { Driver, DriversApiResponse } from '../models/f1-data';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-driver-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NzListModule, NzCardModule, NzGridModule, NzInputModule, NzButtonModule],
  templateUrl: './driver-search.html',
  styleUrl: './driver-search.css'
})
export class DriverSearchComponent implements OnInit, OnDestroy {
  drivers: Driver[] = [];
  searchTerm: string = '';

  private searchTermChanged: Subject<string> = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private f1ApiService: F1ApiService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.searchTermChanged.pipe(
      debounceTime(500), // Espera 500ms después de la última pulsación de tecla
      distinctUntilChanged(), // Solo emite si el valor actual es diferente al último
      takeUntil(this.destroy$)
    ).subscribe((query) => {
      if (query.trim().length >= 4) {
        this.performSearch(query);
      } else if (query.trim().length === 0) {
        this.drivers = []; // Limpiar la lista si el campo está vacío
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(value: string): void {
    this.searchTermChanged.next(value);
  }

  // Método para la búsqueda manual (botón)
  onManualSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.nzMessageService.warning('Por favor, ingresa un término de búsqueda.');
      return;
    }
    this.performSearch(this.searchTerm);
  }

  // Lógica de búsqueda rea
  performSearch(query: string): void {
    this.f1ApiService.searchDrivers(query).subscribe({
      next: (response: DriversApiResponse) => {
        this.drivers = response.drivers;
        if (this.drivers.length === 0) {
          this.nzMessageService.info('No se encontraron pilotos con el término de búsqueda.');
        }
      },
      error: (err: any) => {
        console.error('Error searching drivers:', err);
        this.nzMessageService.error('Ocurrió un error al buscar pilotos.');
      }
    });
  }
}
