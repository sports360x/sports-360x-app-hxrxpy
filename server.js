
const express = require('express');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock data for development
const mockGames = [
  {
    id: '1',
    league: 'NBA',
    date: '2025-01-17',
    state: 'LIVE',
    statusText: 'Q2 04:52',
    homeTeam: { id: 'bos', abbr: 'BOS', name: 'Celtics', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    awayTeam: { id: 'nyk', abbr: 'NYK', name: 'Knicks', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    homeScore: 52,
    awayScore: 48,
    periods: [
      { label: 'Q1', home: 28, away: 25 },
      { label: 'Q2', home: 24, away: 23 }
    ]
  },
  {
    id: '2',
    league: 'NFL',
    date: '2025-01-17',
    state: 'UPCOMING',
    statusText: '8:00 PM ET',
    homeTeam: { id: 'kc', abbr: 'KC', name: 'Chiefs', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    awayTeam: { id: 'buf', abbr: 'BUF', name: 'Bills', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    homeScore: 0,
    awayScore: 0,
    periods: []
  },
  {
    id: '3',
    league: 'MLB',
    date: '2025-01-17',
    state: 'FINAL',
    statusText: 'Final',
    homeTeam: { id: 'nyy', abbr: 'NYY', name: 'Yankees', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    awayTeam: { id: 'bos', abbr: 'BOS', name: 'Red Sox', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    homeScore: 7,
    awayScore: 4,
    periods: [
      { label: '1', home: 1, away: 0 },
      { label: '2', home: 2, away: 1 },
      { label: '3', home: 0, away: 2 },
      { label: '4', home: 3, away: 0 },
      { label: '5', home: 1, away: 1 }
    ]
  }
];

const mockAnalytics = {
  insights: [
    {
      id: '1',
      type: 'opportunity',
      title: 'Celtics Strong Home Performance',
      description: 'Boston has won 8 of their last 10 home games with an average margin of 12 points.',
      confidence: 78,
      league: 'NBA'
    },
    {
      id: '2',
      type: 'prediction',
      title: 'Chiefs Offensive Surge Expected',
      description: 'Kansas City averages 31 points per game in playoff scenarios.',
      confidence: 85,
      league: 'NFL'
    }
  ],
  performance: {
    winRate: '68%',
    winRateTrend: 5,
    roi: '12.4%',
    roiTrend: 3,
    hotStreak: 4,
    communityRank: 127,
    rankTrend: -8
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

app.get('/api/scores', (req, res) => {
  const { league, date } = req.query;
  let filteredGames = mockGames;

  if (league && league !== 'ALL') {
    filteredGames = filteredGames.filter(game => game.league === league);
  }

  if (date) {
    filteredGames = filteredGames.filter(game => game.date === date);
  }

  res.json({
    games: filteredGames,
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/analytics', (req, res) => {
  res.json(mockAnalytics);
});

app.get('/api/favorites/teams', (req, res) => {
  res.json([
    { id: 'bos', name: 'Boston Celtics', league: 'NBA', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' },
    { id: 'kc', name: 'Kansas City Chiefs', league: 'NFL', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop' }
  ]);
});

app.get('/api/favorites/games', (req, res) => {
  res.json(mockGames.slice(0, 2));
});

app.get('/api/news', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'NBA Playoffs Heat Up',
      summary: 'Exciting matchups continue in the NBA playoffs...',
      url: 'https://example.com/news/1',
      publishedAt: new Date().toISOString(),
      league: 'NBA'
    }
  ]);
});

app.get('/api/community/posts', (req, res) => {
  res.json([
    {
      id: '1',
      author: 'SportsAnalyst',
      content: 'Great insights on the Celtics game tonight!',
      timestamp: new Date().toISOString(),
      likes: 12
    }
  ]);
});

// Serve static files from web directory
const webDir = path.join(process.cwd(), 'web');
app.use(express.static(webDir));

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(webDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Sports 360 X API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏀 Scores API: http://localhost:${PORT}/api/scores`);
});
