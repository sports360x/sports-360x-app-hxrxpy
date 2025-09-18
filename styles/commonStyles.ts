
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#0b0f14',
  card: '#121821',
  text: '#e6edf3',
  accent: '#16a34a',
  secondary: '#1f2937',
  border: '#374151',
  muted: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  live: '#dc2626',
  upcoming: '#3b82f6',
  finished: '#6b7280',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
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
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textMuted: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  textSmall: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
  },
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
    marginVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
});
