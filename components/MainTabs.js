// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatListScreen from '../screens/ChatListScreen';
// import PremiumScreen from '../screens/PremiumScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
  initialRouteName="Home" 
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: true,
    tabBarStyle: {
      backgroundColor: '#fff',
      height: 60,
      paddingBottom: 5,
      marginBottom: 30,
    },
    tabBarIcon: ({ color }) => {
      let iconName;
      if (route.name === 'Home') iconName = 'home-outline';
      else if (route.name === 'Matches') iconName = 'heart-outline';
      else if (route.name === 'Search') iconName = 'search-outline';
      else if (route.name === 'Chats') iconName = 'chatbubble-outline';
      // else if (route.name === 'Premium') iconName = 'star-outline';
      return <Ionicons name={iconName} size={24} color={color} />;
    },
    tabBarActiveTintColor: '#fe5261',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Matches" component={MatchesScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="Chats" component={ChatListScreen} />
  {/* <Tab.Screen name="Premium" component={PremiumScreen} /> */}
</Tab.Navigator>

  );
}
