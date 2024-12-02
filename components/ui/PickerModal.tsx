import { useStyles } from "@/hooks/useStyles";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: any;
  setValue: any;
  items: any;
};

const CustomPicker = ({ value, setValue, items }: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  const [modalVisible, setModalVisible] = useState(false);
  const currentValue = items.find((i: any) => i.value == value)?.label ?? "";
  return (
    <>
      <TouchableOpacity
        style={style.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={style.selectedValue}>
          {currentValue || "Select an item"}
        </Text>
      </TouchableOpacity>
      <Modal transparent animationType='fade' visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={style.pickerModalContainer}
        >
          <View style={style.pickerModalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={
                    appStyle({ isLastChild: items.length - 1 !== index })
                      .pickerModalItem
                  }
                  onPress={() => {
                    setValue(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={style.pickerModalItemText}>{item.label}</Text>
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
