# Mood Music Player

A modern, mood-based music player built with Next.js that helps users discover and play music based on their emotional state, daily activities, and preferences. This project demonstrates advanced React patterns, state management, and modern web development practices.

## 🎵 Features

### Core Features
- **Mood-Based Music Selection**: Choose from 5 different moods (Happy, Sad, Energetic, Relaxed, Focused)
- **Advanced Music Filtering**:
  - Time-based recommendations
  - Activity-based suggestions
  - Energy level adjustment
  - Tempo selection
- **Music Player**:
  - Play/Pause functionality
  - Volume control
  - Track progress
  - Next/Previous track
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Technical Features
- Built with Next.js 13+ and React 18
- TypeScript for type safety
- TailwindCSS for styling
- Support for both local and remote audio files
- Modern component architecture
- Client-side state management
- Responsive and accessible UI components

## 🚀 Project Structure

```
mood-music-player/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── mood-selector.tsx  # Mood selection interface
│   ├── mood-features.tsx  # Advanced features component
│   ├── music-player.tsx   # Audio player component
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and data
│   ├── data.ts           # Song and mood data
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── audio/           # Local audio files
│   └── images/          # Images and cover art
└── styles/              # Global styles
```

## 💡 How It Works

### 1. Mood Selection System
- Users can select from 5 different moods
- Each mood has:
  - Unique color scheme
  - Recommended activities
  - Best times of day
  - Curated playlist

### 2. Advanced Features
- **Time-Based Recommendations**:
  ```typescript
  // Example of time-based filtering
  const recommendedSongs = getRecommendedSongs("Morning", "Exercise")
  ```
- **Energy Level Matching**:
  ```typescript
  // Songs are matched based on energy level (0-100)
  const energeticSongs = getSongsByEnergy(70, 100)
  ```
- **Tempo Selection**:
  ```typescript
  // Filter songs by tempo
  const slowSongs = getSongsByTempo("slow")
  ```

### 3. Music Data Structure
```typescript
interface Song {
  id: string
  title: string
  artist: string
  audioUrl: string
  coverUrl: string
  duration: string
  mood: string[]
  source: "local" | "remote"
  tempo?: "slow" | "medium" | "fast"
  energy?: number
  tags?: string[]
  key?: string
}
```

## 🛠️ Technical Implementation

### Key Components

1. **MoodSelector (`components/mood-selector.tsx`)**
   - Handles mood selection UI
   - Displays mood-specific colors and descriptions
   - Triggers song filtering based on mood

2. **MoodFeatures (`components/mood-features.tsx`)**
   - Provides advanced filtering options
   - Implements time and activity-based recommendations
   - Controls energy level and tempo selection

3. **MusicPlayer (`components/music-player.tsx`)**
   - Manages audio playback
   - Handles player controls
   - Displays current track information

### State Management
- Uses React's useState for local component state
- Implements prop drilling for simple state sharing
- Maintains clean component architecture

### Styling
- Uses TailwindCSS for responsive design
- Implements custom color schemes for each mood
- Ensures consistent UI across devices

## 🎯 Educational Value

This project demonstrates several important concepts:

1. **Modern React Patterns**
   - Client/Server Components
   - Custom Hooks
   - Component Composition

2. **TypeScript Implementation**
   - Type Safety
   - Interface Definitions
   - Type Utilities

3. **UI/UX Design**
   - Mood-based Color Schemes
   - Responsive Layout
   - Accessibility Considerations

4. **Audio Processing**
   - HTML5 Audio API
   - Music Metadata Handling
   - Playback Controls

## 🚀 Getting Started

1. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   pnpm install
   ```

2. **Running the Project**
   ```bash
   # Development mode
   pnpm dev

   # Build for production
   pnpm build

   # Start production server
   pnpm start
   ```

3. **Adding Local Music**
   - Place audio files in `/public/audio/`
   - Add cover images in `/public/images/`
   - Update `lib/data.ts` with new song entries

## 🎨 Future Enhancements

Potential areas for expansion:
- User accounts and saved playlists
- Music visualization
- Machine learning for mood detection
- Social sharing features
- More advanced audio controls

## 📚 Learning Outcomes

This project demonstrates proficiency in:
- Modern React development
- TypeScript implementation
- State management
- Component architecture
- Audio processing
- Responsive design
- User experience design

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Submitting a pull request

## 📝 License

This project is licensed under the MIT License. 