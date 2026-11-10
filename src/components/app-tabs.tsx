import { NativeTabs } from 'expo-router/native-tabs';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const colors = Colors.light;

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundSelected}
      iconColor={{ default: colors.textSecondary, selected: '#A98543' }}
      labelStyle={{
        default: { color: colors.textSecondary },
        selected: { color: colors.text, fontWeight: '700' },
      }}>
      <NativeTabs.Trigger name="index" accessibilityLabel="Sanctuary dashboard">
        <NativeTabs.Trigger.Label>Sanctuary</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore" accessibilityLabel="Project roadmap">
        <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
