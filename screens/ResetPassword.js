
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";

export default function ResetPasswordScreen({ route, navigation }) {
  const { token } = route.params;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password/${token}`, { password });
      Alert.alert("Success", "Password updated successfully", [
        { text: "OK", onPress: () => navigation.navigate("Welcome") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleResetPassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Reset Password</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: "#00bcd5", padding: 12, borderRadius: 25, alignItems: "center", marginBottom: 15 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
