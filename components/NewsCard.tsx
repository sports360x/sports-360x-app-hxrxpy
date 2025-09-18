
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { NewsArticle } from '../types/sports';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedAt = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <TouchableOpacity 
      style={commonStyles.card}
      onPress={() => console.log('Article selected:', article.id)}
    >
      {article.isBreaking && (
        <View style={[
          commonStyles.row,
          {
            backgroundColor: colors.error,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            alignSelf: 'flex-start',
            marginBottom: 12
          }
        ]}>
          <Icon name="flash-outline" size={12} color={colors.background} />
          <Text style={[
            commonStyles.textSmall,
            { 
              color: colors.background,
              fontWeight: '700',
              marginLeft: 4,
              textTransform: 'uppercase'
            }
          ]}>
            Breaking
          </Text>
        </View>
      )}

      <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
        {article.title}
      </Text>
      
      <Text style={[commonStyles.textMuted, { marginBottom: 12, lineHeight: 20 }]}>
        {article.summary}
      </Text>
      
      <View style={commonStyles.divider} />
      
      <View style={[commonStyles.spaceBetween, { marginTop: 12 }]}>
        <View style={commonStyles.row}>
          <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
            {article.author}
          </Text>
          <View style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: colors.muted,
            marginHorizontal: 8,
            alignSelf: 'center'
          }} />
          <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
            {formatTimeAgo(article.publishedAt)}
          </Text>
        </View>
        
        <View style={[commonStyles.row, { alignItems: 'center' }]}>
          <Text style={[
            commonStyles.textSmall,
            { 
              color: colors.accent,
              fontWeight: '600',
              marginRight: 8
            }
          ]}>
            {article.league}
          </Text>
          
          {article.videoUrl && (
            <Icon name="play-circle-outline" size={16} color={colors.accent} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
