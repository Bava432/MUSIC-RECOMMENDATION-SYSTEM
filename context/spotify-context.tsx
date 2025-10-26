"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getAccessToken, getUserProfile } from "@/lib/spotify"
import type { UserProfile } from "@/lib/types"

interface SpotifyContextType {
  accessToken: string | null
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
}

const SpotifyContext = createContext<SpotifyContextType>({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
})

export const useSpotify = () => useContext(SpotifyContext)

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for access token in URL (after redirect from Spotify)
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      // Exchange code for access token
      getAccessToken(code)
        .then((token) => {
          setAccessToken(token)
          localStorage.setItem("spotify_access_token", token)

          // Remove code from URL
          window.history.replaceState({}, document.title, window.location.pathname)

          // Get user profile
          return getUserProfile(token)
        })
        .then((profile) => {
          setUser(profile)
          localStorage.setItem("spotify_user", JSON.stringify(profile))
        })
        .catch(console.error)
        .finally(() => setIsLoading(false))
    } else {
      // Check for token in localStorage
      const storedToken = localStorage.getItem("spotify_access_token")
      const storedUser = localStorage.getItem("spotify_user")

      if (storedToken) {
        setAccessToken(storedToken)
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      }

      setIsLoading(false)
    }
  }, [])

  const login = () => {
    // Redirect to Spotify authorization page
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.SPOTIFY_REDIRECT_URI || "",
    )}&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state`
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    localStorage.removeItem("spotify_access_token")
    localStorage.removeItem("spotify_user")
  }

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!accessToken && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  )
}

