


// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function HomePage() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       if (!storedUserId) {
//         console.warn("No userId found in storage");
//         setLoading(false);
//         return;
//       }
//       const response = await fetch(`https://shaadi-backend-9ljp.onrender.com/api/users/${storedUserId}`);
//       const data = await response.json();
//       console.log("Fetched user:", data);
//       setUser(data.user || data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (route.params?.updatedUser) {
//       setUser(route.params.updatedUser);
//     }
//   }, [route.params?.updatedUser]);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchUser();
//     }, [])
//   );



//   const handleLogout = async () => {
//   try {
//     await AsyncStorage.removeItem("token");
//     console.log("Token removed, navigating to login...");

//     navigation.reset({
//       // index: 0,
//       routes: [{ name: "Welcome" }],
//     });
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };


//   const items = [
//     { id: '1', title: 'Accepted', icon: 'checkmark-done-outline' },
//     { id: '2', title: 'Recent Visitors', icon: 'people-outline' },
//     { id: '3', title: 'My Profile', icon: 'person-outline' },
//     { id: '4', title: 'Account & Settings', icon: 'settings-outline' },
//     { id: '5', title: 'Notifications', icon: 'notifications-outline' },
//     { id: '6', title: 'Be Safe Online', icon: 'shield-checkmark-outline' },
//     { id: '7', title: 'Help and Support', icon: 'help-circle-outline' },
//     { id: '8', title: 'More', icon: 'ellipsis-horizontal-outline' },
//   ];

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#ff5a60" />
//       </View>
//     );
//   }

//   const getProfileImage = () => {
//     const maleFallback = "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif";
//     const femaleFallback = "https://img2.shaadi.com/imgs/profiles/60-no-border-female.gif";
//     const gender = user?.gender?.toLowerCase();
//     if (!user || !user.image || user.image === "[object Object]") {
//       return gender === "male" ? maleFallback : femaleFallback;
//     }
//     if (typeof user.image === "object" && user.image.url) {
//       return `${user.image.url}?t=${Date.now()}`;
//     }
//     if (typeof user.image === "string" && user.image.startsWith("http")) {
//       return `${user.image}?t=${Date.now()}`;
//     }
//     return gender === "male" ? maleFallback : femaleFallback;
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
//       {/* Top Banner */}
//       <View style={styles.topBanner}>
//         <View style={styles.bannerLeft}>
//           <Ionicons name="checkmark-circle" size={20} color="#00bcd5" style={{ marginRight: 8 }} />
//           <Text style={styles.bannerText}>Stand out with Verification. Get Blue Tick now</Text>
//         </View>
//         <Ionicons name="chevron-forward" size={20} color="#333" />
//       </View>

//       {/* Profile Section */}
//       <LinearGradient colors={['#0f292d', '#1b3a3e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.profileSection}>
//         {/* Edit Button - Top Right */}
//         <TouchableOpacity
//           style={styles.editBtnTop}
//           onPress={() => {
//             if (!user?._id) {
//               console.warn("User ID missing");
//               return;
//             }
//             navigation.navigate("EditProfile", { userId: user._id });
//           }}
//         >
//           <Ionicons name="create-outline" size={16} color="#fff" />
//           <Text style={styles.editBtnText}>Edit</Text>
//         </TouchableOpacity>

//         {/* Row 1: Image + Name */}
//         <View style={styles.topRow}>
//           <Image source={{ uri: getProfileImage() }} style={styles.profileImage} />
//           <View style={styles.nameRow}>
//             <Text style={styles.profileName}>{user?.name || "Guest User"}</Text>
//             {user?.accountType && (
//               <View style={[styles.accountBadge, { backgroundColor: user?.accountType === "Premium" ? "#FFD700" : "#00bcd5" }]}>
//                 <Text style={styles.accountBadgeText}>{user?.accountType.toUpperCase()}</Text>
//               </View>
//             )}
//           </View>
//         </View>

//         {/* Basic Details */}
//         <Text style={styles.sectionTitle}>Basic Details</Text>
//         <View style={styles.detailsColumn}>
//           <View style={styles.infoRow}><Ionicons name="person-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.gender || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="calendar-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.age ? `${user.age} yrs` : "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="people-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.community || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="book-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.religion || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="heart-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.maritalStatus || "N/A"}</Text></View>
//         </View>

//         {/* Professional Details */}
//         <Text style={styles.sectionTitle}>Professional Details</Text>
//         <View style={styles.detailsColumn}>
//           <View style={styles.infoRow}><Ionicons name="briefcase-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.profession || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="location-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.location || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="flag-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.residencyStatus || "N/A"}</Text></View>
//           <View style={styles.infoRow}><Ionicons name="call-outline" size={16} color="#ccc" /><Text style={styles.infoText}>{user?.phone || "Not Added"}</Text></View>
//         </View>

//         {/* Upgrade Button */}
//         <TouchableOpacity style={styles.upgradeBtn}>
//           <MaterialCommunityIcons name="chess-queen" size={20} color="#fff" />
//           <Text style={styles.upgradeBtnText}>Upgrade</Text>
//         </TouchableOpacity>
//       </LinearGradient>

//       {/* VIP Section */}
//       <View style={styles.vipSection}>
//         <View style={styles.viprow}>
//           <View style={styles.vipContent}>
//             <Text style={styles.vipTitle}>Introducing VipShaadi.com</Text>
//             <TouchableOpacity style={styles.knowMoreBtn}><Text style={styles.knowMoreText}>Know More</Text></TouchableOpacity>
//           </View>
//           <Image source={{ uri: 'https://img2.shaadi.com/assests/2024/vipselectbanner/vipShaadiMale.png' }} style={styles.vipImage} resizeMode="cover" />
//         </View>
//       </View>

//       {/* List Section */}
//       <View style={styles.listContainer}>
//         {items.map((item, index) => (
//           <View key={item.id} style={[styles.listItem, index !== items.length - 1 && styles.listItemBorder]}>
//             <Ionicons name={item.icon} size={22} color="#ff5a60" style={styles.listIcon} />
//             <Text style={styles.listItemText}>{item.title}</Text>
//           </View>
//         ))}

//         {/* Logout Button */}
//         <TouchableOpacity style={[styles.listItem, styles.listItemBorder]} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={22} color="red" style={styles.listIcon} />
//           <Text style={[styles.listItemText, { color: "red", fontWeight: "bold" }]}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'whitesmoke', marginTop: 35 },
//   topBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#d4f7ff' },
//   bannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
//   bannerText: { fontSize: 14, color: '#333', flexShrink: 1 },

//   profileSection: { padding: 15, margin: 10, borderRadius: 15, elevation: 3, position: 'relative' },
//   editBtnTop: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#00bcd5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
//   editBtnText: { color: '#fff', marginLeft: 4, fontWeight: 'bold', fontSize: 12 },

//   topRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   profileImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#00bcd5', marginRight: 15 },
//   nameRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
//   profileName: { fontSize: 20, fontWeight: "bold", color: "#fff", marginRight: 8 },
//   accountBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12 },
//   accountBadgeText: { fontSize: 10, fontWeight: "bold", color: "#000" },

//   sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 5 },
//   detailsColumn: { marginTop: 5 },
//   infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
//   infoText: { color: "#ddd", marginLeft: 6, fontSize: 14 },

//   upgradeBtn: { flexDirection: "row", alignSelf: 'center', marginTop: 15, backgroundColor: "#ff5a60", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
//   upgradeBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },

//   vipSection: { backgroundColor: 'rgb(65, 12, 123)', margin: 10, borderRadius: 10, overflow: 'hidden', elevation: 3, height: 120, paddingTop: 10 },
//   viprow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   vipImage: { width: 100, height: 100, borderRadius: 40 },
//   vipContent: { padding: 12, flexDirection: 'column', gap: 20 },
//   vipTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
//   knowMoreBtn: { borderWidth: 1, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 12, width: 110, backgroundColor: '#fff' },
//   knowMoreText: { fontSize: 14, fontWeight: 'bold', color: 'rgb(65, 12, 123)' },

//   listContainer: { backgroundColor: '#fff', marginTop: 10, overflow: 'hidden', width: '100%', alignSelf: 'stretch', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
//   listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
//   listItemBorder: { borderBottomWidth: 1, borderBottomColor: '#ddd' },
//   listIcon: { marginRight: 12 },
//   listItemText: { fontSize: 16, color: '#333' },
// });



import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        console.warn("No userId found in storage");
        setLoading(false);
        return;
      }
      const response = await fetch(`https://shaadi-backend-9ljp.onrender.com/api/users/${storedUserId}`);
      const data = await response.json();
      setUser(data.user || data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.updatedUser) setUser(route.params.updatedUser);
  }, [route.params?.updatedUser]);

  useEffect(() => { fetchUser(); }, []);
  useFocusEffect(useCallback(() => { fetchUser(); }, []));

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.reset({ routes: [{ name: "Welcome" }] });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getProfileImage = () => {
    const maleFallback = "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif";
    const femaleFallback = "https://img2.shaadi.com/imgs/profiles/60-no-border-female.gif";
    const gender = user?.gender?.toLowerCase();
    if (!user?.image || user.image === "[object Object]") {
      return gender === "male" ? maleFallback : femaleFallback;
    }
    return typeof user.image === "string" ? `${user.image}?t=${Date.now()}` : maleFallback;
  };

  const items = [
    { id: '1', title: 'Accepted', icon: 'checkmark-done-outline', onPress: () => navigation.navigate("Accepted") },
    { id: '2', title: 'Recent Visitors', icon: 'people-outline', onPress: () => navigation.navigate("Visitors") },
    { id: '3', title: 'My Profile', icon: 'person-outline', onPress: () => navigation.navigate("MyProfile", { user }) },
    { id: '4', title: 'Account & Settings', icon: 'settings-outline', onPress: () => navigation.navigate("Settings") },
    { id: '5', title: 'Notifications', icon: 'notifications-outline', onPress: () => navigation.navigate("Notifications") },
    { id: '6', title: 'Be Safe Online', icon: 'shield-checkmark-outline', onPress: () => navigation.navigate("Safety") },
    { id: '7', title: 'Help and Support', icon: 'help-circle-outline', onPress: () => navigation.navigate("Support") },
    { id: '8', title: 'More', icon: 'ellipsis-horizontal-outline', onPress: () => console.log("More clicked") },
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff5a60" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Top Banner */}
      <View style={styles.topBanner}>
        <View style={styles.bannerLeft}>
          <Ionicons name="checkmark-circle" size={20} color="#00bcd5" style={{ marginRight: 8 }} />
          <Text style={styles.bannerText}>Stand out with Verification. Get Blue Tick now</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#333" />
      </View>

      {/* 🔹 Profile Section */}
      <LinearGradient colors={['#0f292d', '#1b3a3e']} style={styles.profileSection}>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editBtnTop}
          onPress={() => navigation.navigate("EditProfile", { userId: user?._id })}
        >
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        {/* Profile Row */}
        <View style={styles.topRow}>
          <Image source={{ uri: getProfileImage() }} style={styles.profileImage} />
          <View style={styles.nameRow}>
            <Text style={styles.profileName}>{user?.name || "Guest User"}</Text>
            {user?.accountType && (
              <View style={[styles.accountBadge, { backgroundColor: user.accountType === "Premium" ? "#FFD700" : "#00bcd5" }]}>
                <Text style={styles.accountBadgeText}>{user.accountType.toUpperCase()}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Basic Details */}
        <Text style={styles.sectionTitle}>Basic Details</Text>
        <View style={styles.detailsColumn}>
          <InfoRow icon="person-outline" text={user?.gender || "N/A"} />
          <InfoRow icon="calendar-outline" text={user?.age ? `${user.age} yrs` : "N/A"} />
          <InfoRow icon="people-outline" text={user?.community || "N/A"} />
          <InfoRow icon="book-outline" text={user?.religion || "N/A"} />
          <InfoRow icon="heart-outline" text={user?.maritalStatus || "N/A"} />
        </View>

        {/* Professional Details */}
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <View style={styles.detailsColumn}>
          <InfoRow icon="briefcase-outline" text={user?.profession || "N/A"} />
          <InfoRow icon="location-outline" text={user?.location || "N/A"} />
          <InfoRow icon="flag-outline" text={user?.residencyStatus || "N/A"} />
          <InfoRow icon="call-outline" text={user?.phone || "Not Added"} />
        </View>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeBtn}>
          <MaterialCommunityIcons name="chess-queen" size={20} color="#fff" />
          <Text style={styles.upgradeBtnText}>Upgrade</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 🔹 VIP Section */}
      <View style={styles.vipSection}>
        <View style={styles.viprow}>
          <View style={styles.vipContent}>
            <Text style={styles.vipTitle}>Introducing VipShaadi.com</Text>
            <TouchableOpacity style={styles.knowMoreBtn}>
              <Text style={styles.knowMoreText}>Know More</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: 'https://img2.shaadi.com/assests/2024/vipselectbanner/vipShaadiMale.png' }} style={styles.vipImage} />
        </View>
      </View>

      {/* 🔹 List Section */}
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.listItem, index !== items.length - 1 && styles.listItemBorder]}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={22} color="#ff5a60" style={styles.listIcon} />
            <Text style={styles.listItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={[styles.listItem, styles.listItemBorder]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="red" style={styles.listIcon} />
          <Text style={[styles.listItemText, { color: "red", fontWeight: "bold" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, text }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color="#ccc" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'whitesmoke', marginTop: 35 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#d4f7ff' },
  bannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bannerText: { fontSize: 14, color: '#333', flexShrink: 1 },

  profileSection: { padding: 15, margin: 10, borderRadius: 15, elevation: 3 },
  editBtnTop: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#00bcd5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  editBtnText: { color: '#fff', marginLeft: 4, fontWeight: 'bold', fontSize: 12 },

  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  profileImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#00bcd5', marginRight: 15 },
  nameRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  profileName: { fontSize: 20, fontWeight: "bold", color: "#fff", marginRight: 8 },
  accountBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12 },
  accountBadgeText: { fontSize: 10, fontWeight: "bold", color: "#000" },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 5 },
  detailsColumn: { marginTop: 5 },
  infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  infoText: { color: "#ddd", marginLeft: 6, fontSize: 14 },

  upgradeBtn: { flexDirection: "row", alignSelf: 'center', marginTop: 15, backgroundColor: "#ff5a60", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  upgradeBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },

  vipSection: { backgroundColor: 'rgb(65, 12, 123)', margin: 10, borderRadius: 10, overflow: 'hidden', elevation: 3, height: 120, paddingTop: 10 },
  viprow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vipImage: { width: 100, height: 100, borderRadius: 40 },
  vipContent: { padding: 12, gap: 20 },
  vipTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  knowMoreBtn: { borderWidth: 1, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 12, width: 110, backgroundColor: '#fff' },
  knowMoreText: { fontSize: 14, fontWeight: 'bold', color: 'rgb(65, 12, 123)' },

  listContainer: { backgroundColor: '#fff', marginTop: 10, overflow: 'hidden', width: '100%', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  listItemBorder: { borderBottomWidth: 1, borderBottomColor: '#ddd' },
  listIcon: { marginRight: 12 },
  listItemText: { fontSize: 16, color: '#333' },
});
