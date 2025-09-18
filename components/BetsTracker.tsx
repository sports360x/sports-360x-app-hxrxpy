
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Bet, BetStats } from '../types/bets';

interface BetsTrackerProps {
  bets: Bet[];
  stats: BetStats;
  onAddBet: () => void;
  onDeleteBet: (betId: string) => void;
}

export default function BetsTracker({ bets, stats, onAddBet, onDeleteBet }: BetsTrackerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won':
        return colors.success;
      case 'Lost':
        return colors.error;
      case 'Live':
        return colors.upcoming;
      case 'Pending':
      default:
        return colors.muted;
    }
  };

  const renderStatsCards = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
      <View style={[commonStyles.card, { width: 120, marginRight: 12 }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          Total Bets
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.text }]}>
          {stats.totalBets}
        </Text>
      </View>
      
      <View style={[commonStyles.card, { width: 120, marginRight: 12 }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          Win Rate
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.success }]}>
          {stats.winPercentage}%
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {stats.wins}W {stats.losses}L
        </Text>
      </View>
      
      <View style={[commonStyles.card, { width: 120, marginRight: 12 }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          ROI
        </Text>
        <Text style={[
          commonStyles.subtitle, 
          { color: stats.roi > 0 ? colors.success : colors.error }
        ]}>
          {stats.roi > 0 ? '+' : ''}{stats.roi}%
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          ${(stats.totalWon - stats.totalWagered).toFixed(2)}
        </Text>
      </View>
      
      <View style={[commonStyles.card, { width: 120 }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          Pending
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.upcoming }]}>
          {stats.pending}
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          Active
        </Text>
      </View>
    </ScrollView>
  );

  const renderBetCard = (bet: Bet) => (
    <View key={bet.id} style={commonStyles.card}>
      <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
          {bet.teamPlayer}
        </Text>
        <View style={{
          backgroundColor: getStatusColor(bet.status),
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
          }}>
            {bet.status}
          </Text>
        </View>
      </View>
      
      <Text style={[commonStyles.textMuted, { marginBottom: 4 }]}>
        {bet.league} • {bet.betType}
      </Text>
      
      <Text style={[commonStyles.textSmall, { marginBottom: 8 }]}>
        Wager: ${bet.wagerAmount.toFixed(2)}
      </Text>
      
      {bet.notes && (
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 8 }]}>
          {bet.notes}
        </Text>
      )}
      
      <View style={[commonStyles.spaceBetween, { alignItems: 'center' }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {new Date(bet.createdAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          onPress={() => onDeleteBet(bet.id)}
          style={{ padding: 4 }}
        >
          <Icon name="trash-outline" size={16} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { marginBottom: 20 }]}>
        <Text style={commonStyles.title}>My Bets</Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          onPress={onAddBet}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Add Bet</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Bets List */}
      {bets.length === 0 ? (
        <View style={[commonStyles.center, { paddingVertical: 40 }]}>
          <Icon name="receipt-outline" size={48} color={colors.muted} />
          <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
            No bets yet
          </Text>
          <Text style={[commonStyles.textMuted, { textAlign: 'center', marginTop: 8 }]}>
            Tap "Add Bet" to start tracking your bets
          </Text>
        </View>
      ) : (
        bets.map(renderBetCard)
      )}
    </View>
  );
}
