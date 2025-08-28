import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamsApiResponse, DriversApiResponse, DriverChampionshipApiResponse, ConstructorChampionshipApiResponse } from '../models/f1-data';

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {
  private apiUrl = 'https://f1api.dev/api';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<TeamsApiResponse> {
    return this.http.get<TeamsApiResponse>(`${this.apiUrl}/current/teams`);
  }

  getDrivers(): Observable<DriversApiResponse> {
    return this.http.get<DriversApiResponse>(`${this.apiUrl}/current/drivers`);
  }

  searchDrivers(query: string): Observable<DriversApiResponse> {
    return this.http.get<DriversApiResponse>(`${this.apiUrl}/drivers/search?q=${query}`);
  }

  getDriverChampionshipStandings(year: number): Observable<DriverChampionshipApiResponse> {
    return this.http.get<DriverChampionshipApiResponse>(`${this.apiUrl}/${year}/drivers-championship?limit=5&offset=0`);
  }

  getConstructorChampionshipStandings(year: number): Observable<ConstructorChampionshipApiResponse> {
    return this.http.get<ConstructorChampionshipApiResponse>(`${this.apiUrl}/${year}/constructors-championship?limit=5&offset=0`);
  }

    getDriversByYear(year: number, limit = 200, offset = 0): Observable<DriversApiResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
    return this.http.get<DriversApiResponse>(`${this.apiUrl}/${year}/drivers`, { params });
  }
}
