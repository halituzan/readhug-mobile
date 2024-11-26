//app/(auth)/_layout.tsx
import { Stack, Tabs } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',


        }}>
            <Stack.Screen name="login" options={{ title: 'Login', }} />
            <Tabs.Screen name="register" options={{ title: 'Register', }} />
        </Stack>
    );
}
