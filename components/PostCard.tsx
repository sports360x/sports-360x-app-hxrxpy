
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { CommunityPost } from '../types/community';

interface PostCardProps {
  post: CommunityPost;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    console.log('Post liked:', post.id);
  };

  return (
    <View style={commonStyles.card}>
      {/* Post Header */}
      <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
        <View style={commonStyles.row}>
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.secondary,
            marginRight: 12,
            ...commonStyles.center
          }}>
            <Text style={[commonStyles.textSmall, { fontWeight: '700' }]}>
              {post.author.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {post.author.username}
            </Text>
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              {formatTimeAgo(post.createdAt)}
            </Text>
          </View>
        </View>
        
        {post.league && (
          <View style={{
            backgroundColor: colors.secondary,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
            <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
              {post.league}
            </Text>
          </View>
        )}
      </View>

      {/* Post Content */}
      <Text style={[commonStyles.text, { marginBottom: 16, lineHeight: 22 }]}>
        {post.content}
      </Text>

      {/* Post Actions */}
      <View style={commonStyles.row}>
        <TouchableOpacity
          style={[commonStyles.row, { marginRight: 24 }]}
          onPress={handleLike}
        >
          <Icon 
            name={isLiked ? "heart" : "heart-outline"} 
            size={18} 
            color={isLiked ? colors.error : colors.muted} 
          />
          <Text style={[
            commonStyles.textSmall,
            { 
              marginLeft: 6,
              color: isLiked ? colors.error : colors.muted,
              fontWeight: '600'
            }
          ]}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[commonStyles.row, { marginRight: 24 }]}
          onPress={() => console.log('Comment on post:', post.id)}
        >
          <Icon name="chatbubble-outline" size={18} color={colors.muted} />
          <Text style={[
            commonStyles.textSmall,
            { 
              marginLeft: 6,
              color: colors.muted,
              fontWeight: '600'
            }
          ]}>
            {post.comments}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={commonStyles.row}
          onPress={() => console.log('Share post:', post.id)}
        >
          <Icon name="share-outline" size={18} color={colors.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
