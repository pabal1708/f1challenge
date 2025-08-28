import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { F1ApiService } from '../services/f1-api';
import { DriverChampionshipStanding, ConstructorChampionshipStanding } from '../models/f1-data';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule, FormsModule, NzInputModule, NzGridModule],
  templateUrl: './standings.html',
  styleUrl: './standings.css'
})
export class StandingsComponent implements OnInit, OnDestroy {
  year: number = new Date().getFullYear();
  driverStandings: DriverChampionshipStanding[] = [];
  constructorStandings: ConstructorChampionshipStanding[] = [];

  driverChartOption: EChartsOption = {};
  constructorChartOption: EChartsOption = {};
  driverChartOptionPoints: EChartsOption = {};
  constructorChartOptionPoints: EChartsOption = {};

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private f1ApiService: F1ApiService) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const yearParam = params.get('year');
      this.year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
      this.loadStandings();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStandings(): void {
    forkJoin([
      this.f1ApiService.getDriverChampionshipStandings(this.year),
      this.f1ApiService.getConstructorChampionshipStandings(this.year)
    ]).pipe(takeUntil(this.destroy$)).subscribe({
      next: ([driverRes, constructorRes]) => {
        this.driverStandings = driverRes.drivers_championship;
        this.constructorStandings = constructorRes.constructors_championship;
        this.initializeCharts();
      },
      error: (err) => {
        console.error('Error fetching standings:', err);
      }
    });
  }

  initializeCharts(): void {
    this.driverChartOption = {
      title: {
        text: `Clasificación de Pilotos ${this.year}`,
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.driverStandings?.map(s => `${s.position}. ${s.driver.name} ${s.driver.surname}`) || []
      },
      yAxis: {
        type: 'value',
        name: 'Puntos'
      },
      series: [
        {
          name: 'Puntos',
          type: 'bar',
          data: this.driverStandings.map(s => s.points)
        }
      ]
    };

    this.constructorChartOption = {
      title: {
        text: `Clasificación de Scuderias ${this.year}`,
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.constructorStandings?.map(s => `${s.position}. ${s.team.teamName}`) || []
      },
      yAxis: {
        type: 'value',
        name: 'Puntos'
      },
      series: [
        {
          name: 'Puntos',
          type: 'bar',
          data: this.constructorStandings.map(s => s.points)
        }
      ]
    };

    this.driverChartOptionPoints = {
      title: {
        text: `Clasificación de Pilotos por victorias ${this.year}`,
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.driverStandings?.map(s => `${s.position}. ${s.driver.name} ${s.driver.surname}`) || []
      },
      yAxis: {
        type: 'value',
        name: 'Victorias'
      },
      series: [
        {
          name: 'Victorias',
          type: 'bar',
          data: this.driverStandings.map(s => s.wins)
        }
      ]
    };

    this.constructorChartOptionPoints = {
      title: {
        text: `Clasificación de Scuderias por victorias ${this.year}`,
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.constructorStandings?.map(s => `${s.position}. ${s.team.teamName}`) || []
      },
      yAxis: {
        type: 'value',
        name: 'Victorias'
      },
      series: [
        {
          name: 'Victorias',
          type: 'bar',
          data: this.constructorStandings.map(s => s.wins)
        }
      ]
    };
  }
}
