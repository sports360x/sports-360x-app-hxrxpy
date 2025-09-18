
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Team } from '../types/sports';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <TouchableOpacity 
      style={commonStyles.card}
      onPress={() => console.log('Team selected:', team.id)}
    >
      <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
        <View style={commonStyles.row}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.secondary,
            marginRight: 12,
            ...commonStyles.center
          }}>
            <Text style={[commonStyles.text, { fontWeight: '700' }]}>
              {team.abbr}
            </Text>
          </View>
          <View>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {team.name}
            </Text>
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              {team.league}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={() => console.log('Unfollow team:', team.id)}
        >
          <Icon name="heart" size={20} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {team.record && (
        <View>
          <View style={commonStyles.divider} />
          <View style={[commonStyles.spaceBetween, { marginTop: 12 }]}>
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              Record
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {team.record.wins}-{team.record.losses}
            </Text>
          </View>
          
          <View style={[commonStyles.spaceBetween, { marginTop: 8 }]}>
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              Win %
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {((team.record.wins / (team.record.wins + team.record.losses)) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
