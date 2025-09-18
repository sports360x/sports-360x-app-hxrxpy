
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import GameCard from '../components/GameCard';
import LeagueFilter from '../components/LeagueFilter';
import DateSelector from '../components/DateSelector';
import RefreshSelector from '../components/RefreshSelector';
import { Game, League } from '../types/sports';
import { fetchGames } from '../utils/api';

const REFRESH_INTERVAL_KEY = '@sports360x_refresh_interval';

export default function ScoresScreen() {
  const [selectedLeague, setSelectedLeague] = useState<League>('ALL');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(15); // seconds
  const [showRefreshSelector, setShowRefreshSelector] = useState(false);

  // Load saved refresh interval on mount
  useEffect(() => {
    const loadRefreshInterval = async () => {
      try {
        const saved = await AsyncStorage.getItem(REFRESH_INTERVAL_KEY);
        if (saved) {
          setAutoRefresh(parseInt(saved, 10));
        }
      } catch (error) {
        console.log('Error loading refresh interval:', error);
      }
    };
    loadRefreshInterval();
  }, []);

  // Save refresh interval when changed
  const handleRefreshIntervalChange = async (interval: number) => {
    try {
      setAutoRefresh(interval);
      await AsyncStorage.setItem(REFRESH_INTERVAL_KEY, interval.toString());
      setShowRefreshSelector(false);
      console.log('Refresh interval saved:', interval);
    } catch (error) {
      console.log('Error saving refresh interval:', error);
    }
  };

  const loadGames = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await fetchGames(selectedLeague, selectedDate);
      setGames(data);
      console.log('Games loaded:', data.length);
    } catch (error) {
      console.log('Error loading games:', error);
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  }, [selectedLeague, selectedDate]);

  const onRefresh = () => {
    setRefreshing(true);
    loadGames(false);
  };

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadGames(false);
    }, autoRefresh * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, loadGames]);

  const liveGames = games.filter(game => game.state === 'LIVE');
  const upcomingGames = games.filter(game => game.state === 'UPCOMING');
  const finishedGames = games.filter(game => game.state === 'FINAL');

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading your scores and analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Sports 360 X</Text>
          <Text style={commonStyles.textMuted}>Live scores and real-time updates</Text>
          
          <View style={[commonStyles.row, { marginTop: 16, marginBottom: 16 }]}>
            <LeagueFilter
              selectedLeague={selectedLeague}
              onLeagueChange={setSelectedLeague}
            />
            <View style={{ width: 12 }} />
            <TouchableOpacity
              style={[commonStyles.row, { backgroundColor: colors.card, padding: 8, borderRadius: 8 }]}
              onPress={() => setShowRefreshSelector(true)}
            >
              <Icon name="refresh-outline" size={16} color={colors.accent} />
              <Text style={[commonStyles.textSmall, { marginLeft: 4, color: colors.accent }]}>
                Tune Refresh ({autoRefresh}s)
              </Text>
            </TouchableOpacity>
          </View>

          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </View>

        <ScrollView
          style={commonStyles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
            />
          }
        >
          {liveGames.length > 0 && (
            <View style={commonStyles.section}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live, marginRight: 8 }} />
                <Text style={commonStyles.subtitle}>Live Games ({liveGames.length})</Text>
              </View>
              {liveGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </View>
          )}

          {upcomingGames.length > 0 && (
            <View style={commonStyles.section}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.upcoming, marginRight: 8 }} />
                <Text style={commonStyles.subtitle}>Upcoming Games ({upcomingGames.length})</Text>
              </View>
              {upcomingGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </View>
          )}

          {finishedGames.length > 0 && (
            <View style={commonStyles.section}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.finished, marginRight: 8 }} />
                <Text style={commonStyles.subtitle}>Finished Games ({finishedGames.length})</Text>
              </View>
              {finishedGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </View>
          )}

          {games.length === 0 && (
            <View style={[commonStyles.center, { marginTop: 40 }]}>
              <Icon name="calendar-outline" size={48} color={colors.muted} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No games scheduled for this date
              </Text>
              <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
                Try selecting a different date or league
              </Text>
            </View>
          )}
        </ScrollView>

        <RefreshSelector
          isVisible={showRefreshSelector}
          currentInterval={autoRefresh}
          onSelect={handleRefreshIntervalChange}
          onClose={() => setShowRefreshSelector(false)}
        />
      </View>
    </SafeAreaView>
  );
}
