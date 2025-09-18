
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { Bet, BetStats } from '../types/bets';
import { loadBets, deleteBet, calculateBetStats } from '../utils/betStorage';
import BetsTracker from '../components/BetsTracker';

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

  const handleAddBet = () => {
    router.push('/addbets');
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading your bets...</Text>
        </View>
      </SafeAreaView>
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
        <View style={commonStyles.content}>
          <BetsTracker
            bets={bets}
            stats={stats || {
              totalBets: 0,
              wins: 0,
              losses: 0,
              pending: 0,
              winPercentage: 0,
              roi: 0,
              totalWagered: 0,
              totalWon: 0,
            }}
            onAddBet={handleAddBet}
            onDeleteBet={handleDeleteBet}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBetsScreen;
