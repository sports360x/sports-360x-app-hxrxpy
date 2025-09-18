
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import NewsCard from '../components/NewsCard';
import { NewsArticle, League } from '../types/sports';
import { fetchNews } from '../utils/api';

export default function NewsScreen() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League>('ALL');

  const loadNews = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await fetchNews(selectedLeague);
      setNews(data);
      console.log('News loaded:', data.length);
    } catch (error) {
      console.log('Error loading news:', error);
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(false);
  };

  useEffect(() => {
    loadNews();
  }, [selectedLeague]);

  const breakingNews = news.filter(article => article.isBreaking);
  const regularNews = news.filter(article => !article.isBreaking);

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading latest news...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>News</Text>
          <Text style={commonStyles.textMuted}>Latest sports updates and analysis</Text>
          
          {/* League Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
          >
            {['ALL', 'MLB', 'NBA', 'NFL'].map((league) => (
              <TouchableOpacity
                key={league}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: selectedLeague === league ? colors.accent : colors.card,
                  }
                ]}
                onPress={() => setSelectedLeague(league as League)}
              >
                <Text style={[
                  commonStyles.textSmall,
                  { color: selectedLeague === league ? colors.background : colors.text }
                ]}>
                  {league}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
          {/* Breaking News */}
          {breakingNews.length > 0 && (
            <View style={commonStyles.section}>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  backgroundColor: colors.error, 
                  marginRight: 8 
                }} />
                <Text style={[commonStyles.subtitle, { color: colors.error }]}>
                  Breaking News
                </Text>
              </View>
              {breakingNews.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </View>
          )}

          {/* Regular News */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Latest Updates</Text>
            {regularNews.length > 0 ? (
              regularNews.map(article => (
                <NewsCard key={article.id} article={article} />
              ))
            ) : (
              <View style={[commonStyles.center, { marginTop: 40 }]}>
                <Icon name="newspaper-outline" size={48} color={colors.muted} />
                <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                  No news available
                </Text>
                <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
                  Check back later for the latest updates
                </Text>
              </View>
            )}
          </View>

          {/* Trending Topics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Trending Topics</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon name="trending-up-outline" size={20} color={colors.accent} />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>Hot Topics</Text>
              </View>
              
              <View style={[commonStyles.row, { flexWrap: 'wrap' }]}>
                {['Trade Rumors', 'Injury Updates', 'Playoff Race', 'MVP Watch', 'Draft News'].map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      marginRight: 8,
                      marginBottom: 8,
                    }}
                    onPress={() => console.log('Search topic:', topic)}
                  >
                    <Text style={[commonStyles.textSmall, { color: colors.text }]}>
                      #{topic.replace(' ', '')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
