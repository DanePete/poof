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

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start on web
npx expo start --web

# Start on iOS
npx expo start --ios

# Clear cache and restart
npx expo start --clear

# Kill stuck processes
pkill -f expo
```

---

## 🔐 Environment Setup (IMPORTANT)

This project uses environment variables to protect API credentials.

### Initial Setup

```bash
# 1. Copy the example file
cp .env.example .env.local

# 2. Edit .env.local with your Supabase credentials
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
```

### Environment Variables

| Variable | Description | Safe to Expose? |
|----------|-------------|-----------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Public/Anon API key | ✅ Yes (with RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (server only!) | ❌ **NEVER** |

### Security Rules

1. **Never commit `.env.local`** - It's gitignored for a reason
2. **The `anon` key is safe** when Row Level Security (RLS) is enabled
3. **Never use `service_role` key** in client code - use Edge Functions
4. **For production**: Use EAS Secrets or your CI/CD's secret management

### Production Deployment (EAS)

```bash
# Set secrets for EAS builds
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://xxx.supabase.co"
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-key"
```

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

---

## 🛠 Development Commands

### Starting the App

```bash
# Start Expo development server (shows QR code + options)
npx expo start

# Start directly in web browser
npx expo start --web

# Start directly on iOS simulator
npx expo start --ios

# Start directly on Android emulator
npx expo start --android

# Start with specific port
npx expo start --web --port 3000
```

### Cache & Troubleshooting

```bash
# Clear Metro bundler cache and restart
npx expo start --clear

# Clear all caches (Metro, node_modules cache, Expo cache)
rm -rf node_modules/.cache
npx expo start --clear

# Full reset (when things are really broken)
rm -rf node_modules
rm -rf .expo
npm install
npx expo start --clear

# Clear watchman cache (if using watchman)
watchman watch-del-all
```

### Process Management

```bash
# Kill all Expo processes (when port is in use)
pkill -f expo

# Find what's using a specific port
lsof -i :8081

# Kill process on specific port
kill -9 $(lsof -t -i:8081)
```

### Building & Deployment

```bash
# Create production build for web
npx expo export --platform web

# Create development build for iOS
npx expo run:ios

# Create development build for Android
npx expo run:android

# Create EAS build (requires EAS CLI)
eas build --platform ios
eas build --platform android
```

### Database (Supabase)

```bash
# Run database migrations (copy schema.sql to Supabase SQL Editor)
# Open: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

# Generate TypeScript types from Supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
```

### Useful Shortcuts in Expo Dev Server

When the dev server is running, press:
- `i` — Open iOS Simulator
- `a` — Open Android Emulator
- `w` — Open in web browser
- `r` — Reload app
- `m` — Toggle menu
- `j` — Open debugger
- `o` — Open project code in editor
- `?` — Show all commands

---

### Running on Device

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal  
- **Physical Device**: Scan QR code with Expo Go app
- **Web Browser**: Press `w` or use `npx expo start --web`

### Environment Setup

Create a `.env` file in the root directory (copy from `env.example`):

```bash
cp env.example .env
```

Then fill in your values:

```env
# Supabase (required for auth & database)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini API (for AI vision)
GEMINI_API_KEY=your_gemini_api_key

# Stripe (for payments)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Courier APIs
UBER_DIRECT_API_KEY=your_uber_key
DOORDASH_API_KEY=your_doordash_key
```

---

## 🏗 Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Mobile App** | React Native + Expo 54 |
| **UI Components** | Gluestack UI v3 + React Native Paper |
| **Styling** | NativeWind (Tailwind CSS) + StyleSheet |
| **Navigation** | Expo Router (file-based) |
| **Auth & Database** | Supabase (PostgreSQL + Auth) |
| **State** | React Context + Custom Hooks |
| **AI Engine** | Google Gemini 1.5 Flash |
| **Payments** | Stripe Connect |
| **Courier** | Uber Direct / DoorDash Drive |
| **Icons** | Lucide React Native |
| **Animations** | React Native Reanimated |

### Project Structure

```
poof/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── _layout.tsx      # Tab navigator config
│   │   ├── index.tsx        # Home screen
│   │   ├── explore.tsx      # Browse marketplace
│   │   ├── history.tsx      # Item history
│   │   └── account.tsx      # User account
│   ├── _layout.tsx          # Root layout with providers
│   ├── liquidate.tsx        # Liquidation flow
│   ├── login.tsx            # Authentication screen
│   ├── profile.tsx          # User profile editor
│   └── settings.tsx         # App settings
├── components/              # Reusable components
│   ├── Header.tsx           # App header with menu
│   ├── DrawerMenu.tsx       # Navigation drawer
│   └── ui/                  # Gluestack UI components
│       ├── box/, button/, text/, heading/...
│       ├── gluestack-ui-provider/  # Theme provider
│       └── index.tsx        # Barrel exports
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication state
├── hooks/                   # Custom React hooks
│   ├── useProfile.ts        # Profile data hook
│   └── useItems.ts          # Items CRUD hook
├── lib/                     # Core libraries
│   ├── supabase.ts          # Supabase client
│   └── database.types.ts    # TypeScript DB types
├── constants/               # Theme & config
├── assets/                  # Images & fonts
├── supabase/                # Database setup
│   └── schema.sql           # Database schema & RLS
├── docs/                    # Documentation
│   └── gluestack-ui-reference.md
├── ai-vision-service.py     # AI backend service
├── database-schema.ts       # TypeScript schema definitions
├── env.example              # Environment template
└── global.css               # Tailwind imports
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

### ✅ Phase 1: Foundation (Complete)
- [x] Project setup with Expo SDK 54
- [x] Gluestack UI component library integration
- [x] Tab navigation (Home, Explore, History, Account)
- [x] Dark mode theming
- [x] Liquidation screen UI mockup

### ✅ Phase 2: Backend & Auth (Complete)
- [x] Supabase project setup
- [x] Database schema with 7 tables (profiles, items, listings, etc.)
- [x] Row Level Security (RLS) policies
- [x] User authentication (Email/Password)
- [x] OAuth scaffolding (Google, Apple - needs provider setup)
- [x] Profile management & editing
- [x] Session persistence (web + native)
- [x] Environment variable security setup
- [x] Email confirmation modal flow

### ✅ Phase 3: Core Screens (Complete)
- [x] Login/Signup with validation
- [x] Profile screen with stats
- [x] Settings screen
- [x] History screen with filtering
- [x] Account dashboard

### 🚧 Phase 4: AI Integration (In Progress)
- [ ] Camera/image picker integration
- [ ] Connect Gemini 1.5 Flash API
- [ ] Product identification from photos
- [ ] Condition assessment
- [ ] Price estimation engine
- [ ] SEO title/description generation

### 📋 Phase 5: Marketplace (Planned)
- [ ] Multi-marketplace listing (eBay, FB, OfferUp)
- [ ] Price history tracking
- [ ] AI negotiation bot
- [ ] Offer management

### 📋 Phase 6: Logistics (Planned)
- [ ] Courier API integration (Uber Direct/Shipt)
- [ ] Pickup scheduling
- [ ] Real-time tracking
- [ ] Delivery confirmation

### 📋 Phase 7: Payments (Planned)
- [ ] Stripe Connect integration
- [ ] Payout management
- [ ] Transaction history
- [ ] Fee calculations

### 📋 Phase 8: Polish (Planned)
- [ ] Onboarding flow
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Performance optimizations
- [ ] App Store / Play Store deployment

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
