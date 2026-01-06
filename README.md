<p align="center">
  <img src="assets/images/icon.png" alt="Poof Logo" width="120" height="120" style="border-radius: 24px;">
</p>

<h1 align="center">✨ Poof</h1>

<p align="center">
  <strong>Snap. Value. Vanish.</strong><br>
  Turn your clutter into cash with AI-powered instant liquidation.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Gemini_AI-1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#api-reference">API</a>
</p>

---

## 🎯 The Problem

You have stuff you don't need. Selling it is a nightmare:
- **Marketplace listings** take forever to create
- **Price research** is exhausting  
- **Negotiations** with lowballers drain your soul
- **Shipping logistics** are a pain
- **You just want it gone**

## 💡 The Solution

**Poof** makes your unwanted items disappear—and puts money in your pocket.

1. 📸 **Snap a photo** of any item
2. 🤖 **AI instantly identifies** brand, model, condition & market value
3. 🚚 **Summon a courier** who shows up with a prepaid shipping box
4. 💰 **Get paid** within 24 hours

No listings. No haggling. No shipping headaches. Just *poof*—it's gone.

---

## ✨ Features

### 🧠 AI-Powered Identification
- **Google Gemini 1.5 Flash** analyzes photos in seconds
- Identifies brand, model, and condition automatically
- Generates SEO-optimized listing titles and descriptions
- Provides accurate price estimates based on market data

### 🚀 One-Tap Liquidation
- Set your floor price or accept AI recommendations
- Summon an Uber/DoorDash courier to your door
- Courier arrives with prepaid shipping materials
- Track your item from pickup to payout

### 📊 Multi-Marketplace Integration
- Simultaneous listing on eBay, Mercari, Poshmark, Depop & more
- AI handles all buyer negotiations
- Automatic price adjustments based on market demand
- Real-time analytics and performance tracking

### 💸 Instant Payouts
- Get paid within 24 hours of sale confirmation
- Transparent fee breakdown (just $5 convenience fee + small commission)
- Stripe-powered secure payments
- Full transaction history and earnings dashboard

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    📱 SNAP          🤖 AI ANALYZE        🚚 PICKUP        💰 PAID │
│    ─────────────────────────────────────────────────────────── │
│                                                                 │
│    Take photo  →  Get instant   →  Courier comes  →  Money in  │
│    of item        valuation        to your door      24 hours  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### The User Journey

1. **Capture** — Open app, snap a photo of your item
2. **Review** — AI shows brand, condition, and estimated value ($50-80)
3. **Confirm** — Set your minimum price or accept recommendation
4. **Summon** — Tap to dispatch a courier ($5 fee)
5. **Handoff** — Courier arrives, you hand over the item
6. **Track** — Watch as your item gets listed and sold
7. **Profit** — Money deposited directly to your account

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

```bash
# Clone the repository
git clone git@github.com:DanePete/poof.git
cd poof

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal  
- **Physical Device**: Scan QR code with Expo Go app

### Environment Setup

Create a `.env` file in the root directory:

```env
# Google Gemini API (for AI vision)
GEMINI_API_KEY=your_gemini_api_key

# Firebase/Supabase (for database)
DATABASE_URL=your_database_url

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Courier APIs
UBER_DIRECT_API_KEY=your_uber_key
DOORDASH_API_KEY=your_doordash_key
```

---

## 🏗 Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Mobile App** | React Native 0.81 + Expo 54 |
| **Styling** | NativeWind (Tailwind CSS) + Tamagui |
| **Navigation** | Expo Router (file-based) |
| **State** | React Context + AsyncStorage |
| **AI Engine** | Google Gemini 1.5 Flash |
| **Database** | Firebase Firestore / Supabase |
| **Payments** | Stripe Connect |
| **Courier** | Uber Direct / DoorDash Drive |
| **Animations** | Moti + Reanimated |

### Project Structure

```
poof/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home screen
│   │   └── explore.tsx      # Browse/history
│   ├── liquidate.tsx        # Liquidation flow
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── LiquidationScreen.tsx
│   └── ui/                  # UI primitives
├── constants/               # Theme & config
├── hooks/                   # Custom React hooks
├── assets/                  # Images & fonts
├── ai-vision-service.py     # AI backend service
└── database-schema.ts       # TypeScript schema definitions
```

### Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Mobile     │────▶│   AI Vision  │────▶│  Database    │
│   App        │     │   Service    │     │  (Firestore) │
└──────────────┘     └──────────────┘     └──────────────┘
       │                                          │
       │                                          ▼
       │                                  ┌──────────────┐
       │                                  │  Marketplace │
       │                                  │  APIs        │
       │                                  └──────────────┘
       │                                          │
       ▼                                          ▼
┌──────────────┐                          ┌──────────────┐
│   Courier    │                          │   Stripe     │
│   Service    │                          │   Payments   │
└──────────────┘                          └──────────────┘
```

---

## 🔌 API Reference

### AI Vision Service

The `ai-vision-service.py` provides product identification via Google Gemini:

```python
from ai_vision_service import LoopAIVisionService

# Initialize
service = LoopAIVisionService(api_key="your_gemini_key")

# Analyze product image
result = service.analyze_product_from_image("path/to/photo.jpg")

# Response structure
{
  "category": "shoes",
  "brand": "Nike",
  "model": "Air Jordan 1 Retro High OG",
  "condition": "excellent",
  "confidence": 0.94,
  "seo_title": "Nike Air Jordan 1 Retro High OG - Excellent Condition",
  "description": "Authentic Nike Air Jordan 1 in excellent condition...",
  "tags": ["nike", "jordan", "sneakers", "retro", "basketball"],
  "estimated_value": {
    "low": 180.00,
    "mid": 220.00,
    "high": 280.00,
    "currency": "USD",
    "confidence": 0.85
  }
}
```

### CLI Usage

```bash
python ai-vision-service.py photo.jpg --api-key YOUR_KEY --output result.json
```

---

## 📊 Database Schema

The app uses a comprehensive schema for tracking items through the liquidation lifecycle:

### Core Entities

| Entity | Description |
|--------|-------------|
| `User` | User profiles, addresses, payment info |
| `Item` | Photographed items with AI analysis |
| `ItemListing` | Marketplace listings (eBay, Mercari, etc.) |
| `Negotiation` | AI-powered buyer negotiations |
| `CourierJob` | Pickup/delivery tracking |
| `Transaction` | Payment and payout records |

### Item Status Flow

```
identified → listed → sold → pickup_scheduled → picked_up → shipped → delivered
```

See [`database-schema.ts`](./database-schema.ts) for complete TypeScript definitions.

---

## 🎨 UI Components

Built with **Gluestack UI** + **NativeWind** for a beautiful, consistent design:

- Accordion, ActionSheet, Alert dialogs
- Buttons, Cards, Badges
- Forms with validation
- Bottom sheets, Modals, Popovers
- Charts (react-native-gifted-charts)
- Skeletons, Spinners, Progress bars

---

## 🛣 Roadmap

- [x] AI product identification
- [x] Price estimation engine
- [x] Liquidation screen UI
- [ ] Camera integration
- [ ] Courier API integration (Uber Direct)
- [ ] Multi-marketplace listing
- [ ] AI negotiation bot
- [ ] Stripe Connect payouts
- [ ] Push notifications
- [ ] Analytics dashboard

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 👨‍💻 Author

**Dane Petersen** — [@DanePete](https://github.com/DanePete)

---

<p align="center">
  <strong>Make your clutter disappear. ✨</strong><br>
  <sub>Built with ❤️ and a healthy disdain for clutter</sub>
</p>
