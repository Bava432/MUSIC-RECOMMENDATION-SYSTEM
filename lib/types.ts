export interface MoodType {
  id: string
  name: string
  color: string
  bgColor: string
  description: string
  recommendedTimes?: string[]  // Best times of day for this mood
  activities?: string[]       // Recommended activities for this mood
  colorPalette?: string[]    // Colors that complement this mood
}

export interface Song {
  id: string
  title: string
  artist: string
  audioUrl: string
  coverUrl: string
  duration: string
  mood: string[]
  source: "local" | "remote"  // Indicate if the song is local or remote
  tempo?: "slow" | "medium" | "fast"
  energy?: number            // Energy level from 0-100
  tags?: string[]           // Additional tags for better mood matching
  key?: string              // Musical key of the song
}

export interface SpotifyAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
}

export interface UserProfile {
  id: string
  display_name: string
  email: string
  images: { url: string }[]
}

