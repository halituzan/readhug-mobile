import Card from "@/components/ui/Card";
import PickerComponent from "@/components/ui/Picker";
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import { setTheme } from "@/store/features/themeSlice";
import { GlobeIcon, PaletteIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

const Preferences = () => {
  const { theme: appTheme } = useTheme();
  const { settingsStyles } = useStyles();
  const settings = settingsStyles({});
  const dispatch = useDispatch();
  const [themes, setThemes] = useState(appTheme.mode);
  const [language, setLanguage] = useState("tr");
  const changeTheme = async () => {
    dispatch(setTheme(themes as "light" | "dark"));
  };
  useEffect(() => {
    if (themes) {
      changeTheme();
    }
  }, [themes]);

  return (
    <Card cardTitle='Tercihler'>
      <View style={settings.preferenceRow}>
        <View style={settings.preferenceRowLabel}>
          <PaletteIcon color={Colors.colors.primary} />
          <Text style={settings.preferenceRowLabelText}>Tema:</Text>
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
      <View style={settings.preferenceRow}>
        <View style={settings.preferenceRowLabel}>
          <GlobeIcon color={Colors.colors.primary} />
          <Text style={settings.preferenceRowLabelText}>Dil:</Text>
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
    </Card>
  );
};

export default Preferences;
