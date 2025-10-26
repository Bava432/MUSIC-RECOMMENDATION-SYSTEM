import type { MoodType } from "./types"

export interface Song {
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

export const moods: MoodType[] = [
  {
    id: "happy",
    name: "Happy",
    color: "blue",
    bgColor: "#0000FF",
    description: "Upbeat and cheerful music to brighten your day",
    recommendedTimes: ["Morning", "Afternoon"],
    activities: ["Exercise", "Dancing", "Social gatherings"],
    colorPalette: ["#f59e0b", "#fcd34d", "#fef3c7"],
  },
  {
    id: "sad",
    name: "Sad",
    color: "blue",
    bgColor: "#3b82f6",
    description: "Melancholic tunes for when you're feeling blue",
    recommendedTimes: ["Evening", "Night"],
    activities: ["Reflection", "Writing", "Relaxation"],
    colorPalette: ["#3b82f6", "#93c5fd", "#dbeafe"],
  },
  {
    id: "energetic",
    name: "Energetic",
    color: "red",
    bgColor: "#ef4444",
    description: "High-energy tracks to get you moving",
    recommendedTimes: ["Morning", "Pre-workout"],
    activities: ["Working out", "Running", "Sports"],
    colorPalette: ["#ef4444", "#f87171", "#fee2e2"],
  },
  {
    id: "relaxed",
    name: "Relaxed",
    color: "green",
    bgColor: "#10b981",
    description: "Calm and soothing music to help you unwind",
    recommendedTimes: ["Evening", "Bedtime"],
    activities: ["Meditation", "Reading", "Yoga"],
    colorPalette: ["#10b981", "#6ee7b7", "#d1fae5"],
  },
  {
    id: "focused",
    name: "Focused",
    color: "purple",
    bgColor: "#8b5cf6",
    description: "Concentration-enhancing tracks for work or study",
    recommendedTimes: ["Morning", "Afternoon"],
    activities: ["Studying", "Working", "Reading"],
    colorPalette: ["#8b5cf6", "#a78bfa", "#ede9fe"],
  },
  {
    id: "love",
    name: "Love",
    color: "purple",
    bgColor: "#8b5cf6",
    description: "Concentration-enhancing tracks for work or study",
    recommendedTimes: ["Morning", "Afternoon"],
    activities: ["Studying", "Working", "Reading"],
    colorPalette: ["#8b5cf6", "#a78bfa", "#ede9fe"],
  },
]

// Real songs from free music sources
export const songs: Song[] = [
  {
    id: "1",
    title: "Vaanam",
    artist: "Olexy",
    audioUrl: "./audio/sample.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2016/11/19/09/57/guitar-1838390_1280.jpg",
    duration: "2:36",
    mood: ["love"],
    source: "remote",
    tempo: "fast",
    energy: 10,
    tags: ["summer", "upbeat", "acoustic"],
    key: "C Major"
  },
  {
    id: "2",
    title: "Good Day",
    artist: "FASSounds",
    audioUrl: "./audio/sample.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2018/06/17/10/38/artist-3480274_1280.jpg",
    duration: "2:48",
    mood: ["happy"],
    source: "remote",
    tempo: "fast",
    energy: 85,
    tags: ["pop", "cheerful"],
    key: "G Major"
  },
  // Example of a local file
  {
    id: "local_1",
    title: "Local Happy Song",
    artist: "Local Artist",
    audioUrl: "/audio/local-happy-1.mp3",
    coverUrl: "/images/local-cover-1.jpg",
    duration: "3:15",
    mood: ["happy"],
    source: "local",
    tempo: "medium",
    energy: 70,
    tags: ["local", "upbeat"],
    key: "D Major"
  },
  {
    id: "3",
    title: "Melancholy Piano",
    artist: "Music Unlimited",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_1280.jpg",
    duration: "3:15",
    mood: ["sad"],
    source: "remote",
    tempo: "slow",
    energy: 30,
    tags: ["piano", "emotional"],
    key: "A Minor"
  },
  {
    id: "4",
    title: "Emotional Piano",
    artist: "Dream-Protocol",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/08/03/audio_2dde668d05.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2016/11/18/15/40/boy-1835416_1280.jpg",
    duration: "2:56",
    mood: ["sad", "relaxed"],
    source: "remote",
    tempo: "medium",
    energy: 40,
    tags: ["piano", "emotional"],
    key: "A Minor"
  },
  {
    id: "5",
    title: "Energy Rock",
    artist: "AudioCoffee",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_f52d7358c9.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2016/11/19/13/57/drum-set-1839383_1280.jpg",
    duration: "2:59",
    mood: ["energetic"],
    source: "remote",
    tempo: "fast",
    energy: 90,
    tags: ["rock", "upbeat"],
    key: "E Major"
  },
  {
    id: "6",
    title: "Upbeat Fun",
    artist: "Coma-Media",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/08/08/audio_dc39bde808.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2015/01/20/13/13/dance-605906_1280.jpg",
    duration: "2:25",
    mood: ["energetic", "happy"],
    source: "remote",
    tempo: "fast",
    energy: 80,
    tags: ["dance", "upbeat"],
    key: "G Major"
  },
  {
    id: "7",
    title: "Ambient Calm",
    artist: "SoulProdMusic",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_279f3c3576.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2016/11/18/16/57/beach-1835939_1280.jpg",
    duration: "3:42",
    mood: ["relaxed"],
    source: "remote",
    tempo: "slow",
    energy: 20,
    tags: ["ambient", "calming"],
    key: "C Major"
  },
  {
    id: "8",
    title: "Meditation",
    artist: "Zen-Man",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/23/audio_246b473ed8.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg",
    duration: "3:18",
    mood: ["relaxed", "focused"],
    source: "remote",
    tempo: "slow",
    energy: 10,
    tags: ["meditation", "calming"],
    key: "C Major"
  },
  {
    id: "9",
    title: "Study Session",
    artist: "AudioCoffee",
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/03/28/audio_b86b9b2c49.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
    duration: "3:05",
    mood: ["focused"],
    source: "remote",
    tempo: "medium",
    energy: 50,
    tags: ["study", "focused"],
    key: "C Major"
  },
  {
    id: "10",
    title: "Deep Focus",
    artist: "Music-Unlimited",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347701010d.mp3",
    coverUrl: "https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_1280.jpg",
    duration: "3:33",
    mood: ["focused", "relaxed"],
    source: "remote",
    tempo: "slow",
    energy: 20,
    tags: ["deep focus", "calming"],
    key: "C Major"
  }
]

// Enhanced functions for mood-based features
export function getSongsByMood(moodId: string): Song[] {
  return songs.filter((song) => song.mood.includes(moodId))
}

export function getSongsByEnergy(minEnergy: number, maxEnergy: number): Song[] {
  return songs.filter((song) => song.energy && song.energy >= minEnergy && song.energy <= maxEnergy)
}

export function getSongsByTempo(tempo: "slow" | "medium" | "fast"): Song[] {
  return songs.filter((song) => song.tempo === tempo)
}

export function getRecommendedSongs(currentTime: string, activity?: string): Song[] {
  const appropriateMoods = moods.filter(mood => 
    mood.recommendedTimes?.includes(currentTime) ||
    (activity && mood.activities?.includes(activity))
  )
  
  const moodIds = appropriateMoods.map(mood => mood.id)
  return songs.filter(song => 
    song.mood.some(m => moodIds.includes(m))
  )
}

// Function to get color palette for visualization
export function getMoodColorPalette(moodId: string): string[] {
  const mood = moods.find(m => m.id === moodId)
  return mood?.colorPalette || []
}

