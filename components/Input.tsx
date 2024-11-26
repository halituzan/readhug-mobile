
// components/Input.tsx
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <View className="space-y-2">
            <Text className="text-gray-700 font-medium">{label}</Text>
            <TextInput
                className={cn(
                    "w-full h-12 px-4 border rounded-lg bg-gray-50",
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
                placeholderTextColor="#9CA3AF"
                {...props}
            />
            {error && (
                <Text className="text-red-500 text-sm">{error}</Text>
            )}
        </View>
    );
}
