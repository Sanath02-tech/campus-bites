// Dummy data: menu items across all canteens
export const categories = ["All", "Breakfast", "Meals", "Snacks", "Beverages", "Desserts"];

export const menuItems = [
  { id: 1, name: "Masala Dosa", canteenId: "main-canteen", category: "Breakfast", price: 50, prepTime: 10, veg: true, emoji: "🥞", popular: true, available: true, description: "Crispy dosa with spiced potato filling, sambar and coconut chutney." },
  { id: 2, name: "Idli Vada Combo", canteenId: "main-canteen", category: "Breakfast", price: 40, prepTime: 5, veg: true, emoji: "🍘", popular: false, available: true, description: "Two soft idlis and one medu vada with sambar and chutney." },
  { id: 3, name: "Poha", canteenId: "main-canteen", category: "Breakfast", price: 30, prepTime: 5, veg: true, emoji: "🍚", popular: false, available: true, description: "Flattened rice tempered with mustard, peanuts and curry leaves." },
  { id: 4, name: "South Indian Meals", canteenId: "main-canteen", category: "Meals", price: 80, prepTime: 8, veg: true, emoji: "🍛", popular: true, available: true, description: "Rice, sambar, rasam, two curries, curd, papad and pickle." },
  { id: 5, name: "Chicken Biryani", canteenId: "main-canteen", category: "Meals", price: 140, prepTime: 12, veg: false, emoji: "🍗", popular: true, available: true, description: "Aromatic basmati rice layered with spiced chicken, served with raita." },
  { id: 6, name: "Veg Fried Rice", canteenId: "main-canteen", category: "Meals", price: 90, prepTime: 10, veg: true, emoji: "🥡", popular: false, available: false, description: "Wok-tossed rice with vegetables and soy sauce." },
  { id: 7, name: "Samosa (2 pcs)", canteenId: "main-canteen", category: "Snacks", price: 25, prepTime: 3, veg: true, emoji: "🥟", popular: true, available: true, description: "Crispy pastry stuffed with spiced potato and peas." },
  { id: 8, name: "Filter Coffee", canteenId: "main-canteen", category: "Beverages", price: 20, prepTime: 3, veg: true, emoji: "☕", popular: true, available: true, description: "Strong South Indian filter coffee with frothy milk." },
  { id: 9, name: "Cold Coffee", canteenId: "juice-junction", category: "Beverages", price: 60, prepTime: 5, veg: true, emoji: "🧋", popular: true, available: true, description: "Chilled blended coffee with ice cream." },
  { id: 10, name: "Fresh Lime Soda", canteenId: "juice-junction", category: "Beverages", price: 35, prepTime: 3, veg: true, emoji: "🍋", popular: false, available: true, description: "Sweet or salted, made with fresh lime." },
  { id: 11, name: "Mango Shake", canteenId: "juice-junction", category: "Beverages", price: 70, prepTime: 5, veg: true, emoji: "🥭", popular: false, available: true, description: "Thick shake made with Alphonso mango pulp." },
  { id: 12, name: "Veg Sandwich", canteenId: "juice-junction", category: "Snacks", price: 50, prepTime: 7, veg: true, emoji: "🥪", popular: false, available: true, description: "Grilled sandwich with veggies, cheese and green chutney." },
  { id: 13, name: "Fruit Bowl", canteenId: "juice-junction", category: "Desserts", price: 55, prepTime: 4, veg: true, emoji: "🍉", popular: false, available: true, description: "Seasonal cut fruits with a sprinkle of chaat masala." },
  { id: 14, name: "Maggi Masala", canteenId: "night-bites", category: "Snacks", price: 45, prepTime: 6, veg: true, emoji: "🍜", popular: true, available: true, description: "The classic late-night instant noodles, extra masala." },
  { id: 15, name: "Egg Roll", canteenId: "night-bites", category: "Snacks", price: 60, prepTime: 8, veg: false, emoji: "🌯", popular: false, available: true, description: "Paratha roll with egg, onions and spicy sauce." },
  { id: 16, name: "Chocolate Brownie", canteenId: "night-bites", category: "Desserts", price: 65, prepTime: 2, veg: true, emoji: "🍫", popular: false, available: true, description: "Warm fudgy brownie, add ice cream on request." },
];

export function getMenuItem(id) {
  return menuItems.find((item) => item.id === Number(id));
}
