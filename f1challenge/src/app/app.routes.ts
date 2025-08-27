import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TeamsComponent } from './teams/teams';
import { DriverDetailComponent } from './driver-detail/driver-detail';
import { DriverSearchComponent } from './driver-search/driver-search';
import { StandingsComponent } from './standings/standings';
import { DriversComponent } from './drivers/drivers';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:constructorId/drivers', component: DriverDetailComponent },
      { path: 'drivers/search', component: DriverSearchComponent },
      { path: 'standings', component: StandingsComponent },
      { path: 'drivers', component: DriversComponent },
    ],
  },
  { path: '**', redirectTo: '/teams' },
];
