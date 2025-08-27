export interface Team {
  teamId: string;
  teamName: string;
  teamNationality: string;
  firstAppeareance: number | null;
  constructorsChampionships: number | null;
  driversChampionships: number | null;
  url: string;
}

export interface TeamsApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  teams: Team[];
}

export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number | null;
  shortName: string | null;
  url: string;
  teamId?: string;
}

export interface DriversApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  drivers: Driver[];
}
