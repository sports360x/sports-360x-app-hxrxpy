
import { AIInsightsData, AIBet, TeamStreak, PlayerStreak } from '../types/aiInsights';

export const getMockAIInsights = (): AIInsightsData => {
  const topBets: AIBet[] = [
    {
      id: '1',
      league: 'NBA',
      matchup: 'Celtics vs Knicks',
      type: 'Spread',
      aiConfidence: 0.68,
      streakInfo: 'Celtics 4W, Knicks 2L',
      odds: '-3.5',
      recommendation: 'Celtics to cover the spread'
    },
    {
      id: '2',
      league: 'NFL',
      matchup: 'Chiefs vs Bills',
      type: 'Over/Under',
      aiConfidence: 0.72,
      streakInfo: 'Over hit in 6 of last 8',
      odds: 'O47.5',
      recommendation: 'Take the Over'
    },
    {
      id: '3',
      league: 'MLB',
      matchup: 'Yankees vs Red Sox',
      type: 'Moneyline',
      aiConfidence: 0.61,
      streakInfo: 'Yankees 7-3 vs Boston',
      odds: '-140',
      recommendation: 'Yankees to win'
    }
  ];

  const teamStreaks: TeamStreak[] = [
    {
      id: '1',
      team: 'Yankees',
      streak: 'Won 6 of last 7',
      record: '12-3',
      trend: 'hot'
    },
    {
      id: '2',
      team: 'Lakers',
      streak: 'Lost 4 straight',
      record: '8-7',
      trend: 'cold'
    },
    {
      id: '3',
      team: 'Chiefs',
      streak: '5-0 ATS last 5',
      record: '11-4',
      trend: 'hot'
    },
    {
      id: '4',
      team: 'Celtics',
      streak: '8-2 at home',
      record: '13-2',
      trend: 'hot'
    }
  ];

  const playerStreaks: PlayerStreak[] = [
    {
      id: '1',
      player: 'LeBron James',
      metric: 'Points',
      last5Avg: 32.4,
      streak: '5 games 30+',
      trend: 'hot',
      team: 'Lakers'
    },
    {
      id: '2',
      player: 'Aaron Judge',
      metric: 'Home Runs',
      last5Avg: 1.2,
      streak: '3 HR in last 5',
      trend: 'hot',
      team: 'Yankees'
    },
    {
      id: '3',
      player: 'Patrick Mahomes',
      metric: 'Passing TDs',
      last5Avg: 2.8,
      streak: '8 TD, 1 INT last 3',
      trend: 'hot',
      team: 'Chiefs'
    },
    {
      id: '4',
      player: 'Jayson Tatum',
      metric: 'Points',
      last5Avg: 28.6,
      streak: '4 games 25+',
      trend: 'hot',
      team: 'Celtics'
    }
  ];

  return {
    topBets,
    teamStreaks,
    playerStreaks,
    bestBet: {
      recommendation: 'Celtics -3.5 vs Knicks',
      confidence: 68,
      reasoning: 'Celtics are 4-0 in last 4 meetings and have superior home court advantage. Knicks struggling on the road.'
    },
    lastUpdated: new Date().toISOString()
  };
};
