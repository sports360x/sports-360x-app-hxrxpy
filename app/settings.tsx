
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import NotificationSettings from '../components/NotificationSettings';
import { resetOnboarding } from '../utils/onboardingStorage';

const isDevelopment = __DEV__ || Constants.expoConfig?.extra?.environment === 'development';

export default function SettingsScreen() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAbout = () => {
    router.push('/about');
  };

  const handleReplayOnboarding = async () => {
    Alert.alert(
      'Replay Onboarding',
      'This will show the tutorial screens again when you restart the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          onPress: async () => {
            try {
              await resetOnboarding();
              Alert.alert(
                'Onboarding Reset',
                'The tutorial will show again when you restart the app.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.log('Error resetting onboarding:', error);
            }
          }
        }
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sports360x.com/privacy');
  };

  const handleSupport = () => {
    Linking.openURL('mailto:support@sports360x.com?subject=Sports 360 X Support');
  };

  const settingsOptions = [
    {
      title: 'Replay Tutorial',
      subtitle: 'Show onboarding screens again',
      icon: 'play-circle-outline',
      onPress: handleReplayOnboarding,
    },
    {
      title: 'Push Notifications',
      subtitle: 'Manage alert preferences',
      icon: 'notifications-outline',
      onPress: () => setShowNotifications(!showNotifications),
      hasToggle: true,
      isExpanded: showNotifications,
    },
    {
      title: 'About this build',
      subtitle: 'App version and features',
      icon: 'information-circle-outline',
      onPress: handleAbout,
    },
    {
      title: 'Privacy Policy',
      subtitle: 'How we handle your data',
      icon: 'shield-checkmark-outline',
      onPress: handlePrivacyPolicy,
    },
    {
      title: 'Support',
      subtitle: 'Get help and contact us',
      icon: 'help-circle-outline',
      onPress: handleSupport,
    },
    // Only show debug panel in development
    ...(isDevelopment ? [{
      title: 'Debug Panel',
      subtitle: 'Developer tools and diagnostics',
      icon: 'bug-outline',
      onPress: () => router.push('/debug'),
    }] : []),
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Settings</Text>
          <Text style={commonStyles.textMuted}>App preferences and information</Text>
        </View>

        <ScrollView style={commonStyles.content}>
          <View style={commonStyles.section}>
            {settingsOptions.map((option, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    commonStyles.card,
                    { 
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 16,
                    }
                  ]}
                  onPress={option.onPress}
                >
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: colors.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Icon name={option.icon as any} size={20} color={colors.accent} />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {option.title}
                    </Text>
                    <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
                      {option.subtitle}
                    </Text>
                  </View>
                  
                  <Icon 
                    name={option.hasToggle && option.isExpanded ? "chevron-up-outline" : "chevron-forward-outline"} 
                    size={20} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>

                {/* Expandable Notification Settings */}
                {option.hasToggle && option.isExpanded && (
                  <View style={{ marginTop: -8, marginBottom: 16 }}>
                    <NotificationSettings />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* App Info */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>App Information</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Version</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>1.0.0</Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Build</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Environment</Text>
                <Text style={[
                  commonStyles.text, 
                  { color: isDevelopment ? colors.warning : colors.success }
                ]}>
                  {isDevelopment ? 'Development' : 'Production'}
                </Text>
              </View>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.text}>Bundle ID</Text>
                <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                  com.sports360x.app
                </Text>
              </View>
            </View>
          </View>

          {/* Feature List */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Features</Text>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
                Sports 360 X includes:
              </Text>
              {[
                'AI-Powered Insights with confidence ratings',
                'Personal bet tracking and analytics',
                'Multi-sport coverage (NBA, NFL, MLB, Soccer, Tennis)',
                'Real-time scores with custom refresh intervals',
                'Advanced stats and injury updates',
                'Push notifications for alerts',
                'Favorites feed for followed teams',
                'Pull-to-refresh for manual updates',
                'Smooth animations and visual polish'
              ].map((feature, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 6 }]}>
                  <Icon name="checkmark-circle-outline" size={16} color={colors.success} />
                  <Text style={[commonStyles.textSmall, { marginLeft: 8, flex: 1 }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Data Usage */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Data Usage & Privacy</Text>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Analytics Only - No Gambling
              </Text>
              <Text style={[commonStyles.textMuted, { marginBottom: 12 }]}>
                Sports 360 X is designed for sports analytics and personal bet tracking only. 
                We do not facilitate gambling or wagering of any kind.
              </Text>
              <Text style={[commonStyles.textMuted, { marginBottom: 12 }]}>
                • Anonymous usage analytics to improve app performance{'\n'}
                • Sports statistics from publicly available sources{'\n'}
                • Personal bet data stored locally on your device{'\n'}
                • No sharing of personal information with third parties
              </Text>
              <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                Age Rating: 4+ (Safe for all ages)
              </Text>
            </View>
          </View>

          {/* Company Footer */}
          <View style={[commonStyles.section, { alignItems: 'center', paddingBottom: 40 }]}>
            <Text style={[commonStyles.textSmall, { color: colors.muted, textAlign: 'center' }]}>
              Sports 360 X{'\n'}
              © 2024 Sports Analytics Inc.{'\n'}
              support@sports360x.com
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
