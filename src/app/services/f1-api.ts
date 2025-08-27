import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamsApiResponse, DriversApiResponse } from '../models/f1-data';

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {
  private apiUrl = 'https://f1api.dev/api';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<TeamsApiResponse> {
    return this.http.get<TeamsApiResponse>(`${this.apiUrl}/teams`);
  }

  getDrivers(): Observable<DriversApiResponse> {
    return this.http.get<DriversApiResponse>(`${this.apiUrl}/current/drivers`);
  }

  searchDrivers(query: string): Observable<DriversApiResponse> {
    return this.http.get<DriversApiResponse>(`${this.apiUrl}/drivers/search?q=${query}`);
  }
}
