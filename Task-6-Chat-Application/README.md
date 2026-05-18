# Task 6: Real-Time Chat Application

## Description
A real-time chat application built with React.js and Firebase. Features include user authentication (Google Sign-In and Anonymous), multiple chat rooms, and instant message updates using Firebase Firestore.

## Features
- **Authentication**: Google Sign-In and Anonymous/Guest login
- **Real-Time Messages**: Instant message updates using Firestore's `onSnapshot` listener
- **Multiple Chat Rooms**: General, Random, and Tech Talk rooms
- **Message History**: Messages persist in Firestore
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean, Discord-inspired interface

## Technologies Used
- **React 19** - UI Library
- **Vite** - Build tool and development server
- **Firebase** - Authentication and Firestore database
- **React Hooks** - Custom hooks for auth and chat logic

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Firebase project (create at https://console.firebase.google.com)

### Firebase Setup
1. Create a new Firebase project
2. Enable **Authentication** with Google and Anonymous providers
3. Enable **Firestore Database** in production mode
4. Copy your Firebase config credentials

### Installation
```bash
npm install
```

### Configure Environment
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your Firebase credentials to `.env`:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firestore Rules
Set up your Firestore security rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId}/messages/{messageId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    match /rooms/{roomId} {
      allow read: if true;
    }
  }
}
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── Login.jsx          # Authentication screen
│   ├── Sidebar.jsx        # Room list and user info
│   ├── ChatRoom.jsx       # Main chat container
│   ├── MessageList.jsx    # Message display with auto-scroll
│   └── MessageInput.jsx   # Message input form
├── config/
│   └── firebase.js        # Firebase initialization
├── hooks/
│   ├── useAuth.js         # Authentication context
│   └── useChat.js         # Custom hooks for messages and rooms
├── styles/
│   ├── App.css
│   ├── Login.css
│   ├── Sidebar.css
│   ├── ChatRoom.css
│   ├── MessageList.css
│   └── MessageInput.css
├── App.jsx                # Main app component
└── main.jsx               # Entry point
```

## How It Works
1. User logs in via Google or as guest
2. App loads chat rooms from Firestore
3. User selects a room to join
4. `onSnapshot` listener provides real-time message updates
5. Messages are sent to Firestore and appear instantly for all users

## Created By
Suyog Madhav Shirsat
