import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={theme.colors.bg} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
