
# Sports 360 X API Testing Guide

This document explains how to test the API endpoints for the Sports 360 X app.

## Available Endpoints

### 1. Scores API
**Endpoint:** `/api/scores`
**Method:** GET
**Parameters:**
- `date` (optional): Date in YYYY-MM-DD format (default: 2025-09-17)
- `league` (optional): League filter - ALL, NBA, MLB, NFL (default: ALL)

**Example Requests:**
```bash
# Get all games for default date
curl "https://tyd_zuk-anonymous-8081.exp.direct/api/scores"

# Get NBA games for specific date
curl "https://tyd_zuk-anonymous-8081.exp.direct/api/scores?date=2025-09-17&league=NBA"

# Get all games for specific date
curl "https://tyd_zuk-anonymous-8081.exp.direct/api/scores?date=2025-09-17&league=ALL"

# Get MLB games only
curl "https://tyd_zuk-anonymous-8081.exp.direct/api/scores?league=MLB"
```

**Response Format:**
```json
{
  "games": [
    {
      "id": "1",
      "league": "NBA",
      "date": "2025-09-17",
      "state": "LIVE",
      "statusText": "Q2 04:52",
      "homeTeam": {
        "id": "bos",
        "abbr": "BOS",
        "name": "Celtics",
        "logo": "...",
        "league": "NBA",
        "record": { "wins": 45, "losses": 12 }
      },
      "awayTeam": {
        "id": "nyk",
        "abbr": "NYK",
        "name": "Knicks",
        "logo": "...",
        "league": "NBA",
        "record": { "wins": 38, "losses": 19 }
      },
      "homeScore": 52,
      "awayScore": 48,
      "periods": [
        { "label": "Q1", "home": 28, "away": 25 },
        { "label": "Q2", "home": 24, "away": 23 }
      ]
    }
  ],
  "meta": {
    "date": "2025-09-17",
    "league": "ALL",
    "count": 5,
    "timestamp": "2025-01-27T..."
  }
}
```

### 2. Health Check API
**Endpoint:** `/api/health`
**Method:** GET
**Parameters:** None

**Example Request:**
```bash
curl "https://tyd_zuk-anonymous-8081.exp.direct/api/health"
```

**Response Format:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T...",
  "version": "1.0.0",
  "uptime": 12345.67,
  "environment": "development",
  "services": {
    "api": "operational",
    "database": "operational",
    "cache": "operational"
  },
  "checks": {
    "memory": {
      "used": 45,
      "total": 128,
      "status": "ok"
    },
    "cpu": {
      "load": {...},
      "status": "ok"
    }
  }
}
```

## CORS Configuration

The API endpoints are configured with CORS headers to allow requests from:
- `https://*.exp.direct` (Expo development URLs)
- `http://localhost:*` (Local development)
- `https://localhost:*` (Local HTTPS development)

## Running the API Server

To run the API server locally:

```bash
# Install dependencies
npm install

# Start the API server
npm run server

# Or run both the API server and Expo dev server
npm run dev:full
```

The server will run on port 8081 by default, or the port specified in the `PORT` environment variable.

## Testing with curl

Here are the exact curl commands you provided:

```bash
# Check if host responds
curl -I https://tyd_zuk-anonymous-8081.exp.direct

# Get scores with truncated output
curl -s https://tyd_zuk-anonymous-8081.exp.direct/api/scores?date=2025-09-17\&league=ALL | head -c 800

# Health probe
curl -s https://tyd_zuk-anonymous-8081.exp.direct/api/health
```

## Mock Data

The API currently returns mock data for demonstration purposes:
- 3 NBA games (1 live, 1 upcoming, 1 finished)
- 1 MLB game (live)
- 1 NFL game (upcoming)

All games are set for the date `2025-09-17`. For other dates, the API returns an empty games array.

## Debug Panel

The app includes debug panels at:
- `/debug` - Native debug screen
- `/__debug` - Web debug screen

These panels show:
- Environment variables
- Available routes
- API ping status
- Response previews
