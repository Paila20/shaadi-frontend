// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";

// export default function ResetPassword({ navigation }) {
//   const [identifier, setIdentifier] = useState(""); // email or phone
//   const [loading, setLoading] = useState(false);

//   const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

//   const handleResetPassword = async () => {
//     if (!identifier) {
//       Alert.alert("Error", "Please enter email or phone number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = /^\d+$/.test(identifier)
//         ? { phone: identifier }
//         : { email: identifier };

//       const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, payload);
//       Alert.alert("Success", res.data.msg || "Password reset link sent!");
//       navigation.goBack();
//     } catch (err) {
//       console.log("Reset password error:", err?.response?.data || err.message);
//       Alert.alert("Failed", err?.response?.data?.msg || "Unable to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Your Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email or phone"
//         placeholderTextColor="#aaa"
//         value={identifier}
//         onChangeText={setIdentifier}
//       />
//       <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword} disabled={loading}>
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.resetText}>Send Reset Link</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   resetBtn: {
//     backgroundColor: "#00bcd5",
//     padding: 12,
//     borderRadius: 25,
//     alignItems: "center",
//   },
//   resetText: { color: "#fff", fontWeight: "600", fontSize: 16 },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function ResetPasswordScreen({ route, navigation }) {
  const { token } = route.params; // 👈 Get token from navigation params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      Alert.alert("Success", res.data.msg || "Password reset successful!", [
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      console.log("Reset password error:", err?.response?.data || err.message);
      Alert.alert("Failed", err?.response?.data?.msg || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.resetText}>Reset Password</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  resetBtn: {
    backgroundColor: "#00bcd5",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  resetText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

