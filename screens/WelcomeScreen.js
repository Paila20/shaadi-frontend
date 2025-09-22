



// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import LoginModal from '../components/LoginScreen';
// import { StatusBar } from 'expo-status-bar';


// export default function WelcomeScreen() {
//   const [lookingFor, setLookingFor]   = useState('Woman');
//   const [ageFrom, setAgeFrom] = useState('20');
//   const [ageTo, setAgeTo] = useState('25');
//   const [religion, setReligion]       = useState('');
//   const [motherTongue, setMotherTongue] = useState('');
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const generateAgeItems = (start, end) => {
//   return Array.from({ length: end - start + 1 }, (_, i) => {
//     const value = (start + i).toString();
//     return { label: value, value };
//   });
// };


//   const handleBegin = () => {
//     alert(
//       `Looking for: ${lookingFor}\nAge:  ${ageFrom} to ${ageTo}\nReligion: ${religion}\nMother Tongue: ${motherTongue}`,
//     );
//   };

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://img2.shaadi.com/assests/2020/images/home-page-banner-tvc-m-v4.jpg',
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         {/* ----------  Navbar  ---------- */}
//         <View style={styles.navbar}>
//           <Image
//             source={{
//               uri: 'https://img2.shaadi.com/assests/2016/images/home-logo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <TouchableOpacity onPress={() => setShowLoginModal(true)}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableOpacity>
//         </View>

//         ----------  Main Block  ----------
//         <View style={styles.content}>
//           <Text style={styles.subtitle}>We bring people together.</Text>
//           <Text style={styles.subtitle}>Love unites them…</Text>

//           {/* ----------  Form (one flexible row)  ---------- */}
//           <View style={styles.form}>
//             {/* I am looking for */}
//             <View style={styles.formField}>
//               <Text style={styles.formLabel}>I'm looking for a</Text>
//               <RNPickerSelect
//                 onValueChange={setLookingFor}
//                 items={[
//                   { label: 'Woman', value: 'Woman' },
//                   { label: 'Man', value: 'Man' },
//                 ]}
//                 // placeholder={{ label: 'Woman', value: 'Woman'}}
//                 value={lookingFor}
//                 style={pickerSelectStyles}
//                 useNativeAndroidPickerStyle={false} // Important!
//               />
//             </View>

//             {/* Age */}
//             <View style={styles.formField}>
//               <Text style={styles.formLabel}>aged</Text>
//                <View style={{ flexDirection: 'row', gap: 10 }}>
//                   <View style={{ flex: 1 }}>
//                     <RNPickerSelect
//                       onValueChange={setAgeFrom}
//                       items={generateAgeItems(20, 71)}
//                       value={ageFrom}
//                       style={pickerSelectStyles}
//                       useNativeAndroidPickerStyle={false}
//                     />
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <RNPickerSelect
//                       onValueChange={setAgeTo}
//                       items={generateAgeItems(20, 71)}
//                       value={ageTo}
//                       style={pickerSelectStyles}
//                       useNativeAndroidPickerStyle={false}
//                     />
//                   </View>
//                 </View>
//             </View>

//             {/* Religion */}
//             <View style={styles.formField}>
//               <Text style={styles.formLabel}>of religion</Text>
//               <RNPickerSelect
//                 onValueChange={setReligion}
//                 items={[
//                   { label: 'Hindu', value: 'Hindu' },
//                   { label: 'Muslim', value: 'Muslim' },
//                   { label: 'Christian', value: 'Christian' },
//                   { label: 'Sikh', value: 'Sikh' },
//                 ]}
//                 placeholder={{ label: 'Select', value: null }}
//                 value={religion}
//                 style={pickerSelectStyles}
//                 useNativeAndroidPickerStyle={false} // Important!
//               />
//             </View>

//             {/* Mother Tongue */}
//             <View style={styles.formField}>
//               <Text style={styles.formLabel}>and mother tongue</Text>
//               <RNPickerSelect
//                 onValueChange={setMotherTongue}
//                 items={[
//                   { label: 'Telugu', value: 'Telugu' },
//                   { label: 'Hindi', value: 'Hindi' },
//                   { label: 'Tamil', value: 'Tamil' },
//                   { label: 'Bengali', value: 'Bengali' },
//                 ]}
//                 placeholder={{ label: 'Select', value: null }}
//                 value={motherTongue}
//                 style={pickerSelectStyles}
//                     useNativeAndroidPickerStyle={false} 
//               />
//             </View>

//             {/* Button */}
//             <TouchableOpacity
//               style={styles.buttonHorizontal}
//               onPress={handleBegin}
//             >
//               <Text style={styles.buttonText}>Let&apos;s Begin</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />

//         <StatusBar style="light" />
//       </View>
//     </ImageBackground>
    
//   );
// }

// /* ----------  Styles  ---------- */
// const styles = StyleSheet.create({
//   /* layout wrappers */
//   background: { flex: 1 },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: { width: 80, height: 40 },
//   loginText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//   content: { flex: 1, alignItems: 'center', justifyContent: 'center',paddingBottom: 50 },
//   subtitle: {
//     fontSize: 18,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//     lineHeight: 18,
//   },

//   /* form row */
//   form: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 5,
//     padding: 25,
//     width: '100vw',
//     gap: 10,
//     marginTop: 20,
//   },

//   /* each field */
//   formField: {
//     minWidth: 140,       // keeps single-line on wider screens
//     flexGrow: 1,
//     flexBasis: '18%',    // 5 items ≈100%
//   },
//   formLabel: {
//     color: '#fff',
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: 'white',
//     color: '#fff',
//     padding: 10,
//     borderRadius: 5,
//       height: 48,
//   },
 

//   /* button */
//   buttonHorizontal: {
//     minWidth: 160,
//     flexGrow: 1,
//     flexBasis: '18%',
//     backgroundColor: '#00bcd5',
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//       height: 48,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });


// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     backgroundColor: 'white',
//     color: 'gray', 
//     padding: 10,
//     borderRadius: 5,
//     height: 48,
//     border:'1px solid white',
//     borderWidth: 0,
//       elevation: 0,  
//   },
//   inputAndroid: {
//     backgroundColor: 'white',
//     color: 'gray',
//     padding: 10,
//     borderRadius: 5,
//     height: 48,
//     borderWidth: 0,
//     border:'1px solid white',
//     elevation: 0,  
//   },
//    inputWeb: {
//     backgroundColor: 'white',
//     color: '#000',
//     fontSize: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     height: 48,
//     borderWidth: 0,   
//     outlineWidth: 0,   
//     outlineStyle: 'none',
//     boxShadow: 'none',  
//   },
//   viewContainer: {
//     height: 48,             // Same as input
//     justifyContent: 'center',
 
//     backgroundColor: 'white',
//       borderRadius: 5,

//   },
// });

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import LoginModal from '../components/LoginScreen';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: 'https://img2.shaadi.com/assests/2020/images/home-page-banner-tvc-m-v4.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* ---------- Navbar ---------- */}
        <View style={styles.navbar}>
          <Image
            source={{
              uri: 'https://img2.shaadi.com/assests/2016/images/home-logo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => setShowLoginModal(true)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Main Content ---------- */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>We bring people together.</Text>
          <Text style={styles.subtitle}>Love unites them…</Text>
        </View>

        {/* ---------- Login Modal ---------- */}
        <LoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />

        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: { width: 80, height: 40 },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 18,
  },
});
