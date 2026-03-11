import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { Platform, StyleSheet, View } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconActive]}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? theme.colors.primary : theme.colors.textMuted}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'code-slash' : 'code-slash-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'flash' : 'flash-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="art"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'color-palette' : 'color-palette-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="certifications"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'ribbon' : 'ribbon-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'checkbox' : 'checkbox-outline'} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'mail' : 'mail-outline'} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    borderRadius: 0,
  },
  iconWrap: {
    width: 40,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
  },
  iconActive: {
    backgroundColor: theme.colors.clay,
  },
});
