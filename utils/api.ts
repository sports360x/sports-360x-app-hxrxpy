
import { Game, League, Team, NewsArticle } from '../types/sports';
import { AnalyticsData } from '../types/analytics';
import { CommunityPost } from '../types/community';

// Mock data for demonstration
const mockTeams: Team[] = [
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
  }
];

const mockGames: Game[] = [
  {
    id: '1',
    league: 'NBA',
    date: new Date().toISOString().split('T')[0],
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
    date: new Date().toISOString().split('T')[0],
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
    date: new Date().toISOString().split('T')[0],
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
  }
];

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Trade Deadline Approaching: Top Targets Revealed',
    summary: 'As the trade deadline nears, several star players are reportedly available...',
    author: 'Sports 360 X Staff',
    publishedAt: new Date().toISOString(),
    league: 'NBA',
    isBreaking: true,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'MVP Race Heating Up in Final Stretch',
    summary: 'With just weeks left in the regular season, the MVP race is closer than ever...',
    author: 'Analytics Team',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    league: 'NBA',
    isBreaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
  }
];

const mockAnalytics: AnalyticsData = {
  insights: [
    {
      id: '1',
      title: 'High-Value Opportunity',
      description: 'Lakers showing strong momentum with 85% win rate in last 10 games',
      confidence: 87,
      type: 'opportunity',
      league: 'NBA'
    },
    {
      id: '2',
      title: 'Trend Alert',
      description: 'Home teams performing 12% better than expected this week',
      confidence: 92,
      type: 'trend',
      league: 'ALL'
    }
  ],
  performance: {
    winRate: '68.5%',
    winRateTrend: 5.2,
    roi: '12.4%',
    roiTrend: -2.1,
    hotStreak: 7,
    communityRank: 1247,
    rankTrend: 23
  }
};

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'SportsAnalyst',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    content: 'The Lakers&apos; recent performance has been incredible. Their defensive rating has improved by 15 points over the last 10 games!',
    createdAt: new Date().toISOString(),
    likes: 24,
    comments: 8,
    isLiked: false,
    league: 'NBA'
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'HoopsExpert',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    content: 'Anyone else notice how the Celtics have been dominating in clutch time? Their +/- in the final 5 minutes is off the charts.',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    likes: 15,
    comments: 12,
    isLiked: true,
    league: 'NBA'
  }
];

export const fetchGames = async (league: League, date: Date): Promise<Game[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Fetching games for league:', league, 'date:', date.toISOString().split('T')[0]);
  
  if (league === 'ALL') {
    return mockGames;
  }
  
  return mockGames.filter(game => game.league === league);
};

export const fetchAnalytics = async (league: League): Promise<AnalyticsData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log('Fetching analytics for league:', league);
  return mockAnalytics;
};

export const fetchFavoriteTeams = async (): Promise<Team[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  console.log('Fetching favorite teams');
  return mockTeams.slice(0, 2); // Return first 2 teams as favorites
};

export const fetchFavoriteGames = async (): Promise<Game[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  console.log('Fetching favorite games');
  return mockGames.filter(game => 
    game.homeTeam.id === 'bos' || game.awayTeam.id === 'bos' ||
    game.homeTeam.id === 'nyk' || game.awayTeam.id === 'nyk'
  );
};

export const fetchNews = async (league: League): Promise<NewsArticle[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  console.log('Fetching news for league:', league);
  
  if (league === 'ALL') {
    return mockNews;
  }
  
  return mockNews.filter(article => article.league === league);
};

export const fetchCommunityPosts = async (tab: 'hot' | 'recent' | 'following'): Promise<CommunityPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Fetching community posts for tab:', tab);
  return mockPosts;
};

export const createPost = async (content: string): Promise<CommunityPost> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('Creating post:', content);
  
  const newPost: CommunityPost = {
    id: Date.now().toString(),
    author: {
      id: 'currentUser',
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
    },
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    isLiked: false
  };
  
  return newPost;
};
