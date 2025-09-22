import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function ChatListScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Recent");
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;
      setCurrentUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    fetchChatUsers();
  }, [currentUser]);

  const fetchChatUsers = async () => {
    setLoading(true);
    try {
            console.log("🔍 Current user ID being sent:", currentUser?._id);
      const res = await axios.get(`${API_BASE_URL}/api/chat/users/${currentUser._id}`);
      setChatUsers(res.data.users || []);
    } catch (err) {
    //   console.log("Error fetching chat users:", err.message);
      console.log("Error fetching chat users:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers =
    selectedTab === "Active"
      ? chatUsers.filter((u) => u.isOnline)
      : chatUsers; // "Recent" shows all

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { chatWith: item })}
    >
      <Image
        source={{
          uri:
            item.image ||
            (item.gender?.toLowerCase() === "male"
              ? "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              : "https://www.pngall.com/wp-content/uploads/5/Profile-Female-PNG.png"),
        }}
        style={styles.userImage}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          {item.lastMessage?.createdAt && (
            <Text style={styles.time}>
              {new Date(item.lastMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          )}
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage?.text || "Tap to start chatting"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Recent", "Active"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Users List */}
      {loading ? (
        <ActivityIndicator size="large" color="#00bcd5" style={{ marginTop: 20 }} />
      ) : filteredUsers.length === 0 ? (
        <Text style={styles.noChats}>No {selectedTab.toLowerCase()} chats</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  tab: { flex: 1, padding: 15, alignItems: "center" },
  tabText: { fontSize: 16, color: "#555" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#00bcd5" },
  activeTabText: { color: "#00bcd5", fontWeight: "bold" },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  userImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  chatInfo: { flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between" },
  userName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  time: { fontSize: 12, color: "#777" },
  lastMessage: { fontSize: 14, color: "#555", marginTop: 4 },
  noChats: { textAlign: "center", marginTop: 20, color: "#777" },
});
