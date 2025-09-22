


import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileDetailsScreen({ route, navigation }) {
  const { profile } = route.params;

  return (
    <View style={styles.container}>
    <ScrollView>

      <View>
        <Image source={{ uri: profile.image }} style={styles.image} />
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
         </TouchableOpacity>
         <View style={styles.rightIcons}>
    <TouchableOpacity style={styles.iconButton}>
      <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <Ionicons name="star-outline" size={20} color="#fff" />
    
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <Ionicons name="camera-outline" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
        {/* Overlay Info */}
        <View style={styles.overlay}>
          <Text style={styles.overlayName}>
            {profile.name}, {profile.age}
          </Text>
          <Text style={styles.overlayDetail}>
            {profile.profession || "Software Engineer"}
          </Text>
          <Text style={styles.overlayDetail}>
            {profile.religion || "Hindu"} | {profile.location || "Hyderabad"}
          </Text>
        </View>
      </View>

    

      {/* Detailed Info Section */}
              <Text style={styles.sectionTitle}>About {profile.name.split(" ")[0]}</Text>
      <View style={styles.section}>

        <Text style={styles.sectionText}>
          {profile.about ||
            "I am a fun-loving person who values family and career equally. Looking for a caring and understanding partner."}
        </Text>
      </View>
           
      

      {/* Basic Information Section */}
<Text style={styles.sectionTitle}>Basic Information</Text>
<View style={styles.section}>
  <View style={styles.detailRow}>
    <Ionicons name="person-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Age: {profile.age}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="body-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Height: {profile.height || "5'7\""}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="heart-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Marital Status: {profile.maritalStatus || "Never Married"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="book-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Religion: {profile.religion || "Hindu"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="people-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Community: {profile.community || "Brahmin"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Mother Tongue: {profile.motherTongue || "Telugu"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="location-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Location: {profile.location}</Text>
  </View>
</View>

{/* Professional Details Section */}
<Text style={styles.sectionTitle}>Professional Details</Text>
<View style={styles.section}>
  <View style={styles.detailRow}>
    <Ionicons name="school-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Education: {profile.education || "B.Tech in Computer Science"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="briefcase-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Occupation: {profile.profession}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="business-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Company: {profile.company || "Infosys"}</Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="cash-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>Annual Income: {profile.income || "₹12 LPA"}</Text>
  </View>
</View>
{/* Hobbies & Interests Section */}
<Text style={styles.sectionTitle}>Hobbies & Interests</Text>
<View style={styles.section}>
  <View style={styles.detailRow}>
    <Ionicons name="musical-notes-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>
      {profile.hobbies || "Music, Traveling, Reading"}
    </Text>
  </View>

  <View style={styles.detailRow}>
    <Ionicons name="film-outline" size={18} color="#fc5b63" />
    <Text style={styles.detail}>
      {profile.interests || "Movies, Photography, Fitness"}
    </Text>
  </View>
</View>


            {/* Partner Preferences Section */}
      <Text style={styles.sectionTitle}>Partner Preferences</Text>
<View style={{marginBottom: 50}}>
      <View style={styles.prefHeader}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.prefImage}
        />
        <Text style={styles.prefHeaderText}>Preferences</Text>
        <Image
          source={{ uri: profile.image }}
          style={styles.prefImage}
        />
      </View>

      {/* Preference Rows */}
      <View style={styles.prefRowItem}>
        <Text style={styles.prefLabel}>Age</Text>
        <Text style={styles.prefValue}>{profile.partnerPrefs?.ageRange || "25 - 32 yrs"}</Text>
        <Text style={styles.prefValue}>{profile.age}</Text>
      </View>

      <View style={styles.prefRowItem}>
        <Text style={styles.prefLabel}>Height</Text>
        <Text style={styles.prefValue}>{profile.partnerPrefs?.height || "5'2 - 5'8"}</Text>
        <Text style={styles.prefValue}>{profile.height || "5'7\""}</Text>
      </View>

      <View style={styles.prefRowItem}>
        <Text style={styles.prefLabel}>Religion</Text>
        <Text style={styles.prefValue}>{profile.partnerPrefs?.religion || "Hindu"}</Text>
        <Text style={styles.prefValue}>{profile.religion || "Hindu"}</Text>
      </View>

      <View style={styles.prefRowItem}>
        <Text style={styles.prefLabel}>Mother Tongue</Text>
        <Text style={styles.prefValue}>{profile.partnerPrefs?.motherTongue || "Telugu"}</Text>
        <Text style={styles.prefValue}>{profile.motherTongue || "Telugu"}</Text>
      </View>

      <View style={styles.prefRowItem}>
        <Text style={styles.prefLabel}>Country Living In</Text>
        <Text style={styles.prefValue}>{profile.partnerPrefs?.country || "India"}</Text>
        <Text style={styles.prefValue}>{profile.country || "India"}</Text>
      </View>

</View>
      {/* Action Buttons */}
      
    </ScrollView>
    <View style={styles.fixedBottom}>
        
        <TouchableOpacity style={styles.connectButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" />
          <Text style={styles.connectText}>Connect Now</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,padding: 15, backgroundColor: '#f2f2f2' },
  image: { width: "100%", height: 400,borderRadius: 15 , marginBottom: 10},

  
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
  },
  overlayName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  overlayDetail: {
    fontSize: 14,
    color: "#fff",
    marginTop: 3,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },


  header: { padding: 15, alignItems: "center" },


  name: { fontSize: 24, fontWeight: "bold" },
  subText: { fontSize: 16, color: "gray", marginTop: 5 },
  quickInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#f7f7f7",
  },
  infoBox: { alignItems: "center" },
  infoText: { marginTop: 5, fontSize: 14, color: "#333" },
  section: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee",backgroundColor: '#fff', marginBottom: 15, borderRadius: 5},
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 ,color: '#fc5b63'},
  sectionText: { fontSize: 14, color: "#555", lineHeight: 20 },
  detail: { fontSize: 15, marginBottom: 6 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    // backgroundColor: "#000",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#0aa4b8",
    borderRadius: 8,
  },
  actionText: { marginLeft: 6, color: "#fff", fontWeight: "600" },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1fbbce",
    borderRadius: 25,
  },
  connectText: { marginLeft: 6, color: "#fff", fontWeight: "600" },
    prefHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  prefImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  prefHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fc5b63",
  },
  prefRowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  prefLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  prefValue: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    alignItems: 'center',
    
  },
  detailRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 6,
},
detail: {
  fontSize: 15,
  marginLeft: 8,
  color: "#333",
},
backButton: {
  position: "absolute",
  top: 20, // adjust depending on status bar height
  left: 20,
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: 5,
  borderRadius: 25,
},
rightIcons: {
  position: "absolute",
  top: 20,
  right: 20,
  flexDirection: "column",
  alignItems: "center",
},

iconButton: {
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: 5,
  borderRadius: 25,
  marginBottom: 12,
},


});
