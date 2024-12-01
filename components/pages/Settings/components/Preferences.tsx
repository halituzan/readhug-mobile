import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import PickerComponent from "@/components/ui/Picker";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { GlobeIcon, PaletteIcon } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/features/themeSlice";

type Props = {};

const Preferences = (props: Props) => {
  const { theme: appTheme } = useTheme();
  const dispatch = useDispatch();
  const [themes, setThemes] = useState("light");
  const [language, setLanguage] = useState("tr");

  const changeTheme = async () => {
    console.log("first");
    dispatch(setTheme(themes as "light" | "dark"));
  };
  useEffect(() => {
    if (themes) {
      changeTheme();
    }
  }, [themes]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[appTheme.mode][700],
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            color: Colors[appTheme.mode][50],
          },
        ]}
      >
        Tercihler
      </Text>

      <View style={[styles.preferenceRow]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            minWidth: 50,
          }}
        >
          <PaletteIcon
            style={[
              styles.buttonIcon,
              {
                color: Colors.colors.primary,
              } as ViewStyle,
            ]}
          />
          <Text
            style={{
              color: Colors[appTheme.mode][50],
              marginRight: 10,
              minWidth: 50,
            }}
          >
            Tema:
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <PickerComponent
            value={themes}
            setValue={setThemes}
            items={[
              { label: "Açık Tema", value: "light" },
              { label: "Koyu Tema", value: "dark" },
            ]}
          />
        </View>
      </View>
      <View style={[styles.preferenceRow]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <GlobeIcon
            style={[
              styles.buttonIcon,
              {
                color: Colors.colors.primary,
              } as ViewStyle,
            ]}
          />
          <Text
            style={{
              color: Colors[appTheme.mode][50],
              marginRight: 10,
              minWidth: 50,
            }}
          >
            Dil:
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <PickerComponent
            value={language}
            setValue={setLanguage}
            items={[
              { label: "Türkçe", value: "tr" },
              { label: "İngilizce", value: "en" },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: 15,
  },
});
