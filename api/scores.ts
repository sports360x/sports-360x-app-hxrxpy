
import { Game, League } from '../types/sports';

// Mock data for demonstration
const mockTeams = [
  {
    id: 'bos',
    abbr: 'BOS',
    name: 'Celtics',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    league: 'NBA',
    record: { wins: 45, losses: 12 }
  },
  {
    id: 'nyk',
    abbr: 'NYK',
    name: 'Knicks',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    league: 'NBA',
    record: { wins: 38, losses: 19 }
  },
  {
    id: 'lal',
    abbr: 'LAL',
    name: 'Lakers',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    league: 'NBA',
    record: { wins: 42, losses: 15 }
  },
  {
    id: 'nyy',
    abbr: 'NYY',
    name: 'Yankees',
    logo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop',
    league: 'MLB',
    record: { wins: 82, losses: 45 }
  },
  {
    id: 'bos-mlb',
    abbr: 'BOS',
    name: 'Red Sox',
    logo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop',
    league: 'MLB',
    record: { wins: 78, losses: 49 }
  },
  {
    id: 'kc',
    abbr: 'KC',
    name: 'Chiefs',
    logo: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=100&h=100&fit=crop',
    league: 'NFL',
    record: { wins: 12, losses: 3 }
  }
];

const mockGames: Game[] = [
  {
    id: '1',
    league: 'NBA',
    date: '2025-09-17',
    state: 'LIVE',
    statusText: 'Q2 04:52',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    homeScore: 52,
    awayScore: 48,
    periods: [
      { label: 'Q1', home: 28, away: 25 },
      { label: 'Q2', home: 24, away: 23 }
    ]
  },
  {
    id: '2',
    league: 'NBA',
    date: '2025-09-17',
    state: 'UPCOMING',
    statusText: '8:00 PM ET',
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[0],
    homeScore: 0,
    awayScore: 0,
    periods: [],
    startTime: '8:00 PM ET'
  },
  {
    id: '3',
    league: 'NBA',
    date: '2025-09-17',
    state: 'FINAL',
    statusText: 'Final',
    homeTeam: mockTeams[1],
    awayTeam: mockTeams[2],
    homeScore: 108,
    awayScore: 112,
    periods: [
      { label: 'Q1', home: 25, away: 28 },
      { label: 'Q2', home: 27, away: 24 },
      { label: 'Q3', home: 28, away: 32 },
      { label: 'Q4', home: 28, away: 28 }
    ]
  },
  {
    id: '4',
    league: 'MLB',
    date: '2025-09-17',
    state: 'LIVE',
    statusText: 'Top 7th',
    homeTeam: mockTeams[3],
    awayTeam: mockTeams[4],
    homeScore: 6,
    awayScore: 4,
    periods: [
      { label: '1', home: 1, away: 0 },
      { label: '2', home: 0, away: 2 },
      { label: '3', home: 2, away: 1 },
      { label: '4', home: 1, away: 0 },
      { label: '5', home: 0, away: 1 },
      { label: '6', home: 2, away: 0 }
    ]
  },
  {
    id: '5',
    league: 'NFL',
    date: '2025-09-17',
    state: 'UPCOMING',
    statusText: 'Sun 1:00 PM ET',
    homeTeam: mockTeams[5],
    awayTeam: mockTeams[0],
    homeScore: 0,
    awayScore: 0,
    periods: [],
    startTime: 'Sun 1:00 PM ET'
  }
];

export default function handler(req: any, res: any) {
  console.log('API /scores called with:', req.query);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const { date, league } = req.query;
  
  console.log(`Fetching games for date: ${date}, league: ${league}`);
  
  let filteredGames = mockGames;
  
  // Filter by date if provided
  if (date && date !== '2025-09-17') {
    // For demo purposes, return empty array for other dates
    filteredGames = [];
  }
  
  // Filter by league if provided and not 'ALL'
  if (league && league !== 'ALL') {
    filteredGames = filteredGames.filter(game => game.league === league);
  }
  
  const response = {
    games: filteredGames,
    meta: {
      date: date || '2025-09-17',
      league: league || 'ALL',
      count: filteredGames.length,
      timestamp: new Date().toISOString()
    }
  };
  
  console.log(`Returning ${filteredGames.length} games`);
  res.status(200).json(response);
}
