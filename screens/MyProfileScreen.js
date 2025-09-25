// import React, { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function MyProfileScreen({ route }) {
//   const navigation = useNavigation();
//   const { user } = route.params || {};
//   const [loading, setLoading] = useState(false);

//   if (!user) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ fontSize: 16, color: "gray" }}>No user data available.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>My Profile</Text>
//         <TouchableOpacity
//           style={styles.editBtn}
//           onPress={() => navigation.navigate("EditProfile", { userId: user._id })}
//         >
//           <Ionicons name="create-outline" size={18} color="#fff" />
   
//         </TouchableOpacity>
//       </View>

//       {/* Profile Image */}
//       <View style={styles.profilePicWrapper}>
//         <Image
//           source={{
//             uri:
//               user.image && typeof user.image === "string"
//                 ? user.image
//                 : "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif",
//           }}
//           style={styles.profilePic}
//         />
//       </View>

//       {/* Basic Info */}
//       <Text style={styles.sectionTitle}>Basic Information</Text>
//       <View style={styles.infoBox}>
//         <InfoRow icon="person-outline" label="Name" value={user.name || "N/A"} />
//         <InfoRow icon="calendar-outline" label="Age" value={user.age ? `${user.age} yrs` : "N/A"} />
//         <InfoRow icon="people-outline" label="Community" value={user.community || "N/A"} />
//         <InfoRow icon="book-outline" label="Religion" value={user.religion || "N/A"} />
//         <InfoRow icon="heart-outline" label="Marital Status" value={user.maritalStatus || "N/A"} />
//       </View>

//       {/* Professional Info */}
//       <Text style={styles.sectionTitle}>Professional Information</Text>
//       <View style={styles.infoBox}>
//         <InfoRow icon="briefcase-outline" label="Profession" value={user.profession || "N/A"} />
//         <InfoRow icon="location-outline" label="Location" value={user.location || "N/A"} />
//         <InfoRow icon="flag-outline" label="Residency Status" value={user.residencyStatus || "N/A"} />
//         <InfoRow icon="call-outline" label="Phone" value={user.phone || "Not Added"} />
//       </View>

//       {/* Partner Preferences */}
// <Text style={styles.sectionTitle}>Partner Preferences</Text>
// <TouchableOpacity
//   style={styles.editBtnBottom}
//   onPress={() => navigation.navigate("EditPreferences", { userId: user._id })}
// >
//   <Ionicons name="create-outline" size={18} color="#fff" />
//   <Text style={styles.editBtnText}>Edit Preferences</Text>
// </TouchableOpacity>

// <View style={styles.infoBox}>
//   <InfoRow icon="person-outline" label="Preferred Age" value={user.partnerPreferences?.ageRange || "Not Set"} />
//   <InfoRow icon="barbell-outline" label="Preferred Height" value={user.partnerPreferences?.heightRange || "Not Set"} />
//   <InfoRow icon="people-outline" label="Community" value={user.partnerPreferences?.community || "Any"} />
//   <InfoRow icon="book-outline" label="Religion" value={user.partnerPreferences?.religion || "Any"} />
//   <InfoRow icon="location-outline" label="Location" value={user.partnerPreferences?.location || "Any"} />
// </View>

//     </ScrollView>

//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <Ionicons name={icon} size={18} color="#555" />
//       <Text style={styles.infoLabel}>{label}:</Text>
//       <Text style={styles.infoValue}>{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 15,
//     backgroundColor: "#00bcd5",
//     alignItems: "center",
//   },
//   headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
//   editBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ff5a60",
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   editBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 4 },
//   profilePicWrapper: { alignItems: "center", marginVertical: 15 },
//   profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#00bcd5" },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginLeft: 15,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   infoBox: {
//     backgroundColor: "#fff",
//     marginHorizontal: 10,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     elevation: 1,
//   },
//   infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   infoLabel: { fontWeight: "bold", marginLeft: 6, color: "#555", width: 120 },
//   infoValue: { color: "#000" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   editBtnBottom: {
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#00bcd5",
//   padding: 10,
//   borderRadius: 20,
//   margin: 15,
// }

// });



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function MyProfileScreen({ route }) {
//   const navigation = useNavigation();
//   const { user } = route.params || {};
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log("📌 User Data:", user);
//     console.log("📌 Partner Preferences:", user?.partnerPreferences);
//   }, [user]);

//   if (!user) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ fontSize: 16, color: "gray" }}>No user data available.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>My Profile</Text>
//         <TouchableOpacity
//           style={styles.editBtn}
//           onPress={() => navigation.navigate("EditProfile", { userId: user._id })}
//         >
//           <Ionicons name="create-outline" size={18} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Image */}
//       <View style={styles.profilePicWrapper}>
//         <Image
//           source={{
//             uri:
//               user.image && typeof user.image === "string"
//                 ? user.image
//                 : "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif",
//           }}
//           style={styles.profilePic}
//         />
//       </View>

//       {/* Basic Info */}
//       <Text style={styles.sectionTitle}>Basic Information</Text>
//       <View style={styles.infoBox}>
//         <InfoRow icon="person-outline" label="Name" value={user.name || "N/A"} />
//         <InfoRow
//           icon="calendar-outline"
//           label="Age"
//           value={user.age ? `${user.age} yrs` : "N/A"}
//         />
//         <InfoRow icon="people-outline" label="Community" value={user.community || "N/A"} />
//         <InfoRow icon="book-outline" label="Religion" value={user.religion || "N/A"} />
//         <InfoRow
//           icon="heart-outline"
//           label="Marital Status"
//           value={user.maritalStatus || "N/A"}
//         />
//       </View>

//       {/* Professional Info */}
//       <Text style={styles.sectionTitle}>Professional Information</Text>
//       <View style={styles.infoBox}>
//         <InfoRow
//           icon="briefcase-outline"
//           label="Profession"
//           value={user.profession || "N/A"}
//         />
//         <InfoRow
//           icon="location-outline"
//           label="Location"
//           value={user.location || "N/A"}
//         />
//         <InfoRow
//           icon="flag-outline"
//           label="Residency Status"
//           value={user.residencyStatus || "N/A"}
//         />
//         <InfoRow icon="call-outline" label="Phone" value={user.phone || "Not Added"} />
//       </View>

//       {/* Partner Preferences */}
//       <Text style={styles.sectionTitle}>Partner Preferences</Text>
//       <TouchableOpacity
//         style={styles.editBtnBottom}
//         onPress={() => navigation.navigate("EditPreferences", { userId: user._id })}
//       >
//         <Ionicons name="create-outline" size={18} color="#fff" />
//         <Text style={styles.editBtnText}>Edit Preferences</Text>
//       </TouchableOpacity>

//       <View style={styles.infoBox}>
//         <InfoRow
//           icon="person-outline"
//           label="Preferred Age"
//           value={
//             user.partnerPreferences?.ageRange
//               ? `${user.partnerPreferences.ageRange.min} - ${user.partnerPreferences.ageRange.max} yrs`
//               : "Not Set"
//           }
//         />

//         <InfoRow
//           icon="barbell-outline"
//           label="Preferred Height"
//           value={
//             user.partnerPreferences?.heightRange
//               ? `${user.partnerPreferences.heightRange.min} - ${user.partnerPreferences.heightRange.max} cm`
//               : "Not Set"
//           }
//         />

//         <InfoRow
//           icon="people-outline"
//           label="Community"
//           value={
//             user.partnerPreferences?.community?.length
//               ? user.partnerPreferences.community.join(", ")
//               : "Any"
//           }
//         />

//         <InfoRow
//           icon="book-outline"
//           label="Religion"
//           value={
//             user.partnerPreferences?.religion?.length
//               ? user.partnerPreferences.religion.join(", ")
//               : "Any"
//           }
//         />

//         <InfoRow
//           icon="location-outline"
//           label="Location"
//           value={
//             user.partnerPreferences?.location
//               ? `${user.partnerPreferences.location.country?.join(", ") || ""} ${
//                   user.partnerPreferences.location.state?.join(", ") || ""
//                 } ${user.partnerPreferences.location.city?.join(", ") || ""}`.trim() ||
//                 "Any"
//               : "Any"
//           }
//         />
//       </View>
//     </ScrollView>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <Ionicons name={icon} size={18} color="#555" />
//       <Text style={styles.infoLabel}>{label}:</Text>
//       <Text style={styles.infoValue}>{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 15,
//     backgroundColor: "#00bcd5",
//     alignItems: "center",
//   },
//   headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
//   editBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ff5a60",
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   editBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 4 },
//   profilePicWrapper: { alignItems: "center", marginVertical: 15 },
//   profilePic: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: "#00bcd5",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginLeft: 15,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   infoBox: {
//     backgroundColor: "#fff",
//     marginHorizontal: 10,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     elevation: 1,
//   },
//   infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   infoLabel: { fontWeight: "bold", marginLeft: 6, color: "#555", width: 120 },
//   infoValue: { color: "#000", flex: 1 },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   editBtnBottom: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#00bcd5",
//     padding: 10,
//     borderRadius: 20,
//     margin: 15,
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MyProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialUser = route.params?.user;
  const updatedPrefs = route.params?.updatedPreferences;

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (updatedPrefs) {
      setUser((prev) => ({ ...prev, partnerPreferences: updatedPrefs }));
    }
  }, [updatedPrefs]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: "gray" }}>No user data available.</Text>
      </View>
    );
  }

  const pref = user.partnerPreferences || {};

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditProfile", { userId: user._id })}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profilePicWrapper}>
        <Image
          source={{
            uri:
              user.image && typeof user.image === "string"
                ? user.image
                : "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif",
          }}
          style={styles.profilePic}
        />
      </View>

      {/* Basic Info */}
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <View style={styles.infoBox}>
        <InfoRow icon="person-outline" label="Name" value={user.name || "N/A"} />
        <InfoRow icon="calendar-outline" label="Age" value={user.age ? `${user.age} yrs` : "N/A"} />
        <InfoRow icon="people-outline" label="Community" value={user.community || "N/A"} />
        <InfoRow icon="book-outline" label="Religion" value={user.religion || "N/A"} />
        <InfoRow icon="heart-outline" label="Marital Status" value={user.maritalStatus || "N/A"} />
      </View>

      {/* Partner Preferences */}
      <Text style={styles.sectionTitle}>Partner Preferences</Text>
      <TouchableOpacity
        style={styles.editBtnBottom}
        onPress={() => navigation.navigate("EditPreferences", { userId: user._id,
           onUpdatePreferences: (newPrefs) =>
        setUser((prev) => ({ ...prev, partnerPreferences: newPrefs })),
          
         })}
      >
        <Ionicons name="create-outline" size={18} color="#fff" />
        <Text style={styles.editBtnText}>Edit Preferences</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <InfoRow
          icon="person-outline"
          label="Preferred Age"
          value={
            pref.ageRange
              ? `${pref.ageRange.min} - ${pref.ageRange.max} yrs`
              : "Not Set"
          }
        />
        <InfoRow
          icon="barbell-outline"
          label="Preferred Height"
          value={
            pref.heightRange
              ? `${pref.heightRange.min} - ${pref.heightRange.max} cm`
              : "Not Set"
          }
        />
        <InfoRow
          icon="people-outline"
          label="Community"
          value={pref.community?.length ? pref.community.join(", ") : "Any"}
        />
        <InfoRow
          icon="book-outline"
          label="Religion"
          value={pref.religion?.length ? pref.religion.join(", ") : "Any"}
        />
        <InfoRow
          icon="location-outline"
          label="Location"
          value={
            pref.location
              ? `${pref.location.country?.join(", ") || ""} ${pref.location.state?.join(", ") || ""} ${pref.location.city?.join(", ") || ""}`.trim() || "Any"
              : "Any"
          }
        />
        <InfoRow
          icon="school-outline"
          label="Education"
          value={pref.education?.length ? pref.education.join(", ") : "Any"}
        />
        <InfoRow
          icon="briefcase-outline"
          label="Profession"
          value={pref.profession?.length ? pref.profession.join(", ") : "Any"}
        />
        <InfoRow
          icon="restaurant-outline"
          label="Diet"
          value={pref.diet?.length ? pref.diet.join(", ") : "Any"}
        />
        <InfoRow
          icon="person-circle-outline"
          label="Profile Managed By"
          value={pref.profileManagedBy?.length ? pref.profileManagedBy.join(", ") : "Any"}
        />
        <InfoRow
          icon="heart-circle-outline"
          label="Hobbies"
          value={pref.hobbies?.length ? pref.hobbies.join(", ") : "Any"}
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color="#555" />
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8",marginVertical:40 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#00bcd5", alignItems: "center" },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  editBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#ff5a60", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  editBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 4 },
  profilePicWrapper: { alignItems: "center", marginVertical: 15 },
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#00bcd5" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginLeft: 15, marginTop: 10, marginBottom: 5 },
  infoBox: { backgroundColor: "#fff", marginHorizontal: 10, padding: 10, borderRadius: 8, marginBottom: 10, elevation: 1 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoLabel: { fontWeight: "bold", marginLeft: 6, color: "#555", width: 140 },
  infoValue: { color: "#000", flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  editBtnBottom: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#00bcd5", padding: 10, borderRadius: 20, margin: 15 },
});
