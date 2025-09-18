
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import PostCard from '../components/PostCard';
import { CommunityPost } from '../types/community';
import { fetchCommunityPosts, createPost } from '../utils/api';

export default function CommunityScreen() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState<'hot' | 'recent' | 'following'>('hot');

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchCommunityPosts(activeTab);
      setPosts(data);
      console.log('Community posts loaded:', data.length);
    } catch (error) {
      console.log('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    
    try {
      const post = await createPost(newPost);
      setPosts([post, ...posts]);
      setNewPost('');
      console.log('Post created');
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading community...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Community</Text>
          <Text style={commonStyles.textMuted}>Connect with fellow sports fans</Text>
          
          {/* Tab Selector */}
          <View style={[commonStyles.row, { marginTop: 16 }]}>
            {[
              { key: 'hot', label: 'Hot', icon: 'flame-outline' },
              { key: 'recent', label: 'Recent', icon: 'time-outline' },
              { key: 'following', label: 'Following', icon: 'people-outline' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  {
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: activeTab === tab.key ? colors.accent : colors.card,
                    marginHorizontal: 4,
                  },
                  commonStyles.center
                ]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                <Icon 
                  name={tab.icon as any} 
                  size={16} 
                  color={activeTab === tab.key ? colors.background : colors.text} 
                />
                <Text style={[
                  commonStyles.textSmall,
                  { 
                    color: activeTab === tab.key ? colors.background : colors.text,
                    marginTop: 4
                  }
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Create Post */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={commonStyles.card}>
            <TextInput
              style={[
                commonStyles.text,
                {
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  padding: 12,
                  minHeight: 80,
                  textAlignVertical: 'top',
                }
              ]}
              placeholder="Share your thoughts on the latest games..."
              placeholderTextColor={colors.muted}
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
            <TouchableOpacity
              style={[
                {
                  backgroundColor: newPost.trim() ? colors.accent : colors.secondary,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  marginTop: 12,
                  alignSelf: 'flex-end',
                }
              ]}
              onPress={handleCreatePost}
              disabled={!newPost.trim()}
            >
              <Text style={[
                commonStyles.textSmall,
                { color: newPost.trim() ? colors.background : colors.muted }
              ]}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={commonStyles.content}>
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <View style={[commonStyles.center, { marginTop: 40 }]}>
              <Icon name="chatbubbles-outline" size={48} color={colors.muted} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No posts yet
              </Text>
              <Text style={[commonStyles.textMuted, { marginTop: 8, textAlign: 'center' }]}>
                Be the first to start a conversation!
              </Text>
            </View>
          )}

          {/* Community Guidelines */}
          <View style={[commonStyles.section, { marginTop: 32 }]}>
            <Text style={commonStyles.subtitle}>Community Guidelines</Text>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                • Keep discussions respectful and sports-focused
              </Text>
              <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                • No gambling or betting content
              </Text>
              <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                • Share insights and analysis constructively
              </Text>
              <Text style={commonStyles.textMuted}>
                • Report inappropriate content to moderators
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
