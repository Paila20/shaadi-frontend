


import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen({ route, navigation }) {
  const chatWith = route?.params?.chatWith;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef(null);

  const API_BASE_URL = "https://shaadi-backend-9ljp.onrender.com";

  // Load current user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;
      setCurrentUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  // Fetch messages every 3 seconds
  useEffect(() => {
    if (!currentUser || !chatWith) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [currentUser, chatWith]);

  const fetchMessages = async () => {
    if (!currentUser || !chatWith) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/api/chat/${currentUser._id}/${chatWith._id}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentUser || !chatWith) return;

    const newMessage = {
      from: currentUser._id,
      to: chatWith._id,
      text: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]); // optimistic update
    setInput("");

    try {
      await axios.post(`${API_BASE_URL}/api/chat/send`, newMessage);
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (err) {
      console.log("Send error:", err.message);
    }
  };

  const renderMessage = ({ item }) => {
    if (!currentUser) return null;
    const isMe = item.from === currentUser._id;
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.theirMessage]}>
        <Text style={isMe ? styles.myText : styles.theirText}>{item.text}</Text>
        <Text style={styles.timeText}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    );
  };

  if (!chatWith) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No user selected for chat</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header with chat user info */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color="#333" />
  </TouchableOpacity>
        <Image
          source={{
            uri:
              chatWith.image ||
              (chatWith.gender.toLowerCase() === "male"
                ? "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                : "https://www.pngall.com/wp-content/uploads/5/Profile-Female-PNG.png"),
          }}
          style={styles.chatImage}
        />
        <Text style={styles.chatName}>{chatWith.name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      {/* Input box */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  chatImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: "#00bcd5",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  myText: { color: "#fff", fontSize: 16 },
  theirText: { color: "#333", fontSize: 16 },
  timeText: { fontSize: 10, color: "#555", marginTop: 4, alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#00bcd5",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#777" },
  backButton: {
  marginRight: 10,
  padding: 5,
},

});
