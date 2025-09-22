// import React from 'react'
// import { View, Text } from 'react-native'

// function MoreMatchesScreen() {
//   return (
//     <View>
//         <Text>
//             Hi
//         </Text>
    
//     </View>
//   )
// }

// export default MoreMatchesScreen


import React,{useState} from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import CategoryMenu from "../components/CategoryMenu";
import { categories } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function MoreMatchesScreen() {
   const navigation = useNavigation();
   const [selectedCategory, setSelectedCategory] = useState("New");

  const images = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
  ];

  return (
    <View style={styles.container}>
         <CategoryMenu
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                navigation={navigation}
              />
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
});
