// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function MatchInfo({ route, navigation }) {
//   const { profile } = route.params;

//   if (!profile) {
//     return (
//       <View style={styles.center}>
//         <Text>No Profile Data</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Profile Info</Text>
//       </View>

//       {/* Profile Image */}
//       <Image source={{ uri: profile.image }} style={styles.image} />

//       {/* Basic Info */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Basic Details</Text>
//         <Text>Name: {profile.name}</Text>
//         <Text>Age: {profile.age || "N/A"}</Text>
//         <Text>Gender: {profile.gender}</Text>
//         <Text>Religion: {profile.religion || "N/A"}</Text>
//         <Text>Community: {profile.community || "N/A"}</Text>
//         <Text>Location: {profile.location || "N/A"}</Text>
//       </View>

//       {/* Professional Info */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Professional Details</Text>
//         <Text>Education: {profile.education || "N/A"}</Text>
//         <Text>Occupation: {profile.occupation || "N/A"}</Text>
//         <Text>Income: {profile.income || "N/A"}</Text>
//       </View>

//       {/* Partner Preferences */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Partner Preferences</Text>
//         <Text>Age Range: {profile.partnerPreferences?.ageRange || "N/A"}</Text>
//         <Text>Religion: {profile.partnerPreferences?.religion || "N/A"}</Text>
//         <Text>Community: {profile.partnerPreferences?.community || "N/A"}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#f8f8f8",
//   },
//   backButton: { marginRight: 10 },
//   headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
//   image: { width: "100%", height: 250 },
//   section: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
//   sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
// });


import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function MatchInfo({ route, navigation }) {
  const { profile } = route.params;

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No Profile Data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Info</Text>
      </View>

      {/* Profile Banner */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: profile.image }} style={styles.bannerImage} />
        <View style={styles.overlay} />
        <View style={styles.bannerContent}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.subInfo}>
            {profile.age ? `${profile.age} yrs • ` : ""}
            {profile.location || "Location N/A"}
          </Text>
        </View>
      </View>

      {/* Details Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Details</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#00bcd5" />
          <Text style={styles.infoText}>Gender: {profile.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="heart" size={20} color="#e91e63" />
          <Text style={styles.infoText}>Religion: {profile.religion || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people" size={20} color="#9c27b0" />
          <Text style={styles.infoText}>Community: {profile.community || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Info</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="school" size={20} color="#3f51b5" />
          <Text style={styles.infoText}>Education: {profile.education || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="work" size={20} color="#4caf50" />
          <Text style={styles.infoText}>Occupation: {profile.occupation || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="attach-money" size={20} color="#ff9800" />
          <Text style={styles.infoText}>Income: {profile.income || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Partner Preferences</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#795548" />
          <Text style={styles.infoText}>
            Age Range: {profile.partnerPreferences?.ageRange || "N/A"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="heart-circle" size={20} color="#f44336" />
          <Text style={styles.infoText}>
            Religion: {profile.partnerPreferences?.religion || "N/A"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-circle" size={20} color="#2196f3" />
          <Text style={styles.infoText}>
            Community: {profile.partnerPreferences?.community || "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backButton: { marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  bannerContainer: { height: 280, position: "relative" },
  bannerImage: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  bannerContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  name: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  subInfo: { color: "#ddd", fontSize: 16, marginTop: 4 },
  section: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { marginLeft: 8, fontSize: 16, color: "#444" },
});
