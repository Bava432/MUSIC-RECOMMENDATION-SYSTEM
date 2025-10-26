"use client"

import { useSpotify } from "@/context/spotify-context"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"

export default function LoginButton() {
  const { isAuthenticated, isLoading, login, logout, user } = useSpotify()

  if (isLoading) {
    return (
      <div className="flex justify-center mb-8">
        <Button disabled variant="outline">
          Loading...
        </Button>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>Welcome, {user?.display_name || "User"}</span>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-8">
      <Button onClick={login}>
        <LogIn className="h-4 w-4 mr-2" />
        Login with Spotify
      </Button>
    </div>
  )
}

