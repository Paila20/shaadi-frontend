


// import 'react-native-gesture-handler';

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import WelcomeScreen from './screens/WelcomeScreen';
// import HomeScreen from './screens/HomeScreen';
// import LoginModal from './components/LoginScreen';
// import MainTabs from './components/MainTabs';
// import MatchesScreen from './screens/MatchesScreen';
// import InboxScreen from './screens/InboxScreen';
// import ChatScreen from './screens/ChatScreen';
// import PremiumScreen from './screens/PremiumScreen';
// import SearchScreen from './screens/SearchScreen';
// import MoreMatchesScreen from './screens/MoreMatchesScreen';
// import ProfileDetailsScreen from "./screens/ProfileDetailsScreen";
// import SignupScreen from './screens/SignupScreen';
// import EditProfile from './screens/EditProfile';
// import ResultsScreen from "./screens//ResultsScreen";
// import ChatListScreen from './screens/ChatListScreen';
// import MatchInfo from './screens/MatchInfo';
// import MyProfileScreen from "./screens/MyProfileScreen";
// import EditPreferences from './screens/EditPreferences';
// import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
// import ResetPassword from './screens/ResetPassword';


// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome">
//         <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ headerShown: false }}  />
//         <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }}  />
//         <Stack.Screen name="Login" component={LoginModal} />
//          <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
//           <Stack.Screen name="EditProfile" component={EditProfile}  options={{ headerShown: false }} />
//           <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
//          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
//           <Stack.Screen name="Matches" component={MatchesScreen}  options={{ headerShown: false }} />
//             <Stack.Screen name="Search" component={SearchScreen}  options={{ headerShown: false }} />
//             <Stack.Screen name="MatchInfo" component={MatchInfo}  options={{ headerShown: false }} />
//          <Stack.Screen name="Inbox" component={InboxScreen}  options={{ headerShown: false }} />
//           <Stack.Screen name="Chat" component={ChatScreen}  options={{ headerShown: false }} />
//           <Stack.Screen name="Chats" component={ChatListScreen} />
//           <Stack.Screen name="Premium" component={PremiumScreen}   options={{ headerShown: false }}/>
//                 <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{ headerShown: false }}/>
//                 <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }} />
//                      <Stack.Screen name="EditPreferences" component={EditPreferences} options={{ headerShown: false }}/>
//                      <Stack.Screen
//   name="ForgotPassword"
//   component={ForgotPasswordScreen}
//   options={{ headerShown: true, title: "Forgot Password" }}
// />
//       </Stack.Navigator>
//         <Stack.Screen
//   name="ResetPassword"
//   component={ResetPassword}
//   options={{ headerShown: true, title: "Reset Password" }}
// />
      
//     </NavigationContainer>
//   );
// }


import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginModal from './components/LoginScreen';
import MainTabs from './components/MainTabs';
import MatchesScreen from './screens/MatchesScreen';
import InboxScreen from './screens/InboxScreen';
import ChatScreen from './screens/ChatScreen';
import PremiumScreen from './screens/PremiumScreen';
import SearchScreen from './screens/SearchScreen';
import MoreMatchesScreen from './screens/MoreMatchesScreen';
import ProfileDetailsScreen from "./screens/ProfileDetailsScreen";
import SignupScreen from './screens/SignupScreen';
import EditProfile from './screens/EditProfile';
import ResultsScreen from "./screens//ResultsScreen";
import ChatListScreen from './screens/ChatListScreen';
import MatchInfo from './screens/MatchInfo';
import MyProfileScreen from "./screens/MyProfileScreen";
import EditPreferences from './screens/EditPreferences';
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPassword from './screens/ResetPassword';

const Stack = createNativeStackNavigator();

// Deep linking config
const linking = {
  prefixes: [
    Linking.createURL('/'),        // for Expo dev
    'https://myapp.com',           // your website URL
    'myfirstexpoapp://',           // custom scheme
  ],
  config: {
    screens: {
      ResetPassword: 'reset-password/:token',
      ForgotPassword: 'forgot-password',
      Signup: 'signup',
      Login: 'login',
      Welcome: 'welcome',
      Home: 'home',
      // add other screens if you want to link them via URL
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={LoginModal} />
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile}  options={{ headerShown: false }} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Matches" component={MatchesScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="MatchInfo" component={MatchInfo}  options={{ headerShown: false }} />
        <Stack.Screen name="Inbox" component={InboxScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Chats" component={ChatListScreen} />
        <Stack.Screen name="Premium" component={PremiumScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditPreferences" component={EditPreferences} options={{ headerShown: false }}/>
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: true, title: "Forgot Password" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: true, title: "Reset Password" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
