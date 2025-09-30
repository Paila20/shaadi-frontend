
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // for dropdowns
import { CommonActions } from '@react-navigation/native';

export default function EditProfile({ route, navigation }) {
  const { userId } = route.params;

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const baseURL = "https://shaadi-backend-9ljp.onrender.com";

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const finalUserId = userId || storedUserId;

        if (!finalUserId) {
          console.warn("⚠️ No userId found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseURL}/api/users/${finalUserId}`);
        const data = await response.json();

        if (data._id) setForm(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true, // ✅ Make sure we request base64 data
    });

    if (!result.canceled && result.assets?.length > 0) {
      const selected = result.assets[0];
      const imageBase64 = selected.base64;
      const imageUri = `data:image/jpeg;base64,${imageBase64}`;

      console.log("📷 Selected Image URI:", imageUri.slice(0, 50) + "...");

      const formData = new FormData();
      formData.append("file", imageUri); // ✅ Send as plain string
      formData.append("upload_preset", "mobile-upload");

      setUploadingImage(true);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dipnihq54/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("📡 Cloudinary response:", data);

      setUploadingImage(false);

      if (data.secure_url) {
        setForm((prev) => ({ ...prev, image: data.secure_url }));
        Alert.alert("✅ Upload Success", "Profile picture updated.");
      } else {
        Alert.alert("❌ Upload failed", data.error?.message || "Please try again.");
      }
    }
  } catch (err) {
    console.error("Image pick/upload error:", err);
    Alert.alert("Error", "Could not pick or upload image.");
    setUploadingImage(false);
  }
};

  const handleSave = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    const finalUserId = userId || storedUserId;

    if (!finalUserId) {
      Alert.alert("Error", "User ID missing");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/users/${finalUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Profile updated!");
        await AsyncStorage.setItem("userId", data._id);
        if (data.image) await AsyncStorage.setItem("userImage", data.image);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Main', // Bottom Tab Navigator
                state: {
                  index: 0,
                  routes: [
                    { name: 'Home' },
                    { name: 'Matches' },
                    { name: 'Search' },
                    { name: 'Chat' },
                  ],
                },
              },
            ],
          })
        );
      } else {
        Alert.alert("Error", data.msg || "Update failed");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  if (!form)
    return <ActivityIndicator size="large" style={{ flex: 1 }} color="#00bcd5" />;

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00bcd5" />
        </View>
      )}

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {uploadingImage ? (
          <ActivityIndicator size="small" color="#00bcd5" />
        ) : form.image ? (
          <Image source={{ uri: form.image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Button title="Pick Image" onPress={pickImage} />
          </View>
        )}
      </TouchableOpacity>

      {/* Text Inputs */}
      {["name", "phone", "email", "profession", "location", "height", "age"].map((field) => (
        <TextInput
          key={field}
          placeholder={`Enter ${field}`}
          value={form[field] ? String(form[field]) : ""}
          onChangeText={(value) =>
            handleChange(field, field === "age" || field === "height" ? value.replace(/[^0-9]/g, "") : value)
          }
          style={styles.input}
          keyboardType={field === "phone" || field === "height" || field === "age" ? "numeric" : "default"}
        />
      ))}

      {/* Dropdowns */}
      {[
        { label: "Gender", field: "gender", options: ["Male", "Female"] },
        { label: "Marital Status", field: "maritalStatus", options: ["Never Married", "Divorced", "Widowed", "Separated"] },
        { label: "Religion", field: "religion", options: ["Hindu", "Muslim", "Christian", "Sikh", "Other"] },
        { label: "Community", field: "community", options: ["Brahmin", "Rajput", "Kayastha", "Yadav", "Other"] },
        { label: "Mother Tongue", field: "motherTongue", options: ["Telugu", "Hindi", "Tamil", "Bengali", "English", "Other"] },
        { label: "Manglik / Chevvai Dosham", field: "manglik", options: ["Yes", "No", "Doesn't Matter"] },
        { label: "Country Living In", field: "countryLiving", options: ["India", "USA", "UK", "Canada", "Australia", "Other"] },
        { label: "State Living In", field: "stateLiving", options: ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Delhi", "Maharashtra", "Other"] },
        { label: "Country Grew Up In", field: "countryGrewUp", options: ["India", "USA", "UK", "Canada", "Australia", "Other"] },
        { label: "Residency Status", field: "residencyStatus", options: ["Citizen", "Permanent Resident", "Work Permit", "Student Visa"] },
        { label: "Photo Settings", field: "photoSettings", options: ["Visible to All", "Visible to Matches Only", "Private"] },
      ].map(({ label, field, options }) => (
        <View key={field}>
          <Text style={styles.label}>{label}</Text>
          <View  style={styles.pickerWrapper}>
          <Picker
            selectedValue={form[field]}
            onValueChange={(value) => handleChange(field, value)}
            style={styles.picker}
          >
            <Picker.Item label={`Select ${label}`} value="" />
            {options.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
          </View>
        </View>
      ))}
       <View style={styles.saveButton}>
        <Button title="Save Changes" onPress={handleSave} />
       </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,marginVertical: 50 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  placeholder: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 50,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  label: { fontSize: 14, fontWeight: "500",},
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
    height: 50,
    // paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: "100%",
    color: "#000",
  },
  saveButton: {
    marginBottom: 150,
  }
});

