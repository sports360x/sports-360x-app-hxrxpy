
export type BetStatus = 'Pending' | 'Live' | 'Won' | 'Lost';

export type BetType = 'Spread' | 'Moneyline' | 'Over/Under' | 'Prop Bet' | 'Parlay';

export interface Bet {
  id: string;
  sport: string;
  league: string;
  teamPlayer: string;
  betType: BetType;
  wagerAmount: number;
  notes?: string;
  status: BetStatus;
  createdAt: string;
  updatedAt: string;
  odds?: string;
  potentialPayout?: number;
}

export interface BetStats {
  totalBets: number;
  wins: number;
  losses: number;
  pending: number;
  winPercentage: number;
  roi: number;
  totalWagered: number;
  totalWon: number;
}
