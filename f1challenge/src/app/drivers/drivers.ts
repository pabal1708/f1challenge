import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1ApiService } from '../services/f1-api';
import { Driver, DriversApiResponse } from '../models/f1-data';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, NzListModule, NzCardModule, NzGridModule],
  templateUrl: './drivers.html',
  styleUrl: './drivers.css'
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];

  constructor(private f1ApiService: F1ApiService) { }

  ngOnInit(): void {
    this.f1ApiService.getDrivers().subscribe({
      next: (response: DriversApiResponse) => {
        this.drivers = response.drivers;
      },
      error: (err: any) => {
        console.error('Error fetching drivers:', err);
      }
    });
  }
}
