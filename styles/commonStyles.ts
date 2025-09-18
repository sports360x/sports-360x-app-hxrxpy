
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Sports 360 X Unique Color System
export const colors = {
  // Dark-first theme
  background: '#0a0e13',
  card: '#141b24',
  surface: '#1a2332',
  text: '#e8f0f7',
  accent: '#00d4aa', // Unique teal-green
  secondary: '#1e293b',
  border: '#334155',
  muted: '#64748b',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  live: '#dc2626',
  upcoming: '#3b82f6',
  finished: '#6b7280',
  
  // Sports 360 X specific colors
  confidence: '#8b5cf6', // Purple for AI confidence
  streak: '#f97316', // Orange for streaks
  premium: '#fbbf24', // Gold for premium features
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 212, 170, 0.25)',
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Increased padding for more air
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16, // More rounded corners
    padding: 20, // More padding for air
    marginVertical: 10,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Typography with unique spacing
  title: {
    fontSize: 28, // Larger title
    fontWeight: '800', // Bolder weight
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26, // More line height for readability
    letterSpacing: 0.1,
  },
  textMuted: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  textSmall: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  
  // Layout with more air
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginVertical: 24, // More vertical spacing
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Sports 360 X specific styles
  confidenceCard: {
    backgroundColor: `${colors.confidence}15`,
    borderLeftWidth: 4,
    borderLeftColor: colors.confidence,
  },
  streakCard: {
    backgroundColor: `${colors.streak}15`,
    borderLeftWidth: 4,
    borderLeftColor: colors.streak,
  },
  premiumCard: {
    backgroundColor: `${colors.premium}15`,
    borderLeftWidth: 4,
    borderLeftColor: colors.premium,
  },
  
  // Chip styles for tags and filters
  chip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.accent,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: colors.background,
  },
});

// Export additional utility styles
export const shadows = {
  small: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  medium: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
  large: {
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.16)',
    elevation: 8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
