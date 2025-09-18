
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import GameCard from '../components/GameCard';
import TeamCard from '../components/TeamCard';
import { Game, Team } from '../types/sports';
import { fetchFavoriteTeams, fetchFavoriteGames } from '../utils/api';

export default function FavoritesScreen() {
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'teams' | 'games'>('teams');

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
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Favorites</Text>
          <Text style={commonStyles.textMuted}>Your personalized sports feed</Text>
          
          {/* Tab Selector */}
          <View style={[commonStyles.row, { marginTop: 16 }]}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: activeTab === 'teams' ? colors.accent : colors.card,
                  marginRight: 8,
                },
                commonStyles.center
              ]}
              onPress={() => setActiveTab('teams')}
            >
              <Text style={[
                commonStyles.text,
                { color: activeTab === 'teams' ? colors.background : colors.text }
              ]}>
                Teams
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: activeTab === 'games' ? colors.accent : colors.card,
                  marginLeft: 8,
                },
                commonStyles.center
              ]}
              onPress={() => setActiveTab('games')}
            >
              <Text style={[
                commonStyles.text,
                { color: activeTab === 'games' ? colors.background : colors.text }
              ]}>
                Games
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={commonStyles.content}>
          {activeTab === 'teams' && (
            <View style={commonStyles.section}>
              {favoriteTeams.length > 0 ? (
                favoriteTeams.map(team => (
                  <TeamCard key={team.id} team={team} />
                ))
              ) : (
                <View style={[commonStyles.center, { marginTop: 40 }]}>
                  <Icon name="heart-outline" size={48} color={colors.muted} />
                  <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                    No favorite teams yet
                  </Text>
                  <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
                    Follow teams to see their games and stats here
                  </Text>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: colors.accent,
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 8,
                        marginTop: 16,
                      }
                    ]}
                    onPress={() => console.log('Browse teams')}
                  >
                    <Text style={[commonStyles.text, { color: colors.background }]}>
                      Browse Teams
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {activeTab === 'games' && (
            <View style={commonStyles.section}>
              {favoriteGames.length > 0 ? (
                favoriteGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <View style={[commonStyles.center, { marginTop: 40 }]}>
                  <Icon name="calendar-outline" size={48} color={colors.muted} />
                  <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                    No favorite games
                  </Text>
                  <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
                    Games from your favorite teams will appear here
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Quick Stats for Favorite Teams */}
          {activeTab === 'teams' && favoriteTeams.length > 0 && (
            <View style={commonStyles.section}>
              <Text style={commonStyles.subtitle}>Quick Stats</Text>
              <View style={commonStyles.card}>
                <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                  <Text style={commonStyles.text}>Teams Followed</Text>
                  <Text style={[commonStyles.text, { color: colors.accent }]}>
                    {favoriteTeams.length}
                  </Text>
                </View>
                <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                  <Text style={commonStyles.text}>Upcoming Games</Text>
                  <Text style={[commonStyles.text, { color: colors.accent }]}>
                    {favoriteGames.filter(g => g.state === 'UPCOMING').length}
                  </Text>
                </View>
                <View style={commonStyles.spaceBetween}>
                  <Text style={commonStyles.text}>Live Games</Text>
                  <Text style={[commonStyles.text, { color: colors.live }]}>
                    {favoriteGames.filter(g => g.state === 'LIVE').length}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
