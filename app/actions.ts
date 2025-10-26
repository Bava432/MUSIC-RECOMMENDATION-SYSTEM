"use server"

import { getAccessToken, getSongRecommendations } from "@/lib/spotify"
import type { Song } from "@/lib/types"

export async function getMoodSongs(mood: string): Promise<Song[]> {
  try {
    const accessToken = await getAccessToken()
    return await getSongRecommendations(mood, accessToken, 15)
  } catch (error) {
    console.error("Error fetching mood songs:", error)
    return []
  }
}

