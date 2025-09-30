



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation } from "@react-navigation/native"; 

// export default function EditPreferences() {
//   const navigation = useNavigation();
//   const [ageRange, setAgeRange] = useState({ min: 18, max: 40 });
//   const [heightRange, setHeightRange] = useState({ min: 150, max: 200 });
//   const [annualIncomeRange, setAnnualIncomeRange] = useState({ min: 0, max: 0 });

//   const [religion, setReligion] = useState("");
//   const [community, setCommunity] = useState("");
//   const [motherTongue, setMotherTongue] = useState("");
//   const [maritalStatus, setMaritalStatus] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [education, setEducation] = useState("");
//   const [profession, setProfession] = useState("");
//   const [diet, setDiet] = useState("");
//   const [profileManagedBy, setProfileManagedBy] = useState("");
//   const [hobbies, setHobbies] = useState("");

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPreferences = async () => {
//       try {
//         setLoading(true);
//         const token = await AsyncStorage.getItem("token");
//         const userId = await AsyncStorage.getItem("userId");

//         const response = await axios.get(
//           `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("Fetched user data:", response.data);

//         const prefs = response.data.partnerPreferences || {};

//         setAgeRange(prefs.ageRange ?? { min: 18, max: 40 });
//         setHeightRange(prefs.heightRange ?? { min: 150, max: 200 });
//         setAnnualIncomeRange(prefs.annualIncomeRange ?? { min: 0, max: 0 });

//         setReligion(prefs.religion?.[0] || "");
//         setCommunity(prefs.community?.[0] || "");
//         setMotherTongue(prefs.motherTongue?.[0] || "");
//         setMaritalStatus(prefs.maritalStatus?.[0] || "");
//         setCountry(prefs.location?.country?.[0] || "");
//         setState(prefs.location?.state?.[0] || "");
//         setCity(prefs.location?.city?.[0] || "");
//         setEducation(prefs.education?.[0] || "");
//         setProfession(prefs.profession?.[0] || "");
//         setDiet(prefs.diet?.[0] || "");
//         setProfileManagedBy(prefs.profileManagedBy?.[0] || "");
//         setHobbies(prefs.hobbies?.[0] || "");
//       } catch (error) {
//         console.error("Error fetching preferences:", error);
//         Alert.alert("Error", "Failed to fetch preferences");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPreferences();
//   }, []);


//   const handleSave = async () => {
//   try {
//     setLoading(true);
//     const token = await AsyncStorage.getItem("token");
//     const userId = await AsyncStorage.getItem("userId");

//     const payload = {
//       ageRange,
//       heightRange,
//       annualIncomeRange,
//       religion: religion ? [religion] : [],
//       community: community ? [community] : [],
//       motherTongue: motherTongue ? [motherTongue] : [],
//       maritalStatus: maritalStatus ? [maritalStatus] : [],
//       location: {
//         country: country ? [country] : [],
//         state: state ? [state] : [],
//         city: city ? [city] : [],
//       },
//       education: education ? [education] : [],
//       profession: profession ? [profession] : [],
//       diet: diet ? [diet] : [],
//       profileManagedBy: profileManagedBy ? [profileManagedBy] : [],
//       hobbies: hobbies ? [hobbies] : [],
//     };

//     console.log("Saving payload:", payload);

//     await axios.patch(
//       `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}/preferences`,
//       payload,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     Alert.alert("Success", "Preferences updated successfully!")
//     setTimeout(() => {
//   navigation.navigate("MyProfile");
// }, 500);
     
//   } catch (error) {
//     console.error("Error saving preferences:", error.response?.data || error.message);
//     Alert.alert("Error", "Failed to save preferences. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#FF4081" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Edit Partner Preferences</Text>

//       {/* Age Range */}
//       <Text style={styles.label}>Preferred Age Range</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={ageRange.min.toString()}
//           onChangeText={(text) => setAgeRange({ ...ageRange, min: parseInt(text) || 0 })}
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={ageRange.max.toString()}
//           onChangeText={(text) => setAgeRange({ ...ageRange, max: parseInt(text) || 0 })}
//         />
//       </View>

//       {/* Height Range */}
//       <Text style={styles.label}>Preferred Height Range (cm)</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={heightRange.min.toString()}
//           onChangeText={(text) => setHeightRange({ ...heightRange, min: parseInt(text) || 0 })}
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={heightRange.max.toString()}
//           onChangeText={(text) => setHeightRange({ ...heightRange, max: parseInt(text) || 0 })}
//         />
//       </View>

//       {/* Annual Income */}
//       <Text style={styles.label}>Annual Income Range</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={annualIncomeRange.min.toString()}
//           onChangeText={(text) => setAnnualIncomeRange({ ...annualIncomeRange, min: parseInt(text) || 0 })}
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={annualIncomeRange.max.toString()}
//           onChangeText={(text) => setAnnualIncomeRange({ ...annualIncomeRange, max: parseInt(text) || 0 })}
//         />
//       </View>

//       {/* Dropdowns */}
//       <Dropdown label="Religion" selectedValue={religion} onValueChange={setReligion} items={["Hindu", "Muslim", "Christian", "Sikh", "Other"]} />
//       <Dropdown label="Community" selectedValue={community} onValueChange={setCommunity} items={["Brahmin", "Rajput", "Jat", "Other"]} />
//       <Dropdown label="Mother Tongue" selectedValue={motherTongue} onValueChange={setMotherTongue} items={["Hindi", "English", "Tamil", "Telugu", "Other"]} />
//       <Dropdown label="Marital Status" selectedValue={maritalStatus} onValueChange={setMaritalStatus} items={["Never Married", "Divorced", "Widowed","Separated"]} />
//       <Dropdown label="Country" selectedValue={country} onValueChange={setCountry} items={["India", "USA", "Canada", "UK", "Australia"]} />
//       <Dropdown label="State" selectedValue={state} onValueChange={setState} items={["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Other"]} />
//       <Dropdown label="City" selectedValue={city} onValueChange={setCity} items={["Mumbai", "Delhi", "Bangalore", "Chennai", "Other"]} />
//       <Dropdown label="Education" selectedValue={education} onValueChange={setEducation} items={["High School","Diploma","B.Tech", "M.Tech", "MBA","B.Sc","M.Sc","PhD", "Other"]} />
//       <Dropdown label="Profession" selectedValue={profession} onValueChange={setProfession} items={["Software Engineer", "Doctor", "Teacher","Business","Lawyer","Government Service","Freelancer", "Other"]} />
//       <Dropdown label="Diet" selectedValue={diet} onValueChange={setDiet} items={["Veg", "Non-Veg","Vegan", "Eggetarian","Other"]} />
//       <Dropdown label="Profile Managed By" selectedValue={profileManagedBy} onValueChange={setProfileManagedBy} items={["Self", "Parents", "Sibling", "Friend", "Other"]} />

//       {/* Free Text for hobbies */}
//       <TextInput style={styles.input} placeholder="Hobbies" value={hobbies} onChangeText={setHobbies} />

//       <View style={styles.buttonContainer}>
//         <Button title="Save Preferences" onPress={handleSave} color="#FF4081" />
//       </View>
//     </ScrollView>
//   );
// }

// function Dropdown({ label, selectedValue, onValueChange, items }) {
//   return (
//     <View style={{ marginVertical: 5 }}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.pickerWrapper}>
//         <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
//           <Picker.Item label={`Select ${label}`} value="" />
//           {items.map((item, idx) => (
//             <Picker.Item key={idx} label={item} value={item} />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
//   row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   inputSmall: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 6,
//     borderRadius: 6,
//     marginHorizontal: 5,
//   },
//   rangeDash: { fontSize: 18, fontWeight: "bold" },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginVertical: 5 },
//   pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
//   buttonContainer: { marginTop: 20 },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
// });


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation } from "@react-navigation/native";

// export default function EditPreferences() {
//   const navigation = useNavigation();

//   // ✅ Hold full user data
//   const [userData, setUserData] = useState(null);

//   const [ageRange, setAgeRange] = useState({ min: 18, max: 40 });
//   const [heightRange, setHeightRange] = useState({ min: 150, max: 200 });
//   const [annualIncomeRange, setAnnualIncomeRange] = useState({ min: 0, max: 0 });

//   const [religion, setReligion] = useState("");
//   const [community, setCommunity] = useState("");
//   const [motherTongue, setMotherTongue] = useState("");
//   const [maritalStatus, setMaritalStatus] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [education, setEducation] = useState("");
//   const [profession, setProfession] = useState("");
//   const [diet, setDiet] = useState("");
//   const [profileManagedBy, setProfileManagedBy] = useState("");
//   const [hobbies, setHobbies] = useState("");

//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//   const fetchPreferences = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       const userId = await AsyncStorage.getItem("userId");

//       if (!token || !userId) {
//         console.warn("⚠️ Missing token or userId");
//         return;
//       }

//       const response = await axios.get(
//         `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("📌 Full API Response:", JSON.stringify(response.data, null, 2));

//       if (!response?.data) {
//         console.warn("⚠️ No user data found from API");
//         Alert.alert("Error", "Failed to load user data");
//         return;
//       }

//       setUserData(response.data);
//       const prefs = response.data.partnerPreferences ?? {};
//       console.log("📌 Partner Preferences:", prefs);

//       setAgeRange(prefs.ageRange ?? { min: 18, max: 40 });
//       setHeightRange(prefs.heightRange ?? { min: 150, max: 200 });
//       setAnnualIncomeRange(prefs.annualIncomeRange ?? { min: 0, max: 0 });

//       setReligion(prefs.religion?.[0] ?? "");
//       setCommunity(prefs.community?.[0] ?? "");
//       setMotherTongue(prefs.motherTongue?.[0] ?? "");
//       setMaritalStatus(prefs.maritalStatus?.[0] ?? "");
//       setCountry(prefs.location?.country?.[0] ?? "");
//       setState(prefs.location?.state?.[0] ?? "");
//       setCity(prefs.location?.city?.[0] ?? "");
//       setEducation(prefs.education?.[0] ?? "");
//       setProfession(prefs.profession?.[0] ?? "");
//       setDiet(prefs.diet?.[0] ?? "");
//       setProfileManagedBy(prefs.profileManagedBy?.[0] ?? "");
//       setHobbies(prefs.hobbies?.[0] ?? "");
//     } catch (error) {
//       console.error("❌ Error fetching preferences:", error.response?.data || error.message);
//       Alert.alert("Error", "Failed to fetch preferences from server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchPreferences();
// }, []);

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       const userId = await AsyncStorage.getItem("userId");

//       const payload = {
//         ageRange,
//         heightRange,
//         annualIncomeRange,
//         religion: religion ? [religion] : [],
//         community: community ? [community] : [],
//         motherTongue: motherTongue ? [motherTongue] : [],
//         maritalStatus: maritalStatus ? [maritalStatus] : [],
//         location: {
//           country: country ? [country] : [],
//           state: state ? [state] : [],
//           city: city ? [city] : [],
//         },
//         education: education ? [education] : [],
//         profession: profession ? [profession] : [],
//         diet: diet ? [diet] : [],
//         profileManagedBy: profileManagedBy ? [profileManagedBy] : [],
//         hobbies: hobbies ? [hobbies] : [],
//       };

//       console.log("Saving payload:", payload);

//       await axios.patch(
//         `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}/preferences`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );


// Alert.alert("Success", "Preferences updated successfully!", [
//       {
//         text: "OK",
//         onPress: () => {
//           setTimeout(() => {
     
//               console.log("🔙 Going back to previous screen...");
//             navigation.goBack();
//           }, 50);
//         },
//       },
//     ]);
     

//     } catch (error) {
//       console.error("Error saving preferences:", error.response?.data || error.message);
//       Alert.alert("Error", "Failed to save preferences. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#FF4081" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Edit Partner Preferences</Text>

//       {/* ✅ Show user info if available */}
//       {userData && (
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>👤 {userData.name}</Text>
//           <Text style={styles.userEmail}>{userData.email}</Text>
//         </View>
//       )}

//       {/* Age Range */}
//       <Text style={styles.label}>Preferred Age Range</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={ageRange.min.toString()}
//           onChangeText={(text) => setAgeRange({ ...ageRange, min: parseInt(text) || 0 })}
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={ageRange.max.toString()}
//           onChangeText={(text) => setAgeRange({ ...ageRange, max: parseInt(text) || 0 })}
//         />
//       </View>

//       {/* Height Range */}
//       <Text style={styles.label}>Preferred Height Range (cm)</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={heightRange.min.toString()}
//           onChangeText={(text) => setHeightRange({ ...heightRange, min: parseInt(text) || 0 })}
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={heightRange.max.toString()}
//           onChangeText={(text) => setHeightRange({ ...heightRange, max: parseInt(text) || 0 })}
//         />
//       </View>

//       {/* Annual Income */}
//       <Text style={styles.label}>Annual Income Range</Text>
//       <View style={styles.row}>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={annualIncomeRange.min.toString()}
//           onChangeText={(text) =>
//             setAnnualIncomeRange({ ...annualIncomeRange, min: parseInt(text) || 0 })
//           }
//         />
//         <Text style={styles.rangeDash}>-</Text>
//         <TextInput
//           style={styles.inputSmall}
//           keyboardType="number-pad"
//           value={annualIncomeRange.max.toString()}
//           onChangeText={(text) =>
//             setAnnualIncomeRange({ ...annualIncomeRange, max: parseInt(text) || 0 })
//           }
//         />
//       </View>

//       {/* Dropdowns */}
//       <Dropdown label="Religion" selectedValue={religion} onValueChange={setReligion} items={["Hindu", "Muslim", "Christian", "Sikh", "Other"]} />
//       <Dropdown label="Community" selectedValue={community} onValueChange={setCommunity} items={["Brahmin", "Rajput", "Jat", "Other"]} />
//       <Dropdown label="Mother Tongue" selectedValue={motherTongue} onValueChange={setMotherTongue} items={["Hindi", "English", "Tamil", "Telugu", "Other"]} />
//       <Dropdown label="Marital Status" selectedValue={maritalStatus} onValueChange={setMaritalStatus} items={["Never Married", "Divorced", "Widowed", "Separated"]} />
//       <Dropdown label="Country" selectedValue={country} onValueChange={setCountry} items={["India", "USA", "Canada", "UK", "Australia"]} />
//       <Dropdown label="State" selectedValue={state} onValueChange={setState} items={["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Other"]} />
//       <Dropdown label="City" selectedValue={city} onValueChange={setCity} items={["Mumbai", "Delhi", "Bangalore", "Chennai", "Other"]} />
//       <Dropdown label="Education" selectedValue={education} onValueChange={setEducation} items={["High School", "Diploma", "B.Tech", "M.Tech", "MBA", "B.Sc", "M.Sc", "PhD", "Other"]} />
//       <Dropdown label="Profession" selectedValue={profession} onValueChange={setProfession} items={["Software Engineer", "Doctor", "Teacher", "Business", "Lawyer", "Government Service", "Freelancer", "Other"]} />
//       <Dropdown label="Diet" selectedValue={diet} onValueChange={setDiet} items={["Veg", "Non-Veg", "Vegan", "Eggetarian", "Other"]} />
//       <Dropdown label="Profile Managed By" selectedValue={profileManagedBy} onValueChange={setProfileManagedBy} items={["Self", "Parents", "Sibling", "Friend", "Other"]} />

//       {/* Hobbies */}
//       <TextInput style={styles.input} placeholder="Hobbies" value={hobbies} onChangeText={setHobbies} />

//       <View style={styles.buttonContainer}>
//         <Button title="Save Preferences" onPress={handleSave} color="#FF4081" />
//       </View>
//     </ScrollView>
//   );
// }

// function Dropdown({ label, selectedValue, onValueChange, items }) {
//   return (
//     <View style={{ marginVertical: 5 }}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.pickerWrapper}>
//         <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
//           <Picker.Item label={`Select ${label}`} value="" />
//           {items.map((item, idx) => (
//             <Picker.Item key={idx} label={item} value={item} />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   userInfo: { marginBottom: 10 },
//   userName: { fontSize: 18, fontWeight: "bold", color: "#333" },
//   userEmail: { fontSize: 14, color: "#666" },
//   label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
//   row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   inputSmall: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 6,
//     borderRadius: 6,
//     marginHorizontal: 5,
//   },
//   rangeDash: { fontSize: 18, fontWeight: "bold" },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginVertical: 5 },
//   pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
//   buttonContainer: { marginTop: 20 },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditPreferences() {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  const [userData, setUserData] = useState(null);
  const [ageRange, setAgeRange] = useState({ min: 18, max: 40 });
  const [heightRange, setHeightRange] = useState({ min: 150, max: 200 });
  const [annualIncomeRange, setAnnualIncomeRange] = useState({ min: 0, max: 0 });
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [diet, setDiet] = useState("");
  const [profileManagedBy, setProfileManagedBy] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: "Edit Preferences" });

    const fetchPreferences = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token || !userId) return;

        const response = await axios.get(
          `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response?.data) return;

        setUserData(response.data);
        const prefs = response.data.partnerPreferences ?? {};

        setAgeRange(prefs.ageRange ?? { min: 18, max: 40 });
        setHeightRange(prefs.heightRange ?? { min: 150, max: 200 });
        setAnnualIncomeRange(prefs.annualIncomeRange ?? { min: 0, max: 0 });

        setReligion(prefs.religion?.[0] ?? "");
        setCommunity(prefs.community?.[0] ?? "");
        setMotherTongue(prefs.motherTongue?.[0] ?? "");
        setMaritalStatus(prefs.maritalStatus?.[0] ?? "");
        setCountry(prefs.location?.country?.[0] ?? "");
        setState(prefs.location?.state?.[0] ?? "");
        setCity(prefs.location?.city?.[0] ?? "");
        setEducation(prefs.education?.[0] ?? "");
        setProfession(prefs.profession?.[0] ?? "");
        setDiet(prefs.diet?.[0] ?? "");
        setProfileManagedBy(prefs.profileManagedBy?.[0] ?? "");
        setHobbies(prefs.hobbies?.[0] ?? "");
      } catch (error) {
        Alert.alert("Error", "Failed to fetch preferences.");
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const payload = {
        ageRange,
        heightRange,
        annualIncomeRange,
        religion: religion ? [religion] : [],
        community: community ? [community] : [],
        motherTongue: motherTongue ? [motherTongue] : [],
        maritalStatus: maritalStatus ? [maritalStatus] : [],
        location: {
          country: country ? [country] : [],
          state: state ? [state] : [],
          city: city ? [city] : [],
        },
        education: education ? [education] : [],
        profession: profession ? [profession] : [],
        diet: diet ? [diet] : [],
        profileManagedBy: profileManagedBy ? [profileManagedBy] : [],
        hobbies: hobbies ? [hobbies] : [],
      };

      await axios.patch(
        `https://shaadi-backend-9ljp.onrender.com/api/users/${userId}/preferences`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Success", "Preferences updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Pass updated preferences back to MyProfileScreen
            // navigation.navigate("MyProfile", { updatedPreferences: payload });
              // route.params?.onUpdatePreferences(payload);
            navigation.navigate("Main");
          },
        },
      ]); 
    } catch (error) {
      Alert.alert("Error", "Failed to save preferences.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF4081" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Partner Preferences</Text>

      {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>👤 {userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
      )}

      <Text style={styles.label}>Preferred Age Range</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={ageRange.min.toString()}
          onChangeText={(text) => setAgeRange({ ...ageRange, min: parseInt(text) || 0 })}
        />
        <Text style={styles.rangeDash}>-</Text>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={ageRange.max.toString()}
          onChangeText={(text) => setAgeRange({ ...ageRange, max: parseInt(text) || 0 })}
        />
      </View>

      <Text style={styles.label}>Preferred Height Range (cm)</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={heightRange.min.toString()}
          onChangeText={(text) => setHeightRange({ ...heightRange, min: parseInt(text) || 0 })}
        />
        <Text style={styles.rangeDash}>-</Text>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={heightRange.max.toString()}
          onChangeText={(text) => setHeightRange({ ...heightRange, max: parseInt(text) || 0 })}
        />
      </View>

      <Text style={styles.label}>Annual Income Range</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={annualIncomeRange.min.toString()}
          onChangeText={(text) =>
            setAnnualIncomeRange({ ...annualIncomeRange, min: parseInt(text) || 0 })
          }
        />
        <Text style={styles.rangeDash}>-</Text>
        <TextInput
          style={styles.inputSmall}
          keyboardType="number-pad"
          value={annualIncomeRange.max.toString()}
          onChangeText={(text) =>
            setAnnualIncomeRange({ ...annualIncomeRange, max: parseInt(text) || 0 })
          }
        />
      </View>

      <Dropdown label="Religion" selectedValue={religion} onValueChange={setReligion} items={["Hindu","Muslim","Christian","Sikh","Other"]}/>
      <Dropdown label="Community" selectedValue={community} onValueChange={setCommunity} items={["Brahmin","Rajput","Jat","Other"]}/>
      <Dropdown label="Mother Tongue" selectedValue={motherTongue} onValueChange={setMotherTongue} items={["Hindi","English","Tamil","Telugu","Other"]}/>
      <Dropdown label="Marital Status" selectedValue={maritalStatus} onValueChange={setMaritalStatus} items={["Never Married","Divorced","Widowed","Separated"]}/>
      <Dropdown label="Country" selectedValue={country} onValueChange={setCountry} items={["India","USA","Canada","UK","Australia"]}/>
      <Dropdown label="State" selectedValue={state} onValueChange={setState} items={["Maharashtra","Delhi","Karnataka","Tamil Nadu","Other"]}/>
      <Dropdown label="City" selectedValue={city} onValueChange={setCity} items={["Mumbai","Delhi","Bangalore","Chennai","Other"]}/>
      <Dropdown label="Education" selectedValue={education} onValueChange={setEducation} items={["High School","Diploma","B.Tech","M.Tech","MBA","B.Sc","M.Sc","PhD","Other"]}/>
      <Dropdown label="Profession" selectedValue={profession} onValueChange={setProfession} items={["Software Engineer","Doctor","Teacher","Business","Lawyer","Government Service","Freelancer","Other"]}/>
      <Dropdown label="Diet" selectedValue={diet} onValueChange={setDiet} items={["Veg","Non-Veg","Vegan","Eggetarian","Other"]}/>
      <Dropdown label="Profile Managed By" selectedValue={profileManagedBy} onValueChange={setProfileManagedBy} items={["Self","Parents","Sibling","Friend","Other"]}/>

      <TextInput style={styles.input} placeholder="Hobbies" value={hobbies} onChangeText={setHobbies} />

      <View style={styles.buttonContainer}>
        <Button title="Save Preferences" onPress={handleSave} color="#FF4081" />
      </View>
    </ScrollView>
  );
}

function Dropdown({ label, selectedValue, onValueChange, items }) {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label={`Select ${label}`} value="" />
          {items.map((item, idx) => (
            <Picker.Item key={idx} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 ,marginVertical:40},
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  userInfo: { marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 14, color: "#666" },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  inputSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  rangeDash: { fontSize: 18, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginVertical: 5 },
  pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  buttonContainer: { marginTop: 20,marginBottom:50 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
