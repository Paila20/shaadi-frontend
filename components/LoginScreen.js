
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginModal({ visible, onClose }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // single error state
  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
    general: "",
  });

  const navigation = useNavigation();
  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  const handleLogin = async () => {
    let newErrors = { identifier: "", password: "", general: "" };

    if (!identifier) {
      newErrors.identifier = "Mobile/Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // if any error exists, stop login
    if (newErrors.identifier || newErrors.password) return;

    setLoading(true);
    try {
      const payload = /^\d+$/.test(identifier)
        ? { phone: identifier, password }
        : { email: identifier, password };

      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, payload);

      const user = res.data.user;
      const token = res.data.token;

      if (stayLoggedIn) await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("userId", user._id);
      await AsyncStorage.setItem("gender", user.gender);

      // clear errors on success
      setErrors({ identifier: "", password: "", general: "" });

      onClose();
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (err) {
      console.log("Login error:", err?.response?.data || err.message);
      setErrors((prev) => ({
        ...prev,
        general: err?.response?.data?.msg || "Unable to login",
      }));
    } finally {
      setLoading(false);
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const modalWidth = screenWidth * 0.9;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { width: modalWidth }]}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate("Welcome");
            }}
            style={styles.closeIcon}
          >
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={{
              uri: "https://img2.shaadi.com/assests/2016/images/home-page-layer-logo.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome Back! Please Login</Text>

          {/* Email / Phone */}
          <Text style={styles.label}>Mobile No. / Email ID</Text>
          <TextInput
            style={[styles.input, errors.identifier && styles.errorBorder]}
            placeholder="Email ID / Mobile No."
            placeholderTextColor="#aaa"
            value={identifier}
            onChangeText={(text) => {
              setIdentifier(text);
              if (text) setErrors((prev) => ({ ...prev, identifier: "" }));
            }}
          />
          {errors.identifier ? <Text style={styles.errorText}>{errors.identifier}</Text> : null}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, errors.password && styles.errorBorder]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          {/* Forgot Password + Stay Logged In Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.stayLoggedInRow}
              onPress={() => setStayLoggedIn(!stayLoggedIn)}
            >
              <MaterialIcons
                name={stayLoggedIn ? "check-box" : "check-box-outline-blank"}
                size={20}
                color="#00bcd5"
              />
              <Text style={styles.stayLoggedInText}> Stay Logged In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* General Error */}
          {errors.general ? <Text style={styles.errorText}>{errors.general}</Text> : null}

          {/* Login Button */}
          <View style={styles.loginBtnColumn}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Signup */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New to Shaadi.com?</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signupLink}> Signup Free</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    elevation: 8,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  logo: { width: 150, height: 50, alignSelf: "center", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "500", textAlign: "center", marginBottom: 20, color: "#222" },
  label: { color: "#666", fontSize: 14, marginBottom: 5, textAlign: "left" },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    paddingRight: 40,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -18 }],
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  stayLoggedInRow: { flexDirection: "row", alignItems: "center" },
  stayLoggedInText: { color: "#444", fontSize: 14, marginLeft: 5 },
  forgotPasswordText: { color: "#00bcd5", fontSize: 14, fontWeight: "500" },
  loginBtnColumn: { alignItems: "center", marginTop: 10, marginBottom: 10 },
  loginBtn: {
    backgroundColor: "#00bcd5",
    padding: 12,
    borderRadius: 25,
    width: "60%",
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  signupText: { color: "#444", fontSize: 14 },
  signupLink: { color: "#00bcd5", fontWeight: "bold", fontSize: 14, marginLeft: 5 },
});
