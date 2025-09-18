
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { Bet, BetStats } from '../types/bets';
import { loadBets, deleteBet, calculateBetStats } from '../utils/betStorage';
import Icon from '../components/Icon';
import StatsCard from '../components/StatsCard';

const MyBetsScreen = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [stats, setStats] = useState<BetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBetsData = useCallback(async () => {
    try {
      console.log('Loading bets data...');
      const loadedBets = await loadBets();
      setBets(loadedBets);
      setStats(calculateBetStats(loadedBets));
    } catch (error) {
      console.error('Error loading bets:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBetsData();
  }, [loadBetsData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBetsData();
  }, [loadBetsData]);

  const handleDeleteBet = useCallback(async (betId: string) => {
    Alert.alert(
      'Delete Bet',
      'Are you sure you want to delete this bet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBet(betId);
              await loadBetsData();
            } catch (error) {
              console.error('Error deleting bet:', error);
            }
          },
        },
      ]
    );
  }, [loadBetsData]);

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

  const renderBetCard = (bet: Bet) => (
    <View key={bet.id} style={[commonStyles.card, { marginHorizontal: 16 }]}>
      <View style={commonStyles.spaceBetween}>
        <View style={{ flex: 1 }}>
          <Text style={commonStyles.subtitle}>{bet.teamPlayer}</Text>
          <Text style={commonStyles.textMuted}>
            {bet.league} • {bet.betType}
          </Text>
          <Text style={commonStyles.textSmall}>
            Wager: ${bet.wagerAmount.toFixed(2)}
          </Text>
          {bet.notes && (
            <Text style={[commonStyles.textSmall, { marginTop: 4 }]}>
              {bet.notes}
            </Text>
          )}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              backgroundColor: getStatusColor(bet.status),
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              {bet.status}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteBet(bet.id)}
            style={{ padding: 4 }}
          >
            <Icon name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={commonStyles.loadingText}>Loading your bets...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView
        style={commonStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={[commonStyles.content, { paddingTop: 16 }]}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.title}>My Bets</Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accent,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              }}
              onPress={() => router.push('/addbets')}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Add Bet</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        {stats && (
          <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <StatsCard
                title="Total Bets"
                value={stats.totalBets.toString()}
                subtitle="All time"
                color={colors.text}
              />
              <StatsCard
                title="Win Rate"
                value={`${stats.winPercentage}%`}
                subtitle={`${stats.wins}W ${stats.losses}L`}
                color={colors.success}
              />
              <StatsCard
                title="ROI"
                value={`${stats.roi > 0 ? '+' : ''}${stats.roi}%`}
                subtitle={`$${stats.totalWon - stats.totalWagered}`}
                color={stats.roi > 0 ? colors.success : colors.error}
              />
              <StatsCard
                title="Pending"
                value={stats.pending.toString()}
                subtitle="Active bets"
                color={colors.upcoming}
              />
            </ScrollView>
          </View>
        )}

        {/* Bets List */}
        <View style={{ paddingBottom: 100 }}>
          {bets.length === 0 ? (
            <View style={[commonStyles.center, { paddingVertical: 60 }]}>
              <Icon name="receipt-outline" size={64} color={colors.muted} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBetsScreen;
