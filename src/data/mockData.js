export const achievements = [
  { id: 1, name: "First Login", icon: "🔓", unlocked: true, desc: "Entered the Funky realm" },
  { id: 2, name: "Profile Star", icon: "⭐", unlocked: true, desc: "Visited your profile" },
  { id: 3, name: "Chatterbox", icon: "💬", unlocked: false, progress: 60, desc: "Send 10 messages" },
  { id: 4, name: "Music Lover", icon: "🎵", unlocked: true, desc: "Played a song" },
  { id: 5, name: "Shopaholic", icon: "🛒", unlocked: false, progress: 30, desc: "Add 5 items to cart" },
  { id: 6, name: "Night Owl", icon: "🦉", unlocked: false, progress: 10, desc: "Visit at midnight" },
  { id: 7, name: "Meme Lord", icon: "😂", unlocked: false, progress: 0, desc: "Like 20 memes" },
  { id: 8, name: "Theme Hopper", icon: "🎨", unlocked: true, desc: "Tried 3 themes" },
];

export const leaderboardData = [
  { rank: 1, name: "PixelWarrior", score: 9840, avatar: "⚔️", change: "up" },
  { rank: 2, name: "NeonRider", score: 8720, avatar: "🏍️", change: "up" },
  { rank: 3, name: "CyberFairy", score: 7650, avatar: "🧚", change: "down" },
  { rank: 4, name: "RetroKing", score: 6540, avatar: "👑", change: "same" },
  { rank: 5, name: "FunkyMonkey", score: 5430, avatar: "🐒", change: "up" },
  { rank: 6, name: "ChaosBot", score: 4320, avatar: "🤖", change: "down" },
  { rank: 7, name: "PixelPixie", score: 3210, avatar: "🧚‍♀️", change: "same" },
  { rank: 8, name: "ArcadeAce", score: 2100, avatar: "🎮", change: "up" },
];

export const chatMessages = [
  { id: 1, from: "them", text: "Hey! Welcome to the Funky Chat!", time: "10:30" },
  { id: 2, from: "me", text: "This looks amazing! 🎉", time: "10:31" },
  { id: 3, from: "them", text: "Check out the animations, they're wild!", time: "10:32" },
  { id: 4, from: "me", text: "I love the neon theme 🔥", time: "10:33" },
  { id: 5, from: "them", text: "Try clicking the chaos mode in navbar!", time: "10:34" },
  { id: 6, from: "me", text: "OMG everything is wobbling 😂", time: "10:35" },
  { id: 7, from: "them", text: "Told you! This app is pure fun ✨", time: "10:36" },
];

export const products = [
  { id: 1, name: "Invisible Hat", price: 999, emoji: "🎩", desc: "Makes you invisible... sometimes", category: "weird" },
  { id: 2, name: "Chaos Potion", price: 499, emoji: "🧪", desc: "Unleashes random effects", category: "magic" },
  { id: 3, name: "Floating Cloud", price: 1299, emoji: "☁️", desc: "Sit on a cloud at home", category: "fantasy" },
  { id: 4, name: "Dragon Egg", price: 2499, emoji: "🥚", desc: "Guaranteed to hatch... maybe", category: "fantasy" },
  { id: 5, name: "Rainbow Paint", price: 299, emoji: "🌈", desc: "Paints everything rainbow", category: "weird" },
  { id: 6, name: "Gravity Boots", price: 1799, emoji: "👢", desc: "Walk on ceilings!", category: "tech" },
];

export const weatherMoods = [
  { id: "sunny", label: "Sunny", icon: "☀️", temp: 32, desc: "Bright and warm" },
  { id: "rainy", label: "Rainy", icon: "🌧️", temp: 18, desc: "Take an umbrella" },
  { id: "cloudy", label: "Cloudy", icon: "☁️", temp: 22, desc: "Overcast skies" },
  { id: "stormy", label: "Stormy", icon: "⛈️", temp: 15, desc: "Thunder alert!" },
  { id: "snowy", label: "Snowy", icon: "❄️", temp: -2, desc: "Snow day!" },
  { id: "windy", label: "Windy", icon: "🌪️", temp: 20, desc: "Hold your hat!" },
];

export const socialPosts = [
  { id: 1, user: "NeonKid", avatar: "👾", content: "Just discovered this app! Mind blown 🤯", likes: 42, comments: 7, time: "2m ago", image: null },
  { id: 2, user: "PixelFairy", avatar: "🧚", content: "The animations in this app are incredible! ✨", likes: 128, comments: 23, time: "15m ago", image: null },
  { id: 3, user: "ChaosMaster", avatar: "🤡", content: "I turned on chaos mode and my brain melted 🌀", likes: 256, comments: 31, time: "1h ago", image: null },
  { id: 4, user: "FunkyBot", avatar: "🤖", content: "BEEP BOOP... this UI is funky fresh 🎛️", likes: 89, comments: 12, time: "3h ago", image: null },
  { id: 5, user: "RetroQueen", avatar: "👸", content: "Retro theme + chaos mode = pure art 🎨", likes: 67, comments: 8, time: "5h ago", image: null },
];

export const funQuotes = [
  "You're doing great! ✨",
  "Have you tried the secret room? 🤫",
  "Chaos mode awaits you... ⚡",
  "You've unlocked: Being Awesome! 🏆",
  "Tip: Click everything at least twice 🔄",
  "Your vibes are immaculate 🌟",
  "Did you know? This app runs on pure fun! 🎮",
  "You're 1 in a million! 🦄",
];

export const notificationTemplates = [
  { type: "success", icon: "🎉", title: "Achievement Unlocked!", message: "You earned a new badge!" },
  { type: "info", icon: "💡", title: "Did you know?", message: "Try the neon theme for extra glow!" },
  { type: "warning", icon: "⚠️", title: "Chaos Alert!", message: "Chaos mode is getting stronger..." },
  { type: "error", icon: "💥", title: "Oops!", message: "You broke the matrix... again" },
  { type: "success", icon: "🌟", title: "Level Up!", message: "You're now a Funky Pro!" },
  { type: "info", icon: "🔔", title: "Reminder", message: "Don't forget to visit the Secret Room!" },
];
