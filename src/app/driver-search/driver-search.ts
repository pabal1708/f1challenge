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
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-driver-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NzListModule, NzCardModule, NzGridModule, NzInputModule, NzButtonModule],
  templateUrl: './driver-search.html',
  styleUrls: ['./driver-search.css']
})
export class DriverSearchComponent implements OnInit, OnDestroy {
  year: number = 2024;
  name: string = '';
  surname: string = '';

  private allDrivers: Driver[] = [];
  drivers: Driver[] = [];

  private nameChanged = new Subject<string>();
  private surnameChanged = new Subject<string>();
  private yearChanged = new Subject<number>();
  private destroy$ = new Subject<void>();

  loading = false;
  searchedOnce = false;

  constructor(private f1ApiService: F1ApiService, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.nameChanged.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.filterDrivers());

    this.surnameChanged.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.filterDrivers());

    this.yearChanged.pipe(debounceTime(0), takeUntil(this.destroy$))
      .subscribe(() => this.fetchYearDrivers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onYearChange(v: string) {
    const n = Number(v);
    if (!Number.isNaN(n) && n >= 1950) {
      this.year = n;
      this.yearChanged.next(n);
    }
  }
  onNameChange(v: string) {
    this.name = v;
    this.nameChanged.next(v);
  }
  onSurnameChange(v: string) {
    this.surname = v;
    this.surnameChanged.next(v);
  }

  onSearchClick() {
    this.fetchYearDrivers();
  }

  private fetchYearDrivers() {
    this.loading = true;
    this.searchedOnce = true;
    this.f1ApiService.getDriversByYear(this.year).subscribe({
      next: (resp: DriversApiResponse) => {
        this.allDrivers = resp.drivers ?? [];
        this.filterDrivers();
        this.loading = false;
        if (!this.allDrivers.length) {
          this.msg.info(`No hay pilotos para ${this.year}.`);
        }
      },
      error: (err) => {
        this.loading = false;
        this.allDrivers = [];
        this.drivers = [];
        this.msg.error(`Error obteniendo pilotos de ${this.year}.`);
        console.error(err);
      }
    });
  }

  private filterDrivers() {
    const n = this.name.trim().toLowerCase();
    const s = this.surname.trim().toLowerCase();
    const useName = n.length >= 4;
    const useSurname = s.length >= 4;

    this.drivers = this.allDrivers.filter(d => {
      const okName = !useName || d.name?.toLowerCase().includes(n);
      const okSurname = !useSurname || d.surname?.toLowerCase().includes(s);
      return okName && okSurname;
    });
  }
}
