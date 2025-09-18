
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

const onboardingData = [
  {
    id: 1,
    title: 'AI-Powered Insights',
    subtitle: 'Get smart predictions with confidence ratings',
    description: 'Our advanced AI analyzes thousands of data points to give you the best opportunities with detailed reasoning and confidence scores.',
    icon: 'bulb-outline',
    color: colors.confidence,
  },
  {
    id: 2,
    title: 'Track Your Bets',
    subtitle: 'Personal bet tracking and analytics',
    description: 'Add your bets manually and track performance with detailed analytics including win rate, ROI, and streak tracking.',
    icon: 'receipt-outline',
    color: colors.accent,
  },
  {
    id: 3,
    title: 'Follow Your Favorites',
    subtitle: 'Personalized feed for your teams',
    description: 'Follow your favorite teams and players to get personalized insights, game alerts, and performance updates.',
    icon: 'heart-outline',
    color: colors.streak,
  },
  {
    id: 4,
    title: 'Multi-Sport Coverage',
    subtitle: 'NFL, NBA, MLB, Soccer, and Tennis',
    description: 'Comprehensive coverage across all major sports with advanced stats, injury updates, and real-time performance trends.',
    icon: 'trophy-outline',
    color: colors.success,
  },
];

export default function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
    }
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('@sports360x_onboarding_completed', 'true');
      onComplete();
    } catch (error) {
      console.log('Error saving onboarding completion:', error);
      onComplete();
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('@sports360x_onboarding_completed', 'true');
      onSkip();
    } catch (error) {
      console.log('Error saving onboarding skip:', error);
      onSkip();
    }
  };

  const currentData = onboardingData[currentIndex];

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}>
          <Text style={[commonStyles.text, { color: colors.accent, fontWeight: '600' }]}>
            Sports 360 X
          </Text>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[commonStyles.text, { color: colors.muted }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{ flex: 1 }}
          >
            {onboardingData.map((item, index) => (
              <View key={item.id} style={{ width, flex: 1, paddingHorizontal: 40 }}>
                <View style={[commonStyles.center, { flex: 1 }]}>
                  {/* Icon */}
                  <View style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: `${item.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 40,
                  }}>
                    <Icon name={item.icon as any} size={60} color={item.color} />
                  </View>

                  {/* Title */}
                  <Text style={[
                    commonStyles.title,
                    { 
                      textAlign: 'center',
                      marginBottom: 16,
                      fontSize: 32,
                    }
                  ]}>
                    {item.title}
                  </Text>

                  {/* Subtitle */}
                  <Text style={[
                    commonStyles.subtitle,
                    { 
                      textAlign: 'center',
                      color: colors.accent,
                      marginBottom: 24,
                      fontSize: 18,
                    }
                  ]}>
                    {item.subtitle}
                  </Text>

                  {/* Description */}
                  <Text style={[
                    commonStyles.text,
                    { 
                      textAlign: 'center',
                      lineHeight: 28,
                      color: colors.muted,
                    }
                  ]}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Bottom Section */}
        <View style={{ paddingHorizontal: 40, paddingBottom: 40 }}>
          {/* Progress Indicators */}
          <View style={[commonStyles.row, { justifyContent: 'center', marginBottom: 40 }]}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === currentIndex ? colors.accent : colors.muted,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={[
                {
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 25,
                  backgroundColor: currentIndex === 0 ? 'transparent' : colors.card,
                  minWidth: 80,
                },
                commonStyles.center
              ]}
              disabled={currentIndex === 0}
            >
              <Text style={[
                commonStyles.text,
                { 
                  color: currentIndex === 0 ? 'transparent' : colors.text,
                  fontWeight: '600'
                }
              ]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              style={[
                {
                  paddingHorizontal: 32,
                  paddingVertical: 16,
                  borderRadius: 25,
                  backgroundColor: colors.accent,
                  minWidth: 120,
                },
                commonStyles.center
              ]}
            >
              <Text style={[
                commonStyles.text,
                { 
                  color: colors.background,
                  fontWeight: '700'
                }
              ]}>
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
