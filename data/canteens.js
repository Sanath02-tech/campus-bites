// Dummy data: campus canteens (would come from a backend in a real app)
export const canteens = [
  {
    id: "main-canteen",
    name: "Main Canteen",
    location: "Ground floor, Admin Block",
    timings: "8:00 AM – 6:00 PM",
    emoji: "🍛",
    rating: 4.3,
    isOpen: true,
  },
  {
    id: "juice-junction",
    name: "Juice Junction",
    location: "Near Library",
    timings: "9:00 AM – 7:00 PM",
    emoji: "🥤",
    rating: 4.6,
    isOpen: true,
  },
  {
    id: "night-bites",
    name: "Night Bites",
    location: "Boys Hostel Gate",
    timings: "6:00 PM – 1:00 AM",
    emoji: "🌙",
    rating: 4.1,
    isOpen: false,
  },
];

export function getCanteen(id) {
  return canteens.find((c) => c.id === id);
}
