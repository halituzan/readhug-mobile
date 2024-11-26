// components/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps {
    onPress: () => void;
    title: string;
    loading?: boolean;
    variant?: 'default' | 'outline';
    className?: string;
}

export function Button({
    onPress,
    title,
    loading = false,
    variant = 'default',
    className = ''
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            className={cn(
                "h-12 rounded-lg items-center justify-center",
                variant === 'default' ? 'bg-blue-600' : 'border border-blue-600',
                loading && "opacity-50",
                className
            )}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'default' ? "white" : "#2563EB"} />
            ) : (
                <Text
                    className={cn(
                        "font-medium text-lg",
                        variant === 'default' ? "text-white" : "text-blue-600"
                    )}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
