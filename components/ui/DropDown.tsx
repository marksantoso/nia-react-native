import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TData = {
  label: string;
  value: any;
};

interface DropDownProps {
  data: TData[];
  value?: any;
  onSelect: (item: { label: string; value: any }) => void;
  placeholder?: string;
  containerStyle?: object;
  labelStyle?: object;
}

export const DropDown: React.FC<DropDownProps> = ({
  data,
  value,
  onSelect,
  placeholder = "Select an option",
  containerStyle,
  labelStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const selectedItem = data.find((item) => item.value === value);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { label: string; value: any };
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.item,
        index === data.length - 1 && { borderBottomWidth: 0 },
      ]}
      onPress={() => {
        onSelect(item);
        setVisible(false);
      }}
    >
      <Text style={[styles.itemText, labelStyle]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, labelStyle]}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Ionicons
          name={visible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "90%",
    maxHeight: height * 0.5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
