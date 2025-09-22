// // components/CategoryMenu.js
// import React from "react";
// import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function CategoryMenu({ categories, selectedCategory, onSelectCategory, navigation }) {
//   return (
//     <View>
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.topMenuContainer}
//     >
//       {categories.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           style={[
//             styles.menuItem,
//             selectedCategory === item.title && styles.activeMenuItem,
//           ]}
//           onPress={() => {
//             if (item.title === "Search") {
//               navigation.navigate("Search");
//             } else if (item.title === "More Matches") {
//               navigation.navigate("MoreMatches");
//             } else {
//               onSelectCategory(item.title);
//             }
//           }}
//         >
//           {item.icon ? (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Ionicons
//                 name={item.icon}
//                 size={20}
//                 color={selectedCategory === item.title ? "#0aa4b8" : "#666"}
//               />
//               <Text
//                 style={[
//                   styles.menuText,
//                   { marginLeft: 5 },
//                   selectedCategory === item.title && styles.activeMenuText,
//                 ]}
//               >
//                 {item.title}
//               </Text>
//             </View>
//           ) : (
//             <Text
//               style={[
//                 styles.menuText,
//                 selectedCategory === item.title && styles.activeMenuText,
//               ]}
//             >
//               {item.title} ({item.count})
//             </Text>
//           )}
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topMenuContainer: {
//     height:50,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     marginTop: 20,
//   },
//   menuItem: {
//     justifyContent: "center",
//     marginHorizontal: 12,
//     paddingBottom: 5,
//   },
//   menuText: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#333",
//   },
//   activeMenuItem: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#0aa4b8",
//   },
//   activeMenuText: {
//     color: "#0aa4b8",
//     fontWeight: "bold",
//   },
// });


import React from "react";
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryMenu({ categories, selectedCategory, onSelectCategory, navigation }) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topMenuContainer}
      >
        {categories.map((item) => {
          const isActive = selectedCategory === item.title;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={() => {
                onSelectCategory(item.title); // ✅ update active state always

                if (item.title === "Search") {
                  navigation.navigate("Search");
                } 
                else if (item.title === "More Matches") {
                  onSelectCategory("More Matches");
                  navigation.navigate("More Matches");
                    
                }
              }}
            >
              {item.icon ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={isActive ? "#0aa4b8" : "#666"}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      { marginLeft: 5 },
                      isActive && styles.activeMenuText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              ) : (
                <Text
                  style={[styles.menuText, isActive && styles.activeMenuText]}
                >
                  {item.title} ({item.count})
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenuContainer: {
    height: 50,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 20,
  },
  menuItem: {
    justifyContent: "center",
    marginHorizontal: 12,
    paddingBottom: 5,
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeMenuItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#0aa4b8",
  },
  activeMenuText: {
    color: "#0aa4b8",
    fontWeight: "bold",
  },
});
