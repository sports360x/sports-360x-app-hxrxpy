
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import GameCard from '../components/GameCard';
import LeagueFilter from '../components/LeagueFilter';
import DateSelector from '../components/DateSelector';
import { Game, League } from '../types/sports';
import { fetchGames } from '../utils/api';

export default function ScoresScreen() {
  const [selectedLeague, setSelectedLeague] = useState<League>('ALL');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(15); // seconds

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
          
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <LeagueFilter
              selectedLeague={selectedLeague}
              onLeagueChange={setSelectedLeague}
            />
            <View style={{ width: 12 }} />
            <TouchableOpacity
              style={[commonStyles.row, { backgroundColor: colors.card, padding: 8, borderRadius: 8 }]}
              onPress={() => console.log('Auto-refresh settings')}
            >
              <Icon name="refresh-outline" size={16} color={colors.accent} />
              <Text style={[commonStyles.textSmall, { marginLeft: 4, color: colors.accent }]}>
                {autoRefresh}s
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
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
