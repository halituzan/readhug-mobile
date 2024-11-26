//app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
        
            headerShown: false,
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
            },
        }}>
            <Tabs.Screen name="index" options={{ title: 'Timeline' }} />
            <Tabs.Screen name="about" options={{ title: 'About' }} />
        </Tabs>
    );
}
