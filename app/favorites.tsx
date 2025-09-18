
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import FavoritesFeed from '../components/FavoritesFeed';
import { Game, Team } from '../types/sports';
import { fetchFavoriteTeams, fetchFavoriteGames } from '../utils/api';

export default function FavoritesScreen() {
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const [teams, games] = await Promise.all([
        fetchFavoriteTeams(),
        fetchFavoriteGames()
      ]);
      setFavoriteTeams(teams);
      setFavoriteGames(games);
      console.log('Favorites loaded');
    } catch (error) {
      console.log('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleAddFavorite = () => {
    console.log('Browse teams/games to add favorites');
    // This would typically navigate to a team/game browser
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading your favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.container}>
        <View style={commonStyles.content}>
          <FavoritesFeed
            favoriteTeams={favoriteTeams}
            favoriteGames={favoriteGames}
            onAddFavorite={handleAddFavorite}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
