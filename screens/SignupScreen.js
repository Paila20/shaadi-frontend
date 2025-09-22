


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import axios from "axios";
// import { Picker } from "@react-native-picker/picker";

// export default function SignupScreen({ navigation }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "",
//     religion: "",
//     community: "",
//     age: "",
//     height: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (key, value) => setForm({ ...form, [key]: value });

//   const handleSignup = async () => {
//     const { name, email, phone, password, gender, age, height } = form;
//     if (!name || !email || !phone || !password || !gender || !age || !height) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const baseURL = "https://shaadi-backend-9ljp.onrender.com";

//       // Ensure age and height are numbers
//       const payload = {
//         ...form,
//         age: Number(form.age),
//         height: Number(form.height),
//       };

//       const res = await axios.post(`${baseURL}/api/auth/signup`, payload);

//       Alert.alert("Success", "Signup successful! Please login.");
//       navigation.navigate("Welcome");
//     } catch (err) {
//       console.log("Signup error:", err.response?.data || err.message);
//       Alert.alert("Signup Failed", err.response?.data?.msg || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       {/* Name */}
//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={form.name}
//         onChangeText={(v) => handleChange("name", v)}
//       />
//       {/* Email */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={form.email}
//         onChangeText={(v) => handleChange("email", v)}
//         keyboardType="email-address"
//       />
//       {/* Phone */}
//       <TextInput
//         style={styles.input}
//         placeholder="Mobile No"
//         value={form.phone}
//         onChangeText={(v) => handleChange("phone", v)}
//         keyboardType="phone-pad"
//       />
//       {/* Password */}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={form.password}
//         onChangeText={(v) => handleChange("password", v)}
//         secureTextEntry
//       />
//       {/* Age & Height */}
//       <TextInput
//         style={styles.input}
//         placeholder="Age"
//         value={form.age ? String(form.age) : ""}
//         onChangeText={(v) => handleChange("age", v.replace(/[^0-9]/g, ""))}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Height in cm"
//         value={form.height ? String(form.height) : ""}
//         onChangeText={(v) => handleChange("height", v.replace(/[^0-9]/g, ""))}
//         keyboardType="numeric"
//       />

//       {/* Gender */}
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={form.gender}
//           onValueChange={(v) => handleChange("gender", v)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       {/* Religion */}
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={form.religion}
//           onValueChange={(v) => handleChange("religion", v)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Religion" value="" />
//           <Picker.Item label="Hindu" value="Hindu" />
//           <Picker.Item label="Muslim" value="Muslim" />
//           <Picker.Item label="Christian" value="Christian" />
//           <Picker.Item label="Other" value="Other" />
//         </Picker>
//       </View>

//       {/* Community */}
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={form.community}
//           onValueChange={(v) => handleChange("community", v)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Community" value="" />
//           <Picker.Item label="General" value="General" />
//           <Picker.Item label="OBC" value="OBC" />
//           <Picker.Item label="SC" value="SC" />
//           <Picker.Item label="ST" value="ST" />
//           <Picker.Item label="Other" value="Other" />
//         </Picker>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleSignup}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Sign Up</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.link}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//     height: 50, // ✅ equal height for all text inputs
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginBottom: 15,
//     justifyContent: "center",
//     height: 50, // ✅ same height for pickers
//   },
//   picker: {
//     height: 50, // ✅ ensures picker uses full height
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#E91E63",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   link: { textAlign: "center", color: "#E91E63", marginTop: 10 },
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
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    religion: "",
    community: "",
    age: "",
    height: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" }); // clear error when user types
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }
    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter 10-digit phone number";
      valid = false;
    }
    if (!form.password || form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    if (!form.age || Number(form.age) < 18 || Number(form.age) > 100) {
      newErrors.age = "Age must be between 18 and 100";
      valid = false;
    }
    if (!form.height || Number(form.height) < 100 || Number(form.height) > 250) {
      newErrors.height = "Height must be between 100–250 cm";
      valid = false;
    }
    if (!form.gender) {
      newErrors.gender = "Please select gender";
      valid = false;
    }
    if (!form.religion) {
      newErrors.religion = "Please select religion";
      valid = false;
    }
    if (!form.community) {
      newErrors.community = "Please select community";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const baseURL = "https://shaadi-backend-9ljp.onrender.com";

      const payload = {
        ...form,
        age: Number(form.age),
        height: Number(form.height),
      };

      const res = await axios.post(`${baseURL}/api/auth/signup`, payload);

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
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Name */}
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      {/* Email */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      {/* Phone */}
      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Mobile No"
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v.replace(/[^0-9]/g, ""))}
        keyboardType="phone-pad"
      />
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

      {/* Password */}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      {/* Age */}
      <TextInput
        style={[styles.input, errors.age && styles.inputError]}
        placeholder="Age"
        value={form.age ? String(form.age) : ""}
        onChangeText={(v) => handleChange("age", v.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      {errors.age ? <Text style={styles.error}>{errors.age}</Text> : null}

      {/* Height */}
      <TextInput
        style={[styles.input, errors.height && styles.inputError]}
        placeholder="Height in cm"
        value={form.height ? String(form.height) : ""}
        onChangeText={(v) => handleChange("height", v.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      {errors.height ? <Text style={styles.error}>{errors.height}</Text> : null}

      {/* Gender */}
      <View style={[styles.pickerWrapper, errors.gender && styles.inputError]}>
        <Picker selectedValue={form.gender} onValueChange={(v) => handleChange("gender", v)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      {errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}

      {/* Religion */}
      <View style={[styles.pickerWrapper, errors.religion && styles.inputError]}>
        <Picker selectedValue={form.religion} onValueChange={(v) => handleChange("religion", v)}>
          <Picker.Item label="Select Religion" value="" />
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {errors.religion ? <Text style={styles.error}>{errors.religion}</Text> : null}

      {/* Community */}
      <View style={[styles.pickerWrapper, errors.community && styles.inputError]}>
        <Picker selectedValue={form.community} onValueChange={(v) => handleChange("community", v)}>
          <Picker.Item label="Select Community" value="" />
          <Picker.Item label="General" value="General" />
          <Picker.Item label="OBC" value="OBC" />
          <Picker.Item label="SC" value="SC" />
          <Picker.Item label="ST" value="ST" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {errors.community ? <Text style={styles.error}>{errors.community}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    fontSize: 16,
    height: 50,
  },
  inputError: { borderColor: "red" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: "center",
    height: 50,
  },
  button: {
    backgroundColor: "#E91E63",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { textAlign: "center", color: "#E91E63", marginTop: 10 },
  error: { color: "red", fontSize: 13, marginBottom: 8, marginLeft: 5 },
});
