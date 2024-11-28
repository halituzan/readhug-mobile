import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Tabs, useRouter } from 'expo-router';

export default function TabLayout() {
    const { theme } = useTheme();
    const router = useRouter();

    const CustomTabBar = ({ state, descriptors }: any) => {
        return (
            <View style={[styles.tabBarContainer, { backgroundColor: Colors[theme.mode].background }]}>
                {state.routes.map((route: any, index: number, arr: any[]) => {
                    console.log("route", route);
                    console.log("arr", arr);


                    const { options } = descriptors[route.key];
                    const label = options.title || route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = descriptors[route.key].navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            router.push(route.name);
                        }
                    };

                    if (index - 1 < index / 2 && index < index + 1) {

                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[
                                styles.tabItem,
                                isFocused && {
                                    backgroundColor: Colors[theme.mode].tabIconSelected,
                                },
                            ]}
                        >
                            <Text style={[styles.tabText, isFocused && { color: Colors.colors.primary }]}>{label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Timeline' }} />
            <Tabs.Screen name="about" options={{ title: 'About' }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 15,
        position: 'absolute',
        bottom: 50,
        zIndex: 10,
        elevation: 5,
        flex: 1
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 15,
    },
    tabText: {
        fontSize: 14,
        color: Colors.colors.primary,
    },
});
