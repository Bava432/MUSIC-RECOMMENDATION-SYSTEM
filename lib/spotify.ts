import type { Song } from "./types"

// Spotify API endpoints
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations"
const PLAYER_ENDPOINT = "https://api.spotify.com/v1/me/player"

// Map moods to Spotify seed genres and attributes
const moodMappings = {
  happy: {
    seed_genres: "pop,happy,feel-good",
    target_valence: 0.8, // High valence for happy music
    target_energy: 0.7,
    min_valence: 0.6,
  },
  sad: {
    seed_genres: "sad,blues,indie",
    target_valence: 0.2, // Low valence for sad music
    target_energy: 0.3,
    max_valence: 0.4,
  },
  energetic: {
    seed_genres: "dance,electronic,workout",
    target_energy: 0.9, // High energy
    target_tempo: 130,
    min_energy: 0.7,
  },
  relaxed: {
    seed_genres: "chill,ambient,sleep",
    target_energy: 0.3, // Low energy
    target_acousticness: 0.7,
    max_energy: 0.4,
  },
  focused: {
    seed_genres: "study,classical,instrumental",
    target_instrumentalness: 0.7,
    target_energy: 0.5,
    max_speechiness: 0.2,
  },
}

// Get Spotify access token using client credentials
export const getAccessToken = async (code?: string): Promise<string> => {
  if (code) {
    // Authorization code flow (for user authentication)
    const params = new URLSearchParams()
    params.append("grant_type", "authorization_code")
    params.append("code", code)
    params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI || "")
    params.append("client_id", process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "")
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET || "")

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    const data = await response.json()
    return data.access_token
  } else {
    // Client credentials flow (for non-user-specific requests)
    const basic = Buffer.from(
      `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString("base64")

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    const data = await response.json()
    return data.access_token
  }
}

// Get authorization URL for Spotify login
export const getAuthUrl = () => {
  const params = new URLSearchParams()
  params.append("client_id", process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "")
  params.append("response_type", "code")
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI || "")
  params.append(
    "scope",
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state",
  )

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Get song recommendations based on mood
export const getSongRecommendations = async (mood: string, accessToken: string, limit = 10): Promise<Song[]> => {
  const moodParams = moodMappings[mood as keyof typeof moodMappings] || moodMappings.happy

  const params = new URLSearchParams({
    limit: limit.toString(),
    ...moodParams,
  })

  const response = await fetch(`${RECOMMENDATIONS_ENDPOINT}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()

  if (!data.tracks) {
    return []
  }

  return data.tracks.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(", "),
    audioUrl: track.preview_url,
    coverUrl: track.album.images[0]?.url || "/placeholder.svg?height=400&width=400",
    duration: formatDuration(track.duration_ms),
    uri: track.uri,
    mood: [mood],
  }))
}

// Format duration from milliseconds to MM:SS
const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Play a track on the user's active Spotify device
export const playTrack = async (uri: string, accessToken: string): Promise<void> => {
  try {
    await fetch(`${PLAYER_ENDPOINT}/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [uri],
      }),
    })
  } catch (error) {
    console.error("Error playing track:", error)
  }
}

// Get user's Spotify profile
export const getUserProfile = async (accessToken: string) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.json()
}

