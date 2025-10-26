"use client"

import { useState, useEffect } from "react"
import MoodSelector from "@/components/mood-selector"
import MoodFeatures from "@/components/mood-features"
import MusicPlayer from "@/components/music-player"
import type { Song } from "@/lib/types"
import { moods, getSongsByMood } from "@/lib/data"
import Image from "next/image"
import { Music2, WavesIcon } from "lucide-react"

export default function Home() {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [currentMood, setCurrentMood] = useState(moods[0])

  useEffect(() => {
    // Update songs when mood changes
    const moodSongs = getSongsByMood(currentMood.id)
    setSelectedSongs(moodSongs)
  }, [currentMood])

  const handleSongSelect = (songs: Song[]) => {
    setSelectedSongs(songs)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-500 via-slate-300 to-slate-300">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <WavesIcon className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-center text-white">Mood Music</h1>
          </div>
          <p className="text-center text-lg mt-2 text-slate-300">
            Discover music that matches your mood
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Mood Selection */}
          <div className="xl:col-span-3">
            <div className="sticky top-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Music2 className="h-5 w-5" />
                  Choose Your Mood
                </h2>
                <MoodSelector onMoodSelect={setCurrentMood} selectedMood={currentMood} />
              </div>
            </div>
          </div>

          {/* Center Column - Music Player */}
          <div className="xl:col-span-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              {selectedSongs.length > 0 ? (
                <MusicPlayer mood={currentMood} initialSongs={selectedSongs} />
              ) : (
                <div className="p-8 text-center">
                  <Music2 className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                  <h3 className="text-xl font-semibold mb-2">No Songs Selected</h3>
                  <p className="text-slate-400">
                    Use the mood selector or advanced features to find songs
                  </p>
                </div>
              )}
            </div>

            {/* Song List */}
            {selectedSongs.length > 0 && (
              <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Music2 className="h-5 w-5" />
                  Current Mood: {currentMood.name}
                </h3>
                <div className="space-y-3">
                  {selectedSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center p-3 bg-slate-700/50 hover:bg-slate-700/70 transition-colors rounded-lg cursor-pointer group"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4">
                        <Image
                          src={song.coverUrl}
                          alt={song.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {song.title}
                        </h4>
                        <p className="text-slate-300 text-sm">{song.artist}</p>
                      </div>
                      <div className="flex gap-2">
                        {song.tempo && (
                          <span className="text-xs px-2 py-1 bg-slate-600/50 rounded-full">
                            {song.tempo}
                          </span>
                        )}
                        {song.energy && (
                          <span className="text-xs px-2 py-1 bg-slate-600/50 rounded-full">
                            {song.energy}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Advanced Features */}
          <div className="xl:col-span-3">
            <div className="sticky top-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Music2 className="h-5 w-5" />
                    Fine-tune Your Music
                  </h2>
                  <MoodFeatures onSongSelect={handleSongSelect} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      
    </div>
  )
}

