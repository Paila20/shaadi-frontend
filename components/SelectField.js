


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SelectField = ({ label, options, value = [], onChange, multiSelect = true }) => {
  const [visible, setVisible] = useState(false);

  const toggleSelect = (item) => {
    if (multiSelect) {
      if (value.includes(item)) {
        onChange(value.filter((v) => v !== item));
      } else {
        onChange([...value, item]);
      }
    } else {
      onChange([item]);
      setVisible(false); // close modal on single-select
    }
  };

  const removeOne = (item) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.8} style={{ width: "100%" }}>
      <View style={styles.fieldContainer}>
        {/* Label */}
        <Text style={styles.label}>{label}</Text>

        {/* Chips or Placeholder */}
        <View style={styles.rowBetween}>
        {value.length > 0 ? (
          <View style={styles.chipContainer}>
            {value.map((item, idx) => (
              <View key={idx} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
                <TouchableOpacity onPress={() => removeOne(item)}>
                  <Ionicons name="close-circle" size={16} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.placeholder}>Select</Text>
        )}

       
          <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
     
      </View>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {label}</Text>

            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => toggleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {value.includes(item) && (
                    <Ionicons name="checkmark" size={20} color="green" />
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
    // backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    position: "relative",
    // width: '100%'
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 2,
    borderBottomColor: '#cfccccff'
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
    width: '100%',
    alignSelf: 'stretch'
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 2,
  },
  chipText: { fontSize: 14, marginRight: 4 },
  placeholder: { fontSize: 14, color: "#888", marginBottom: 4 ,borderRadius: 5, backgroundColor: '#f9f9f9'},
  arrowContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "60%",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  option: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: { fontSize: 16 },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#fe5261",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "600" },
});
