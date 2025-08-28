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

export interface DriverChampionshipStanding {
  driver: {
    driverId: string;
    name: string;
    surname: string;
    nationality: string;
    url: string;
  };
  position: number;
  points: number;
  wins: number;
  constructor: {
    constructorId: string;
    name: string;
    nationality: string;
    url: string;
  };
  status: string;
}

export interface ConstructorChampionshipStanding {
  team: {
    teamId: string;
    teamName: string;
    country: string;
    firstAppeareance: number | null;
    constructorsChampionships: number | null;
    driversChampionships: number | null;
    url: string;
  };
  position: number;
  points: number;
  wins: number;
}

export interface DriverChampionshipApiResponse {
  api: string;
  url: string;
  season: number;
  limit: number;
  offset: number;
  total: number;
  drivers_championship: DriverChampionshipStanding[];
}

export interface ConstructorChampionshipApiResponse {
  api: string;
  url: string;
  season: number;
  limit: number;
  offset: number;
  total: number;
  constructors_championship: ConstructorChampionshipStanding[];
}