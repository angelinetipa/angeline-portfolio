import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View style={[styles.iconWrap]}>
      {focused && (
        <LinearGradient colors={theme.gradients.primary} style={StyleSheet.absoluteFillObject} borderRadius={14} />
      )}
      <Ionicons name={name} size={22} color={focused ? theme.colors.white : theme.colors.textMuted} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar, tabBarShowLabel: false }}>
      <Tabs.Screen name="index"
        options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} /> }} />
      <Tabs.Screen name="about"
        options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} /> }} />
      <Tabs.Screen name="projects"
        options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'code-slash' : 'code-slash-outline'} focused={focused} /> }} />
      <Tabs.Screen name="creative"
        options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'color-palette' : 'color-palette-outline'} focused={focused} /> }} />
      <Tabs.Screen name="connect"
        options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'paper-plane' : 'paper-plane-outline'} focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 0,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 20,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  iconWrap: {
    width: 44, height: 36, alignItems: 'center', justifyContent: 'center',
    borderRadius: 14, overflow: 'hidden',
  },
});
