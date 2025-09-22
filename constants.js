export const categories = [
  { id: "1", title: "Search", icon: "search-outline" },
  { id: "2", title: "New", count: 48 },
  { id: "3", title: "Daily", count: 12 },
  { id: "4", title: "My Matches", count: 103 },
  { id: "5", title: "Near Me", count: 6 },
  { id: "6", title: "More Matches", count: 25 },
];

// 🔹 Dummy profile generator
const generateProfiles = (count, prefix) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${prefix} Person ${i + 1}`,
    age: 28 + (i % 5),
    location: ["Mumbai", "Delhi", "Bangalore", "Chennai"][i % 4],
    profession: ["Engineer", "Doctor", "Designer", "Teacher"][i % 4],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  }));

// 🔹 Export dummy data
export const dummyData = {
  New: generateProfiles(48, "New"),
  Daily: generateProfiles(12, "Daily"),
  "My Matches": generateProfiles(103, "My Match"),
  "Near Me": generateProfiles(6, "Nearby"),
  "More Matches": generateProfiles(25, "Extra"),
};
