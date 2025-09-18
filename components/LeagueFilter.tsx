
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { League } from '../types/sports';
import SimpleBottomSheet from './BottomSheet';

interface LeagueFilterProps {
  selectedLeague: League;
  onLeagueChange: (league: League) => void;
}

export default function LeagueFilter({ selectedLeague, onLeagueChange }: LeagueFilterProps) {
  const [isVisible, setIsVisible] = useState(false);

  const leagues: { key: League; label: string }[] = [
    { key: 'ALL', label: 'All Leagues' },
    { key: 'MLB', label: 'MLB' },
    { key: 'NBA', label: 'NBA' },
    { key: 'NFL', label: 'NFL' },
  ];

  const handleLeagueSelect = (league: League) => {
    onLeagueChange(league);
    setIsVisible(false);
  };

  const selectedLeagueLabel = leagues.find(l => l.key === selectedLeague)?.label || 'All Leagues';

  return (
    <>
      <TouchableOpacity
        style={[
          commonStyles.row,
          {
            backgroundColor: colors.card,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            flex: 1,
          }
        ]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[commonStyles.text, { flex: 1 }]}>
          {selectedLeagueLabel}
        </Text>
        <Icon name="chevron-down-outline" size={16} color={colors.muted} />
      </TouchableOpacity>

      <SimpleBottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20, textAlign: 'center' }]}>
            Select League
          </Text>
          
          {leagues.map((league) => (
            <TouchableOpacity
              key={league.key}
              style={[
                {
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  marginBottom: 8,
                  backgroundColor: selectedLeague === league.key ? colors.accent : colors.background,
                },
                commonStyles.row
              ]}
              onPress={() => handleLeagueSelect(league.key)}
            >
              <Text style={[
                commonStyles.text,
                { 
                  flex: 1,
                  color: selectedLeague === league.key ? colors.background : colors.text 
                }
              ]}>
                {league.label}
              </Text>
              {selectedLeague === league.key && (
                <Icon 
                  name="checkmark-outline" 
                  size={20} 
                  color={colors.background} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SimpleBottomSheet>
    </>
  );
}
