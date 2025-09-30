

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: 18,
    religion: "",
    community: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  


  const religions = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Parsi/Zoroastrian",
  "Jewish",
  "Other",
];

const communities = [
  "Brahmin",
  "Kshatriya",
  "Vaishya",
  "Shudra",
  "Maratha",
  "Reddy",
  "Nair",
  "Kayastha",
  "Jat",
  "Patel",
  "Gupta",
  "Rajput",
  "Ezhava",
  "Other",
];


  const handleChange = (field, value) => {
    // Restrict phone to max 10 digits
    if (field === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [field]: value });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.religion) newErrors.religion = "Please select religion";
    if (!formData.community) newErrors.community = "Please select community";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Mobile number must be 10 digits";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const baseURL = "https://shaadi-backend-9ljp.onrender.com";

      const payload = {
        ...formData,
        age: Number(formData.age),
      };

      await axios.post(`${baseURL}/api/auth/signup`, payload);

      Alert.alert("Success", "Signup successful! Please login.");
      navigation.navigate("Welcome");
    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      Alert.alert("Signup Failed", err.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      {/* Full Name */}
      <Text style={styles.label}>
         Name <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}


      
      <Text style={styles.label}>
        Email <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Phone */}
      <Text style={styles.label}>
        Mobile Number <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

{/*       
      <Text style={styles.label}>
        Password <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>} */}
      


      {/* Password */}
<Text style={styles.label}>
  Password <Text style={styles.required}>*</Text>
</Text>
<View style={styles.passwordContainer}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Enter your password"
    secureTextEntry={!showPassword}
    value={formData.password}
    onChangeText={(text) => handleChange("password", text)}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setShowPassword(!showPassword)}
  >
    <Ionicons
      name={showPassword ? "eye-off" : "eye"}
      size={22}
      color="#555"
    />
  </TouchableOpacity>
</View>
{errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Gender */}
      <Text style={styles.label}>
        Gender <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(val) => handleChange("gender", val)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

      {/* Age Dropdown */}
      <Text style={styles.label}>
        Age <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.age}
          onValueChange={(val) => handleChange("age", val)}
        >
          {Array.from({ length: 43 }, (_, i) => {
            const age = 18 + i;
            return <Picker.Item key={age} label={`${age}`} value={age} />;
          })}
        </Picker>
      </View>
      {errors.age && <Text style={styles.error}>{errors.age}</Text>}

      {/* Religion Dropdown */}
      <Text style={styles.label}>
        Religion <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.religion}
          onValueChange={(val) => handleChange("religion", val)}
        >
          <Picker.Item label="Select Religion" value="" />
          {religions.map((r) => (
            <Picker.Item key={r} label={r} value={r} />
          ))}
        </Picker>
      </View>
      {errors.religion && <Text style={styles.error}>{errors.religion}</Text>}

      {/* Community Dropdown */}
      <Text style={styles.label}>
        Community / Caste <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.community}
          onValueChange={(val) => handleChange("community", val)}
        >
          <Picker.Item label="Select Community" value="" />
          {communities.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>
      {errors.community && <Text style={styles.error}>{errors.community}</Text>}

      

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
  <Text style={styles.loginText}>Already have an account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
    <Text style={styles.loginLink}>Login</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#444",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
  },
  // passwordWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 8,
  //   marginBottom: 5,
  // },
  // eyeIcon: {
  //   paddingHorizontal: 12,
  // },


  passwordContainer: {
  position: "relative",
  marginBottom: 5,
},

passwordInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  paddingRight: 40, // space for the eye icon
  fontSize: 16,
},

eyeIcon: {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: [{ translateY: -11 }], // vertically center the icon
},

  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#00bcd5",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 15,
},

loginText: {
  color: "#444",
  fontSize: 14,
},

loginLink: {
  color: "#00bcd5",
  fontSize: 14,
  fontWeight: "bold",
},

});

export default SignupScreen;
