# ClipSync — Virtual Clipboard Manager

<p align="center">
  <strong>A lightweight, ultra-fast Progressive Web App (PWA) to sync text, links, and code snippets across MacBook, iPhone, and Android in real-time.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PWA-Ready-10B981?style=flat-square" alt="PWA Ready" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-10.14-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License MIT" />
</p>

---

## Overview

**ClipSync** is an offline-first, minimal virtual clipboard manager designed for seamless multi-device productivity. It bridges the gap between Apple, Android, and PC ecosystems, allowing you to instantly share copied text, URLs, and code snippets without logging in or using messaging apps like WhatsApp or Telegram as a clipboard scratchpad.

With **Web Share Target API** support, ClipSync appears directly in your mobile system Share Sheet alongside native apps.

---

## ✨ Features

- **⚡ Lightning-Fast & Lightweight**:
  - Pure Vanilla JS and CSS with Vite bundling (< 450ms build time, gzip bundle < 70 KB).
  - Instant loading via Service Worker (`sw.js`) and asset pre-caching.
- **📲 Native OS Share Sheet Integration (Web Share Target)**:
  - Share links and text from Safari, Chrome, YouTube, Twitter, or any app directly to ClipSync via the native system Share Sheet.
- **🔗 Instant Pairing (QR Code & 6-Digit Room Code)**:
  - No email or password needed. Pair devices in seconds by scanning a QR code or entering a 6-digit room code (e.g., `CLIP-4892`).
- **☁️ Global Real-Time Sync**:
  - Powered by Firebase Realtime Database for instant synchronization across cellular (4G/5G) and separate Wi-Fi networks.
  - Automatic fallback to local storage and `BroadcastChannel` relay when offline.
- **🖥️ Minimal Desktop & Mobile UI**:
  - **PC Sidebar**: Quick navigation across categories, room status, utilities, and audio controls.
  - **Expand / Collapse Sidebar**: Toggle sidebar visibility smoothly with the `⌘ + B` (or `Ctrl + B`) shortcut or toggle button.
  - **Grid (⊞) & List (☰) View Modes**: Switch between multi-column card grid and compact single-column stream.
  - **Auto Content Detection**: Automatically detects and highlights URLs (`🔗 Link`), syntax blocks (`💻 Code`), and notes (`📝 Text`).
- **🎵 Zero-Latency Synthesized Audio**:
  - Subtle audio feedback using Web Audio API oscillators (no external MP3 downloads).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/methun404/virtual-clipboard.git

# Navigate to project directory
cd virtual-clipboard

# Install dependencies
npm install
```

### Running Locally (with HTTPS for PWA & Mobile Testing)

ClipSync includes `@vitejs/plugin-basic-ssl` to serve over local HTTPS. This is required by mobile browsers for WebAPK generation and Web Share Target registration:

```bash
npm run dev
```

The terminal will display your local and network URLs:
- **Local (MacBook/PC):** `https://localhost:5173/`
- **Network (iPhone/Android):** `https://192.168.x.x:5173/` *(open this in your phone's browser connected to the same Wi-Fi)*

### Building for Production

```bash
npm run build
```

Production assets will be output to the `dist/` directory.

---

## 📱 PWA Installation Guide

### iOS / iPhone (Safari)
1. Open the ClipSync URL in **Safari**.
2. Tap the **Share** button (box with upward arrow) at the bottom toolbar.
3. Scroll down and tap **"Add to Home Screen"**.
4. ClipSync will be added to your home screen and run standalone with full-screen experience.

### Android (Chrome)
1. Open the ClipSync URL in **Google Chrome**.
2. Tap the three-dot menu (⋮) in the top right or tap the **"Install App"** prompt.
3. Tap **"Install"**. Chrome will generate a native WebAPK that integrates into your Android system Share Sheet.

### macOS / Windows Desktop
1. Open in Chrome, Edge, or Brave.
2. Click the **Install** icon in the browser address bar or click **"Install PWA"** in the sidebar.
3. ClipSync will open in its own distraction-free desktop window and appear in your Launchpad / Applications.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘ + Enter` / `Ctrl + Enter` | Instant Sync / Submit Clip |
| `⌘ + B` / `Ctrl + B` | Toggle Sidebar (Expand / Collapse) |
| `Esc` | Close Active Modal (Pair / Settings) |

---

## 📁 Project Structure

```text
virtual_clipboard/
├── index.html               # Main application shell and UI layout
├── package.json             # Dependencies and scripts (Vite, Firebase, QRCode)
├── vite.config.js           # Vite configuration with basic-ssl for local HTTPS
├── public/
│   ├── manifest.webmanifest # PWA Web App Manifest with Web Share Target definition
│   ├── sw.js                # Service Worker for offline caching & share target intercept
│   ├── icon.svg             # Scalable vector application icon
│   ├── icon-192.png         # 192x192 PWA icon
│   ├── icon-512.png         # 512x512 PWA icon
│   └── favicon.svg          # Browser tab icon
└── src/
    ├── style.css            # Minimal dark design system & responsive layout
    ├── sound.js             # Synthesized Web Audio API sound effects engine
    ├── firebase.js          # Realtime Database sync engine with local relay fallback
    └── main.js              # Application logic, event listeners, view modes & shortcuts
```

---

## ☁️ Optional Firebase Cloud Setup

ClipSync works offline and across local tabs by default. To sync globally across different networks and cellular data:

1. Create a free project on the [Firebase Console](https://console.firebase.google.com).
2. Create a **Realtime Database** under **Build > Realtime Database** in Test Mode.
3. Go to **Project Settings > General** and scroll down to **Your apps > Web app** to copy your Firebase configuration object.
4. In ClipSync, click **"Cloud Sync"** in the sidebar, paste your configuration JSON, and click **Save & Connect**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
