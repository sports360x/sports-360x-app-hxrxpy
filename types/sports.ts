
export type League = 'ALL' | 'MLB' | 'NBA' | 'NFL';

export type GameState = 'LIVE' | 'UPCOMING' | 'FINAL';

export interface Team {
  id: string;
  abbr: string;
  name: string;
  logo: string;
  league: League;
  record?: {
    wins: number;
    losses: number;
  };
}

export interface GamePeriod {
  label: string;
  home: number;
  away: number;
}

export interface Game {
  id: string;
  league: League;
  date: string;
  state: GameState;
  statusText: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  periods: GamePeriod[];
  startTime?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  league: League;
  isBreaking: boolean;
  imageUrl?: string;
  videoUrl?: string;
}
