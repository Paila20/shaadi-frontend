



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TABS = ["Matches", "Received", "Sent", "Accepted"];

export default function MatchesScreen() {
  const [selectedTab, setSelectedTab] = useState("Matches");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const screenWidth = Dimensions.get("window").width;
   const navigation = useNavigation();

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);

      if (!user || !user._id) {
        console.warn("User not found in AsyncStorage");
        setProfiles([]);
        setLoading(false);
        return;
      }

      let endpoint;
      switch (selectedTab) {
        case "Received":
          endpoint = `/api/matches/received/${user._id}`;
          break;
        case "Sent":
          endpoint = `/api/matches/sent/${user._id}`;
          break;
        case "Accepted":
          endpoint = `/api/matches/accepted/${user._id}`;
          break;
        default:
          endpoint = `/api/matches/${user._id}`;
      }

      const res = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let fetchedProfiles = [];
      if (selectedTab === "Matches") fetchedProfiles = res.data.matches || [];
      else if (selectedTab === "Received") fetchedProfiles = res.data.received || [];
      else if (selectedTab === "Sent") fetchedProfiles = res.data.sent || [];
      else if (selectedTab === "Accepted") fetchedProfiles = res.data.accepted || [];

      // Normalize image field
      fetchedProfiles = fetchedProfiles.map((p) => ({
        ...p,
        image:
          p.image && typeof p.image === "string"
            ? p.image
            : p.image?.secure_url || "",
        gender: p.gender || "",
        age: p.age || "",
      }));

      // Filter opposite-gender only for Matches tab
      if (selectedTab === "Matches" && user.gender) {
        fetchedProfiles = fetchedProfiles.filter(
          (p) => p.gender.toLowerCase() !== user.gender.toLowerCase()
        );
      }

      setProfiles(fetchedProfiles);
    } catch (err) {
      console.log("Error fetching profiles:", err.message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [selectedTab]);

  const handleConnect = async (profile) => {
    try {
      setProfiles((prev) => prev.filter((p) => p._id !== profile._id));

      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);

      await axios.post(
        `${API_BASE_URL}/api/matches/connect`,
        { from: user._id, to: profile._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Success", `Connection request sent to ${profile.name}`);
      fetchProfiles();
    } catch (err) {
      console.log("Error connecting:", err.message);
      Alert.alert("Error", "Failed to send connection request.");
      fetchProfiles();
    }
  };

  const handleAccept = async (profile) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);

      await axios.post(
        `${API_BASE_URL}/api/matches/accept`,
        { userId: user._id, fromId: profile._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfiles((prev) => prev.filter((p) => p._id !== profile._id));
      Alert.alert("Accepted", `You accepted ${profile.name}'s request`);
      fetchProfiles();
    } catch (err) {
      console.log("Error accepting request:", err.message);
      Alert.alert("Error", "Failed to accept request.");
      fetchProfiles();
    }
  };


  const handleDecline = async (profile) => {
  try {
    // Optimistically remove the profile from UI
    setProfiles((prev) => prev.filter((p) => p._id !== profile._id));

    const token = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData);

    console.log("Declining request with payload:", {
      userId: user._id,
      fromId: profile._id,
    });

    await axios.post(
      `${API_BASE_URL}/api/matches/decline`,
      { userId: user._id, fromId: profile._id }, // ✅ Correct keys
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Alert.alert("Declined", `You declined ${profile.name}'s request`);
    fetchProfiles(); // Refresh the list
  } catch (err) {
    console.log("Error declining request:", err.response?.data || err.message);
    Alert.alert("Error", "Failed to decline request.");
    fetchProfiles(); // Refresh the list even on error
  }
};
const handleCancelRequest = async (profile) => {
  try {
    setProfiles((prev) => prev.filter((p) => p._id !== profile._id));

    const token = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData);

    console.log("Cancelling request with payload:", {
      userId: user._id,
      toId: profile._id,
    });

    await axios.post(
      `${API_BASE_URL}/api/matches/cancel`,
      { userId: user._id, toId: profile._id },  // ✅ Correct keys
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Alert.alert("Cancelled", `Request to ${profile.name} has been cancelled.`);
    fetchProfiles();
  } catch (err) {
    console.log("Error cancelling request:", err.response?.data || err.message);
    Alert.alert("Error", "Failed to cancel request.");
    fetchProfiles();
  }
};


  // const renderProfile = ({ item }) => (
  //   <View style={styles.card}>
  //     <Image
  //       source={{
  //         uri:
  //           item.image ||
  //           (item.gender.toLowerCase() === "male"
  //             ? "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif"
  //             : "https://img2.shaadi.com/imgs/profiles/60-no-border-female.gif"),
  //       }}
  //       style={styles.image}
  //       resizeMode="cover"
  //     />
  //     <View style={styles.info}>
  //       <Text style={styles.name}>{item?.name}</Text>
  //       <Text style={styles.details}>
  //         {item?.age || "N/A"} yrs • {item?.religion || "N/A"} • {item?.community || "N/A"}
  //       </Text>

  //       {selectedTab === "Matches" && (
  //         <TouchableOpacity
  //           style={styles.connectButton}
  //           onPress={() => handleConnect(item)}
  //         >
  //           <Text style={styles.connectText}>Connect Now</Text>
  //         </TouchableOpacity>
  //       )}

  //       {selectedTab === "Received" && (
  //         <View style={{ flexDirection: "row", marginTop: 8 }}>
  //           <TouchableOpacity
  //             style={[styles.connectButton, { backgroundColor: "#4CAF50", marginRight: 10 ,padding: 5}]}
  //             onPress={() => handleAccept(item)}
  //           >
  //             <Text style={styles.connectText}>Accept</Text>
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             style={[styles.connectButton, { backgroundColor: "#f44336", padding: 5 }]}
  //             onPress={() => handleDecline(item)}
  //           >
  //             <Text style={styles.connectText}>Decline</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}

  //       {selectedTab === "Sent" && (
  //         <TouchableOpacity
  //           style={[styles.connectButton, { backgroundColor: "#f44336" }]}
  //           onPress={() => handleCancelRequest(item)}
  //         >
  //           <Text style={styles.connectText}>Cancel Request</Text>
  //         </TouchableOpacity>
  //       )}

  //         {selectedTab !== "Sent" && (
  //         <TouchableOpacity
  //           style={[styles.connectButton, { backgroundColor: "#FF9800"}]}
  //           onPress={() => navigation.navigate("Chat", { chatWith: item })}
  //         >
  //           <Text style={styles.connectText}>Chat</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   </View>
  // );

  const renderProfile = ({ item }) => (
  <View style={styles.card}>
    <TouchableOpacity
  onPress={() => navigation.navigate("MatchInfo", { profile: item })}
>
    <Image
      source={{
        uri:
          item.image ||
          (item.gender.toLowerCase() === "male"
            ? "https://img2.shaadi.com/imgs/profiles/60-no-border-male.gif"
            : "https://img2.shaadi.com/imgs/profiles/60-no-border-female.gif"),
      }}
      style={styles.image}
      resizeMode="cover"
    />
    </TouchableOpacity>
    <View style={styles.info}>
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.details}>
        {item?.age || "N/A"} yrs • {item?.religion || "N/A"} •{" "}
        {item?.community || "N/A"}
      </Text>

      {/* ✅ Matches Tab - Connect + Chat in Row */}
      {selectedTab === "Matches" && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={[styles.connectButton, { flex: 1, marginRight: 8 }]}
            onPress={() => handleConnect(item)}
          >
            <Text style={styles.connectText}>Connect Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.connectButton,
              { flex: 1, backgroundColor: "#FF9800" },
            ]}
            onPress={() => navigation.navigate("Chat", { chatWith: item })}
          >
            <Text style={styles.connectText}>Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ Received Tab - Accept + Decline + Chat in Row */}
      {selectedTab === "Received" && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={[
              styles.connectButton,
              { flex: 1, backgroundColor: "#4CAF50", marginRight: 6 },
            ]}
            onPress={() => handleAccept(item)}
          >
            <Text style={styles.connectText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.connectButton,
              { flex: 1, backgroundColor: "#f44336", marginRight: 6 },
            ]}
            onPress={() => handleDecline(item)}
          >
            <Text style={styles.connectText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.connectButton,
              { flex: 1, backgroundColor: "#FF9800" },
            ]}
            onPress={() => navigation.navigate("Chat", { chatWith: item })}
          >
            <Text style={styles.connectText}>Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ Sent Tab - Cancel Button */}
      {selectedTab === "Sent" && (
        <TouchableOpacity
          style={[styles.connectButton, { backgroundColor: "#f44336" }]}
          onPress={() => handleCancelRequest(item)}
        >
          <Text style={styles.connectText}>Cancel Request</Text>
        </TouchableOpacity>
      )}

      {/* ✅ Accepted Tab - Only Chat */}
      {selectedTab === "Accepted" && (
        <TouchableOpacity
          style={[
            styles.connectButton,
            { backgroundColor: "#FF9800", marginTop: 10 },
          ]}
          onPress={() => navigation.navigate("Chat", { chatWith: item })}
        >
          <Text style={styles.connectText}>Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);


  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab, { width: screenWidth / 4 - 5 }]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Profiles */}
      {loading ? (
        <ActivityIndicator size="large" color="#00bcd5" style={{ marginTop: 20 }} />
      ) : profiles.length === 0 ? (
        <Text style={styles.noData}>No {selectedTab} Profiles</Text>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={renderProfile}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",marginTop: 40 },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    elevation: 2,
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  activeTab: { borderBottomColor: "#00bcd5" },
  tabText: { color: "#777", fontWeight: "500" },
  activeTabText: { color: "#00bcd5", fontWeight: "bold" },
  card: {
    flexDirection: "column", // column layout
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 0, // remove border radius
    overflow: "hidden", // image fits inside card
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%", // full width
    height: 250,   // responsive height for mobile
    borderRadius: 0,
  },
  info: {
    padding: 10,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 4 },
  details: { color: "#555", fontSize: 14 },
  connectButton: {
    marginTop: 10,
    backgroundColor: "#00bcd5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  connectText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noData: { textAlign: "center", marginTop: 20, color: "#777" },
});

