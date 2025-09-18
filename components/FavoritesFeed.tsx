
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import GameCard from './GameCard';
import TeamCard from './TeamCard';
import { Game, Team } from '../types/sports';

interface FavoritesFeedProps {
  favoriteTeams: Team[];
  favoriteGames: Game[];
  onAddFavorite: () => void;
}

export default function FavoritesFeed({ 
  favoriteTeams, 
  favoriteGames, 
  onAddFavorite 
}: FavoritesFeedProps) {
  const [activeTab, setActiveTab] = React.useState<'teams' | 'games'>('teams');

  const renderTabSelector = () => (
    <View style={[commonStyles.row, { marginBottom: 20 }]}>
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
          Teams ({favoriteTeams.length})
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
          Games ({favoriteGames.length})
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = (type: 'teams' | 'games') => (
    <View style={[commonStyles.center, { paddingVertical: 40 }]}>
      <Icon 
        name={type === 'teams' ? 'heart-outline' : 'calendar-outline'} 
        size={48} 
        color={colors.muted} 
      />
      <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
        No favorite {type} yet
      </Text>
      <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
        {type === 'teams' 
          ? 'Follow teams to see their games and stats here'
          : 'Games from your favorite teams will appear here'
        }
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
        onPress={onAddFavorite}
      >
        <Text style={[commonStyles.text, { color: colors.background }]}>
          Browse {type === 'teams' ? 'Teams' : 'Games'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderQuickStats = () => (
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
  );

  return (
    <View>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { marginBottom: 20 }]}>
        <View>
          <Text style={commonStyles.title}>Favorites</Text>
          <Text style={commonStyles.textMuted}>Your personalized sports feed</Text>
        </View>
      </View>

      {/* Tab Selector */}
      {renderTabSelector()}

      {/* Content */}
      {activeTab === 'teams' && (
        <View>
          {favoriteTeams.length > 0 ? (
            favoriteTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))
          ) : (
            renderEmptyState('teams')
          )}
        </View>
      )}

      {activeTab === 'games' && (
        <View>
          {favoriteGames.length > 0 ? (
            favoriteGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            renderEmptyState('games')
          )}
        </View>
      )}

      {/* Quick Stats for Teams */}
      {activeTab === 'teams' && favoriteTeams.length > 0 && renderQuickStats()}
    </View>
  );
}
