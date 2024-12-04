import { useStyles } from "@/hooks/useStyles";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import RHButton from "./RHButton";
import { Save } from "lucide-react-native";
import { updateBookCount } from "@/services/book/updateBook";

const SliderComponent = ({ pageCount, readCount, bookId, mount }: any) => {
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  // Başlangıç değerleri
  const totalPages = pageCount; // Toplam sayfa sayısı
  const readPages = readCount; // Okunan sayfa sayısı

  const [currentValue, setCurrentValue] = useState(readPages);
  const [loading, setLoading] = useState(false);

  // Başlangıç ilerleme oranını hesapla
  const progress = useSharedValue(readPages / totalPages);

  const sliderWidth = 200;
  const thumbWidth = 24;
  const offset = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = progress.value; // Jest başlarken mevcut ilerlemeyi kaydet
    })
    .onUpdate((event) => {
      const newValue = Math.max(
        0,
        Math.min(1, offset.value + event.translationX / sliderWidth)
      );

      progress.value = newValue;

      // Anlık değeri hesapla ve state'i güncelle
      runOnJS(setCurrentValue)(Math.round(newValue * totalPages));
    })
    .onEnd(() => {
      // Animasyonu tamamla
      progress.value = withSpring(progress.value);
    });

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * (sliderWidth - thumbWidth) }],
  }));

  const updateBookRead = async () => {
    try {
      setLoading(true);
      await updateBookCount(
        currentValue,
        bookId,
        currentValue === pageCount ? "0" : "1"
      );
      await mount();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={style.sliderDetails}>
      <View style={style.sliderContainer}>
        <View style={style.sliderTrack}>
          <Animated.View
            style={[style.sliderProgress, animatedProgressStyle]}
          />
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[style.sliderThumb, animatedThumbStyle]}>
            <Text style={{ color: "white", fontSize: 9 }}>{currentValue}</Text>
          </Animated.View>
        </GestureDetector>
        {currentValue !== readPages && (
          <View style={{ width: 30, height: 30 }}>
            <RHButton
              text={<Save size={16} color={"white"} />}
              onPress={updateBookRead}
            />
          </View>
        )}
      </View>

      <Text style={style.sliderPageCount}>
        {currentValue} / {totalPages}
      </Text>
    </View>
  );
};

export default SliderComponent;
