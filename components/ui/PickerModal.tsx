import { useStyles } from "@/hooks/useStyles";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: any;
  setValue: any;
  items: any;
};

const CustomPicker = ({ value, setValue, items }: Props) => {
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const currentValue = items.find((i: any) => i.value == value)?.label ?? "";
  const appStyle = styles({});
  return (
    <>
      <TouchableOpacity
        style={appStyle.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={appStyle.selectedValue}>
          {currentValue || "Select an item"}
        </Text>
      </TouchableOpacity>
      <Modal transparent animationType='fade' visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={appStyle.pickerModalContainer}
        >
          <View style={appStyle.pickerModalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={
                    styles({ isLastChild: items.length - 1 !== index })
                      .pickerModalItem
                  }
                  onPress={() => {
                    setValue(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={appStyle.pickerModalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CustomPicker;
