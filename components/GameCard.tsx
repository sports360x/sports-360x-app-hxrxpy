
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Game } from '../types/sports';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const getStatusColor = () => {
    switch (game.state) {
      case 'LIVE':
        return colors.live;
      case 'UPCOMING':
        return colors.upcoming;
      case 'FINAL':
        return colors.finished;
      default:
        return colors.muted;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <TouchableOpacity 
      style={commonStyles.card}
      onPress={() => console.log('Game selected:', game.id)}
    >
      {/* Game Header */}
      <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
        <View style={commonStyles.row}>
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: getStatusColor(),
            marginRight: 8
          }} />
          <Text style={[commonStyles.textSmall, { color: getStatusColor(), fontWeight: '600' }]}>
            {game.statusText}
          </Text>
        </View>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {game.league}
        </Text>
      </View>

      {/* Teams and Scores */}
      <View style={{ marginBottom: 12 }}>
        {/* Away Team */}
        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <View style={commonStyles.row}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.secondary,
              marginRight: 12,
              ...commonStyles.center
            }}>
              <Text style={[commonStyles.textSmall, { fontWeight: '700' }]}>
                {game.awayTeam.abbr}
              </Text>
            </View>
            <View>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {game.awayTeam.name}
              </Text>
              {game.awayTeam.record && (
                <Text style={commonStyles.textSmall}>
                  {game.awayTeam.record.wins}-{game.awayTeam.record.losses}
                </Text>
              )}
            </View>
          </View>
          <Text style={[commonStyles.title, { fontSize: 20 }]}>
            {game.awayScore}
          </Text>
        </View>

        {/* Home Team */}
        <View style={commonStyles.spaceBetween}>
          <View style={commonStyles.row}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.secondary,
              marginRight: 12,
              ...commonStyles.center
            }}>
              <Text style={[commonStyles.textSmall, { fontWeight: '700' }]}>
                {game.homeTeam.abbr}
              </Text>
            </View>
            <View>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {game.homeTeam.name}
              </Text>
              {game.homeTeam.record && (
                <Text style={commonStyles.textSmall}>
                  {game.homeTeam.record.wins}-{game.homeTeam.record.losses}
                </Text>
              )}
            </View>
          </View>
          <Text style={[commonStyles.title, { fontSize: 20 }]}>
            {game.homeScore}
          </Text>
        </View>
      </View>

      {/* Period Scores */}
      {game.periods.length > 0 && (
        <View>
          <View style={commonStyles.divider} />
          <View style={[commonStyles.row, { justifyContent: 'space-around', marginTop: 8 }]}>
            {game.periods.map((period, index) => (
              <View key={index} style={commonStyles.center}>
                <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
                  {period.label}
                </Text>
                <Text style={[commonStyles.textSmall, { fontWeight: '600' }]}>
                  {period.away}-{period.home}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Upcoming Game Time */}
      {game.state === 'UPCOMING' && game.startTime && (
        <View>
          <View style={commonStyles.divider} />
          <View style={[commonStyles.center, { marginTop: 8 }]}>
            <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
              {game.startTime}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
