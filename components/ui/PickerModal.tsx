import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Props = {
  value: any;
  setValue: any;
  items: any;
};

const CustomPicker = ({ value, setValue, items }: Props) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const currentValue = items.find((i: any) => i.value == value)?.label ?? "";
  return (
    <>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor: Colors[theme.mode][800],
          } as ViewStyle,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.selectedValue,
            {
              color: Colors[theme.mode][50],
            },
          ]}
        >
          {currentValue || "Select an item"}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        animationType='fade'
        visible={modalVisible}
        // onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={[
            styles.modalContainer,
            {
              backgroundColor: Colors[theme.mode][700] + "5c",
            },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              {
                color: Colors[theme.mode][50],
                backgroundColor: Colors[theme.mode][800],
              } as ViewStyle,
            ]}
          >
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      borderBottomWidth: items.length - 1 !== index ? 1 : 0,
                      borderBottomColor: Colors[theme.mode][500],
                    },
                  ]}
                  onPress={() => {
                    setValue(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      {
                        color: Colors[theme.mode][50],
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    borderRadius: 8,
  },
  selectedValue: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 16,
  },
  item: {
    padding: 12,
  },
  itemText: {
    color: "#fff",
  },
});

export default CustomPicker;
