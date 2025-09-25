
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import MultiSlider from "@ptomasroos/react-native-multi-slider";
// import SelectField from "../components/SelectField";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function SearchScreen() {
//   const navigation = useNavigation();
//   const options = ["Education", "Community", "Profession", "Profile ID"];
//   const [index, setIndex] = useState(0);
//   const translateY = useRef(new Animated.Value(0)).current;
//   const { width } = Dimensions.get("window");

//   // Filters state
//   const [ageRange, setAgeRange] = useState([20, 35]);
//   const [heightRange, setHeightRange] = useState([150, 180]);
//   const [maritalStatus, setMaritalStatus] = useState([]);
//   const [religion, setReligion] = useState([]);
//   const [community, setCommunity] = useState([]);
//   const [motherTongue, setMotherTongue] = useState([]);
//   const [manglik, setManglik] = useState([]);
//   const [countryLiving, setCountryLiving] = useState([]);
//   const [stateLiving, setStateLiving] = useState([]);
//   const [countryGrewUp, setCountryGrewUp] = useState([]);
//   const [residencyStatus, setResidencyStatus] = useState([]);
//   const [photoSettings, setPhotoSettings] = useState([]);
//   const [education, setEducation] = useState([]);
//   const [profession, setProfession] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loggedInUserGender, setLoggedInUserGender] = useState(null); // ✅ Store user's gender

//   // Fetch logged-in user gender on mount
//   useEffect(() => {
//     const fetchUserGender = async () => {
//       const gender = await AsyncStorage.getItem("gender");
//       setLoggedInUserGender(gender);
//     };
//     fetchUserGender();
//   }, []);

//   // Animated placeholder text
//   useEffect(() => {
//     const interval = setInterval(() => {
//       Animated.timing(translateY, {
//         toValue: -20,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => {
//         setIndex((prev) => (prev + 1) % options.length);
//         translateY.setValue(20);
//         Animated.timing(translateY, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }).start();
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);


//   const handleSearch = async () => {
//   setLoading(true);
//   try {
//     // ✅ Correctly await AsyncStorage for gender
//     const storedGender = await AsyncStorage.getItem("gender");
//     if (!storedGender) {
//       alert("User gender not found!");
//       setLoading(false);
//       return;
//     }

//     // Determine target gender
//     const targetGender = storedGender === "Male" ? "Female" : "Male";

//     const filters = {
//       ageMin: ageRange[0],
//       ageMax: ageRange[1],
//       heightMin: heightRange[0],
//       heightMax: heightRange[1],
//       religion,
//       community,
//       maritalStatus,
//       motherTongue,
//       manglik,
//       countryLiving,
//       stateLiving,
//       countryGrewUp,
//       residencyStatus,
//       photoSettings,
//       education,
//       profession,
//       searchText,
//       gender: targetGender, // <-- send this to backend
//     };

//     console.log("Filters being sent:", filters);

//     const response = await fetch(
//       "https://shaadi-backend-9ljp.onrender.com/api/search",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(filters),
//       }
//     );

//     const data = await response.json();
//     console.log("Search Response:", data);

//     navigation.navigate("ResultsScreen", {
//       matches: data.success && Array.isArray(data.users) ? data.users : [],
//     });
//   } catch (err) {
//     console.error("Search Error:", err);
//     navigation.navigate("ResultsScreen", { matches: [] });
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchRow}>
//         <Ionicons name="arrow-back" size={22} color="#888" style={{ marginRight: 12 }} />
//         <View style={styles.searchBar}>
//           <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
//           <TextInput
//             style={{ flex: 1, fontSize: 14, color: "#666", padding: 0 }}
//             placeholder={`"${options[index]}"`}
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//         </View>
//       </View>

//       {/* Scrollable Filters */}
//       <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 140 }}>
//         {/* Age Slider */}
//         <Text style={styles.label}>Age</Text>
//         <View style={styles.rangeLabels}>
//           <Text>{ageRange[0]} yrs</Text>
//           <Text>{ageRange[1]} yrs</Text>
//         </View>
//         <MultiSlider
//           values={ageRange}
//           sliderLength={width - 40}
//           min={18}
//           max={60}
//           step={1}
//           onValuesChange={setAgeRange}
//           selectedStyle={{ backgroundColor: "#fe5261" }}
//           unselectedStyle={{ backgroundColor: "#ddd" }}
//           markerStyle={{ backgroundColor: "#01bad6" }}
//         />

//         {/* Height Slider */}
//         <Text style={styles.label}>Height</Text>
//         <View style={styles.rangeLabels}>
//           <Text>{heightRange[0]} cm</Text>
//           <Text>{heightRange[1]} cm</Text>
//         </View>
//         <MultiSlider
//           values={heightRange}
//           sliderLength={width - 40}
//           min={140}
//           max={200}
//           step={1}
//           onValuesChange={setHeightRange}
//           selectedStyle={{ backgroundColor: "#fe5261" }}
//           unselectedStyle={{ backgroundColor: "#ddd" }}
//           markerStyle={{ backgroundColor: "#01bad6" }}
//         />

//         {/* Dropdown Fields */}
//         <SelectField label="Marital Status" options={["Never Married", "Divorced", "Widowed", "Separated"]} value={maritalStatus} onChange={setMaritalStatus} />
//         <SelectField label="Religion" options={["Hindu", "Muslim", "Christian", "Sikh", "Other"]} value={religion} onChange={setReligion} />
//         <SelectField label="Community" options={["Brahmin", "Rajput", "Kayastha", "Yadav", "Other"]} value={community} onChange={setCommunity} />
//         <SelectField label="Mother Tongue" options={["Telugu", "Hindi", "Tamil", "Bengali", "English", "Other"]} value={motherTongue} onChange={setMotherTongue} />
//         <SelectField label="Manglik" options={["Yes", "No", "Doesn't Matter"]} value={manglik} onChange={setManglik} />
//         <SelectField label="Country Living" options={["India", "USA", "UK", "Canada", "Australia"]} value={countryLiving} onChange={setCountryLiving} />
//         <SelectField label="State Living" options={["Andhra Pradesh", "Maharashtra", "Delhi", "Tamil Nadu"]} value={stateLiving} onChange={setStateLiving} />
//         <SelectField label="Country Grew Up" options={["India", "USA", "UK", "Canada", "Australia"]} value={countryGrewUp} onChange={setCountryGrewUp} />
//         <SelectField label="Residency Status" options={["Citizen", "Permanent Resident", "Work Permit", "Student"]} value={residencyStatus} onChange={setResidencyStatus} />
//         <SelectField label="Photo Settings" options={["Visible to All", "Only Premium Members"]} value={photoSettings} onChange={setPhotoSettings} />
//         <SelectField label="Education" options={["B.Tech", "M.Tech", "MBA", "MBBS", "Other"]} value={education} onChange={setEducation} />
//         <SelectField label="Profession" options={["Software Engineer", "Doctor", "Teacher", "Business", "Other"]} value={profession} onChange={setProfession} />
//       </ScrollView>

//       {/* Fixed Button */}
//       <View style={styles.bottomButtonWrapper}>
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.searchButtonText}>Search Now</Text>
//         </TouchableOpacity>
//       </View>

//       {loading && <ActivityIndicator size="large" color="#fe5261" style={{ marginTop: 10 }} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 50, backgroundColor: "#fff" },
//   searchRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10 },
//   searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", flex: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
//   label: { marginTop: 20, fontSize: 16, fontWeight: "500", marginLeft: 10 },
//   rangeLabels: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 },
//   bottomButtonWrapper: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 10, borderTopWidth: 1, borderTopColor: "#ddd", elevation: 5 },
//   searchButton: { backgroundColor: "#fe5261", padding: 15, borderRadius: 30, alignItems: "center" },
//   searchButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
// });


import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import SelectField from "../components/SelectField";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchScreen() {
  const navigation = useNavigation();
  const options = ["Education", "Community", "Profession", "Profile ID"];
  const [index, setIndex] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");

  // Filters state (✅ single value, not array)
  const [ageRange, setAgeRange] = useState([20, 35]);
  const [heightRange, setHeightRange] = useState([150, 180]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [manglik, setManglik] = useState("");
  const [countryLiving, setCountryLiving] = useState("");
  const [stateLiving, setStateLiving] = useState("");
  const [countryGrewUp, setCountryGrewUp] = useState("");
  const [residencyStatus, setResidencyStatus] = useState("");
  const [photoSettings, setPhotoSettings] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user gender on mount
  const [loggedInUserGender, setLoggedInUserGender] = useState(null);
  useEffect(() => {
    const fetchUserGender = async () => {
      const gender = await AsyncStorage.getItem("gender");
      setLoggedInUserGender(gender);
    };
    fetchUserGender();
  }, []);

  // Animated placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % options.length);
        translateY.setValue(20);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle Search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const storedGender = await AsyncStorage.getItem("gender");
      if (!storedGender) {
        alert("User gender not found!");
        setLoading(false);
        return;
      }

      // Determine target gender (opposite)
      const targetGender = storedGender === "Male" ? "Female" : "Male";

      const filters = {
        ageMin: ageRange[0],
        ageMax: ageRange[1],
        heightMin: heightRange[0],
        heightMax: heightRange[1],
        religion,
        community,
        maritalStatus,
        motherTongue,
        manglik,
        countryLiving,
        stateLiving,
        countryGrewUp,
        residencyStatus,
        photoSettings,
        education,
        profession,
        searchText,
        gender: targetGender,
      };

      console.log("Filters being sent:", filters);

      const response = await fetch(
        "https://shaadi-backend-9ljp.onrender.com/api/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );

      const data = await response.json();
      console.log("Search Response:", data);

      navigation.navigate("ResultsScreen", {
        matches: data.success && Array.isArray(data.users) ? data.users : [],
      });
    } catch (err) {
      console.error("Search Error:", err);
      navigation.navigate("ResultsScreen", { matches: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <Ionicons name="arrow-back" size={22} color="#888" style={{ marginRight: 12 }} />
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, fontSize: 14, color: "#666", padding: 0 }}
            placeholder={`"${options[index]}"`}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Scrollable Filters */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Age Slider */}
        <Text style={styles.label}>Age</Text>
        <View style={styles.rangeLabels}>
          <Text>{ageRange[0]} yrs</Text>
          <Text>{ageRange[1]} yrs</Text>
        </View>
        <MultiSlider
          values={ageRange}
          sliderLength={width - 40}
          min={18}
          max={60}
          step={1}
          onValuesChange={setAgeRange}
          selectedStyle={{ backgroundColor: "#fe5261" }}
          unselectedStyle={{ backgroundColor: "#ddd" }}
          markerStyle={{ backgroundColor: "#01bad6" }}
        />

        {/* Height Slider */}
        <Text style={styles.label}>Height</Text>
        <View style={styles.rangeLabels}>
          <Text>{heightRange[0]} cm</Text>
          <Text>{heightRange[1]} cm</Text>
        </View>
        <MultiSlider
          values={heightRange}
          sliderLength={width - 40}
          min={140}
          max={200}
          step={1}
          onValuesChange={setHeightRange}
          selectedStyle={{ backgroundColor: "#fe5261" }}
          unselectedStyle={{ backgroundColor: "#ddd" }}
          markerStyle={{ backgroundColor: "#01bad6" }}
        />

        {/* Single Select Dropdowns */}
        <SelectField label="Marital Status" options={["Never Married", "Divorced", "Widowed", "Separated"]} value={maritalStatus} onChange={setMaritalStatus} />
        <SelectField label="Religion" options={["Hindu", "Muslim", "Christian", "Sikh", "Other"]} value={religion} onChange={setReligion} />
        <SelectField label="Community" options={["Brahmin", "Rajput", "Kayastha", "Yadav", "Other"]} value={community} onChange={setCommunity} />
        <SelectField label="Mother Tongue" options={["Telugu", "Hindi", "Tamil", "Bengali", "English", "Other"]} value={motherTongue} onChange={setMotherTongue} />
        <SelectField label="Manglik" options={["Yes", "No", "Doesn't Matter"]} value={manglik} onChange={setManglik} />
        <SelectField label="Country Living" options={["India", "USA", "UK", "Canada", "Australia"]} value={countryLiving} onChange={setCountryLiving} />
        <SelectField label="State Living" options={["Andhra Pradesh", "Maharashtra", "Delhi", "Tamil Nadu"]} value={stateLiving} onChange={setStateLiving} />
        <SelectField label="Country Grew Up" options={["India", "USA", "UK", "Canada", "Australia"]} value={countryGrewUp} onChange={setCountryGrewUp} />
        <SelectField label="Residency Status" options={["Citizen", "Permanent Resident", "Work Permit", "Student"]} value={residencyStatus} onChange={setResidencyStatus} />
        <SelectField label="Photo Settings" options={["Visible to All", "Only Premium Members"]} value={photoSettings} onChange={setPhotoSettings} />
        <SelectField label="Education" options={["B.Tech", "M.Tech", "MBA", "MBBS", "Other"]} value={education} onChange={setEducation} />
        <SelectField label="Profession" options={["Software Engineer", "Doctor", "Teacher", "Business", "Other"]} value={profession} onChange={setProfession} />
      </ScrollView>

      {/* Fixed Button */}
      <View style={styles.bottomButtonWrapper}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search Now</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#fe5261" style={{ marginTop: 10 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: "#fff" },
  searchRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", flex: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  label: { marginTop: 20, fontSize: 16, fontWeight: "500", marginLeft: 10 },
  rangeLabels: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 },
  bottomButtonWrapper: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 10, borderTopWidth: 1, borderTopColor: "#ddd", elevation: 5 },
  searchButton: { backgroundColor: "#fe5261", padding: 15, borderRadius: 30, alignItems: "center" },
  searchButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
