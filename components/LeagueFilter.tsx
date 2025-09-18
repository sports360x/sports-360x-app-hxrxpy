
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { commonStyles, colors } from '../styles/commonStyles';
import { League } from '../types/sports';

interface LeagueFilterProps {
  selectedLeague: League;
  onLeagueChange: (league: League) => void;
}

const leagues: { key: League; label: string; emoji: string }[] = [
  { key: 'ALL', label: 'All', emoji: '🏆' },
  { key: 'NBA', label: 'NBA', emoji: '🏀' },
  { key: 'NFL', label: 'NFL', emoji: '🏈' },
  { key: 'MLB', label: 'MLB', emoji: '⚾' },
  { key: 'SOCCER', label: 'Soccer', emoji: '⚽' },
  { key: 'TENNIS', label: 'Tennis', emoji: '🎾' },
];

export default function LeagueFilter({ selectedLeague, onLeagueChange }: LeagueFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {leagues.map((league, index) => (
        <Animated.View
          key={league.key}
          entering={FadeIn.duration(300).delay(index * 50)}
          exiting={FadeOut.duration(200)}
        >
          <TouchableOpacity
            style={[
              {
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor: selectedLeague === league.key ? colors.accent : colors.card,
                borderWidth: 1,
                borderColor: selectedLeague === league.key ? colors.accent : colors.border,
              },
              commonStyles.row,
            ]}
            onPress={() => onLeagueChange(league.key)}
          >
            <Text style={{ fontSize: 16, marginRight: 6 }}>
              {league.emoji}
            </Text>
            <Text
              style={[
                commonStyles.textSmall,
                {
                  color: selectedLeague === league.key ? colors.background : colors.text,
                  fontWeight: selectedLeague === league.key ? '700' : '600',
                }
              ]}
            >
              {league.label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
