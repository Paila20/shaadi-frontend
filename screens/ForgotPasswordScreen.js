

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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      console.log("Forgot Password Response:", res.data);

      const resetToken = res.data.resetToken; // ensure backend returns this
          console.log("Reset Token:", resetToken);
      Alert.alert("Success", res.data.msg || "Password reset link sent to email", [
        {
          text: "OK",
          onPress: () => {
            if (resetToken) {
              // navigation.navigate("ResetPassword", { token: resetToken });
                 navigation.navigate("Welcome");
            } 
            // else {
            //   navigation.navigate("Welcome");
            // }
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.btn} onPress={handleForgotPassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Send Link</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
        <Text style={styles.backLink}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: "#00bcd5", padding: 12, borderRadius: 25, alignItems: "center", marginBottom: 15 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  backLink: { color: "#00bcd5", textAlign: "center", fontWeight: "500" },
});
