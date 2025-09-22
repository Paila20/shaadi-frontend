
// import React from "react";
// import { View, Text, FlatList, Image, StyleSheet } from "react-native";

// export default function ResultsScreen({ route }) {
//   const { matches } = route.params;

//   // Determine if there are valid matches
//   const hasMatches = Array.isArray(matches) && matches.length > 0;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Matched Profiles</Text>

//       {!hasMatches ? (
//         <Text style={styles.noResults}>No matches</Text>
//       ) : (
//         <FlatList
//           data={matches}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               {item.image && (
//                 <Image source={{ uri: item.image }} style={styles.image} />
//               )}
//               <View style={styles.details}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text>Gender: {item.gender}</Text>
//                 <Text>Age: {item.age}</Text>
//                 <Text>Religion: {item.religion}</Text>
//                 <Text>Location: {item.location}</Text>
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 10 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   noResults: { textAlign: "center", marginTop: 20, color: "gray" },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#f8f8f8",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
//   details: { flex: 1 },
//   name: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
// });


import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";

export default function ResultsScreen({ route }) {
  const { matches } = route.params;
  const screenWidth = Dimensions.get("window").width;

  const hasMatches = Array.isArray(matches) && matches.length > 0;

  const renderProfile = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.image ||
            (item.gender?.toLowerCase() === "male"
              ? "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              : "https://www.pngall.com/wp-content/uploads/5/Profile-Female-PNG.png"),
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          {item.age || "N/A"} yrs • {item.religion || "N/A"} • {item.community || "N/A"}
        </Text>
        <Text style={styles.location}>{item.location || "N/A"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matched Profiles</Text>

      {!hasMatches ? (
        <Text style={styles.noData}>No matches found</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={renderProfile}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", margin: 10, color: "#333" },
  noData: { textAlign: "center", marginTop: 20, color: "#777" },
  card: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 0,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 0,
  },
  info: {
    padding: 10,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 4 },
  details: { color: "#555", fontSize: 14 },
  location: { color: "#777", fontSize: 13, marginTop: 4 },
});
