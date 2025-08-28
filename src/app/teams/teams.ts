import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1ApiService } from '../services/f1-api';
import { Team } from '../models/f1-data';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, NzListModule, NzCardModule, NzButtonModule, NzGridModule, NzIconModule, RouterLink],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(private f1ApiService: F1ApiService) { }

  ngOnInit(): void {
    this.f1ApiService.getTeams().subscribe({
      next: (response) => {
        this.teams = response.teams;
        console.log(this.teams);
      },
      error: (err) => {
        console.error('Error fetching teams:', err);
      }
    });
  }
}
