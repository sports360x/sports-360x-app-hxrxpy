
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import Icon from './Icon';
import { commonStyles, colors } from '../styles/commonStyles';
import { Bet, BetStats } from '../types/bets';

interface BetsTrackerProps {
  bets: Bet[];
  stats: BetStats;
  onAddBet: () => void;
  onDeleteBet: (betId: string) => void;
}

const AnimatedBetCard = ({ bet, onDelete, index }: { bet: Bet; onDelete: (id: string) => void; index: number }) => {
  const flashAnimation = useSharedValue(0);
  const previousStatus = useRef(bet.status);

  useEffect(() => {
    // Trigger flash animation when bet status changes to won or lost
    if (previousStatus.current !== bet.status && (bet.status === 'won' || bet.status === 'lost')) {
      flashAnimation.value = withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 300 }),
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 300 })
      );
    }
    previousStatus.current = bet.status;
  }, [bet.status, flashAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      flashAnimation.value,
      [0, 1],
      [colors.card, bet.status === 'won' ? colors.success : colors.error]
    );

    return {
      backgroundColor,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return colors.success;
      case 'lost':
        return colors.error;
      case 'live':
        return colors.live;
      case 'pending':
      default:
        return colors.muted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return 'checkmark-circle-outline';
      case 'lost':
        return 'close-circle-outline';
      case 'live':
        return 'radio-outline';
      case 'pending':
      default:
        return 'time-outline';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Bet',
      `Are you sure you want to delete this bet: ${bet.team}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(bet.id) }
      ]
    );
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 100)}
      style={animatedStyle}
    >
      <View style={[
        commonStyles.card,
        {
          borderLeftWidth: 4,
          borderLeftColor: getStatusColor(bet.status),
          backgroundColor: 'transparent',
        }
      ]}>
        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <View style={commonStyles.row}>
            <Icon 
              name={getStatusIcon(bet.status) as any} 
              size={16} 
              color={getStatusColor(bet.status)} 
            />
            <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
              {bet.team}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="trash-outline" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <Text style={commonStyles.textMuted}>{bet.betType}</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
            ${bet.wager}
          </Text>
        </View>

        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <Text style={commonStyles.textMuted}>{bet.league}</Text>
          <Text style={[
            commonStyles.textSmall,
            { 
              color: getStatusColor(bet.status),
              fontWeight: '600',
              textTransform: 'uppercase'
            }
          ]}>
            {bet.status}
          </Text>
        </View>

        {bet.notes && (
          <Text style={[commonStyles.textSmall, { marginTop: 8, fontStyle: 'italic' }]}>
            {bet.notes}
          </Text>
        )}

        <Text style={[commonStyles.textSmall, { marginTop: 8, color: colors.muted }]}>
          Added: {new Date(bet.dateAdded).toLocaleDateString()}
        </Text>
      </View>
    </Animated.View>
  );
};

export default function BetsTracker({ bets, stats, onAddBet, onDeleteBet }: BetsTrackerProps) {
  const renderStatsCards = () => (
    <Animated.View 
      style={[commonStyles.row, { marginBottom: 24 }]}
      entering={FadeInUp.duration(600)}
    >
      <Animated.View 
        style={[commonStyles.card, { flex: 1, marginRight: 8 }]}
        entering={FadeInUp.duration(600).delay(100)}
      >
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          Win Rate
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.success }]}>
          {stats.winPercentage.toFixed(1)}%
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {stats.wins}W / {stats.losses}L
        </Text>
      </Animated.View>

      <Animated.View 
        style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}
        entering={FadeInUp.duration(600).delay(200)}
      >
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          ROI
        </Text>
        <Text style={[
          commonStyles.subtitle, 
          { color: stats.roi >= 0 ? colors.success : colors.error }
        ]}>
          {stats.roi >= 0 ? '+' : ''}{stats.roi.toFixed(1)}%
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          ${stats.totalWon - stats.totalWagered}
        </Text>
      </Animated.View>
    </Animated.View>
  );

  return (
    <View style={commonStyles.container}>
      <Animated.View 
        style={{ padding: 16 }}
        entering={FadeInUp.duration(600)}
      >
        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <Text style={commonStyles.title}>My Bets</Text>
          <TouchableOpacity
            style={[
              {
                backgroundColor: colors.accent,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              },
              commonStyles.row
            ]}
            onPress={onAddBet}
          >
            <Icon name="add-outline" size={16} color={colors.background} />
            <Text style={[
              commonStyles.textSmall,
              { marginLeft: 4, color: colors.background, fontWeight: '600' }
            ]}>
              Add Bet
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={commonStyles.textMuted}>Track your betting performance</Text>
      </Animated.View>

      <ScrollView style={commonStyles.content}>
        {stats.totalBets > 0 && renderStatsCards()}

        {/* Active Bets Section */}
        {bets.filter(bet => bet.status === 'pending' || bet.status === 'live').length > 0 && (
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(300)}
          >
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.upcoming,
                marginRight: 8,
              }} />
              <Text style={commonStyles.subtitle}>
                Active Bets ({bets.filter(bet => bet.status === 'pending' || bet.status === 'live').length})
              </Text>
            </View>
            {bets
              .filter(bet => bet.status === 'pending' || bet.status === 'live')
              .map((bet, index) => (
                <AnimatedBetCard
                  key={bet.id}
                  bet={bet}
                  onDelete={onDeleteBet}
                  index={index}
                />
              ))}
          </Animated.View>
        )}

        {/* Recent Results */}
        {bets.filter(bet => bet.status === 'won' || bet.status === 'lost').length > 0 && (
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(400)}
          >
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.finished,
                marginRight: 8,
              }} />
              <Text style={commonStyles.subtitle}>
                Recent Results ({bets.filter(bet => bet.status === 'won' || bet.status === 'lost').length})
              </Text>
            </View>
            {bets
              .filter(bet => bet.status === 'won' || bet.status === 'lost')
              .slice(0, 10) // Show last 10 results
              .map((bet, index) => (
                <AnimatedBetCard
                  key={bet.id}
                  bet={bet}
                  onDelete={onDeleteBet}
                  index={index}
                />
              ))}
          </Animated.View>
        )}

        {bets.length === 0 && (
          <Animated.View 
            style={[commonStyles.center, { marginTop: 60 }]}
            entering={FadeInDown.duration(600)}
          >
            <Icon name="receipt-outline" size={48} color={colors.muted} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No bets tracked yet
            </Text>
            <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
              Add your first bet to start tracking performance
            </Text>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: colors.accent,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 25,
                  marginTop: 20,
                },
                commonStyles.row
              ]}
              onPress={onAddBet}
            >
              <Icon name="add-outline" size={20} color={colors.background} />
              <Text style={[
                commonStyles.text,
                { marginLeft: 8, color: colors.background, fontWeight: '600' }
              ]}>
                Add Your First Bet
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
