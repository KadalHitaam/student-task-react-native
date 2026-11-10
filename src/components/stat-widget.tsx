import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { DevFlowPalette } from '@/constants/theme';

type StatWidgetProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: 'gold' | 'xp' | 'quests';
};

const statIcons = {
  gold: { ios: 'dollarsign.circle', android: 'paid', web: 'paid' },
  xp: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  quests: { ios: 'checkmark.seal', android: 'task_alt', web: 'task_alt' },
} as const;

export function StatWidget({ label, value, detail, icon }: StatWidgetProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <SymbolView
          name={statIcons[icon]}
          tintColor={DevFlowPalette.bronze}
          size={17}
          fallback={<Text style={styles.fallbackIcon}>✦</Text>}
        />
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    padding: 12,
    gap: 7,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fallbackIcon: {
    color: DevFlowPalette.bronze,
    fontSize: 16,
  },
  label: {
    flexShrink: 1,
    color: DevFlowPalette.secondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  value: {
    color: DevFlowPalette.ink,
    fontSize: 21,
    fontWeight: '700',
  },
  detail: {
    color: DevFlowPalette.green,
    fontSize: 10,
    fontWeight: '600',
  },
});
